---
name: design-house-blend
description: House Blend — la fusión de la casa: base calma wabi-sabi oscura (madera/tinta/papel warm charcoal) + capa de tradición sumi-e (fondo de tinta que respira, sello bermellón, kanji homeopático) + un condimento tech Arch SOBRIO (micro-etiquetas mono, UN acento señal teal que respira, un biselado HUD puntual). Proporción 80% calma / 20% tech. Invócala para la landing de una software factory que debe sentirse permanente, confiable y de largo plazo, con solo un guiño de ingeniería.
---

# House Blend — calma que perdura, con una brasa de ingeniería

La estética de la casa: **80% base calma + 20% condimento tech**. La fundación
hace el trabajo emocional (permanencia, confianza, oficio de largo plazo); el
tech es una brasa, no un plato. Si al taparle el 20% con la mano sigue siendo
una sala de té oscura y serena, vas bien. Si el tech grita, has roto la receta.

---

## Identidad / vibe

- **Sala de té en la penumbra, con un piloto encendido.** Oscuridad cálida (no
  negro), textura de material crudo (madera/tinta/papel), silencio respirable, y
  UN punto eléctrico que respira lento como la luz de un servidor en reposo.
- **Permanencia sobre novedad.** El mensaje es "llevamos años haciendo esto bien
  y seguiremos aquí". Nada parpadea, nada corre. El oficio se ve en la calma.
- **Tres mundos que conviven sin pelearse:** tierra cálida (base), tinta y sello
  (tradición), máquina sobria (condimento). Cada uno tiene su color, su fuente y
  su sitio; no se mezclan en el mismo elemento.
- **Sustracción como disciplina.** No decoramos: editamos hasta que la sala
  respira. El vacío (余白 *yohaku*) es el material principal.
- **Prueba de fuego:** un desktop de Arch de alguien meticuloso + un rollo sumi-e
  colgado. Orden y quietud, no r/unixporn ni cyberpunk.

---

## La receta (proporciones y capas)

**80% CALMA (domina — es lo que el cliente siente):**

1. **Fundación — Dark Wabi-Sabi (~60%).** Hace el trabajo de calma, permanencia y
   confianza. Aporta: paleta tierra cálida, whitespace generoso (`py-32`+),
   grano de papel 0.02, reveals lentos con ease firma, bandas alternas
   charcoal/clay, botones ghost/hairline, esquinas rectas, voz de oficio.
2. **Tradición — Sumi-e Ink (~20%).** La capa de permanencia y humanidad.
   Aporta: **fondo de tinta generativo que respira** (muy sutil, telón del hero),
   **sello bermellón puntual**, **un kanji homeopático por vista**, tipografía
   serif de display, divisores dibujados (seigaiha / puntos de tinta, nunca
   `<hr>`), motion como respiración.

**20% TECH (condimento — brasa, no fuego):**

3. **Condimento Arch sobrio (~20%).** Aporta, en dosis mínimas: **micro-etiquetas
   mono** (statusline discreta, specs tipo neofetch en pequeño), **UN acento
   eléctrico "señal" teal** contenido (status-dot que respira, índices de
   sección, foco del CTA), y **un biselado HUD** (augmented-ui) en **1 elemento
   por sección como mucho**.

### Reglas duras para no romper la calma (no negociables)

- **Las superficies y el texto de lectura son 100% tierra cálida.** Ningún acento
  toca tipografía a tamaño de lectura.
- **Máximo UN punto que respira/brilla por viewport** (el status-dot teal).
- **Máximo UNA marca bermellón por vista** (sello o kanji) — es un sello, no un
  patrón.
- **Máximo UN biselado HUD por sección.**
- **Mono solo en micro-etiquetas técnicas** (11–12px): versión, seed, uptime,
  statusline. Nunca en titulares ni cuerpo.
- **Dos acentos en mundos separados:** teal = máquina; bermellón = mano/tradición.
  Nunca en el mismo elemento, nunca adyacentes. Se reparten por tipo de sección.
