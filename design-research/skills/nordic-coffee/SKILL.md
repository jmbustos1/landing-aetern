---
name: design-nordic-coffee
description: Café artesanal nórdico — minimalista, sobrio, cálido y terroso (linen/paper de fondo, tinta charcoal, taupe artesanal, serif editorial + Inter uppercase espaciado). Invócala para diseñar landings/webs de tiendas de café, roasters, tés o marcas artesanales que necesiten calma, aire y refinamiento editorial.
---

# Nordic Coffee — Silencio, luz de invierno y calidez de madera

## Identidad / vibe
Minimalismo artesanal nórdico-japonés (concepto "Artisan Minimalist"): una landing que se siente como entrar a un café silencioso de invierno, con luz suave, mesas de madera y mucho aire. La estética destila calma y oficio: fondos color papel/linen, tinta casi negra, un único acento taupe terroso, tipografía serif editorial e itálicas para lo poético. El lujo aquí no es brillo ni saturación, sino restricción, whitespace generoso, bordes finísimos y micro-detalles (grano de papel, light leaks, revelados en scroll). Todo respira quietud; nada grita.

## Paleta de color
Paleta única (no hay modo oscuro; toda la web vive en tonos claros y cálidos). Tokens exactos del repo (definidos como `@theme` de Tailwind v4):

| Token | Hex | Rol |
|---|---|---|
| `canvas` | `#F8F7F2` | Fondo global (linen / papel cálido) |
| `canvas-muted` | `#F0EEE6` | Superficie secundaria (placeholders, mapas, tarjetas apagadas) |
| `ink` | `#1A1A1A` | Texto principal, botones sólidos (charcoal profundo, no negro puro) |
| `ink-muted` | `#666666` | Texto secundario / descripciones |
| `accent` | `#8B7E74` | Acento único: taupe artesanal (eyebrows, links, dots, hovers, líneas) |
| `accent-hover` | `#7A6D63` | Estado hover del acento |
| `wood` | `#C2B299` | Tono madera cálido (reservado; usado con moderación) |

Reglas de uso:
- Blanco puro `#FFFFFF` aparece solo como superficie elevada puntual (aside de "Private Booking", chips de mapa) sobre el canvas linen.
- Las transparencias de `ink` sustituyen a los grises: bordes `border-ink/5` (casi invisibles), overlays `bg-ink/5`, texto tenue `text-ink/40`, `text-ink/60`, `text-ink/20`. Esta es la firma del sistema: escalas de opacidad de la tinta en vez de una paleta de grises.
- El acento se usa SIEMPRE con parsimonia: una eyebrow, un punto "abierto ahora", un `.` tras el logotipo, un subrayado que aparece en hover. Nunca como fondo de área grande (salvo `accent/5`, casi imperceptible).
- Selección de texto: `selection:bg-accent/20`.

## Tipografía
Dos familias, cargadas desde Google Fonts:
- Serif (headings y voz poética): **Noto Serif JP** → `--font-serif: "Noto Serif JP", serif`. Pesos 400/500/700. Es la fuente protagonista de todos los títulos y de los textos "de atmósfera" (a menudo en *itálica*).
- Sans (UI, etiquetas, cuerpo funcional): **Inter** con fallback **Noto Sans JP** → `--font-sans: "Inter", "Noto Sans JP", ui-sans-serif, system-ui, sans-serif`. Pesos 400/500/600 (Inter) y 400/500/700 (Noto Sans JP).

Base del `body`: `font-sans`, `line-height: 1.6`, `letter-spacing: 0.01em`, `antialiased`. Todos los `h1–h6` por defecto son `font-serif font-medium tracking-tight`.

Escala fluida (clamp), definida como tokens:
- `text-display`: `clamp(2.5rem, 10vw, 5rem)` — títulos de página (Menu, News, Access, Contact).
- `text-h1`: `clamp(1.75rem, 6vw, 3rem)`.
- `text-h2`: `clamp(1.5rem, 4vw, 2.25rem)`.
- `text-h3`: `clamp(1.25rem, 3vw, 1.75rem)`.
- Hero: título aún mayor, `clamp(2.5rem, 10vw, 4.5rem)`, serif, `leading-none`, `text-balance`.
- Cuerpo: `text-base`/`text-lg`, `leading-relaxed`/`leading-loose`. Medida controlada: `article`/`.prose` limitados a `max-width: 65ch`.

