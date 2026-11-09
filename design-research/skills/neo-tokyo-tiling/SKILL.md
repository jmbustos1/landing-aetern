---
name: design-neo-tokyo-tiling
description: Lenguaje de diseño "Neo-Tokyo tiling" — landing con layout de tiling window manager (Hyprland/Arch ricing) y temas Tokyo Night / Nord, mono-everywhere, esquinas rectas y un solo acento. Invócala al diseñar o generar landings de software factory que quieran un aire tech sobrio (calma, confianza, largoplacismo) con condimento japonés discreto.
---

# Neo-Tokyo Tiling — orden de tiling window manager, calma de estudio japonés

Estética destilada del repo `dleer-portfolio` (Next.js + Tailwind v4, sin licencia → aquí se captura solo el LENGUAJE DE DISEÑO, no el código). La idea fuerza: una landing que se ve como un desktop de Arch Linux "riceado" con Hyprland — ventanas mosaico (tiles) alineadas, barra de estado tipo Polybar, y estética neofetch — pero calibrada para transmitir sobriedad de ingeniería, no cyberpunk recargado.

---

## Identidad / vibe

- **Metáfora rectora:** el sistema operativo del artesano. La pantalla es un *tiling window manager*: rectángulos que teselan el espacio sin solaparse, con gaps uniformes. Nada flota al azar; todo ocupa su celda.
- **Sensación objetivo (marca software factory):** calma, control, largoplacismo. El tech no grita; ordena. La retícula de ventanas comunica "aquí las cosas están en su sitio y se mantienen".
- **Condimento japonés (micro-dosis):** neo-Tokyo se lee en la paleta (Tokyo Night) y en un kanji/partícula usada como acento tipográfico puntual (sello, marca de sección), nunca como decoración masiva.
- **Ricing sobrio:** se toma del ricing la disciplina (mono, gaps, neofetch, statusbar, esquinas rectas) y se descarta el exceso (neones saturados, glow, wallpapers de anime, mil colores). Un acento y punto.
- **Todo es monoespaciado:** el cuerpo entero corre en fuente mono. Esto da coherencia "terminal/IDE" sin recurrir a efectos.

---

## Paleta de color (Tokyo Night + Nord)

Sistema de **tres capas por variable CSS**: base (`bg`) → superficie de ventana (`surface`) → texto/acento. El acento es **uno solo por tema** y es lo único cromático que resalta.

### Tokyo Night (tema oscuro por defecto)
| Rol | Hex | RGB |
|---|---|---|
| Background base | `#1a1b26` | 26,27,38 |
| Surface (ventana) | `#16161e` | 22,22,30 |
| Surface alt / raised | `#1f2335` · `#2f3549` | — |
| Selection | `#28344a` | — |
| Texto cuerpo | `#c0caf5` | 192,202,245 |
| Texto header/hero | `#bb9af7` | 187,154,247 |
| Texto dimmed | `#565f89` | — |
| Texto muted | `#414868` | — |
| **Acento primario (default)** | `#bb9af7` (purple) | 187,154,247 |
| Border | `#414868` | — |
| Border activo | = acento | — |
| Success | `#9ece6a` | 158,206,106 |
| Warning | `#e0af68` | 224,175,104 |
| Error | `#f7768e` | 247,118,142 |
| Info / cyan | `#7dcfff` (alt `#2ac3de`) | 125,207,255 |
| Blue | `#7aa2f7` · Orange `#ff9e64` · Magenta `#ad8ee6` | — |