- **Motion = respiración** (≥3s, ease lento). Cero glitch, cero `animate-ping`,
  cero parallax, cero neón saturado, cero glassmorphism.
- **Esquinas rectas siempre.** Sin `border-radius` (salvo el ~3px del sello).
- **Si dudas, quita tech.** El presupuesto del 20% se gasta rápido.

---

## Paleta de color (base + un acento señal + bermellón)

Base tierra cálida (fundación wabi-sabi, canon) fusionada con la variante oscura
de sumi-e. Warm charcoal manda; nunca `#000`, nunca `#fff`.

### Base (tierra cálida — el 90% de la pantalla)

| Token | Hex | Rol |
|---|---|---|
| `--bg` / `warm-charcoal` | `#1E1B18` | Fondo principal. La oscuridad por defecto (cálida, tinte arcilla). |
| `--bg-alt` / `deep-clay` | `#2C2520` | Banda alterna (segmenta el scroll sin bordes). |
| `--wood` / `oiled-teak` | `#3C2A1A` | Madera más profunda: rellenos de acento, veta, profundidad de hover. |
| `--plaster` | `#C4B0A0` | Yeso cálido: hairlines, hover de links, marcas de regla `8×2px`. |
| `--fg-bright` / `filtered-light` | `#F0EBE0` | Titulares / texto más brillante (luz que entra). |
| `--fg` / `text-on-dark` | `#d4cfc8` | Cuerpo por defecto. Blanco roto cálido, nunca `#fff`. |
| `--fg-muted` | `#8a8278` | Captions, labels mono, copy secundario. Gris-taupe cálido. |
| `--line` | `rgba(212,207,200,0.06–0.12)` | Hairlines y bordes de 1px. |

### El acento señal (máquina — teal eléctrico, UNO solo)

| Token | Hex | Rol |
|---|---|---|
| `--signal` | `#6FE3D2` | **El único acento eléctrico.** Contrapunto frío de la tierra cálida. Solo como punto, línea de 1px o label de 11px, a baja opacidad. Nunca como relleno grande. Es un piloto, no un foco. |

### El sello bermellón (mano/tradición — puntual)

| Token | Hex | Rol |
|---|---|---|
| `--seal` | `#9C3B2E` | **Bermellón 朱砂.** El sello, el kanji-ancla, una cita de cierre. Cálido, tradicional, raro. Sobre `deep-clay`/`oiled-teak` súbelo a `#C2503A` para mantener contraste AA. |
| `--ember` | `#BD5A34` | Solo para las chispas cálidas del fondo de tinta generativo. No es UI. |

**Resolución de conflictos (criterio de director):** las 5 skills proponían
acentos distintos (teal #6FE3D2, chartreuse hue-120, purple/blue Tokyo/Nord,
bermellón). Se descartan chartreuse y purple/blue. Se elige **teal `#6FE3D2`
como la ÚNICA señal eléctrica** (es fría, calma sobre tierra cálida, y es el
token nativo de la fundación) y **bermellón `#9C3B2E` como el sello de
tradición**. Coexisten porque viven en mundos separados: el teal es del reino
máquina (tech), el bermellón es del reino mano (sumi-e). Regla estructural
heredada de sumi-e/goguma: cambiar `--seal` re-tiñe todos los énfasis de
tradición; cambiar `--signal` re-tiñe todo el tech. Un token = un cambio.

---

## Tipografía (serif/sans display + mono condimento)

Tres voces, un trabajo cada una (disciplina de sumi-e/xiaoer), nunca una 4ª. Se
descarta el "mono-everywhere" de tui/neo-tokyo (rompería la calma del cuerpo) y
el "Inter-only" estricto de wabi-sabi (necesitamos la gravedad serif de la
tradición).

