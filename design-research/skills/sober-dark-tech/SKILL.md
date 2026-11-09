---
name: design-sober-dark-tech
description: Estética dark-tech sobria (tinta profunda + UN acento neón contenido, monospace, jerarquía SaaS limpia) para landings de software factory que deben transmitir calma, confianza y largoplacismo. Invócala al diseñar o re-tematizar una landing/portfolio oscura con acento único y voz técnica pero serena.
---

# Sober Dark-Tech — tinta profunda, un solo neón, calma de ingeniería

Lenguaje de diseño destilado de `devstarter` (Zippystarter: Next 16 + shadcn "new-york" + Tailwind v4, Apache-2.0). Es la base dark+neón "segura". El repo original tira hacia lo teatral (HUD falso, pings, copy en MAYÚSCULAS con guion_bajo); esta skill captura su esqueleto sólido y documenta cómo bajarlo a un registro **sobrio** para una software factory. Recrea el lenguaje, no copies el código.

---

## Identidad / vibe
- **Concepto**: terminal de ingeniería en reposo. Oscuro, preciso, monoespaciado, con un único color vivo que marca lo accionable. Nada brilla salvo lo que importa.
- **Objetivo de marca (software factory)**: calma, confianza, largoplacismo. El diseño debe leerse como "sabemos lo que hacemos", no como "mira cuántos efectos tenemos".
- **Palancas del vibe**: fondo tinta (no negro puro), tipografía monospace para lo técnico, cero degradados ruidosos, bordes finos de 1px, mucho aire, MAYÚSCULA solo en etiquetas cortas.
- **Tensión a gestionar**: el original coquetea con estética "hacker/cyberpunk" (SYSTEM ONLINE, TRANSMISSIONS, telemetría falsa). Para una factory seria eso resta credibilidad — ver sección "Cómo bajarlo a SOBRIO".

## Paleta de color
Sistema **shadcn con tokens semánticos en OKLCH** (no hex crudos). Un `:root` claro y un `.dark` oscuro; el modo protagonista es **dark**. El truco de sobriedad es que **casi todo es neutro con tinte violeta-azul (hue 286) y el acento es un único verde-lima neón (hue 120)**. Hex = aproximaciones del OKLCH del repo (la fuente de verdad es OKLCH; consérvalo).

**Modo oscuro (protagonista)**
| Token | OKLCH (exacto del repo) | ~hex | Uso |
|---|---|---|---|
| `--background` | `oklch(0.1 0.01 286)` | `#050509` | Fondo tinta, ligero tinte violeta. NO negro puro. |
| `--card` / `--popover` | `oklch(0.12 0.01 286)` | `#0a0a0f` | Superficies elevadas, un pelo más claras que el fondo. |
| `--secondary` / `--muted` | `oklch(0.2 0.02 286)` | `#15151f` | Chips, barras de fondo, bloques atenuados. |
| `--accent` | `oklch(0.25 0.02 286)` | `#21202b` | Hover neutro (NO neón). |
| `--border` / `--input` | `oklch(0.25 0.02 286)` | `#21202b` | Bordes finos de 1px, hairlines. |
| `--foreground` | `oklch(0.98 0 0)` | `#f8f8f8` | Texto principal casi-blanco. |
| `--muted-foreground` | `oklch(0.6 0.01 286)` | `#7f7f86` | Texto secundario, labels mono. |
| `--primary` (ACENTO) | `oklch(0.88 0.2 120)` | `#c8e928` | **El único neón**: verde-lima/chartreuse. CTAs, focus ring, links activos, 1 dato clave. |
| `--primary-foreground` | `oklch(0.1 0.02 286)` | `#030308` | Tinta oscura SOBRE el neón (texto de botón). |
| `--ring` | `oklch(0.88 0.2 120)` | `#c8e928` | Foco = mismo neón. |
| `--destructive` | `oklch(0.6 0.2 20)` | `#de394b` | Rojo, solo errores. |

