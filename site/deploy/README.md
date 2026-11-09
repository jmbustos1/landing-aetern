# Deploy de AETERN — S3 + CloudFront + Lambda (Terraform)

Documentación completa: cómo se **levanta**, cómo se **actualiza**, cómo se
generan los **recursos estáticos**, cómo se **leen los mensajes** del formulario,
cómo se **conecta el dominio** y cómo se **destruye** todo.

---

## 1. Arquitectura

```
                 (build local)                     (Terraform)
  Next.js  ──►  next build  ──►  out/  ──►  S3 (privado)  ◄──  CloudFront (OAC, HTTPS)  ──►  visitante
                                                                     │
  Formulario ─POST JSON─►  Lambda Function URL ─►  S3 (mensajes)  +  SES (aviso por email)
```

- **Sitio**: 100% estático (`output: export`). S3 privado; solo CloudFront lo lee
  (Origin Access Control). Una CloudFront Function reescribe `/ruta/` → `/ruta/index.html`.
- **Formulario**: sin servidor propio. Una Lambda con Function URL guarda cada
  mensaje como JSON en un bucket S3 y manda un aviso por SES.
- **Costos**: con tráfico bajo es prácticamente free-tier. `terraform destroy`
  borra todo → $0. Incluye una **alerta de presupuesto** (módulo `budget`).

---

## 2. Requisitos

- `terraform`, `aws` CLI y `node` instalados.
- Credenciales AWS. **Usa un usuario IAM, no root** (ver §8). Verifica:
  ```bash
  aws sts get-caller-identity --profile <perfil>
  ```

---

## 3. Levantar la infra (primera vez)

```bash
cd deploy/terraform
cp terraform.tfvars.example terraform.tfvars   # edita aws_profile / notify_email / alerta_email
terraform init                                 # descarga providers (una vez)
terraform apply                                # crea CloudFront, S3, Lambda, SES, budget
```

`terraform apply` tarda unos minutos (CloudFront es lo lento). Al final imprime
los **outputs**: `site_url`, `form_endpoint`, `site_bucket`, etc.

**Verifica el correo de SES:** AWS envía un mail a `notify_email`; haz clic en el
link para confirmar. Sin eso, el formulario guarda en S3 pero no manda el aviso.

---

## 4. Generar y subir los recursos estáticos (deploy del contenido)

El sitio se compila local y se sube a S3. Todo automatizado en `deploy.sh`:

```bash
cd deploy
./deploy.sh <aws_profile>
```

Qué hace, paso a paso:
1. Lee de Terraform el `form_endpoint`, el `site_bucket` y el `distribution_id`.
2. `NEXT_PUBLIC_FORM_ENDPOINT=<endpoint> npm run build` → genera `out/` (HTML, JS,
   CSS, los 8 PDFs y las imágenes), con el formulario ya apuntando a la Lambda.
3. `aws s3 sync out/ s3://<bucket>/ --delete` → sube y borra lo que sobra.
4. `aws cloudfront create-invalidation ... --paths '/*'` → limpia la cache para
   que los cambios se vean al instante.

Abre la URL (`terraform output site_url`).

### Actualizar el sitio después
Cada vez que cambies contenido/código:
```bash
cd deploy && ./deploy.sh <aws_profile>
```
(No necesitas `terraform apply` de nuevo; eso es solo para la infraestructura.)

---

## 5. Leer los mensajes del formulario

Cada envío queda como un JSON en `s3://<bucket-forms>/submissions/AAAA-MM-DD/`.

```bash
cd deploy/terraform
terraform output cmd_leer_mensajes        # te imprime el comando exacto
# Listar:
aws s3 ls s3://$(terraform output -raw submissions_bucket)/submissions/ --recursive --profile <perfil>
# Leer uno:
aws s3 cp s3://<bucket>/submissions/2026-08-12/....json - --profile <perfil>
```
Además, si verificaste SES, te llega un **email** por cada mensaje.

---

## 6. Conectar el dominio propio (fase 2, al comprar aetern.dev)