| Voz | Familia | Trabajo | Se usa en | NUNCA en |
|---|---|---|---|---|
| **Serif** (tradición, permanencia) | `"Noto Serif JP", Georgia, serif` | "esto perdura, está curado" | Marca del hero, H1–H2, sello CJK | cuerpo, metadata |
| **Sans** (claridad, calma) | `Inter, system-ui, sans-serif` | "entrega la información sin ego" | cuerpo, nav, botones, eyebrows | display grande, sello |
| **Mono** (chispa tech, sobria) | `"JetBrains Mono", ui-monospace, monospace` | "señal de máquina, discreta" | versión/seed/uptime, statusline, specs neofetch | titulares, párrafos |

- **Serif tranquila, no pesada:** display en weight **500–600**, no black 900.
  La fundación es calma; el serif da gravedad, no grito. `clamp(48px, 7vw, 88px)`,
  `line-height` 1.0–1.1, tracking `-0.02em`.
- **H2 de sección:** serif 600, `clamp(28px, 4vw, 42px)`.
- **Cuerpo (Inter):** 15px / `line-height 1.85`, antialiased. El leading largo y
  aireado es el alma de la calma. Ancho de medida 30–46ch.
- **Eyebrow / mono-caption:** 11px, `uppercase`, `letter-spacing 0.12–0.14em`,
  color `--fg-muted`, weight 500. Marcas de sección ("Materials", "Work").
- **Label técnico mono:** 11–12px, `letter-spacing 0.04em`, en `--fg-muted` o,
  puntualmente, en `--signal`. La única voz de máquina, y susurra.

---

## Layout y espaciado

Se **descarta el tiling window manager completo** de neo-tokyo (haría que el tech
dominara y quemaría el 20%). La fundación es un **documento que fluye** (wabi-sabi
+ sumi-e): contenedores centrados, mucho aire, bandas alternas. El tech aparece
como micro-inserciones, no como esqueleto.

- **Contenedores por intención:** 500px (statements/CTA), 640px (hero copy),
  960px (contenido), 1180–1200px (nav + full-bleed). Centrados `mx-auto`.
- **Gutters:** `px-6` (móvil-safe) / padding horizontal `max(48px, 6vw)`.
- **Ritmo vertical:** secciones `py-32` (128px); la sección-manifiesto `py-40`
  (160px) para máximo silencio. `> 50%` de margen vertical vacío sobre/bajo los
  bloques de texto.
- **Asimetría (间 *ma*):** hero con grid `[1fr_1.15fr]`; el sujeto pesa a la
  derecha, el tercio izquierdo respira. Decoración anclada a bordes que sangra
  fuera del canvas, nunca centrada.
- **Segmentación:** alterna bandas `warm-charcoal` / `deep-clay` (sin bordes) y
  fotos-heavy / puro-tipo para que el ojo descanse.
- **Esquinas 100% rectas.** `border-radius: 0` en todo (única excepción: el sello,
  ~3px). Rasgo unificador de las 5 skills.
- **Divisores dibujados**, nunca `<hr>`: banda seigaiha (CSS radial en `--seal`,
  opacity .4) o fila de puntos de tinta cada 16px. Alternativa tech sobria:
  hairline `--line` que en hover del CTA vira a `--signal`.

---

## Componentes

Todo con esquinas rectas, hairlines finas, sin sombras pesadas, sin glass. Botones
e inputs ghost/hairline (nunca pills rellenas glossy).

- **Nav:** fija, transparente; tras `scrollY > 60` → `bg-warm-charcoal/97` +
  hairline inferior `--line`, `transition 500ms`. Links en mono-caption, hover →
  `--plaster`. Wordmark serif con tracking ancho.
- **Statusline (firma tech sobria):** franja fina (una línea) tipo Polybar/Vim,
  en mono 11px sobre `deep-clay`. Encadena micro-badges discretos: `● stable`
  (el punto es el status-dot teal que respira) · rama `main` · `v1.0` ·
  `uptime 99.98%`. Badges monocromos en `--fg-muted`; solo el punto vive en
  `--signal`. Una sola statusline por página (arriba o abajo). Sin caps de colores.
