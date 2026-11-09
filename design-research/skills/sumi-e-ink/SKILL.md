---
name: design-sumi-e-ink
description: Estética sumi-e / tinta japonesa 100% token-driven (papel washi, tinta sumi, sello bermellón, trazos de pincel) con un fondo de tinta generativo que "respira". Invócala para landings de software factory que deben transmitir calma, permanencia y confianza de largo plazo — la CAPA de tradición. Soporta versión clara (papel) e invertida oscura (papel-oscuro/tinta-clara), con un acento tech mínimo y sobrio.
---

# Sumi-e Ink — papel, tinta y sello: la capa de permanencia

Síntesis del lenguaje de diseño de tres referencias:
- **goguma-web** — landing Astro sumi-e/wabi-sabi, 100% token-driven (`tokens.json` → Tailwind + CSS vars). Aporta la paleta canónica, la disciplina de UN token = UN cambio, y la anatomía de secciones.
- **xiaoer** — design-kit japonés (CC-BY-4.0, metodología reutilizable citando la fuente). Aporta el método: gramática SVG "un solo cuaderno", regla de color 1+4+1, tres voces tipográficas, motion como respiración, copy poético.
- **ink-field** — estudio sumi-e generativo "vivo": tinta vertida sobre papel-hueso que deriva por un campo de ruido con semilla. Aporta el elemento que **respira** (el fondo de partículas de tinta).

> La estética objetivo es **monocroma de tinta** (papel + sumi + un solo bermellón). De xiaoer tomamos el *método*, no su paleta pastel: donde xiaoer rellena con pasteles, aquí se rellena con **lavados de tinta translúcida**.

---

## Identidad / vibe

- Producto emocional: **tradición, papel y tinta**. Silencio, no ruido. Permanencia, no novedad.
- Estética: tinta china de Asia oriental (水墨 / 墨絵) + wabi-sabi (侘寂) japonés. Pocos trazos, seguros, poéticos.
- Sensación: quieta, con mucho vacío respirable (余白 *yohaku* / 間 *ma*), como un rollo colgado en una sala de té.
- Para una software factory: comunica **oficio, calma y confianza de largo plazo**. "Llevamos años haciendo esto bien y seguiremos aquí". El condimento tech es MUY sobrio (monoespaciada + campo de tinta code-driven), nunca neón/gradientes/glassmorphism.
- Evitar: colores chillones, gradientes saturados, stock corporativo, sombras pesadas, animaciones que gritan, CTAs pulsantes.

---

## Paleta de color (clara + variante oscura)

Convergen goguma e ink-field casi en el mismo sitio. Se elige **goguma como canon** (es la landing explícitamente token-driven) y se adopta el **ember/clay de ink-field** para las brasas vivas del fondo generativo. Regla estructural heredada de xiaoer: **1 neutro + gradiente de tinta + 1 acento** (aquí, versión monocroma del 1+4+1).

### Clara (papel) — canónica

| Token | Hex | Rol |
|-------|-----|-----|
| `paper` | `#F2ECE0` | Fondo — papel washi crema |
| `paper-deep` | `#E7DCC3` | Segunda superficie / hover / bandas |
| `ink` | `#2B2B28` | Tinta sumi — texto principal, trazos |
| `ink-strong` | `#1B1712` | Tinta profunda — trazos SVG y partículas del fondo (nunca `#000`) |
| `ink-soft` | `#6B645B` | Tinta diluida — subtítulos, captions, divisores |
| `line` | `rgba(27,23,18,.16)` | Hairlines, bordes finos, tracks de slider |
| `accent` / `seal` | `#9C3B2E` | **Sello bermellón (朱砂)** — el único acento. Sello, subrayado, ola seigaiha, foco |
| `ember` | `#BD5A34` | Brasa/clay más cálida — solo para las chispas "vivas" del fondo generativo |

> Regla de oro (de goguma): **un solo color de acento**. Cambia `accent` y cambian TODOS los énfasis. El `ember` es un pariente cálido reservado a las partículas del fondo, no a la UI.

### Oscura (papel-oscuro / tinta-clara) — inversión derivada

Ninguna referencia envía dark mode (ink-field es `color-scheme: light`). Esta variante se **deriva invirtiendo los propios tokens claros** — no se inventan colores nuevos, se reasignan roles.