**Modo claro** (secundario): `--background: oklch(0.98 0 0)` (casi blanco), `--foreground: oklch(0.1 0.01 286)`, y el acento baja a `--primary: oklch(0.6 0.2 120)` (~`#738e00`, verde oliva) para contraste sobre blanco. Los charts (`--chart-1..5`) son una **rampa monocroma del acento** (hue 120, chroma decreciente 0.2→0.02): dataviz que no introduce colores nuevos.

**Regla de oro del acento**: hue 120, y **un solo color vivo en toda la página**. Todo lo demás es neutro tinta.

## Tipografía
Dos familias vía `next/font/google`, expuestas como tokens en el bloque `@theme` de Tailwind v4:
- **Sans / body**: `Space_Grotesk` → `--font-sans: "Space Grotesk"`. Peso 400, tracking normal. Cuerpo, párrafos.
- **Mono**: `JetBrains_Mono` → `--font-mono: "JetBrains Mono"`. Etiquetas, badges, tags, metadatos, fechas, nav, el brand. La monospace es la firma "ingeniería".
- **Display**: el repo define `--font-display-family: var(--font-inter-tight)` **pero Inter Tight NUNCA se importa** → la variable no existe y `font-display` cae de vuelta a Space Grotesk. En la práctica los titulares grandes = **Space Grotesk 700 con `tracking-tighter`** (el token `--font-display-weight: 700`, `--font-display-tracking: var(--tracking-tighter)`). Si quieres un display real, importa Inter Tight (o similar geométrica apretada) y define la var; si no, asume Space Grotesk bold apretado.
- **Utilidades** definidas: `font-display` (family+weight+tracking display) y `font-body`. Radios escalados desde `--radius: 0.5rem` (`sm` = -4px, `md` = -2px, `lg` = base, `xl` = +4px).
- **Escala de titulares** (del uso real): hero `text-6xl md:text-8xl` con `leading-[0.9]`; H2 de sección `text-4xl md:text-6xl`; H3 `text-2xl`; labels/meta `text-xs` mono. Titulares apretados (`tracking-tighter`), a veces en varias líneas cortas y en MAYÚSCULA.

## Layout y espaciado
- **Contenedor**: `max-w-7xl mx-auto`, centrado. Componente `Container` con `wrapperClassName` (banda full-bleed, borde/fondo) + clase interior (contenido).
- **Márgenes seguros**: tokens `--m`/`--g` = `spacing(4)` (16px), subiendo a `spacing(8)` en `lg`; utilidad `px-safe` que respeta `env(safe-area-inset-*)`. Todo el contenido usa padding lateral seguro.
- **Ritmo vertical**: secciones a `py-24`, cada una separada por `border-t border-border` (hairline, no fondos alternos fuertes). Alguna sección con `bg-secondary/20` o `bg-card` muy sutil para variar sin gritar.
- **Grids**: CSS Grid moderno — `grid-cols-12` para asimetrías (4/8), `auto-fit minmax()` para tarjetas fluidas, y **subgrid** (`grid-rows-subgrid`) para alinear filas de tarjetas. Nav fijo `h-16` con `backdrop-blur-md` y fondo `bg-background/80`.
- **Densidad**: generosa. Aire alrededor de titulares grandes; los bloques técnicos (badges, listas mono) son compactos pero con `gap` claro.