- **Hero:** `min-h-screen`, **telón de tinta generativa** a muy bajo contraste
  detrás del texto, gradiente que disuelve el fondo en `warm-charcoal/95`. Tipo
  apilada asimétrica: marca serif → glosa CJK pequeña en `--seal` → descripción
  de una línea → eyebrow mono. Un sello bermellón en una esquina.
- **Neofetch tile (identidad, en pequeño):** un bloque discreto — no la ventana
  gigante de neo-tokyo — con `factory@equipo`, línea `-----`, y specs mono
  (`stack:`, `foco:`, `entrega:`, `uptime:`). Cierra opcionalmente con una fila
  corta de swatches de la paleta. Tamaño contenido, dentro del flujo del documento.
- **Panel HUD biselado (augmented-ui, 1 por sección máx.):** UN panel por sección
  con **una o dos esquinas cortadas/biseladas** (clip-path implementado a mano —
  no copies el CSS de la librería). Hairline en `--line` o, si es el elemento
  ancla, en `--signal` al ~30%. Reemplaza los corner-brackets HUD de sober-dark.
  Es el guiño "spec-frame / consola", puntual y sobrio. Sin glow.
- **Bloque de contenido (Materials/Work):** dos columnas alternas image|text,
  imagen cuadrada dim bajo gradiente, H2 serif, cuerpo Inter a `--fg`/60.
- **Casos/Work:** full-bleed `16/8`; banda de texto con foto de detalle detrás al
  `opacity 0.40` bajo gradiente clay — textura a través del tipo.
- **Servicios/Capacidades:** sin card chrome; cada item marcado por una regla
  `8×2px` en `--plaster` (o `--signal` en el item ancla), luego H3 + cuerpo muted.
- **"Cómo trabajamos":** file-tree ASCII sobrio (conectores `├─ └─`) o comandos
  `$ ./ship --calm` en mono — credibilidad técnica sin ruido.
- **CTA:** bloque invertido (fondo `--ink`/deep) o statement centrado; input de
  subrayado (`border-b --line`, foco → `--signal` en el form principal) + botón
  ghost (`border --fg/20`, hover invierte a `bg-fg text-charcoal`). UN CTA sólido
  por vista.
- **BackToTop:** `44×44`, hairline, aparece tras `scrollY > 500`, hover invierte.

---

## Motion / animación (lo que "respira")

Principio (wabi-sabi + sumi-e): **movimiento = respiración, no atención.** La
página está viva pero dormida. Se descarta el mono-everywhere estático de tui
(demasiado muerto para el hero) y cualquier motion teatral de sober/cyberpunk.

- **El elemento vivo — fondo de tinta que respira** (motor generativo de sumi-e):
  `<canvas>` tras el hero. Tinta sumi que deriva por un campo de flujo con semilla
  determinista; ~500 partículas de 1.3px en `rgba(ink,.06)`; cada frame se repinta
  un "susurro de papel" (`rgba(paper,.006)`) → la tinta nace, vive y se desvanece:
  el lienzo inhala y exhala. ~10% de partículas son brasas en `--ember`. Muy bajo
  contraste (apenas se intuye tras el texto). El `seed 0000` en mono = la chispa
  tech. El cursor "es viento" (click vierte tinta).
- **El punto que respira — status-dot** `--signal`: opacidad `0.4 → 1.0` en 3–4s
  con ease firma. Es "el único neón respirando". Uno por viewport.
- **Entrada (una vez):** `opacity 0→1` + `y 20–40→0` en `whileInView` (once),
  duración 0.9–1.2s. **Ease firma:** `[0.25, 1, 0.25, 1]` (wabi-sabi) o
  `cubic-bezier(0.22,1,0.36,1)` (sumi-e) — elige una y sé consistente; ambas son
  el "aterrizaje suave". Stagger de hijos `i*0.12`.