| Token | Hex | Rol |
|-------|-----|-----|
| `paper` | `#17130E` | Fondo — sumi casi negro (papel entintado) |
| `paper-deep` | `#211B14` | Segunda superficie / bandas |
| `ink` | `#ECE3D2` | "Tinta" clara — texto principal sobre oscuro |
| `ink-strong` | `#F2ECE0` | Trazos y partículas claras (el papel se vuelve tinta) |
| `ink-soft` | `#A79E8D` | Texto diluido |
| `line` | `rgba(242,236,224,.14)` | Hairlines |
| `accent` / `seal` | `#C2503A` | Bermellón ligeramente aclarado para mantener contraste AA |
| `ember` | `#D9714A` | Brasa viva sobre fondo oscuro |

> En oscuro el fondo generativo se invierte: partículas **claras** (`ink-strong`) sobre `paper` oscuro, con el mismo "susurro de papel" repintado cada frame (`rgba(paper, .006)`).

---

## Tipografía

Se adopta la disciplina de **tres voces con un trabajo cada una** (xiaoer), pero se sustituye la cursiva juguetona por una **monoespaciada** que aporta el condimento tech sobrio (idea del `seed 0000` de ink-field). Nunca una 4ª voz.

| Voz | Familia | Trabajo | Se usa en | NUNCA en |
|-----|---------|---------|-----------|----------|
| **Serif** (tradición/permanencia) | `"Noto Serif JP", "Noto Serif KR", Georgia, serif` | "esto es curado, perdura" | Display, H1–H3, marca, sello CJK | body, metadata |
| **Sans** (claridad) | `"Noto Sans JP", system-ui, -apple-system, sans-serif` | "entrega la información sin ego" | body, nav, botones, captions | headlines, sello |
| **Mono** (chispa tech) | `ui-monospace, "SF Mono", Menlo, monospace` | "señal de máquina, sobria" | versión/seed/commit, labels técnicos, código | titulares, párrafos |

Fallbacks CJK: añade `"PingFang SC", "Hiragino Kaku Gothic ProN"` a la sans.

Escala y ritmo (síntesis goguma + xiaoer):
- Display / H1: `clamp(56px, 8vw, 116px)`, serif, `line-height: .96`, weight 900/black.
- Sello CJK (甘 / 道 / 匠): serif, ~64px.
- H2 sección: `clamp(28px, 4vw, 42px)`, serif 600.
- Eyebrow / caption: 12–13px sans, `text-transform: uppercase`, `letter-spacing: 0.30–0.34em`, en `accent`.
- Body: 15–17px sans 300–400, `line-height: 1.8–1.9` (nunca por debajo de 1.7).
- Entre párrafos: 28px. Ancho de medida: ~30–46ch.
- Mono technical label: 11–12px, `letter-spacing: .04em`, en `ink-soft`.

---

## Sistema de tokens

**Fuente única de verdad = `tokens.json`.** Todo componente lee de ahí; nada hardcodea color. Re-tematizar = editar UN token y reconstruir (flujo goguma: describe el cambio → edita 1 línea → build → revisa el diff de 1 línea).

```jsonc
// tokens.json (semántico, agnóstico de tema)
{
  "color": {
    "paper": "#F2ECE0", "paper_deep": "#E7DCC3",
    "ink": "#2B2B28", "ink_strong": "#1B1712", "ink_soft": "#6B645B",
    "accent": "#9C3B2E", "ember": "#BD5A34"
  },
  "brand": { "seal": "道", "latin": "STUDIO", "cjk": "工房" },
  "space": { "page_max": "1180px", "margin": "96px", "section_y": "96px", "gap": "30px" }
}
```

Dos formas de consumirlo (goguma usa ambas):
1. **Tailwind** — `tailwind.config` lee `tokens.json` con `readFileSync` y mapea a `theme.extend.colors` → `bg-paper`, `text-ink`, `text-accent`, etc.
2. **CSS variables** — se espejan en `:root` para efectos que necesitan el valor crudo (seigaiha, fondo generativo): `--paper`, `--ink`, `--accent`…