## Componentes
Base shadcn "new-york", personalizada:
- **Button** (cva): `default` = `bg-primary text-primary-foreground hover:bg-primary/90` (el neón sólido), `outline`, `secondary`, `ghost`, `link`. Tamaños `sm/default/lg/icon`. Radio `rounded-md`. Foco = anillo de 3px con el ring neón. En el original se usa a menudo `variant="outline"` con `border-primary/50 hover:bg-primary/10` (botón fantasma con toque neón).
- **Card**: `bg-card border rounded-xl` por defecto, PERO en la página se sobrescribe a **`rounded-none`** (esquinas vivas, industrial) con `hover:border-primary/50`. Subgrid para alinear header/content/footer entre tarjetas. Título en `font-display`.
- **Badge / tags**: `rounded-full border px-2 py-0.5 text-xs`, variante `secondary` + `font-mono`. Se usan para stack tecnológico.
- **Input / Textarea**: `rounded-md border-input bg-transparent`, foco con ring neón de 3px. Labels encima en `text-xs font-mono text-muted-foreground` MAYÚSCULA.
- **Separadores**: hairlines `h-[1px] w-full bg-border` que en hover pasan a `bg-primary/50`.

**Decoraciones "tech" (inventario — señaladas para moderar):**
1. **Corner brackets**: 4 divs absolutos en las esquinas de un panel (`border-t-2 border-l-2 border-primary`) formando marco HUD.
2. **Panel de telemetría falsa**: bloque `font-mono` con `SYS.STATUS: NORMAL`, `UPTIME 99.9%`, barras `CPU_LOAD 75%` / `MEM_USAGE 42%`, contador `03 ACTIVE_PROJECTS`. Datos inventados.
3. **Ping animado**: punto con `animate-ping` dentro del badge "SYSTEM ONLINE // AVAILABLE FOR HIRE".
4. **Barras de progreso** decorativas (`h-1 bg-secondary` con relleno `bg-primary w-[75%]`) y barritas de skill que se vuelven neón en hover.
5. **Underscore neón** en el brand (`Marcus<span text-primary>_</span>Chen`) y sufijos `DEV_`, `TECH_STACK`, `INITIATE_CONTACT`.
6. **Texto con degradado clip** en el hero (`bg-clip-text from-primary to-foreground`).
7. **Imágenes** en `grayscale mix-blend-luminosity` sobre fondo neón (`bg-primary`), con `mix-blend-color-dodge` en el hero-bg tintado de neón.

## Motion / animación
- **Mínimo y funcional**. `transition-colors` / `transition-all duration-300` en hovers (borde, texto → neón). `scroll-smooth` global.
- Imágenes: fade-in al cargar (`opacity` 500ms) + `group-hover:scale-105` sutil.
- El único movimiento autónomo (no provocado por el usuario) es el `animate-ping` del punto — es justo el que rompe la calma. Regla sobria: **sin loops autónomos**; la animación solo responde a interacción (hover/focus) y dura ≤300ms.

## Anatomía de secciones
Orden del one-pager (portfolio, fácil de mapear a software factory):
1. **Nav fijo**: brand mono a la izquierda, links centro (`text-muted-foreground hover:text-primary`), CTA outline a la derecha. `backdrop-blur`, hairline inferior.
2. **Hero**: grid 2 col — izquierda: badge de estado + H1 gigante en display MAYÚSCULA multi-línea + párrafo `muted-foreground` + CTA neón con flecha + iconos sociales ghost. Derecha: panel decorativo (en la factory → aquí va prueba social / diagrama sobrio). Fondo con imagen tenue + gradiente a `background`.
3. **Selected Works / Proyectos**: header con H2 + subrayado neón corto (`h-1 w-24 bg-primary`) + descripción; grid de tarjetas `auto-fit` con imagen, título, tags mono, descripción, footer de enlaces.
4. **Tech Stack / Capacidades**: grid 4/8 — iconos en celdas cuadradas con hover a borde neón + columnas de listas mono con barrita.
5. **Blog / Logs**: lista de posts con título display, meta mono (`fecha // tiempo`), hairline que se ilumina en hover.
6. **Contacto**: formulario centrado `max-w-2xl`, labels mono MAYÚSCULA, CTA full-width.
7. **Footer**: copyright mono + links mono, hairline superior.

Mapa a software factory: Hero → propuesta de valor · Selected Works → casos/clientes · Tech Stack → capacidades/servicios · Logs → notas de ingeniería · Contacto → "hablemos".