- **Reveal de pincel (aroma sumi-e):** un trazo SVG o el sello que se "dibuja" por
  `stroke-dashoffset` al cargar. Sobrio, una vez.
- **Idle floats** en decoración anclada: ≥3500ms, ≤10px, ±4°, `ease-in-out`,
  `infinite`, con delays escalonados (nunca al unísono).
- **Hover de controles = solo opacidad/color ≤300ms.** Los botones no se mueven
  bajo el cursor. La ONE excepción de wabi-sabi (spring del botón primario) es
  opcional; si la usas, solo en el CTA principal.
- **Prohibido:** `animate-ping`, glitch, matrix, parallax, fade-in-on-scroll
  agresivo, loops <3s, typing en bucle, CTAs pulsantes, glow/box-shadow neón.
- **`prefers-reduced-motion: reduce`:** congela todo. El canvas avanza en silencio
  ~520 frames y se queda en **una estampa fija bella**; el status-dot se congela a
  media opacidad. Siempre hay una imagen quieta, nunca movimiento impuesto.

---

## Anatomía de secciones

Pila vertical que fluye; fondos alternan `warm-charcoal → deep-clay → warm-charcoal`.
Divisores dibujados (seigaiha/puntos), nunca `<hr>`. **El tech se reparte para que
nunca se acumule:** una sección tech, la siguiente pura tradición.

| # | Sección | Fondo | Rol | Acento permitido |
|---|---|---|---|---|
| 0 | **Statusline** | deep-clay | Firma tech discreta (una línea) | `--signal` (el status-dot) |
| 1 | **Hero** | charcoal + canvas de tinta | Marca + tesis de permanencia + 2 CTAs | sello bermellón en esquina + kanji-glosa |
| 2 | **Manifiesto** | charcoal (`py-40`) | Una frase grande, máximo silencio | ninguno (puro tipo) |
| 3 | **Identidad / Neofetch** | deep-clay | `factory@equipo` + specs mono | `--signal` en 1 label + panel HUD biselado |
| 4 | **Work / Casos** | charcoal | Prueba: casos con textura tras el tipo | kanji-ancla en `--seal` (uno) |
| 5 | **Servicios / Capacidades** | deep-clay | Lista mínima con reglas `8×2px` | `--signal` en el item ancla |
| 6 | **Cómo trabajamos** | charcoal | File-tree / comandos `$` sobrios | mono (sin color) |
| 7 | **CTA** | deep-clay (invertido) | Invitación calmada + form | `--signal` en foco del input + 1 botón |
| 8 | **Footer** | charcoal | Wordmark serif + sello + links mono | bermellón en el sello |

Regla del *ma* en el hero: ~45–60% del alto superior es respiración; la obra pesa
abajo-derecha y sangra fuera; sello pequeño en una esquina. Mapeo software factory:
Hero (promesa) → Manifiesto (cómo pensamos) → Identidad (quiénes) → Work (prueba)
→ Servicios (qué) → Proceso (cómo construimos) → CTA. Al menos una sección
solo-tipo para respirar.

---

## Iconografía y detalles (kanji, statusline, HUD)

- **Kanji homeopático:** UN ideograma por vista como objeto de contemplación o
  sello — 道 (camino), 匠 (artesano), 久 (perdurar), 静 (calma). Grande + glosa
  pequeña, siempre en `--seal`. Cero wallpapers, cero kanji como textura.
- **Sello (印):** cuadrado bermellón (~3px de radio) con carácter CJK serif en
  `--fg-bright`. El único punto de color saturado cálido. Uno por vista.
- **Statusline / badges:** micro-badges mono monocromos; solo el status-dot en
  `--signal`. Caps rectos, sin colores de píldora. Glyphs unicode/box-drawing
  (`├ ─ │ ● ◐ ↑`) monocromos, tamaño de una celda, color del texto contiguo.
- **Neofetch specs:** pares `label: valor` en mono, pequeños, dentro del flujo.
  Fila corta de swatches como firma cromática (opcional).