Rasgos tipográficos característicos (la firma):
- **Etiquetas/eyebrows**: sans, `text-[10px]` (a veces `[9px]`), `uppercase`, `font-bold`, tracking extremo — utilidades `letter-spacing-wide` (`0.1em`), `letter-spacing-widest` (`0.2em`) e incluso `tracking-[0.5em]` en la eyebrow del hero. Color `accent` o `ink/40`.
- **Itálica serif** para frases poéticas, descripciones de producto y citas ("Coffee is the silence within the storm.").
- **Números tabulares** (`tabular-nums`) en precios y fechas.
- **Texto vertical** (`writing-mode: vertical-rl`) para detalles decorativos (indicador "Scroll", labels de imagen "The Atmosphere").

## Layout y espaciado
- Contenedor principal: `max-w-7xl mx-auto`; contenido de lectura/formularios `max-w-3xl`.
- Padding lateral: `px-6` en móvil, `md:px-12` en desktop.
- Ritmo vertical MUY generoso: secciones a `py-24`, `py-32`, `py-40`; el footer a `py-32`; separaciones internas `space-y-8/12/24/32`. El whitespace es el material principal.
- Grid editorial de 12 columnas (`md:grid-cols-12`) con reparto asimétrico e intencionadamente desequilibrado: p. ej. `col-span-7` + `col-span-5`, y la segunda columna empujada hacia abajo (`md:pt-32`) para crear un escalonado tipo revista. Gaps amplios: `gap-12`, `gap-16`, `gap-24`.
- Separadores: líneas hairline `border-ink/5` (a menudo bajo un heading, `border-b … pb-12`), o bordes discontinuos `border-dashed` para bloques "de marca".
- Alineación de headings de sección: `items-baseline`, título grande a la izquierda y un link "View full collection →" pequeño a la derecha.
- Header fijo de `h-20` con spacer del mismo alto para no saltar el contenido.

## Componentes
**Botones** (`rounded-nordic` = radio `2px`, casi recto; `transition-all duration-300`, `tracking-wide`):
- `primary`: `bg-ink text-canvas`, hover `opacity-90`.
- `outline`: `border border-ink/10 text-ink`, hover `bg-ink/5`.
- `ghost`: `text-ink/60`, hover `text-ink` + `bg-ink/5`.
- Detalle premium: en variantes no-ghost, una línea de 1px en `bg-accent` en el borde inferior que se revela en hover con `scale-x-0 → scale-x-100`, `origin-left`, `duration-500`.
- CTA de formulario: botón sólido `bg-ink`, `uppercase tracking-[0.2em]`, ancho completo en móvil.

**Cards** (producto/bean): sin sombra apreciable; se apoyan en imagen + tipografía.
- Imagen en `aspect-4/5`, `object-cover`, borde `border-ink/5`, fondo `canvas`.
- Hover: imagen `scale-105` en `duration-1000` (zoom lentísimo) + overlay `bg-ink/5` con `shimmer-aurora`; el título pasa a color `accent`.
- Título serif `text-xl`; descripción `text-xs`, `italic`, `font-serif`, `line-clamp-2`.

**Sombras**: prácticamente ausentes. Único token: `--shadow-nordic: 0 4px 20px rgba(0,0,0,0.03)` — sombra ultra-sutil. La profundidad se logra con bordes hairline y capas de opacidad, no con sombras.

**Radios**: `--radius-nordic: 2px` (`rounded-nordic`). Estética "sharp": esquinas casi rectas. Puntos/dots sí son `rounded-full`.