## Iconografía
- **lucide-react**, línea fina, tamaño `size-4`/`h-5 w-5`, color `text-primary` para acento o hereda `muted-foreground`.
- Set usado: `Terminal, Code2, Cpu, Database, Github, Linkedin, Mail, ExternalLink, ArrowRight`. Vocabulario de ingeniería, no de marketing. Un icono por concepto, nunca decorativo en masa.

## Voz / copy
- **Original (teatral)**: MAYÚSCULAS + `guion_bajo` + jerga sci-fi. "SYSTEM ONLINE // AVAILABLE FOR HIRE", "Architecting digital voids", "SEND TRANSMISSION", "INITIATE_CONTACT", "Transmissions", "Logs", "discuss the singularity". Suena a portfolio hacker.
- **Estructura útil de conservar**: etiquetas cortas en MAYÚSCULA mono, separador `//`, verbos técnicos, densidad baja de adjetivos.
- **Registro sobrio para factory**: mantén la concisión mono y el `//` como separador ocasional, pero **quita la jerga sci-fi y el guion_bajo decorativo**. "Disponible para proyectos" en vez de "SYSTEM ONLINE". "Trabajo seleccionado" en vez de "SELECTED WORKS //". "Contacto" en vez de "INITIATE_CONTACT". Habla de resultados, fiabilidad y mantenimiento a largo plazo.

## Cómo bajarlo a SOBRIO (qué quitar/moderar)
Aplica estas reglas para pasar de "cyberpunk teatral" a "ingeniería serena":

**Quitar por completo**
- El **panel de telemetría falsa** (SYS.STATUS/UPTIME/CPU_LOAD/MEM_USAGE): datos inventados = pérdida de confianza. Sustituir por métricas reales (años, proyectos entregados, uptime real de clientes) o por un diagrama/logo-wall sobrio.
- El **`animate-ping`**: nada debe parpadear solo. Punto estático o quítalo.
- Los **corner brackets** HUD de las esquinas.
- El **texto con degradado clip** del hero (`bg-clip-text from-primary`).

**Moderar (mantener el hueso, bajar el volumen)**
- **Copy**: sentence case en vez de MAYÚSCULA gritada; elimina los `guion_bajo` decorativos y la jerga sci-fi (ver Voz). MAYÚSCULA solo en micro-labels mono.
- **Barras de progreso / skill bars**: quítalas o hazlas neutras (`bg-border`), sin relleno neón animado en hover.
- **Imágenes**: si el `grayscale + mix-blend` sobre neón se ve estridente, usa grayscale suave o color natural atenuado; evita el tinte neón sobre el hero-bg.
- **Hover neón masivo**: muchos elementos pasan a `text-primary`/`border-primary` en hover. Reserva el neón para lo accionable; para hovers neutros usa `hover:text-foreground` o `hover:border-border` más claro.

**Bajar la intensidad del acento**
- El neón del repo es muy vivo: `oklch(0.88 0.2 120)`. Para calmarlo sin cambiar de color, **baja el chroma** (p. ej. `0.88 0.14 120`) y/o la L, o simplemente **reduce su superficie**: un solo CTA sólido por vista + focus ring; el resto del "acento" en `muted-foreground`.
- Usa el neón en **tintes** (`primary/5`, `primary/10`, `primary/30`) para fondos y bordes; sólido al 100% solo en el CTA principal y el ring de foco.
- Presupuesto: **≤1 elemento neón sólido por sección**, resto neutro. Si dudas, quita neón.

## Do / Don't
**Do**
- Fondo tinta con tinte (hue 286), no `#000`.
- Un único acento (hue 120) reservado a CTA + foco + 1 dato clave.
- Monospace para todo lo técnico (labels, tags, meta, nav, brand).
- Hairlines de 1px y `border-t` para separar secciones; mucho aire.
- Titulares display apretados (`tracking-tighter`), jerarquía clara de SaaS.
- Motion solo en interacción, ≤300ms.