**Re-tematización clara → oscura**: mantén los mismos *nombres semánticos* y cambia solo los valores bajo `:root[data-theme="dark"]`. Los componentes no cambian; cambia el tema.

```css
:root { --paper:#F2ECE0; --ink:#2B2B28; --ink-strong:#1B1712; --ink-soft:#6B645B; --accent:#9C3B2E; --ember:#BD5A34; }
:root[data-theme="dark"] { --paper:#17130E; --ink:#ECE3D2; --ink-strong:#F2ECE0; --ink-soft:#A79E8D; --accent:#C2503A; --ember:#D9714A; }
```

---

## Layout y espaciado

- **Contenedor**: `max-width: 1180px`, centrado, padding horizontal `max(48px, 6vw)` (respira con el viewport).
- **Margen wabi-sabi**: 96px de aire — es el alma, no un desperdicio (yohaku 余白).
- **Padding de sección**: 96px vertical desktop / 64px mobile.
- **Gap de columnas**: 64px. Gap general: 30px. Entre párrafos: 28px.
- **Asimetría (principio del *ma*)**: en el hero, el sujeto pesa a la **derecha** y se deja vacío el **tercio izquierdo** para el texto (grid `[1fr_1.15fr]`). Nunca centres decoración en medio de una sección: ánclala a bordes/esquinas y déjala sangrar fuera del canvas.
- **> 50% de margen vertical vacío** por encima/debajo de los bloques de texto. La blancura crea la pausa; la densidad puntual da dónde aterrizar.

---

## Componentes

Todos con radios pequeños (`2–6px`, casi cuadrados — sensación de sello/papel), hairlines `border ink/10`, fondos `white/35–40` sobre papel, sin sombras pesadas.

- **Header**: sticky, `backdrop-blur`, fondo `paper/80`, hairline inferior. Wordmark serif con tracking ancho + separador `·` en `accent`. A la derecha, el **sello**: cuadradito `accent` con carácter CJK en serif (甘/道/匠).
- **Hero**: grid asimétrico (texto izq / obra der). Eyebrow en `accent` con tracking. H1 display + subtítulo CJK en `accent`. Dos CTAs: primario sólido `accent` sobre `paper`, secundario outline `ink/30` que vira a `accent` en hover.
- **Pilares (Why)**: 3 tarjetas; cada una abre con un **numeral CJK** (一 / 二 / 三) o kanji-ancla en `accent/50`, título serif, cuerpo `ink-soft`.
- **Trabajo/Productos**: grid de 3–4; miniatura circular o cuadrada, carácter/kanji centrado sobre `color-mix(accent 12%)`, título serif, meta en sans/mono.
- **Story**: 2 columnas (obra + texto), cita de cierre en `accent`.
- **CTA final**: bloque **invertido** — fondo `ink`, texto `paper`, botón `accent`. (Es el ancla de contraste de la página).
- **Botones**: `padding: 14px 28px`, radio 2px, tracking ligero. Hover **solo** `translateY(-2px)` o cambio de opacidad — nunca escala/pulso.
- **Divisores**: **nunca `<hr>`**. Usa banda **seigaiha** (青海波) o línea de puntos de tinta (ver abajo).

---

## Tinta y trazos (SVG + fondo generativo)

### A) Vocabulario SVG — "un solo pincel" (gramática de xiaoer, re-teñida a monocromo)

Los SVG decorativos no son iconos: son un **lenguaje**. Gramática obligatoria:

| Propiedad | Valor | Por qué |
|-----------|-------|---------|
| `stroke` | `var(--ink-strong)` (`#1B1712`) | nunca `#000` puro (leería a vector, no a tinta) |
| `stroke-width` | `1.2`–`2.5` | fino = detalle, grueso = primer plano |
| `stroke-linecap` | `round` | metáfora de la punta del pincel |
| comandos de path | mayormente `Q`/`C` (Bézier) | ondulación orgánica; evita `L` recto en siluetas |
| rotación | radianes irregulares (`0.12`, `-0.59`) | nunca `0`/`45°`/`90°` (se siente mecánico) |
| capas | paths superpuestos, opacidad `0.55–0.93` | profundidad tipo lavado |
| posición | bordes/esquinas, sangra fuera del canvas | ancla el ojo; nunca flotando en el centro |