**Nav / Header**: fijo, `bg-canvas/80` + `backdrop-blur-sm`, borde inferior `border-ink/5`. Logo serif `text-2xl` con un punto acento (`Emma Coffee` + `<span class="text-accent">.</span>`). Enlaces `text-[10px]`, `uppercase`, `font-bold`, tracking widest, `text-ink/60 → text-ink` en hover. Un CTA "Contact" como botón. Indicador "Live Status" (punto acento con `animate-ping`) que muestra "Open Now / Closed" según el horario. Menú móvil: overlay full-screen que entra con `translate-x-full → 0` (`duration-500`), enlaces serif `text-4xl`.

**Formularios** (minimalismo puro): inputs sin caja — `bg-transparent`, solo `border-b border-ink/10`, `py-4`, sin outline (`outline-hidden`); en focus la línea inferior pasa a `border-accent` (`transition-colors duration-300`). Labels arriba: `text-xs`, `uppercase`, `font-bold`, `tracking-widest`, `text-ink/40`. `textarea` con `resize-none`. Mucho `space-y-12` entre campos.

**Tablas de menú**: dos columnas (nombre+descripción a la izquierda `col-span-10`, precio `tabular-nums` a la derecha `col-span-2`, alineado a la derecha). Categoría como heading `text-xs uppercase tracking-[0.3em] text-accent` con borde inferior `accent/20`. Sin líneas de tabla; separación por whitespace (`space-y-12`).

**Chips / tags**: notas de cata como `px-3 py-1 bg-ink/5 text-xs italic font-serif` (sin radio). Badges de categoría: `bg-accent/5 text-accent/60`, `text-[10px] uppercase`.

## Motion / animación
Todo es lento, suave y "expensive"; nada rebota rápido. Easing firma: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out muy pronunciado).
- **Fade-in de entrada** (`animate-fade-in`): `opacity 0 → 1` + `translateY(30px) → 0`, `1.5s`, con `animation-delay` escalonado por elemento (0.2s, 0.4s, 0.6s, 0.8s) en el hero.
- **Scroll reveal** (`.reveal` → `.active` vía IntersectionObserver, threshold 0.1): `opacity` + `translateY(30px)` en `1.2s` con la misma curva; `transition-delay` escalonado por índice.
- **Page enter**: fade + `translateY(10px)` en `0.6s ease-out`.
- **Hover imagen**: `scale-105` en `duration-1000` (muy lento).
- **Botón**: línea acento revelándose lateralmente (`scale-x`, `duration-500`).
- **Light leak** (`light-leak`): gradiente radial taupe `rgba(139,126,116,0.1)`, `blur(60px)`, `mix-blend-mode: soft-light`, deriva `20s infinite alternate`.
- **Shimmer aurora** (`shimmer-aurora`): gradiente diagonal muy tenue que fluye en `8s linear`, en overlays de imagen/mapa.
- **Live status / mapa**: punto acento con `animate-ping` + `animate-pulse`.
- **Scroll indicator**: `animate-bounce` con label vertical.
- Respeta `prefers-reduced-motion: reduce` (desactiva animaciones de entrada).

## Anatomía de secciones
Landing (index):
1. **Hero** (`h-[90vh]`, centrado): imagen de fondo `object-cover` a `opacity-20` con `grayscale-[20%]`, gradiente `from-canvas/60 … to-canvas` que la funde con el fondo, y capa `light-leak`. Encima: eyebrow "Artisan Coffee Roasters" (uppercase, tracking 0.5em), título serif gigante bilingüe, subtítulo en itálica serif, dos CTAs ("Explore Menu" primario + "Visit Us" outline). Indicador "Scroll" vertical abajo.
2. **Curated Selections** (`py-40`): cabecera con "Curated *Selections*" (serif, la segunda palabra en itálica acento) y link "View full collection →". Grid editorial 12-col asimétrico con las cards de beans destacados + un **Branding Block** con borde discontinuo que cita la filosofía ("Coffee is the silence within the storm." / "Our Philosophy").
3. **Footer** (`py-32`, `font-serif`, borde superior hairline): grid 12-col → (a) marca + bio en itálica + icono social (Instagram, stroke fino 1.2), (b) Hours con Live Status y horario, (c) Location con dirección y un **mapa estilizado** (placeholder `aspect-video`, dot acento pulsante, shimmer). Barra inferior: copyright `text-[9px] uppercase tracking widest text-ink/30` + "Artisan Minimalist Design".

