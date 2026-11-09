# AETERN — Software Manufacturing

Landing de **AETERN**, una software factory. En producción: **https://aetern.dev**

Software que perdura. Con calma, precisión y visión a largo plazo.

## Estructura

```
site/                  El producto: la landing (Next.js) + su infraestructura
├── app/               Next.js (App Router, export estático)
├── public/            Assets, PDFs de cotización, og.png
├── scripts/           Generadores (PDFs de cotización, imagen OG)
└── deploy/            Terraform (S3 + CloudFront + Lambda + SES) + deploy.sh

brand/                 Firma de correo y assets de marca
docs/                  ESTRATEGIA-ESCALADO.md · DISENO-AETERN.md (cómo se diseñó la página)
design-research/       Exploración de skills de diseño (research, NO el producto)
```

## Correr en local

```bash
cd site
npm install
npm run dev          # http://localhost:3000
```

## Deploy (AWS, Terraform)

Sitio estático en **S3 + CloudFront (HTTPS)** + formulario en **Lambda → S3 + SES**.

```bash
cd site/deploy/terraform
cp terraform.tfvars.example terraform.tfvars    # editar perfil AWS / emails
terraform init && terraform apply               # crea/actualiza la infra

cd .. && ./deploy.sh <aws_profile>              # build + sync a S3 + invalida CloudFront
```

Apagar todo (sin costos residuales): `terraform destroy` → $0.
Guía completa en [`site/deploy/README.md`](site/deploy/README.md).

## Regenerar artefactos

```bash
pip install fpdf2 pillow
python3 site/scripts/gen_cotizaciones.py    # los 8 PDFs de cotización → site/public/
python3 site/scripts/gen_og.py              # la imagen OG (preview de WhatsApp/LinkedIn)
```

## Docs

- [`docs/DISENO-AETERN.md`](docs/DISENO-AETERN.md) — el lenguaje de diseño de la página (paleta, tipografía, layout, motion).
- [`docs/ESTRATEGIA-ESCALADO.md`](docs/ESTRATEGIA-ESCALADO.md) — la escalera de stack (Nivel 0 landing → producto con backend Go).