- **HUD biselado (augmented-ui):** el LENGUAJE de esquinas cortadas/biseladas en
  UN panel por sección. Hairline fina; sin glow, sin scaffold de 4 esquinas.
  Implementado a mano con `clip-path` (no copiar la librería). Es un guiño
  "spec-frame", no un HUD de videojuego.
- **Trazos SVG (sumi-e):** `stroke: --ink-strong` (nunca `#000`), width 1.2–2.5,
  `linecap round`, paths `Q`/`C`, rotación en radianes irregulares, relleno =
  lavado de tinta translúcido. Enso abierto, trazo único, seigaiha.
- **Grano de papel:** overlay SVG `feTurbulence` a `opacity 0.02`, fijo,
  `pointer-events:none`, `aria-hidden`. Textura que da diente a toda la página.
- **Iconos funcionales:** línea fina (lucide o similar) `size-4`, monocromos,
  heredan `--fg-muted` o `--signal` para acento. Vocabulario de ingeniería
  (Terminal, Cpu, Database, ArrowRight), un icono por concepto, nunca en masa.
- **Prohibido:** emoji multicolor, iconos "cyber", degradados-decoración,
  glassmorphism, drop-shadows, blur en los SVG.

---

## Voz / copy

Registro **calmado, de oficio, de permanencia** — del "back cover de un libro de
poesía", no de una página de SaaS. Se descarta la jerga sci-fi/`guion_bajo` de
sober-dark y todo hype.

- **Corta, declarativa, confiada.** "Construimos software que sigue de pie cuando
  la moda pasa." / "Sin prisa, sin atajos." / "Commits pequeños, decisiones
  sostenibles."
- **Sensorial y material:** habla de oficio, longevidad, sistemas que envejecen
  bien, decisiones consideradas. Nunca "10x", "disrupt", "revolucionamos el
  futuro", "¡suscríbete!".
- **Eyebrows** = sustantivos sueltos en mono-caps ("Materials", "Work",
  "Process"). **Numerales de sección** en CJK (一 二 三) o índices mono (`01/02`).
- **Labels técnicos** en mono, sobrios y honestos: `v1.0`, `seed 0000`,
  `uptime 99.98%`, `● stable`, `$ ./ship --calm`. La única voz de máquina,
  discreta. **Nunca telemetría falsa** (nada de CPU_LOAD/MEM inventados).
- **Textura bilingüe opcional:** un tagline/carácter CJK junto al copy latino da
  aire curado sin localizar de verdad.
- **CTA = invitación, no pitch:** "Begin a conversation." / "Hablemos."
- Prueba: si una línea cabría en una web de SaaS agresiva, reescríbela más quieta.

---

## Do / Don't

**Do**
- Fondo `#1E1B18` cálido, texto `#d4cfc8` — nunca `#000`/`#fff`.
- Cuerpo `line-height ~1.85`, secciones `py-32`+ — el silencio es la feature.
- Tres voces: serif (display/tradición), Inter (cuerpo), mono (solo tech micro).
- UN acento señal teal `#6FE3D2` como punto/línea/label; UN bermellón `#9C3B2E`
  como sello — en mundos separados, nunca adyacentes.
- El fondo de tinta que respira como única "vida" constante; el status-dot como
  único punto que respira por viewport.
- Reveals lentos con ease firma; hover de controles solo opacidad/color.
- Un panel HUD biselado por sección; una statusline por página; un kanji por vista.
- Esquinas rectas, botones ghost/hairline, grano 0.02, divisores dibujados.
- Voz de ingeniero senior tranquilo: concisa, honesta, de largo plazo.
- `prefers-reduced-motion` → estampa fija bella, siempre.