Overlay global: capa fija de **grano de papel** (`artisan-grain`, textura fine-grained) a `opacity-[0.035]`, `pointer-events-none`, sobre toda la página.

Páginas internas comparten el patrón: header con `text-display` + subtítulo `text-lg text-ink-muted`, luego contenido en grid asimétrico (About: columna visual 5 + contenido 7 con "philosophy" y stats Roast/Space; Access: info 4 + mapa 8; Menu: MenuTable + aside "Private Booking"; News: lista con fecha `tabular-nums`, badge de categoría y flecha en hover; Bean detail: imagen 4/5 con badge de tueste + ficha de perfil con chips de notas de cata).

## Imágenes e iconografía
- **Fotografía**: cálida, de café/atmósfera; tratada para integrarse, no dominar. En hero: muy desaturada y tenue (`opacity-20`, `grayscale-[20%]`) fundida con el canvas. En cards: a color, `aspect-4/5`, zoom lento en hover.
- **Aspect ratios**: `4/5` (retrato, productos y atmósfera), `video` (16:9, mapas y bloques secundarios).
- **Placeholders**: cajas `bg-canvas`/`canvas-muted` con label uppercase tracking-wide muy tenue (`text-ink/10–20`), a veces en texto vertical ("The Atmosphere", "Craftsmanship").
- **Iconografía**: SVG line-art minimalista, `stroke-width` finísimo (1.2–1.5), sin relleno (`fill=none`), sin librería de iconos pesada. Flechas (`→`, `&rarr;`) como microdetalle en links/hovers.
- **Grano de papel** global como textura unificadora.
- Favicon SVG propio.

## Voz / copy
Bilingüe japonés + inglés, tono contemplativo y poético. El inglés se usa para etiquetas y frases-lema cortas ("Artisan Coffee Roasters", "Curated Selections", "Minimalism is not emptiness", "Coffee is the silence within the storm."); el japonés para la prosa emotiva. Microcopy sereno y de oficio: "Quiet, bright minimalism in every cup", "静寂と温もりの一杯" (una taza de silencio y calidez). Categorías y CTAs sobrios: "Explore Menu", "Visit Us", "View full collection", "Get in touch", "Back to Collection". Descripciones de producto sensoriales (notas de cata: Jasmine, Lemon, Bergamot; origen y proceso). Nada de urgencia, descuentos ni exclamaciones: invita, no vende.

## Do / Don't
**Do**
- Apóyate en whitespace y ritmo vertical amplio (`py-24/32/40`) como estructura principal.
- Usa la escala de opacidad de `ink` para bordes (`ink/5`), texto tenue y overlays, en vez de grises.
- Reserva el acento taupe para detalles mínimos (eyebrow, dot, subrayado hover, el punto del logo).
- Combina serif editorial (títulos, itálicas poéticas) con Inter uppercase micro-etiquetado de tracking extremo.
- Grids editoriales asimétricos y escalonados (col-span 7/5 con offset vertical).
- Motion lento con `cubic-bezier(0.16,1,0.3,1)`; reveal en scroll escalonado.
- Bordes hairline y radios de 2px; texturas sutiles (grano, light leak, shimmer).

**Don't**
- No uses sombras marcadas, glassmorphism llamativo ni degradados saturados.
- No emplees colores brillantes o de alto contraste fuera de la paleta terrosa; nada de negro puro (`#000`) ni blanco frío como fondo.
- No llenes áreas grandes con el acento; pierde su fuerza.
- No uses esquinas muy redondeadas (`rounded-xl+`), botones grandes con degradado, ni animaciones rápidas/bouncy.
- No satures de texto: respeta `max-width: 65ch` y deja respirar.
- No añadas iconos gruesos/rellenos ni sets recargados; line-art fino y escaso.
- No introduzcas modo oscuro salvo petición: la marca vive en luz cálida.