**Don't**
- No metas un segundo color vivo (rompe la firma monocroma-neón).
- No datos/telemetría falsos ni contadores inventados.
- No animaciones autónomas (ping, loops, marquesinas).
- No MAYÚSCULAS + `guion_bajo` + jerga sci-fi como voz de marca.
- No degradados clip ni glows/box-shadows neón intensos.
- No saturar hovers en neón por toda la página.

## Prompt listo para usar
> Diseña una landing one-page para una **software factory** con estética **dark-tech sobria**: transmite calma, confianza y largoplacismo (ingeniería seria en reposo).
>
> **Sistema de color (tokens shadcn en OKLCH, modo oscuro protagonista):** fondo tinta profunda con leve tinte violeta-azul, NO negro puro — `--background: oklch(0.1 0.01 286)`, `--card: oklch(0.12 0.01 286)`, `--secondary/--muted: oklch(0.2 0.02 286)`, `--border: oklch(0.25 0.02 286)`, texto `--foreground: oklch(0.98 0 0)`, secundario `--muted-foreground: oklch(0.6 0.01 286)`. **UN SOLO acento neón** verde-lima (hue 120) contenido: `--primary: oklch(0.85 0.14 120)` (chroma bajado para calmarlo) usado solo en el CTA principal, el focus ring y como máximo un dato destacado; el resto en tintes `primary/10`–`primary/30`. Rampa de charts monocroma del mismo hue. `--radius: 0.5rem`.
>
> **Tipografía:** monospace (JetBrains Mono) para labels, tags, metadatos, nav y logotipo; sans geométrica (Space Grotesk) para cuerpo; titulares en la sans a peso 700 con `tracking-tighter` (display apretado). Escala tipo SaaS: hero enorme, H2 grande, micro-labels mono en `text-xs`.
>
> **Layout:** `max-w-7xl` centrado con padding seguro; secciones a `py-24` separadas por hairlines de 1px (`border-t`); CSS Grid moderno (12-col asimétrico, `auto-fit`, subgrid); nav fijo con `backdrop-blur`. Mucho aire.
>
> **Secciones:** nav (brand mono + links + CTA outline) · hero (label de estado sobrio + H1 grande + valor claro + CTA neón + prueba social real, sin HUD) · trabajo/casos (tarjetas de esquina viva con tags mono) · capacidades/servicios (grid de iconos lucide + listas mono) · notas de ingeniería (lista con hairlines) · contacto (form con labels mono) · footer mono.
>
> **Motion:** mínimo, solo en hover/focus, ≤300ms. Sin animaciones autónomas.
>
> **Voz:** técnica pero serena, sentence case, concisa; separador `//` ocasional en metadatos. Habla de fiabilidad, entrega y mantenimiento a largo plazo.
>
> **NO incluir** (evita el registro teatral): paneles de telemetría/uptime falsos, contadores inventados, corner-brackets HUD, puntos con `animate-ping`, texto con degradado clip, MAYÚSCULAS + `guion_bajo` + jerga sci-fi, glows/box-shadows neón, segundo color vivo. Reserva el neón; si dudas, quítalo.
>
> **Re-tematización opcional** (mantén toda la estructura, cambia solo el token de acento y los neutros):
> - *Tokyo Night*: neutros azul-noche (fondo ~`#1a1b26`, superficies `#24283b`), acento único violeta/cian (`#7aa2f7` o `#7dcfff`).
> - *Nord*: neutros gris-azulados fríos (`#2e3440`→`#3b4252`), acento único `frost` azul `#88c0d0` (evita usar varios nord a la vez).
> - *Toque japonés*: neutros sumi (tinta) cálidos, un acento bermellón contenido (`#c0392b`/`shu-iro`) en vez del neón; más aire (ma), hairlines aún más finas, tipografía sans más ligera. Mantén la regla de un solo acento.