### Nord (tema oscuro "ártico")
| Rol | Hex | Nomenclatura Nord |
|---|---|---|
| Background base | `#2E3440` | nord0 (Polar Night) |
| Surface (ventana) | `#3B4252` | nord1 |
| Surface alt / raised | `#434C5E` | nord2 |
| Border | `#4C566A` | nord3 |
| Texto cuerpo | `#D8DEE9` | nord4 (Snow Storm) |
| Texto bright | `#E5E9F0` · `#ECEFF4` | nord5 · nord6 |
| Texto dimmed | `#88C0D0` | nord8 (Frost) |
| Texto muted | `#81A1C1` | nord9 (Frost) |
| **Acento primario (default)** | `#6A8FF2` (azul vibrante) | — |
| Secundario | `#88C0D0` | nord8 |
| Success | `#A3BE8C` | nord14 (Aurora) |
| Warning | `#EBCB8B` | nord13 |
| Error | `#BF616A` | nord11 |
| Info | `#5E81AC` | nord10 |

> Nota: el azul de header/acento por defecto en Nord es `#6A8FF2` (más vibrante que el `#81A1C1` clásico de Nord, elegido para contraste sobre `nord0`).

### Solarized Light (tercer tema, opción clara — úsalo si la marca quiere modo día)
Background `#fdf6e3` · Surface `#eee8d5` · Texto `#073642` · Header `#2368B3` · Acento `#EC4899` (pink) · Border `#93a1a1` · Dimmed `#586e75` · Muted `#657b83` · Success `#859900` · Warning `#b58900` · Error `#dc322f` · Info `#2aa198`.

### Acentos seleccionables (opcional, 15 swatches)
Tono Tailwind-500: rose `#f43f5e` · pink `#ec4899` · fuchsia `#d946ef` · purple `#a855f7` · violet `#8b5cf6` · indigo `#6366f1` · blue `#3b82f6` · sky `#0ea5e9` · cyan `#06b6d4` · teal `#14b8a6` · emerald `#10b981` · green `#22c55e` · lime `#84cc16` · amber `#f59e0b` · orange `#f97316`. **Para software factory: expón como mucho 2-3, no los 15.** Uno activo a la vez.

**Regla de oro cromática:** el fondo y las superficies hacen el 95% de la pantalla en gama fría desaturada; el acento (uno) marca foco, links, bordes activos y CTA. Los colores semánticos (success/warning/error/info) solo aparecen cuando *significan* algo, nunca decorativos.

---

## Tipografía

- **Familia única (mono-everywhere):** `JetBrains Mono` con fallbacks `Fira Code`, `IBM Plex Mono`, `Consolas`, `Monaco`, `monospace`. No hay familia sans separada — títulos, cuerpo, código y UI comparten la mono. Es lo que produce el aire "IDE/terminal".
- **Pesos:** 300 (light), 400 (regular, cuerpo), 700 (bold, headings). El body sube a ~420 en pantallas Retina para legibilidad.
- **Headings:** mono bold 700, `line-height` 1.3, color = texto header del tema (o acento para el hero).
- **Escala fluida** (clamp min → max, ideal con container queries en un layout de tiles):
  - xs 14→16px · sm 16→18px · **base 18→20px** (estándar de lectura) · lg 20→24px · xl 24→28px · 2xl 28→36px · **3xl 32→44px (hero)**.
- **Cuerpo:** `line-height` 1.6 (relajado 1.8, tight 1.4), `letter-spacing` ~0.025em.
- **Detalles terminal:** links sin subrayado que al hover pasan a subrayado *punteado* y cambian a naranja; `code` inline sobre fondo `code-bg` con el color accent-alt; prompts `$` / `❯` y cursor `_` parpadeante como recurso puntual.

---

## Layout tiling (ventanas mosaico)

El principio: **teselado sin solape, gaps uniformes, esquinas 100% rectas**.

