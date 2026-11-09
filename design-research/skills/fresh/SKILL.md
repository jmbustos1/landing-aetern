---
name: design-fresh
description: Estética "Premium neutro limpio" de estudio (Astro + Bulma/Alpine): sobria, whitespace generoso, tipografía redondeada, paleta neutra gris-azulada fácil de re-tematizar. Invócala para diseñar una landing SaaS/producto/tienda con look premium claro, tarjetas suaves y CTAs redondeados.
---

# Fresh — Landing premium neutra, aireada y re-tematizable

> Base real: repo "Fresh" de cssninjaStudio. Stack = **Astro 4 + Bulma 0.9 (SCSS) + Alpine.js**, NO Tailwind. La estética se transporta a cualquier stack; lo que importa son los tokens y el ritmo. Todos los valores de abajo son EXACTOS del repo salvo donde se indique "Bulma default".

## Identidad / vibe
Limpio, luminoso y confiado, sin gritar. Fondo casi blanco con secciones alternadas en grises muy tenues que separan bloques sin líneas duras. Titulares en una sans redondeada y amistosa (Nunito) sobre cuerpo en una grotesca neutra y legible (Roboto Flex): profesional pero cálido. El color se usa con moderación — el neutro domina, y un acento cálido puntúa CTAs, divisores y hovers. La sensación es "producto cuidado de estudio de diseño": mucho aire, jerarquía tranquila, nada de bordes pesados ni sombras dramáticas.

## Paleta de color
Neutros protagonistas; los acentos son puntuales. Hex exactos del repo (`_colors.scss`):

**Neutros / superficies**
- `#ffffff` White — superficie de tarjetas y navbar fija
- `#fcfcfc` Smoke white — superficie de testimonios (blanco cálido apenas roto)
- `#fbfbfb` Section grey — fondo de secciones "feature grey" y hero
- `#f2f2f2` Grey white
- `#EFF4F7` Light grey — fondo de sección alterna (frío, azulado)
- `#ededed` Fade grey — bordes de tarjetas/íconos (a menudo oscurecido ~4%)
- `#cccccc` Border grey · `#cecece` Placeholder — bordes de inputs y texto placeholder

**Texto**
- `#444F60` Blue-grey — texto principal de títulos y cuerpo enfático (protagonista tipográfico)
- `#344258` Dark grey — variante más oscura
- `#999999` Muted grey — subtítulos y párrafos secundarios
- `#878787` Basaltic grey — texto de inputs
- `#98a9c3` Light blue-grey — links de footer
- `#A9ABAC` Title grey · `#66676b` Medium grey (botón back-to-top)

**Acentos (usar con moderación)**
- `#4FC1EA` Primary — azul cielo, botón primario y overlay de imagen
- `#F39200` Secondary — naranja ámbar, el acento "de firma": divisores, hovers de nav/íconos, botón sign-up, iconos sociales del footer
- `#00efb7` Accent — verde menta (terciario, raro)

**Superficies oscuras**
- Footer: fondo `#444F60` (blue-grey), texto blanco, links `#98a9c3` → hover `#fcfcfc`

**Sombras** (muy suaves, nunca duras)
- Light shadow: `-1px 3px 15px 0 rgba(0,0,0,0.06)` — tarjetas, focus de inputs, hover de íconos
- Raised card: `0 5px 25px 0 rgba(0,0,0,0.2)`
- Raised button hover: sombra multicapa teñida del color del botón, `opacity .8`

No hay modo oscuro; solo el footer es oscuro.

## Tipografía
Dos familias variables cargadas vía `@fontsource-variable`:
- **Headings:** `'Nunito Variable', sans-serif` — geométrica redondeada, amistosa. Aplica a `h1–h6`, `.title`, `.subtitle`, planes de pricing.
- **Cuerpo / UI:** `'Roboto Flex', sans-serif` — grotesca neutra. Aplica a `body`, párrafos, botones. (Nota: el hero mezcla — el título grande usa Roboto Flex, no Nunito.)
- Iconos glyph puntuales: `'Material Icons'` (comilla de testimonial, flecha back-to-top).