## Prompt listo para usar
```
Diseña y construye desde cero la landing de una tienda/roaster de café artesanal con estética "café nórdico minimalista, cálido y terroso" (Artisan Minimalist). No copies código de referencia; recrea el lenguaje visual.

Look & feel: calma, luz de invierno, madera y mucho aire; refinamiento editorial más que lujo brillante. La restricción y el whitespace son el material principal.

Paleta (única, sin modo oscuro):
- Fondo global linen/papel cálido #F8F7F2; superficie secundaria #F0EEE6; blanco puro solo como superficie elevada puntual.
- Texto charcoal profundo #1A1A1A (nunca negro puro) y texto secundario #666666.
- Acento único taupe artesanal #8B7E74 (hover #7A6D63), usado con mucha parsimonia. Tono madera #C2B299 reservado.
- Para bordes/overlays/texto tenue usa opacidades de la tinta (ink/5 en bordes hairline, ink/40–60 en texto), no una paleta de grises.

Tipografía:
- Titulares y frases poéticas en serif editorial (estilo Noto Serif JP), con itálicas para lo emotivo.
- UI, etiquetas y cuerpo funcional en sans (Inter con fallback Noto Sans JP).
- Eyebrows/labels en sans 10px, UPPERCASE, bold, con letter-spacing extremo (0.2em–0.5em).
- Escala fluida con clamp: display clamp(2.5rem,10vw,5rem); h1 clamp(1.75rem,6vw,3rem); cuerpo 16–18px con line-height 1.6–1.8; medida de lectura máx 65ch. Números tabulares en precios y fechas.

Layout: contenedor máx ~1280px, padding lateral 24px móvil / 48px desktop, ritmo vertical muy generoso (secciones de 96–160px). Grids editoriales de 12 columnas asimétricos y escalonados (p. ej. 7/5 con una columna empujada hacia abajo). Separadores como líneas hairline; algún bloque con borde discontinuo.

Componentes: botones casi rectos (radio 2px) — sólido charcoal (hover leve opacidad) y outline con borde ink/10; en hover, una fina línea acento que se revela de izquierda a derecha. Cards sin sombra, con imagen en aspecto 4:5, borde hairline, y zoom lentísimo (1s) + título que vira a acento en hover. Sombras casi inexistentes (como mucho 0 4px 20px rgba(0,0,0,0.03)); la profundidad viene de bordes finos y capas de opacidad. Formularios minimalistas: inputs sin caja, solo línea inferior que pasa a acento en focus, labels uppercase pequeñas.

Motion: lento y elegante, easing cubic-bezier(0.16,1,0.3,1). Fade-in de entrada (opacidad + translateY 30px, ~1.2–1.5s) escalonado; reveal en scroll con IntersectionObserver; light leak radial taupe difuminado y un shimmer diagonal sutil en overlays. Respeta prefers-reduced-motion. Añade una textura de grano de papel global a ~3–4% de opacidad como capa fija.

Secciones (en orden): (1) Hero a ~90vh centrado, con foto de café muy desaturada y tenue fundida con el fondo por un gradiente + light leak, eyebrow uppercase, título serif grande, subtítulo en itálica y dos CTAs (sólido + outline), más un indicador "Scroll" vertical. (2) "Curated Selections": cabecera con título grande y link "View full collection →", grid editorial asimétrico de productos + un bloque de marca con cita/filosofía en itálica. (3) Header fijo translúcido con blur, logo serif con un punto acento, nav de micro-etiquetas uppercase y un indicador "Open now/Closed" con punto pulsante. (4) Footer amplio en grid: marca+bio en itálica, horario, ubicación con mapa estilizado (placeholder con dot acento pulsante), barra de copyright en micro-texto uppercase.

Iconografía: line-art fino (stroke 1.2–1.5, sin relleno), escaso; flechas → como microdetalle. Imágenes cálidas, tratadas para integrarse; placeholders con label uppercase muy tenue, a veces en texto vertical.

Voz/copy: contemplativa y de oficio, sin urgencia ni descuentos. Frases-lema cortas en inglés ("Artisan Coffee Roasters", "Curated Selections", "Minimalism is not emptiness") y prosa sensorial; notas de cata como Jasmine, Lemon, Bergamot. Invita, no vende.

Entrega una landing responsive, accesible y coherente con estos tokens y principios.
```