**Adaptación sumi-e (clave)**: donde xiaoer rellena con pastel, aquí el relleno es **lavado de tinta translúcida** (`fill: rgba(27,23,18, .12–.5)`) o `fill:none` con trazo. Todo monocromo; el único color posible es un mínimo toque de `accent` en el sello.

Primitivos del vocabulario:
1. **Trazo único (一)** — un solo path `Q` grueso, con inicio/fin afilados (varía `stroke-width` o usa un path relleno en forma de hoja). El gesto confiado del pincel.
2. **Enso (円相)** — anillo abierto imperfecto: un `C`/`Q` que casi cierra, un extremo más seco (menor opacidad). Símbolo de plenitud/vacío.
3. **Sello (印)** — cuadrado `accent` con carácter CJK serif en `paper`; esquinas casi rectas (radio 3px). El único punto de color saturado.
4. **Banda seigaiha (青海波)** — olas de arcos concéntricos generadas por CSS (radial-gradients) en `--accent`, `opacity: .5`; divisor y pie de sección.
5. **Divisor de puntos de tinta** — fila de círculos de 1.5px en `ink-soft`/`accent` cada 16px (SVG o `radial-gradient` repetido). Nunca `<hr>`.
6. **Grano de papel washi** — `radial-gradient` de puntos `rgba(ink,.018)` a `4px`, sobre `body`; textura estática que "da diente" al papel.

Para emitir una forma nueva (nube, montaña, pez): silueta solo con `M`/`Q`, `stroke=--ink-strong` 1.2–2.5 `round`, relleno lavado de tinta, 1–3 paths internos a opacidad 0.55–0.93, rotación en radián impar. Prohibido: gradientes, drop-shadows, filtros `feGaussianBlur`, `#000`, `stroke-dasharray` (salvo divisores).

### B) El fondo que "respira" (motor generativo de ink-field) — el elemento vivo

Un `<canvas>` a pantalla completa detrás del papel/texto: **tinta sumi vertida que deriva por un campo de flujo con semilla**. Es lo que convierte una *imagen* en un *espacio vivo*. Cómo funciona (descripción del método, sin copiar código):

1. **Semilla determinista** — un PRNG con semilla (`mulberry32`) → cada carga es una "vertida" (*pour*) reproducible con un id (`seed 0000`, mostrado en mono: el condimento tech).
2. **Campo de flujo** — ruido de valor + fBm (4 octavas) con la semilla genera, en cada punto, un **ángulo**. Las partículas siguen ese ángulo → corrientes orgánicas de tinta. `NOISE_SCALE ≈ 0.0016`; el tiempo avanza `+0.0016`/frame → el campo deriva lentísimo.
3. **Partículas de tinta** — ~120–1200 puntos diminutos (`1.3px`) pintados en `rgba(ink-strong, .05–.11)`. Cada una tiene vida, velocidad y renace al morir o salir del lienzo. Una **deriva** global suave hacia abajo (como tinta asentándose).
4. **La respiración** — cada frame se repinta un **susurro de papel** encima: `fillRect` con `rgba(paper, .006)`. Casi invisible, pero impide que la tinta se ahogue: el lavado nace, vive y se desvanece en un ciclo continuo → el lienzo **inhala y exhala**.
5. **Brasas (embers)** — un ~5–20% de partículas se pintan en `ember`/`accent` a baja opacidad: raras chispas cálidas de vida. Parámetro `embers` (0–1).
6. **Interacción "el cursor es viento"** — tocar/click *vierte* tinta (burst agrupado hacia el punto, `r = rand*rand*70` para concentrar al centro); arrastrar deja un rastro. Nunca es un control de UI, es presencia.
7. **Parámetros expuestos** (opcional, tipo consola discreta): `turbulence` (0–1.5, cuánto sigue al campo), `drift` (0–1, deriva global), `density` (nº partículas), `embers`.
8. **Accesibilidad** — con `prefers-reduced-motion: reduce`, NO se anima: se avanza el campo en silencio ~520 frames y se congela **una sola estampa** ("a still print"). Siempre hay una imagen bella, nunca movimiento impuesto.

Uso en una landing: como **telón del hero** a muy bajo contraste (la tinta apenas se intuye tras el texto), o como acento vivo en una sección de "permanencia/oficio". Vignette radial suave encima para que "viva en una página, no en una pantalla".