**Escala** — `$body-size: 14px` (base reducida; Bulma escala desde ahí). Escala de títulos = Bulma default:
- `.title.is-1` ~3rem · `is-2` ~2.5rem · `is-3` ~2rem — usados: hero=is-1, títulos de sección=is-2, sub-features=is-3
- `.subtitle.is-5` ~1.25rem — subtítulos, casi siempre `.is-muted` (#999)
- Cuerpo/párrafo ~14px, line-height ~1.5; testimonio 1.25rem / line-height 1.6
- Precios: 2.4rem 700; nombre de plan 1.4rem 600

**Pesos:** títulos 700 (`.is-bold`) o 600; botones 500; cuerpo 400. Footer headers 500.
**Letter-spacing:** por defecto normal; solo los headers de columna del footer usan `text-transform:uppercase` + `letter-spacing:1px`.
**`.is-spaced`** (Bulma) añade margen inferior extra a títulos que preceden un subtítulo — patrón de ritmo recurrente.

## Layout y espaciado
- **Contenedor:** Bulma `.container` centrado; `$fullhd-enabled: false` (tope ~1344px, no salta a 1600). Bloques de contenido acotados: feature-cards y testimonios a `max-width: 940px`; `.title-wrapper` a `max-width: 500px` centrado (titulares de sección cortos y centrados).
- **Grid:** sistema de `columns`/`column is-N` de 12 (Bulma). Patrones: hero 5/7, features alternados 4/5 con offsets (`is-offset-1/2`), grid de iconos `is-3` (4 por fila), formulario `is-6 is-offset-3`.
- **Ritmo vertical:** secciones con `.section.is-medium` (Bulma ≈ padding 9rem vertical) → whitespace MUY generoso entre bloques. Hero: `.hero-body` padding 6rem arriba/abajo; hero completo `is-fullheight`. `.content-wrapper` = 60px vertical. Separadores entre features `mt-60`.
- **Escala de spacing utilitaria:** múltiplos redondos de 20 — mb/mt 20/40/50/60, `huge-pb:100px`. Filosofía: aire abundante, dejar respirar; centrar cabeceras cortas; alternar fondos gris-tenue en vez de bordes para segmentar.

## Componentes
**Botones** (`.button`)
- Radio `0.65rem` (suave); variante `.rounded`/`is-rounded` = pill 500px. Transición `all .5s`.
- Altura CTA 44px, peso 500. `.primary-btn` (azul) y `.secondary-btn` (naranja) sólidos con texto blanco; variantes `.btn-outlined` transparentes que se rellenan en hover.
- `.raised:hover` = eleva con sombra multicapa teñida del color + `opacity .8` (efecto flotante suave). Botón secundario por defecto = neutro/blanco Bulma (p.ej. "Discover", planes no destacados).

**Cards**
- `.feature-card`: fondo blanco, radio 3px, padding 2.5rem; `.is-bordered` = borde 1px fade-grey. Icono central 80×80 con `margin:30px auto`. Texto acotado a 210px centrado.
- `.feature-card.is-pricing`: borde 1px, radio 6px, light-shadow, altura fija 420px, padding 20px. Precio con `::before "$"` y `::after "per month"`.
- `.flex-card.raised`: sombra `0 5px 25px rgba(0,0,0,.2)`, overflow hidden, radio ~3px.
- Icon-box (`.feature-icon`): círculo 60×60, borde 1px, icono 2rem gris; hover eleva `translateY(-5px)` + light-shadow y tiñe el icono de naranja.

**Nav** (`.navbar.is-fresh`)
- Transparente sin sombra sobre el hero; min-height ~5rem, logo 36px. Items en muted-grey, hover → naranja. Dropdown con `border-top` naranja, min-width 220px.
- Patrón "navbar clone": una copia fija (`translateY(-100%)`) que se desliza hacia abajo al hacer scroll (`.is-active`), fondo blanco + sombra sutil `0 0 8px rgba(0,0,0,.12)`. Links Sign up = botón pill secundario.

**Formularios**
- `.input/.textarea` estilo Bulma, sin sombra en reposo; focus = borde gris apenas más oscuro + light-shadow (glow suave, sin anillo de color). Placeholder `#cecece`. Inputs `.is-medium` altura ~44px. Labels 500 / 0.9rem. Botón de envío CTA primario raised.

**Testimonios**
- Tarjeta smoke-white, radio 0.65rem, padding 2rem, sombra `0 0 5px rgba(0,0,0,.15)`. Comilla decorativa (Material Icon) semi-transparente arriba-izq. Avatar redondo 48px + nombre 600 blue-grey / rol pequeño más claro.

**Divisor:** barra 60×3px, `border-radius:50px`, color naranja, centrada bajo las cabeceras de sección — el detalle de marca recurrente.

## Motion / animación
Discreta y funcional, nunca llamativa.
- Utilidad `.animated`: duración 0.5s, `fill-mode: both`; delays escalonados `.delay-1..4` (.25/.5/.75/1s).
- Keyframes: `fadeInLeft` y `fadeInUp` (translate 20px + opacidad 0→1) — reveals de entrada al hacer scroll (clases `is-title-reveal`, `is-feature-reveal`, `is-icon-reveal` disparadas vía Alpine intersect). `gelatine` (squash&stretch 0.6s) para micro-feedback puntual.
- Transiciones de hover: botones `all .5s`; íconos/tarjetas `all .3s`. Elevaciones sutiles (`translateY(-5px)`, sombra + opacidad).
- Astro `ViewTransitions` para navegación entre páginas. Preloader con spinner SVG (rings) sobre fondo blanco. Back-to-top que aparece (scale .7→1, fade) abajo-derecha.

## Anatomía de secciones
Orden real de la landing (`index.astro`):
1. **Hero** `is-fullheight is-grey` — navbar transparente encima; izq: título grande bold + subtítulo muted + 2 CTAs (primario raised + neutro "Discover"); der: ilustración (max 520px). `hero-foot` = tira de logos de clientes (partner-logo, max 100px, en `.tabs is-centered`).
2. **Feature cards** (3 col) — title-wrapper centrado + divisor; 3 tarjetas bordeadas con icono, texto corto y botón.
3. **Side features** (fondo feature-grey) — dos filas alternadas texto/imagen (4/5 con offsets), reveal.
4. **App showcase** (feature-grey) — texto + ilustración grande (workers.svg).
5. **Grid de integraciones** — title-wrapper + rejilla de 12 icon-boxes (`is-3`), iconos de marca vía iconify.
6. **Testimonios** — sección con imagen de fondo + overlay teñido (color primary, opacidad ~.6), 3 tarjetas de cita con avatar.
7. **Pricing** — 3 planes centrados (`pricing-wrap`), el del medio destacado con botón primario raised.
8. **Contacto** (section-light-grey) — formulario centrado 6/offset-3, campos en grid, botón enviar a la derecha.
9. **Footer oscuro** (blue-grey) — logo + 4 columnas de links + iconos sociales (naranjas) + badge.
- Extras: sidebar off-canvas (hamburguesa animada morphing SVG) y modal de auth con tabs Login/Register.

## Imágenes e iconografía
- **Ilustraciones SVG** planas y amistosas (workers, features, pricing) centradas, con `max-width` acotado (480–520px), sin marco. Mockups en PNG.
- **Iconos:** `iconify-icon` (web component) — sets de marcas (fa6-brands, etc.) para integraciones y social; iconos glyph de Material Icons para adornos (comilla, flecha). Iconos de feature dentro de círculos con borde.
- **Avatares:** redondos 48px. **Logos de cliente:** monocromos, altura contenida, en fila centrada.
- **Imagen de fondo:** solo la sección de testimonios usa foto (Unsplash) con overlay de color semi-transparente para legibilidad. Aspect ratios libres; el aire alrededor hace el trabajo.

## Voz / copy
Directo, breve y optimista. Titulares de valor en una línea ("Manage and deploy your apps seamlessly.", "Drop us a line or two"). Subtítulos como remate ingenioso o de apoyo, en muted ("With great Responsability", "We'd love to hear from You"). Microcopy de acción escueto: "Get Started", "Discover", "Free Trial", "Sign up". Tono cercano sin jerga; frases cortas, mucho respiro también en el texto.

## Do / Don't
**Do**
- Dejar respirar: padding vertical de sección grande, cabeceras cortas centradas, contenido acotado (~940px).
- Segmentar por fondos gris-tenue alternados (#fbfbfb / #EFF4F7), no por líneas ni cajas.
- Un solo acento cálido para CTAs/divisores/hovers; el resto neutro.
- Radios suaves (0.65rem) o pills; sombras muy tenues y elevaciones sutiles en hover.
- Titulares en sans redondeada, cuerpo en grotesca neutra, subtítulos en muted-grey.

**Don't**
- Nada de bordes pesados, sombras duras, o más de un acento compitiendo.
- No saturar de color: el neutro manda.
- No animaciones llamativas — solo fades/reveals cortos y micro-elevaciones.
- No apretar el layout ni llenar el ancho completo con texto.
- No mezclar demasiadas familias tipográficas (dos + un glyph puntual, basta).

## Prompt listo para usar
> Genera una landing page de una **tienda/cafetería de especialidad con toque asiático** reutilizando ESTA base premium neutra, re-tematizada a una paleta café. Look & feel:
>
> **Vibe:** premium sereno y cálido, mucho whitespace, "estudio de diseño" aplicado a café artesanal — acogedor, no rústico ni recargado. Aire abundante, jerarquía tranquila.
>
> **Paleta (re-tematizar los neutros a café, conservar la lógica de tokens):** fondo casi blanco crema (#FBF8F4) con secciones alternadas en beige/arena muy tenue (#F5EFE7 / #EFE6DA) en lugar de los grises. Texto principal en marrón oscuro casi negro (#3B2E28 / #2A211C) sustituyendo al blue-grey; texto secundario en topo apagado (#8A7A6D). **Acento de firma** = un ámbar tostado / caramelo (#C8791E o #A5632B) donde antes iba el naranja: divisores, hovers de nav e íconos, botón principal. **Acento secundario/asiático** = un verde matcha/jade sobrio (#6E7B5B) o un rojo terracota muy puntual, usado con extrema moderación (sellos, un CTA, detalles). Footer oscuro en marrón espresso (#2A211C) con links en topo claro. Sombras igual de suaves (rgba(0,0,0,.06)).
>
> **Tipografía:** conservar el par — titulares en una sans redondeada cálida (estilo Nunito), cuerpo en una grotesca neutra legible (estilo Roboto Flex). Opcional: un detalle tipográfico asiático sutil (un carácter kanji/hanzi decorativo en el hero o divisores), nunca como fuente de cuerpo. Titulares de valor en una línea, subtítulos muted como remate.
>
> **Layout:** mismo ritmo — hero a pantalla casi completa (texto izq + imagen/producto der), tira de "as seen in / partners", secciones con padding vertical generoso, cabeceras cortas centradas con el divisor-barra (ahora ámbar), contenido acotado ~940px, fondos beige alternados para segmentar. Reutilizar la anatomía: hero → destacados en 3 tarjetas → features alternadas texto/imagen → grid de "nuestro proceso/orígenes" con iconos → testimonios sobre foto con overlay cálido → precios o menú → formulario de contacto/reserva → footer oscuro de 4 columnas.
>
> **Componentes:** tarjetas blancas de radio suave con borde beige fino y sombra tenue; botones de radio 0.65rem o pill, primario ámbar sólido con hover elevado (translateY + sombra teñida + opacidad); icon-boxes circulares con borde que se elevan y tiñen de ámbar en hover; testimonios en tarjeta crema con avatar redondo y comilla decorativa; inputs sin anillo de color, focus con glow suave.
>
> **Secciones de café a incluir:** hero con bolsa/taza de producto e ilustración plana; "nuestros granos/orígenes" (tarjetas); proceso de tueste (features alternadas); grid de variedades/single-origins con iconos; testimonios de clientes; menú o planes de suscripción (3 columnas, el del medio destacado); formulario de reserva/newsletter; footer.
>
> **Imágenes:** fotografía cálida de café/granos/interior con overlay de color café semi-transparente solo en la sección de testimonios; ilustraciones planas para el resto; iconos lineales (vía iconify) para variedades y proceso; avatares redondos; logos monocromos en la tira de partners. Aspect ratios libres, dejar que el aire enmarque.
>
> **Motion:** discreto — fades/reveals cortos al hacer scroll (fadeInUp/Left), micro-elevaciones en hover de tarjetas y botones, transiciones .3–.5s. Nada estridente.
>
> **Copy:** cercano, breve, optimista; titulares de una línea, microcopy de acción escueto ("Pídelo", "Descúbrelo", "Suscríbete").
>
> **No hagas:** bordes pesados, sombras duras, más de dos acentos compitiendo, layout apretado, o animaciones llamativas. El neutro café manda; el ámbar puntúa.