- **Gap universal:** `12px` entre todas las ventanas y en el padding externo del área de tiles. Es el ritmo espacial de todo el diseño.
- **Border-radius:** `0px` en todo (tiles, botones, inputs, código). Las esquinas rectas son parte de la identidad — nunca redondear ventanas.
- **Bordes de ventana:** 1px, color acento al ~30% de opacidad en reposo; al 100% (sólido) + sombra teñida de acento cuando la ventana tiene foco. (Un marco de página completo usa 2px de acento al ~80%.)
- **Superficie de ventana:** semitransparente sobre el fondo, con `backdrop-filter: blur(12px)` (glass sutil). Opacidad de superficie ~0.25–0.4 sin foco, ~0.9 con foco → el foco "materializa" la ventana.
- **Barra de estado (Polybar):** franja superior fija de **36px** de alto, `border-bottom` 2px acento al 30%, fondo surface al ~80% con blur. Tres zonas: izquierda = marca/tag (`[MARCA]` + subtítulo), centro = "workspaces" (secciones navegables con punto `●` indicador de activo), derecha = reloj HH:MM 24h u otro dato de sistema.

### Retícula de referencia (desktop ≥1024px)
Dos columnas al **50 / 50** (`calc(50% - 6px)` cada una, gap 12px):

```
┌──────────────── Polybar 36px ────────────────┐
├───────────────────────┬──────────────────────┤
│  Neofetch  (alto 40%) │                       │
│                       │                       │
├───────────┬───────────┤     CONTENIDO         │
│           │ Preset 15%│     (columna          │
│ Navegación├───────────┤      derecha 50%)     │
│ (ancho    │ Accent 35%│                       │
│  70%)     ├───────────┤                       │
│           │ Fondo  50%│                       │
└───────────┴───────────┴──────────────────────┘
   columna izquierda 50%
```

- **Columna izquierda** = "panel de sistema": ventana Neofetch (40% de alto) arriba; debajo (60%) se divide en Navegación (70% del ancho) + una sub-columna de controles (30%) con tres tiles apilados a 15% / 35% / 50% de alto.
- **Columna derecha** = ventana de CONTENIDO (el "documento" que se lee).
- **Padding interno:** 24px en ventanas de lectura (Neofetch, Navegación, Contenido); 12px en tiles de control pequeños.
- **Móvil (<1024px):** el mosaico no cabe → colapsa a stack vertical (o scroll parallax por capas). Un tema fijo (Tokyo Night) en móvil para no complicar. La retícula tiling es una experiencia de escritorio.

Para una landing de software factory, mapea el 50/50 así: panel de sistema (identidad + navegación + toggles) a la izquierda como "quiénes somos / cómo se opera esto", y el relato de valor a la derecha como documento continuo.

---

## Componentes

- **Ventana (window/tile):** rectángulo con borde acento fino, esquinas rectas, superficie glass, padding generoso. Estados: reposo (borde tenue, superficie translúcida) / foco (borde sólido + sombra de acento + superficie casi opaca).
- **Ventana con barra de título:** cabecera fina (fondo acento al ~8%, borde inferior acento al 20%, texto dimmed mono) con título a la izquierda y acción a la derecha (p. ej. `Copy` en acento). Ideal para bloques de código, specs, snippets.
- **Terminal / bloque comando:** ventana cuya cabecera muestra `$ comando` y botón copiar; cuerpo mono con salida. Recurso para transmitir "esto es real, es ejecutable".
- **Neofetch tile:** ventana firma. Columna izquierda con logo ASCII (bloque/arte) en color acento; columna derecha con pares `label: valor` estilo specs de sistema (`usuario@marca`, línea separadora `-----`, campos, enlaces) y una fila de **8 swatches** de la paleta como firma cromática.
- **Barra de estado (Polybar):** ver Layout. Botones de workspace = punto `●` + etiqueta en minúscula; activo en acento, resto en muted.
- **Navegación tipo árbol de archivos:** lista con conectores de árbol, directorios expandibles (proyectos/blog), indicador de selección activa — la navegación se lee como un explorador de archivos.
- **Badge / etiqueta:** rectángulo pequeño, borde 1px, `padding` ~2.5×1, mono, esquinas casi rectas; variantes default/primary/semánticas. Usar con moderación.
- **Cursor / prompt:** `_` parpadeante, prefijos `$` y `❯` en acento. Micro-detalle, no en cada línea.
- **Bordes ASCII:** separadores con `border-style: dashed` (caja dibujada) como alternativa sobria a líneas sólidas.