---

## Motion / animación

Principio (xiaoer): **movimiento = respiración, no atención**. La página está *viva pero dormida*. El único movimiento constante y llamativo permitido es el fondo de tinta que respira.

- **Entrada (una vez)** — `heroTextIn`: 800ms, sube 24px + fade. Easing **firma**: `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo: arranca rápido, aterriza suave). Úsalo para toda entrada one-shot.
- **Reveal de pincel** (aroma sumi-e) — un trazo SVG que se "dibuja" al cargar via `stroke-dashoffset` de lleno→0 (o un `clip-path` que barre). Opción sobria y muy sumi-e para revelar un divisor o el sello.
- **Idle floats** — flotaciones ambientales en decoraciones ancladas: duración ≥3500ms, amplitud ≤10px, rotación ≤±4°, escala ≤±0.03, `ease-in-out`, `infinite`, **con delays escalonados** (0/400/800/1300ms) para que el grupo nunca se mueva al unísono. Truco: delay negativo (`-1500ms`) para arrancar a mitad de ciclo.
- **Prohibido**: parallax en scroll, fade-in-on-scroll, loops < 3s, CTAs pulsantes, escala/translate en hover de controles funcionales.
- **Dos categorías de hover**: (1) **Controles** (botones, links, cards) → **solo opacidad** (~0.92), nunca se mueven bajo el cursor. (2) **Decoración** (SVGs, el fondo) → transform/físicas suaves; el cursor es viento, no espada; todo lo empujado vuelve al reposo.
- **Reduced-motion obligatorio**: `@media (prefers-reduced-motion: reduce)` desactiva animaciones y físicas (incluido el canvas → estampa fija).

---

## Anatomía de secciones

Pila vertical; fondos alternan `paper → paper-deep → paper` (el papel es el "descanso" entre bandas, análogo al blanco↔pastel de xiaoer). Divisores siempre dibujados (seigaiha o puntos de tinta), nunca `<hr>`.

| # | Sección | Fondo | Rol | Layout |
|---|---------|-------|-----|--------|
| 1 | **Hero** | `paper` + canvas de tinta | Marca + tesis en una frase + 2 CTAs; sello en esquina | asimétrico, texto izq / obra o vacío der |
| 2 | **Manifiesto** | `paper` | Declaración poética (bilingüe opcional, quiebres pareados) | 2 columnas |
| 3 | **Pilares / Porqué** | `paper-deep` | 3 valores, cada uno con numeral CJK 一二三 | grid 3 col |
| 4 | **Trabajo / Casos** | `paper` | Proyectos con kanji-ancla + meta en mono | grid 3–4 |
| 5 | **Proceso / Story** | `paper-deep` | Cómo se construye, sin prisa; cita en `accent` | 2 col (obra + texto) |
| 6 | **CTA** | `ink` (invertido) | Invitación calmada | bloque centrado |
| 7 | **Footer** | `paper` | Wordmark serif + sello + links; único sitio con serif y sans centrados sin decoración | centrado, mínimo |

Anatomía del hero (regla del *ma*): ~45–60% del alto superior es respiración; la obra/decoración pesa abajo-derecha y sangra fuera; sello pequeño en una esquina; sin logos/watermarks dentro de la obra.

---

## Voz / copy

Del "back cover de un libro de poesía", no de una página de producto (xiaoer + goguma). Para una software factory: registro **calmado, de oficio y permanencia**, humilde, sin superlativos ni marketing exclamativo.

- **Poética, no promocional**; frases cortas, con silencio entre ellas. Mucho aire.
- **Tesis del hero** en una línea tranquila de permanencia, no un value-prop de SaaS. Ej.: *"Construimos software que sigue de pie cuando la moda pasa."* / *"Sin prisa, sin atajos."*
- **Anclas de un solo ideograma** como objeto de contemplación: 道 (camino), 匠 (artesano), 久 (perdurar), 静 (calma). Muéstralo grande + glosa pequeña.
- **Textura bilingüe opcional**: un carácter/tagline CJK junto al copy latino da un aire curado sin localizar de verdad (no sobre-traduzcas los labels).
- **Numerales de sección** en CJK (一 二 三) como marcadores zen.
- **Labels técnicos** en mono, sobrios: `v2.4.0`, `seed 0000`, `uptime 99.98%` — la única voz "de máquina", y discreta.
- **NO escribir**: "Bienvenido a…", "Donde el arte se encuentra con la tecnología", "¡Suscríbete!", "Envío gratis", superlativos, signos de exclamación de marketing. Si una línea cabría en una web de SaaS agresiva, reescríbela más quieta.

---

## Acento tech sobrio (cómo y dónde)

El "condimento tech" existe pero susurra. Tres vehículos, ninguno neón:

1. **Tipografía monoespaciada** para metadatos técnicos: versión/commit/seed/uptime/latencia, labels de UI de la consola del fondo. Es la firma "hecho por ingeniería" (heredada del `seed 0000` de ink-field).
2. **El campo de tinta code-driven**: el fondo generativo *es* el tech — ruido con semilla, campo de flujo, determinismo reproducible. Tecnología manifestándose como tinta, no como dashboard.
3. **Un único hairline "de sistema"**: una rejilla/línea fina en `line`, o un status-dot en `accent`, para una sola señal viva (build passing, uptime). Máximo una por vista.

Dónde NO: nada de gradientes de neón, glassmorphism, sombras 3D, iconos "cyber", brillos. El bermellón es el único color; el resto es tinta. El tech se siente en la *precisión y el determinismo*, no en el brillo.

---

## Do / Don't

**Do**
- Un solo acento bermellón; cámbialo en un token y cambia toda la página.
- Trazos SVG en `#1B1712` (nunca `#000`), `round`, `Q`/`C`, rotación irregular, relleno de lavado de tinta.
- Mucho vacío (余白); decoración anclada a bordes que sangra fuera.
- Motion lento (≥3500ms), pequeño (≤10px), escalonado; el fondo que respira como única "vida" constante.
- Hover de controles = solo opacidad; el cursor es viento sobre la decoración.
- `prefers-reduced-motion` → estampa fija, siempre bella.
- Tres voces tipográficas (serif/sans/mono), un trabajo cada una.