El dominio **lo compras tú** (AETERN no lo puede comprar por ti: requiere tu
cuenta de registrador, tu tarjeta y tus datos de titular). Recomendado:
Cloudflare Registrar (al costo) o Namecheap. ~USD 12/año.

1. Compra `aetern.dev`.
2. Crea un **certificado ACM en `us-east-1`** para `aetern.dev` y valídalo por DNS
   (agregas el CNAME de validación que te da ACM en tu registrador).
   ```bash
   aws acm request-certificate --domain-name aetern.dev \
     --validation-method DNS --region us-east-1 --profile <perfil>
   ```
3. En `terraform.tfvars`: setea `domain_name = "aetern.dev"` y
   `acm_certificate_arn = "arn:aws:acm:us-east-1:...:certificate/..."`, y
   `terraform apply`.
4. En tu registrador, apunta `aetern.dev` (CNAME/ALIAS) al dominio de CloudFront
   (`terraform output cloudfront_domain`).

Mientras tanto, el sitio vive en el dominio de CloudFront (HTTPS incluido).

---

## 7. Destruir todo (sin costos residuales)

```bash
cd deploy/terraform
terraform destroy
```
Borra CloudFront, **ambos buckets** (tienen `force_destroy`, no fallan por estar
llenos), la Lambda, la identidad SES y el budget. Deja la cuenta en **$0**.

> Si algún día `destroy` se queja por el bucket lleno, es porque cambiaste
> `force_destroy`; vacíalo con `aws s3 rm s3://<bucket> --recursive` y reintenta.

---

## 8. Nota de seguridad: IAM vs root

**No uses las llaves de root** para deployar (ni para nada programático). Root no
se puede acotar: si la llave se filtra, es la cuenta entera. Para la cuenta real
de AETERN, crea un usuario IAM con permisos y usa ESE perfil:

```bash
# Con root, UNA sola vez, crea el usuario de deploy:
aws iam create-user --user-name aetern-deployer
aws iam create-access-key --user-name aetern-deployer   # guarda estas llaves
# Permisos: para simplificar al inicio puedes adjuntar PowerUserAccess;
# lo estricto es una policy con S3 + CloudFront + Lambda + IAM(limitado) + SES + Budgets.
aws iam attach-user-policy --user-name aetern-deployer \
  --policy-arn arn:aws:iam::aws:policy/PowerUserAccess
# Configura el perfil y úsalo en terraform.tfvars (aws_profile):
aws configure --profile aetern
```
Luego activa MFA en root y **guarda las llaves de root bajo llave** (no en un
perfil de la CLI).

---

## 9. Estructura de este directorio

```
deploy/
├── deploy.sh                 # build + sync a S3 + invalidación (el "deploy de contenido")
├── form/handler.py           # Lambda del formulario (S3 + SES)
├── README.md                 # este archivo
└── terraform/
    ├── main.tf               # provider + composición de módulos
    ├── variables.tf          # aws_profile, dominio, notify_email, budget…
    ├── outputs.tf            # site_url, form_endpoint, comandos útiles
    ├── terraform.tfvars      # tus valores (gitignored)
    └── modules/
        ├── site/             # S3 privado + CloudFront (OAC) + rewrite + dominio opcional
        ├── form/             # Lambda + Function URL + S3 mensajes + IAM + SES
        └── budget/           # alerta de costos
```

## 10. Comandos rápidos

| Acción | Comando |
|---|---|
| Levantar/actualizar infra | `terraform -chdir=deploy/terraform apply` |
| Deploy de contenido | `cd deploy && ./deploy.sh <perfil>` |
| Ver la URL | `terraform -chdir=deploy/terraform output site_url` |
| Leer mensajes | `terraform -chdir=deploy/terraform output cmd_leer_mensajes` |
| Invalidar cache | `terraform -chdir=deploy/terraform output cmd_invalidar_cache` |
| Destruir todo | `terraform -chdir=deploy/terraform destroy` |