---

## Motion / animación

- **Layout (reacomodo de ventanas):** spring físico — rigidez ~300, amortiguación ~30, masa 1. Las ventanas se reposicionan con inercia suave, nunca con saltos.
- **Transiciones de estado (foco, color, opacidad):** 150–300ms, `ease`. Solo `transform` / `opacity` / `background-color` / `backdrop-filter` para mantener 60fps.
- **Cambio de tema:** instantáneo vía swap de variables CSS (clase en `:root`), con las transiciones de color absorbiendo el salto. Sin flash.
- **Fondo (opcional):** orbes de gradiente muy tenues (`blob` ~7s, loop) detrás del glass; desactivables. Deben ser casi imperceptibles — atmósfera, no espectáculo.
- **Detalles:** `fade-in` 0.5s, `slide-up` 0.5s, `pulse-soft` (opacidad 1→0.7) para estados vivos, cursor `blink` 1s, `typing` con `steps()` para el hero (una sola vez, sin bucle molesto).
- **Accesibilidad:** respeta `prefers-reduced-motion` (desactiva smooth-scroll, blobs y typing).

---

## Anatomía de secciones (landing → ventanas)

Traduce el discurso de una software factory a "ventanas del desktop":

1. **Polybar (hero superior fijo):** `[NOMBRE_FACTORY]` + tagline corta a la izquierda; workspaces = secciones (`servicios`, `trabajo`, `proceso`, `contacto`); reloj/estado a la derecha. Comunica "sistema en marcha".
2. **Ventana Neofetch (identidad):** en vez de specs de PC, specs de la factory → `factory@equipo`, línea separadora, campos `stack:`, `foco:`, `entrega:`, `clientes:`, enlaces. Cierra con la fila de 8 swatches como firma.
3. **Ventana Navegación (árbol):** índice tipo explorador de archivos → `servicios/`, `casos/`, `blog/` expandibles. Da sensación de repositorio ordenado.
4. **Ventana Contenido (documento, columna derecha):** el relato largo — propuesta de valor, cómo trabajamos, por qué el largo plazo. Tipografía base 18–20px, mucho aire. Aquí vive el copy que convence.
5. **Tiles de control (mosaico inferior izq.):** convertidos en pruebas/indicadores sobrios — p. ej. selector de tema (demuestra pulcritud de sistema de diseño), métricas, o toggles reales del producto. Alto 15/35/50%.
6. **Ventana Terminal / snippet:** bloque `$ ...` con salida real → credibilidad técnica (deploy, comando, resultado).
7. **CTA:** un solo botón en acento, esquinas rectas, mono. Uno, no cinco.

Regla: cada sección = una ventana con su celda. Si algo no cabe en una celda del mosaico, es que sobra.

---

## Iconografía

