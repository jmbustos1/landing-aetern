# 🪜 Mapa mental y regla de escalado

> Documento de referencia para consultar **cada vez que aparece un cliente nuevo**.
> Responde: ¿qué stack uso? ¿en qué nivel está este proyecto? ¿qué cambia cuando crece?

---

## La idea que ordena todo

**Front y backend evolucionan en DOS ejes independientes:**

- **Eje FRONT** → *cómo se renderiza*: estático ⟶ (opcional) SSR.
- **Eje BACKEND** → *qué lógica corre detrás*: nada ⟶ Functions TS ⟶ servicio Go.

Se tocan en **un solo punto: la costura de API** (`api.tudominio.com`).
Por eso, cuando aparece el backend, **el front casi no muta — solo cambia a qué URL le habla.**

**Stack único de base:** `Next.js + SST + AWS`. No hay ningún escalón donde tires todo y empieces de cero.

---

## La escalera

```
NIVEL 0 — Landing (punto de partida por defecto)
  Front:    Next output:export → S3+CloudFront   [ESTÁTICO]
  Backend:  ninguno
  ¿Front muta?  —
────────────────────────────────────────────────────────────
NIVEL 1 — Landing + formulario
  Front:    Next output:export → S3+CloudFront   [ESTÁTICO — NO muta]
  Backend:  1 × sst.aws.Function (TS) + SES   (o tercero tipo Web3Forms)
  ¿Front muta?  ❌ NO. El form solo hace un POST a un endpoint.
                El HTML sigue siendo el mismo sitio estático.
────────────────────────────────────────────────────────────
NIVEL 2 — Mercado Pago / contenido dinámico
  Front:    estático  O  SSR  ← depende SOLO del front, no del pago
  Backend:  sst.aws.Function (TS) para webhooks de pago
  ¿Front muta?  🟡 DEPENDE. Solo muta a SSR si el front necesita
                render server-side (SEO de contenido dinámico,
                páginas por-request). El webhook de pago NO obliga
                a mutar el front — vive 100% en el backend.
────────────────────────────────────────────────────────────
NIVEL 3 — Producto completo   ◄◄◄ AQUÍ APARECE EL BACKEND GO
  Front:    Next SSR (sst.aws.Nextjs)  —o sigue estático + fetch
  Backend:  ★ SERVICIO GO en contenedor → sst.aws.Service (Fargate + ALB)
            + RDS Postgres/Dynamo, Cognito (auth), Cron, Queue
            (la lógica de dominio migra de Functions-TS → Go)
  ¿Front muta?  ❌ NO por culpa de Go. Lo ÚNICO que cambia en el
                front es la URL: de la function-url → api.tudominio.com.
                La mutación estático→SSR (si ocurre) es por el front
                mismo, en un eje aparte.
────────────────────────────────────────────────────────────
NIVEL 4 — Escala pesada (websockets, cómputo largo)
  Front:    igual que Nivel 3
  Backend:  el mismo Go en Fargate, ya solo escalas (más tasks,
            workers, websockets) — sigue dentro de SST
  ¿Front muta?  ❌ NO.
```

---

## ¿Dónde aparece el backend Go?

En el **Nivel 3 (producto completo)**, típicamente.

Antes de eso, lo poco de "backend" que hay (el form, un webhook) son 1-2 `sst.aws.Function`
en TypeScript — no ameritan un servicio Go. El Go entra cuando la lógica de dominio se vuelve
*de verdad*: auth propia, reglas de negocio, APIs con estado, jobs.

> Podrías meter Go antes, pero sería sobreingeniería. **Recomendado: Nivel 3.**

---

## ¿Cómo muta el front cuando aparece el backend?

**Prácticamente no muta.** Lo único que cambia en el front es:

1. El **string de la URL** a la que le pega → `api.tudominio.com`.
2. El manejo de **auth** (mandar un token en el header).

Eso es un cambio de configuración / cliente HTTP, **no una reescritura.**

La **única mutación real del front** en toda la escalera es **estático → SSR**, y ocurre
por razones del *propio front* (SEO o personalización), **no por la llegada del backend Go.**
Es válido tener un backend Go robusto (Nivel 3-4) con un front que sigue siendo **estático**
y le pega al Go por fetch desde el navegador.

---

## Cómo deployar el backend Go (dos opciones válidas)

**Opción 1 — Bajo SST (Fargate), un solo deploy:**
Go como contenedor en ECS Fargate definido en el mismo `sst.config.ts`. Un solo `sst deploy`
levanta frontend + backend Go + DB. Máxima unificación: una sola herramienta de infra.
> Nota: SST trata a TypeScript como ciudadano de primera para Lambda; Go no tanto. Por eso el
> camino limpio no es "Go en Lambda vía SST", sino **contenedor de Go en Fargate vía SST**.

**Opción 2 — Patrón Go propio (separado):**
Frontend en SST; backend Go con flujo propio (Docker → ECR → ECS/Fargate, o EC2+CodeDeploy).
Dos deploys, separados por servicio. Reusas patrones ya dominados.

**Recomendación:** para un backend Go con tráfico estable → **contenedor en ECS Fargate detrás
de un ALB** (estándar de industria, sin cold starts, soporta websockets/conexiones largas).
Go-en-Lambda resérvalo para cosas event-driven o APIs con tráfico muy irregular.

---

## El conteo honesto de stacks (de landing a producto con Go)

- **1 nube:** AWS.
- **1 patrón de infra dominante:** SST (opcionalmente un 2º carril Go propio, si se prefiere).
- **2 lenguajes:** TS (web/edge) + Go (backend) — deliberado, porque Go es mejor para el
  backend, no porque el stack falle.
- **1 costura clave que dominar:** la frontera de API entre frontend y backend (`api.*`,
  CORS, auth por token).

Nada obliga a reescribir la landing ni a cambiar de nube en ningún escalón.

---

## ✅ Checklist: cuando aparece un cliente nuevo

1. **¿En qué nivel nace el proyecto?** (casi siempre 0 o 1)
2. **¿Necesita SSR de entrada?** Si es marketing/contenido → NO, arranca estático.
3. **¿Tiene formulario/email?** → Nivel 1: `sst.aws.Function` + SES o Web3Forms.
4. **¿Pagos o contenido dinámico?** → Nivel 2: Functions para webhooks; SSR solo si el front
   lo pide por SEO.
5. **¿Lógica de dominio de verdad (auth, DB, APIs, jobs)?** → Nivel 3: entra backend Go +
   RDS/Dynamo + Cognito.
6. **Deja SIEMPRE la costura de API lista desde el día 1:** base-URL de la API en una variable
   de entorno del front. Así subir de nivel = cambiar un valor, no reescribir.

---

## Regla de oro

> **No sobre-construyas por adelantado.** Arranca cada proyecto en el nivel mínimo que resuelve
> el problema de hoy, con la costura de API preparada. La escalera garantiza que subir de nivel
> nunca implica tirar lo anterior — solo agregar componentes al mismo `sst.config.ts`.