**Don't**
- Gradientes saturados, glassmorphism, sombras pesadas, filtros/blur en los SVG.
- Un segundo color de acento, o usar el bermellón por todas partes (deja de ser un sello).
- `<hr>` o `border-top` para dividir — usa seigaiha o puntos de tinta.
- Escala/pulso en hover de botones/cards; parallax o fade-in-on-scroll.
- Copy de SaaS: value-props gritones, exclamaciones, superlativos.
- Una 4ª fuente, o cursiva juguetona (rompe la permanencia).

---

## Prompt listo para usar

> Pégalo (ajustando `{marca}`, `{tesis}`, `{sello}`) para generar una landing NUEVA con esta estética.

```
Diseña y construye una landing page de una sola página para {marca}, una software factory,
con estética SUMI-E / TINTA JAPONESA token-driven que transmita CALMA, PERMANENCIA y CONFIANZA
DE LARGO PLAZO. Es la "capa de tradición": papel, tinta y sello bermellón.

TOKENS (fuente única de verdad; nada de color hardcodeado — mapéalos a CSS variables y, si usas
Tailwind, a theme.extend.colors):
  paper #F2ECE0 · paper-deep #E7DCC3 · ink #2B2B28 · ink-strong #1B1712 (trazos, nunca #000) ·
  ink-soft #6B645B · line rgba(27,23,18,.16) · accent/seal #9C3B2E (ÚNICO acento) · ember #BD5A34
  (solo brasas del fondo). Incluye tema OSCURO invertido con los MISMOS nombres semánticos bajo
  :root[data-theme="dark"]: paper #17130E · ink #ECE3D2 · ink-strong #F2ECE0 · ink-soft #A79E8D ·
  accent #C2503A · ember #D9714A.

TIPOGRAFÍA (tres voces, un trabajo cada una, nunca una 4ª):
  Serif (Noto Serif JP/Georgia) = display, H1–H3, marca, sello CJK.
  Sans (Noto Sans JP/system-ui) = body, nav, botones, captions.
  Mono (ui-monospace) = SOLO metadatos técnicos (versión, seed, uptime) — el condimento tech sobrio.
  Display clamp(56px,8vw,116px) lh .96; body 16px lh 1.85; eyebrow uppercase tracking .32em en accent.

LAYOUT: contenedor max 1180px, padding max(48px,6vw), secciones 96px vert, margen wabi-sabi 96px.
  Mucho vacío (余白/間). Hero ASIMÉTRICO: texto a la izquierda, tercio derecho para obra/vacío;
  >50% de aire arriba; decoración anclada a bordes que sangra fuera; sello en una esquina.

SECCIONES (fondos alternan paper → paper-deep → paper; divisores dibujados, NUNCA <hr>, usa banda
seigaiha o línea de puntos de tinta):
  1) Hero: telón de tinta generativa + tesis en UNA frase calmada de permanencia "{tesis}" + 2 CTAs
     (primario sólido accent, secundario outline). 2) Manifiesto poético. 3) Tres pilares con numeral
     CJK 一二三. 4) Trabajo/casos con kanji-ancla + meta en mono. 5) Proceso/oficio "sin prisa, sin
     atajos", cita en accent. 6) CTA INVERTIDA (fondo ink, texto paper, botón accent). 7) Footer mínimo.

TINTA Y TRAZOS (SVG = un lenguaje de un solo pincel): stroke #1B1712 (nunca #000), width 1.2–2.5,
  linecap round, paths con Q/C (nada de L recto), rotación en radianes IRREGULARES, relleno = LAVADO
  DE TINTA translúcido (rgba(27,23,18,.12–.5)), capas superpuestas opacidad .55–.93. Primitivos:
  trazo único (一), enso abierto, sello bermellón con carácter {sello}, banda seigaiha por CSS,
  divisor de puntos de tinta, grano de papel washi (radial-gradient sutil sobre body). Sin gradientes,
  sin drop-shadows, sin blur.

EL FONDO QUE RESPIRA (elemento VIVO — impleméntalo): un <canvas> a pantalla completa detrás del hero.
  Tinta sumi vertida que deriva por un CAMPO DE FLUJO con SEMILLA determinista (PRNG mulberry32 →
  ruido de valor + fBm de 4 octavas → ángulo por punto). ~500 partículas de 1.3px en rgba(27,23,18,.06)
  que siguen el campo con deriva suave hacia abajo; renacen al morir/salir. LA RESPIRACIÓN: cada frame
  repinta un susurro de papel encima (fillRect rgba(paper,.006)) para que la tinta nazca, viva y se
  desvanezca en ciclo — el lienzo inhala y exhala. Un ~10% de partículas son BRASAS en ember/accent.
  El cursor "es viento": click/tap vierte un burst de tinta agrupado hacia el punto; arrastrar deja
  rastro. Muestra el "seed 0000" en mono (chispa tech). Con prefers-reduced-motion: NO animar, avanzar
  el campo en silencio ~520 frames y congelar UNA estampa fija bella. Vignette radial suave encima.

MOTION = respiración, no atención: heroTextIn 800ms sube 24px+fade con cubic-bezier(0.22,1,0.36,1);
  reveal de un trazo SVG por stroke-dashoffset; idle floats ≥3500ms, ≤10px, ±4°, ease-in-out, infinite,
  con delays escalonados. Hover de controles = SOLO opacidad (nunca se mueven). Nada de parallax,
  fade-in-on-scroll, loops <3s ni CTAs pulsantes. prefers-reduced-motion desactiva todo (canvas → fija).

VOZ/COPY: calmada, de oficio, humilde; frases cortas con silencio; sin superlativos ni exclamaciones
  de marketing; anclas de un ideograma CJK (道/匠/久); numerales de sección en CJK; labels técnicos en
  mono. Prohibido copy tipo SaaS ("Bienvenido", "¡Suscríbete!", value-props gritones).

ACENTO TECH: SOLO monoespaciada para metadatos + el campo de tinta code-driven + un único hairline/
  status-dot en accent por vista. Cero neón, glassmorphism, sombras 3D o brillos.

Entrega HTML/CSS/JS autocontenido (o Astro + Tailwind leyendo tokens.json), accesible, responsive,
con soporte de tema claro/oscuro por data-theme y el fondo de tinta que respira funcionando.
```