- **ASCII art como logotipo:** el sello principal es tipográfico/ASCII (letras de bloque, arte tipo `/\` de Arch, braille art) renderizado en `<pre>` con color acento. Reemplaza al típico logo vectorial.
- **Iconos de tecnología:** set Simple Icons (react-icons `Si*`), monocromáticos, tamaño uniforme, teñidos con variable de tema — solo para stack real (Python, TypeScript, React, Postgres, Neo4j, Kafka, Docker…). Nada de iconos decorativos.
- **Glifos de sistema:** punto `●` (workspace/estado), `$` y `❯` (prompt), `_` (cursor), conectores de árbol (`├─`, `└─`), cajas dashed. Todos de la propia fuente mono.
- **Swatches de paleta:** fila de cuadraditos de color como firma neofetch — funciona de "logo cromático".
- **Kanji / partícula japonesa:** un único glifo como micro-acento de sección o sello (esquina, marca de capítulo). Uno por vista como máximo.

---

## Voz / copy

- **Registro:** técnico, preciso, en minúscula. Etiquetas de sección en minúscula (`servicios`, `proceso`, `contacto`) como nombres de workspace.
- **Metáforas de sistema:** `usuario@marca`, `label: valor`, rutas `carpeta/archivo`, comandos `$ deploy`. El copy imita specs, no eslóganes inflados.
- **Tono de marca (factory):** confianza tranquila y largoplacismo. Frases cortas, afirmativas, sin superlativos ni hype. "Construimos software que se mantiene", no "¡revolucionamos el futuro!".
- **Densidad:** poco texto por ventana, mucho aire. El mono premia la concisión.
- **Japonés:** una palabra/partícula puntual (p. ej. un kanji de "oficio", "flujo" o "calma") como sello, siempre con su lectura o contexto claro; jamás decoración sin sentido.

---

## Cómo mantenerlo SOBRIO

El riesgo del ricing es el exceso. Para software factory (calma, confianza), impón estas restricciones:

1. **Un solo acento activo.** Elige purple (Tokyo Night) o el azul `#6A8FF2` (Nord) y no metas más. Los 15 swatches son tentación; ignóralos o expón 2-3.
2. **El fondo manda.** ~90–95% de la pantalla es base + surface desaturados y fríos. El color es un invitado escaso.
3. **Whitespace = gaps 12px + padding 24px, respetados a rajatabla.** El vacío ordenado es el mensaje. No rellenes celdas por rellenar.
4. **Sin glow, sin neón, sin saturación alta.** Nada de sombras de colores intensas, text-shadow luminoso ni degradados chillones. El glass y las sombras van tenues.
5. **Colores semánticos solo cuando significan.** Success/warning/error/info se ganan su aparición; no son decoración.
6. **Motion invisible.** Springs suaves y fades; el usuario nota orden, no efectos. Blobs de fondo casi imperceptibles o apagados.
7. **Esquinas rectas y alineación perfecta.** Cualquier redondeo o tile desalineado rompe la disciplina de tiling.
8. **Japonés homeopático.** Un kanji por vista. Cero wallpapers de anime, cero cyberpunk.
9. **Jerarquía por tamaño y espacio, no por color.** Los headings mandan por escala mono-bold, no por arcoíris.

Prueba de fuego: si al taparlo con la mano se ve un desktop de Arch limpio de alguien meticuloso (no la captura de r/unixporn más recargada), vas bien.

---

## Do / Don't

**Do**
- Teselar en ventanas con gap 12px, esquinas 0px, borde acento fino.
- Todo en JetBrains Mono; jerarquía por peso (300/400/700) y escala fluida.
- Un acento; fondos fríos desaturados (Tokyo Night o Nord).
- Polybar 36px con workspaces `●` y reloj.
- Neofetch tile como identidad; navegación como árbol de archivos.
- Foco que "materializa" la ventana (borde sólido + superficie opaca + sombra suave).
- Copy técnico, en minúscula, conciso, con calma de largo plazo.
- Un kanji como sello puntual.

**Don't**
- Redondear esquinas, desalinear tiles o romper el gap uniforme.
- Meter varios acentos, degradados saturados, glow/neón o text-shadow luminoso.
- Usar los 15 accents a la vez, ni colores semánticos como decoración.
- Introducir una fuente sans "para el cuerpo": rompe el aire terminal.
- Animaciones llamativas, parallax agresivo o typing en bucle infinito.
- Wallpapers de anime, HUD cyberpunk o kanji como textura de fondo.
- Copy con hype/superlativos: contradice la promesa de confianza y largoplacismo.

---

## Prompt listo para usar

```
Diseña y construye una landing page para una software factory con la estética
"Neo-Tokyo Tiling": un layout de tiling window manager (estilo Hyprland/Arch ricing)
sobrio, tech y con calma de estudio japonés. Debe transmitir confianza, orden y
largoplacismo — NO cyberpunk recargado.

LAYOUT (tiling / ventanas mosaico)
- Teselado sin solape, gaps uniformes de 12px entre todas las ventanas y en el
  padding del área. Border-radius 0px en TODO (esquinas rectas siempre).
- Barra de estado tipo Polybar fija arriba (36px de alto): izquierda = [NOMBRE] +
  tagline; centro = "workspaces" (servicios, proceso, casos, contacto) con punto ●
  indicando el activo; derecha = reloj HH:MM 24h.
- Desktop ≥1024px: dos columnas 50/50 (gap 12px). Izquierda = panel de sistema:
  ventana "neofetch" (40% alto) arriba; abajo (60%) una ventana de Navegación tipo
  árbol de archivos (70% ancho) + una sub-columna (30%) con 3 tiles apilados
  (15% / 35% / 50% de alto). Derecha = ventana de Contenido (el documento largo).
- Padding interno 24px en ventanas de lectura, 12px en tiles pequeños.
- Bordes de ventana: 1px acento al 30% en reposo; sólido + sombra tenue de acento +
  superficie casi opaca cuando la ventana tiene foco. Superficies con backdrop-blur(12px).
- Móvil: colapsa a stack vertical (el mosaico es experiencia de escritorio).

TEMAS (dos, conmutables por swap de variables CSS; incluye toggle)
- Tokyo Night (default): bg #1a1b26, surface #16161e, texto #c0caf5, header #bb9af7,
  dimmed #565f89, border #414868, ACENTO #bb9af7 (purple). Semánticos: success #9ece6a,
  warning #e0af68, error #f7768e, info #7dcfff.
- Nord: bg #2E3440, surface #3B4252, surface-alt #434C5E, texto #D8DEE9, border #4C566A,
  dimmed #88C0D0, ACENTO #6A8FF2 (azul). Semánticos: success #A3BE8C, warning #EBCB8B,
  error #BF616A, info #5E81AC.

TIPOGRAFÍA
- JetBrains Mono en TODO (fallbacks: Fira Code, IBM Plex Mono, monospace). Sin sans.
- Pesos 300/400/700. Headings mono-bold line-height 1.3. Cuerpo 18–20px, line-height 1.6.
- Escala fluida con clamp(): base 18→20, hero 32→44. Links: hover subrayado punteado.

COMPONENTES
- Ventana "neofetch" de identidad: logo ASCII en color acento a la izquierda; a la
  derecha "factory@equipo", línea "-----" y specs (stack:, foco:, entrega:, clientes:),
  cerrando con una fila de 8 swatches de la paleta como firma.
- Navegación como árbol de archivos (servicios/, casos/, blog/) con conectores ├─ └─.
- Ventana Terminal con cabecera "$ comando" + botón Copy y salida mono (credibilidad).
- Un solo CTA en acento, esquinas rectas, mono.

MOTION
- Reacomodo de ventanas con spring suave (rigidez ~300, damping ~30). Transiciones de
  estado 150–300ms usando solo transform/opacity/color. Sin glow. Fade-in de entrada.
  Respeta prefers-reduced-motion.

SOBRIEDAD (obligatorio)
- UN solo acento activo. 90–95% de la pantalla en fondos fríos desaturados.
- Cero neón, glow, degradados saturados o sombras de colores intensas.
- Colores semánticos solo cuando significan algo. Whitespace y alineación impecables.
- Jerarquía por tamaño/peso, no por color.

TOQUE JAPONÉS
- Un único kanji/partícula como sello discreto de sección o marca (uno por vista).
  Nada de wallpapers de anime ni HUD cyberpunk.

COPY / VOZ
- Técnico, en minúscula, conciso, con calma de largo plazo. Metáforas de sistema
  (usuario@marca, label: valor, rutas carpeta/archivo, $ comando). Sin hype ni
  superlativos: "construimos software que se mantiene", no "revolucionamos el futuro".

Entrega HTML/CSS (o React + Tailwind) responsive, con toggle Tokyo Night ⇄ Nord,
esquinas rectas, gaps de 12px y foco de ventana funcional.
```