**Don't**
- Ni negro/blanco puro, ni grises fríos, ni un segundo acento cromático.
- Ni tiling window manager completo, ni mono-everywhere en el cuerpo, ni serif 900.
- Ni chartreuse/purple/blue como acento (descartados a favor del teal).
- Ni `animate-ping`, glitch, matrix, parallax, typing en bucle, CTAs pulsantes.
- Ni glow/box-shadow neón, degradados saturados, glassmorphism, drop-shadows.
- Ni telemetría/uptime falsos, ni corner-brackets HUD por todas partes.
- Ni `<hr>`, ni border-radius (salvo el sello), ni pills glossy.
- Ni kanji como textura de fondo, ni wallpapers, ni iconos multicolor.
- Ni copy de hype/superlativos/`guion_bajo`/jerga sci-fi.
- Que el tech pase del 20%: si al taparlo no queda una sala serena, has fallado.

---

## Prompt listo para usar

> Pégalo (ajustando `{marca}`, `{tesis}`, `{kanji}`) para generar la landing con
> ESTA fusión.

```
Diseña y construye una landing page de una sola página para {marca}, una software
factory, con la estética "HOUSE BLEND": 80% CALMA (dark wabi-sabi + tradición
sumi-e) + 20% CONDIMENTO TECH ARCH SOBRIO. Debe sentirse PERMANENTE, CONFIABLE y
de LARGO PLAZO — una sala de té oscura con un piloto de servidor encendido. Cero
glitch, cero neón saturado, cero caos. Si al tapar el 20% tech no queda una sala
serena, está mal.

PALETA (tierra cálida, nunca #000/#fff):
- fondo warm-charcoal #1E1B18 · banda alterna deep-clay #2C2520 · madera profunda
  oiled-teak #3C2A1A · yeso/hairlines raw-plaster #C4B0A0 · titulares
  filtered-light #F0EBE0 · cuerpo #d4cfc8 · muted/captions #8a8278 · hairlines
  rgba(212,207,200,.06–.12).
- UN ACENTO SEÑAL: teal eléctrico #6FE3D2 (reino máquina/tech) SOLO como punto,
  línea 1px o label 11px a baja opacidad — nunca relleno grande.
- SELLO bermellón #9C3B2E (reino mano/tradición): sello, kanji-ancla, cita.
  Súbelo a #C2503A sobre clay/wood para AA. Ember #BD5A34 solo para las chispas
  del fondo de tinta.
- Los dos acentos viven en mundos separados: teal=tech, bermellón=tradición.
  Nunca en el mismo elemento, nunca adyacentes; se reparten por sección.

TIPOGRAFÍA (tres voces, un trabajo cada una, nunca una 4ª):
- Serif (Noto Serif JP/Georgia), weight 500–600 (NO black 900): marca del hero,
  H1–H2, sello CJK. Display clamp(48px,7vw,88px), lh 1.0–1.1, tracking -0.02em.
- Sans (Inter/system-ui): cuerpo 15px lh 1.85, nav, botones, eyebrows.
- Mono (JetBrains Mono): SOLO micro-etiquetas técnicas 11–12px (versión, seed,
  uptime, statusline, specs neofetch). Nunca titulares ni cuerpo.
- Eyebrow: 11px uppercase, letter-spacing .12em, color #8a8278.

LAYOUT: documento que FLUYE (no tiling desktop). Contenedores centrados
500/640/960/1180px, padding max(48px,6vw), secciones py-32 (manifiesto py-40).
Hero asimétrico [1fr_1.15fr] con >50% de aire arriba y decoración anclada a
bordes que sangra fuera (ma). Alterna bandas warm-charcoal/deep-clay. Esquinas
100% rectas (border-radius 0, salvo el sello ~3px). Botones/inputs ghost/hairline.
Divisores DIBUJADOS (seigaiha o puntos de tinta), nunca <hr>.

CAPA DE TRADICIÓN (sumi-e): un sello bermellón puntual + UN kanji homeopático por
vista ({kanji}: 匠/道/久/静) grande con glosa pequeña + divisores seigaiha + trazos
SVG (stroke #1B1712 nunca #000, width 1.2–2.5, linecap round, paths Q/C, rotación
irregular, relleno = lavado de tinta translúcido) + grano de papel (SVG feTurbulence
overlay opacity 0.02, fijo, pointer-events none, aria-hidden).

EL ELEMENTO VIVO — fondo de tinta que respira: un <canvas> a pantalla completa
tras el hero, a MUY bajo contraste. Tinta sumi que deriva por un campo de flujo
con semilla determinista (PRNG → ruido/fBm → ángulo por punto); ~500 partículas
1.3px en rgba(27,23,18,.06) que renacen; cada frame repinta un susurro de papel
(fillRect rgba(paper,.006)) → la tinta nace, vive y se desvanece: inhala y exhala.
~10% de partículas en ember. Muestra "seed 0000" en mono. Cursor = viento (click
vierte tinta). Con prefers-reduced-motion: NO animar, congelar UNA estampa fija.

CONDIMENTO TECH (20% máx, brasa no fuego):
- Statusline discreta (una línea, mono 11px sobre deep-clay): micro-badges
  monocromos (● stable · main · v1.0 · uptime 99.98%). Solo el punto ● en teal,
  y respira (opacity 0.4→1.0 en 3–4s). Una por página.
- Neofetch tile PEQUEÑO en el flujo: factory@equipo, línea -----, specs mono
  (stack:/foco:/entrega:/uptime:) + fila corta de swatches opcional.
- UN panel HUD biselado por sección: una o dos esquinas cortadas/biseladas
  (clip-path a mano, estilo augmented-ui, sin copiar la librería), hairline fina
  en --line o teal al 30%. Sin glow, sin scaffold de 4 esquinas.
- "Cómo trabajamos" como file-tree ASCII (├─ └─) o comandos $ ./ship --calm.
- UN status-dot / punto teal por viewport, máx. Reserva el teal; si dudas, quítalo.

MOTION = respiración: entrada opacity 0→1 + y 20–40→0 en whileInView (once),
0.9–1.2s, ease [0.25,1,0.25,1] o cubic-bezier(0.22,1,0.36,1) (elige una). Stagger
i*0.12. Reveal de trazo/sello por stroke-dashoffset. Idle floats ≥3500ms, ≤10px,
±4°, escalonados. Hover de controles = solo opacidad/color ≤300ms (no se mueven).
PROHIBIDO: animate-ping, glitch, matrix, parallax, loops <3s, typing en bucle,
CTAs pulsantes, glow/box-shadow neón, glassmorphism. prefers-reduced-motion
congela todo (canvas → estampa fija).

SECCIONES (fondos alternan; el tech se reparte, nunca se acumula): statusline
discreta → hero (canvas de tinta + tesis "{tesis}" + sello en esquina + 2 CTAs)
→ manifiesto puro-tipo py-40 → identidad/neofetch (specs mono + 1 panel HUD
biselado) → work/casos (textura tras el tipo + kanji-ancla en bermellón) →
servicios (reglas 8×2px, item ancla en teal) → cómo trabajamos (file-tree/comandos
$) → CTA invertida (input de subrayado con foco teal + 1 botón ghost) → footer
(wordmark serif + sello + links mono).

VOZ: calmada, de oficio, honesta, de largo plazo ("software que envejece bien",
"sin prisa, sin atajos", "decisiones sostenibles"). Labels mono sobrios y reales
(v1.0, seed 0000, uptime real) — NUNCA telemetría falsa. Cero hype, superlativos,
guion_bajo decorativo ni jerga sci-fi. CTA = invitación ("Hablemos").

Entrega HTML/CSS/JS autocontenido (o Astro/React + Tailwind leyendo tokens),
responsive, accesible, con el fondo de tinta que respira funcionando y
prefers-reduced-motion respetado. Base = calma wabi-sabi permanente; tradición =
tinta y sello; tech = una brasa teal que respira. Proporción 80/20, innegociable.
```
