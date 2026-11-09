---
name: design-wabi-sabi
description: Monochrome, frosted-glass, high-whitespace aesthetic — muted blacks/whites/silvers, grayscale imagery, organic torn-paper section dividers and understated motion. Invoke when designing a calm, refined, wabi-sabi landing page (e.g. a specialty coffee shop) where restraint and negative space carry the mood.
---

# Wabi-sabi — Quiet, imperfect, refined

## Identidad / vibe
Se siente sereno, sobrio y de gama alta sin gritar. La página es casi monocroma: fondo negro texturizado con un patrón de puntos tenues, video a pantalla completa en tono apagado/gris, y paneles de "vidrio esmerilado" (glassmorphism) que flotan sobre secciones blancas y limpias. La sensibilidad wabi-sabi aparece en lo imperfecto y orgánico: los divisores entre secciones son bordes rasgados tipo papel (no líneas rectas), las formas son blandas (blobs, radios generosos), la imaginería va en escala de grises, y el color se reserva casi por completo — solo asoma en hovers. El lujo está en el espacio en blanco y en el detalle tipográfico, no en la decoración.

## Paleta de color
Casi todo es monocromo + translúcidos; el color acento es mínimo y solo en interacción.

Neutros base
- Blanco `#ffffff` (fondos de contenido, texto sobre oscuro)
- Negro `#000000` (fondo global, botón sólido de envío)
- Gris plata `#c0c0c0` (líneas, subrayados, detalles)
- Gris oscuro `#1b1b1b` (superficies oscuras)

Fondos
- Contenido claro `#fff`, alterno `#f9f9f9`
- Fondo global negro `#000` con textura de puntos: `radial-gradient(circle at 1px 1px, #333 1px, transparent 1px)`
- Header glass `rgba(15,15,15,0.4)`
- Overlays sobre hero/projects `rgba(0,0,0,0.225)`–`rgba(0,0,0,0.25)`

Texto (sobre claro)
- Fuerte `#222`, medio `#555`, tenue `#666`, mutado `#444`

Vidrio / bordes (translúcidos blancos)
- Fondo glass `rgba(255,255,255,0.06)`, hover `rgba(255,255,255,0.12)`
- Borde glass `rgba(255,255,255,0.12)`, hover `rgba(255,255,255,0.25)`
- Foco de input `rgba(255,255,255,0.5)`
- Divisor sobre claro `rgba(0,0,0,0.1)`

Acentos (solo hover de iconos sociales — usar con MUCHA moderación)
- LinkedIn `#0077b5`, GitHub `#333`, verde codepen `hsl(139 59% 55%)`, gradiente Instagram
- Selección de texto: fondo `#c5e1ff` (azul muy suave), texto `#000`

No hay tema claro/oscuro conmutable: es un único esquema oscuro-de-fondo con islas de contenido claras.

## Tipografía
Familias (Google Fonts)
- Cuerpo / UI global: **Montserrat**, fallback `sans-serif` (pesos 300, 400, 500, 600, 700)
- Headings de footer: **Poppins**, fallback `sans-serif` (300, 400, 600, 700, 800)
- **Playfair Display** (serif elegante) se importa en el CSS pero no se ve aplicada explícitamente — disponible como opción de heading serif; documentado, no confirmado en uso.

Escala (rem)
- h1 `3.25` / semibold 600 — en hero, con parte del texto en light 300 + opacity 0.8 para contraste de peso
- h2 `2` / regular 400
- h3 `1.5`, h4 `1.2`
- Título de sección `2.5` / semibold 600, `text-transform: uppercase`
- Subtítulo `1.4`, body `1`, small `0.95`, tiny `0.875`, párrafo hero `1.125`
- Labels de formulario/contacto `0.7rem` uppercase, weight 600, `letter-spacing: 2px`, color tenue

Line-height: tight `1.4` (títulos), normal `1.6` (cuerpo).
Letter-spacing: normal `1px`, wide `2px` (labels/CTA), tag `0.05rem`; logo `-0.5px`.
Rasgo de cuerpo: los párrafos "about" añaden `word-spacing: 0.1em` y `letter-spacing: 0.3px` para un aire más pausado.

## Layout y espaciado
- Contenedor centrado `max-width: 1200px`, `margin: 0 auto`.
- Padding de sección generoso: `8rem 2rem` (secciones principales), `3rem 2rem` (bloques menores). El whitespace es el protagonista.
- Escala de spacing: xs `0.5` / sm `1` / md `1.5` / lg `2` / xl `2.5` / xxl `3rem`. Ritmo consistente en múltiplos.
- Grids: proyectos `repeat(3, 1fr)` → 2 → 1 col; footer `2fr 1fr 1fr`; formulario en grid de 2 columnas con `column-gap 1.5rem` / `row-gap 1.75rem`.
- Hero a pantalla completa `100dvh`, flex centrado, contenido alineado a la izquierda.
- Radios: `8px` (base), `12px` (grande), `999px` (full/pills). Blur de vidrio único: `blur(16px)`.
- Filosofía: pocas cosas, muy espaciadas; islas de contenido claras separadas por divisores orgánicos; nada llega a los bordes sin aire.

## Componentes
Mixin "glass" reutilizable (corazón del sistema): fondo `rgba(255,255,255,0.06)`, texto blanco, `backdrop-filter: blur(16px)`, borde `1px rgba(255,255,255,0.12)`, radio 12px, y en hover sube fondo/borde a 0.12/0.25. Todo lo flotante comparte esta receta.

- Botones (hero): glass, `padding 1rem 1.5rem`, peso regular, radio 8px, sin color de marca — solo el vidrio se aclara en hover.
- Botón de envío (form): sólido negro `#000`, texto blanco, borde 2px negro, radio 12px; en hover el texto ABRE su `letter-spacing` (0.14em) — microinteracción sutil.
- Cards de proyecto: glass, `box-shadow: 0 8px 20px rgba(0,0,0,0.05)`, imagen redondeada arriba, título 1.4rem, descripción en blanco a `opacity 0.75` weight light, fila de tags glass tipo pill (`0.4rem 0.85rem`, radio 8px, letter-spacing 0.05rem), barra de acciones con borde superior y botones-icono cuadrados 2.25rem.
- Header/nav: fijo, transparente arriba y se vuelve glass al hacer scroll (`.scrolled` aplica el mixin y encoge el ancho a 1200px). Links con subrayado que se revela desde la izquierda (`transform: scaleX(0→1)`), y efecto "dim siblings": al hover del grupo, los demás links bajan a `opacity 0.5`.
- Formularios: inputs glass translúcidos, radio 12px, foco = borde blanco al 0.5; labels uppercase diminutas; select con chevron SVG inline; errores en rojo `#dc3545` con mensaje deslizante; éxito en verde suave `#d4edda`.
- Footer: panel oscuro glass, iconos sociales en círculos blancos 55px que en hover escalan 1.1 y adoptan el color de marca con glow.
- Botón scroll-to-top: mismo glass, 75px, aparece con fade.

Sombras: muy suaves (`0 8px 20px rgba(0,0,0,0.05)`, `0 12px 24px rgba(0,0,0,0.08)`); nada duro. Bordes finos de 1px translúcidos por todas partes.

## Motion / animación
- Transiciones base: `0.25s` (fast), `0.3s` (default), `0.5s` (slow), siempre `ease`. Todo es lento y suave.
- Intro splash: overlay blanco a pantalla completa con el nombre; palabras hacen fade-in escalonado y luego el panel se desvanece (`slideOut` ~2.25s). Da una entrada calmada, ceremonial.
- Underline reveal en links: `scaleX(0)→(1)` con origen izquierdo en hover (nav, footer).
- Botón "scroll down": animación `bounce` infinita (2s).
- Emoji de saludo con animación `wave` (rotación) una vez al cargar.
- Blob orgánico con `border-radius` animándose entre valores (respiración de forma, 8s infinito) — presente como patrón aunque comentado en el repo.
- Header morphea (ancho/padding/glass) al hacer scroll.
- CTA de envío: expande letter-spacing en hover. Errores/éxito: `slideIn` (translateY + opacity, 0.2s).
- Filosofía: micro-movimientos sutiles y orgánicos, nunca llamativos; predominan fades, reveals y respiraciones lentas.

## Anatomía de secciones
1. Intro / splash (overlay animado con el nombre, se autodesvanece).
2. Header fijo (logo + nav + selector de idioma), transparente que se vuelve glass al scrollear.
3. Hero: video full-bleed en loop con overlay oscuro; contenido a la izquierda (h1 saludo + nombre, h2 con línea decorativa a la izquierda, párrafo, dos botones glass); indicador "scroll down" con bounce; divisor rasgado abajo.
4. About: fondo blanco; dos columnas de texto ("cómo llegué aquí" / "qué hago") + sección de Skills en columnas con iconos.
5. Projects: fondo con overlay glass oscuro; título uppercase; grid de 3 cards; divisores rasgados arriba y abajo.
6. Contact: título + descripción + lista de datos (email/tiempo de respuesta/disponibilidad) con iconos glass, junto a un formulario en grid de 2 columnas.
7. Footer: panel oscuro glass en grid de 3 columnas (info/navegación/conectar) con iconos sociales circulares y barra inferior de copyright.

## Imágenes e iconografía
- Video de héroe a pantalla completa (`.webm` con poster `.avif`), `object-fit: cover`, fijo detrás del contenido, silenciado y en loop. Tratamiento apagado/atmosférico bajo overlay oscuro.
- Imágenes en escala de grises: retrato del blob usa `filter: grayscale(1) drop-shadow(...)`. Preferir fotografía desaturada/monocroma.
- Divisores de sección como PNG de borde rasgado/orgánico (`divider-top.png`, `divider-bot.png`) que imitan papel roto — clave del acabado wabi-sabi imperfecto.
- Fotos de proyecto en `.avif`, ancho completo de la card, esquinas redondeadas 8px, aspect ratio libre (auto).
- Iconos vía react-icons (line icons finos); iconos sociales en círculos.
- Textura de fondo: patrón de puntos radiales sutil sobre negro.

## Voz / copy
Cercana pero profesional, en primera persona, frases cortas y con confianza tranquila. Ejemplos: "Hey, I'm Mark 👋", "I build clean, fast, and user-focused websites.", "Got a Project in Mind?", "I write clean, maintainable code and care about the details. Drop a message and let's talk." Labels en MAYÚSCULAS diminutas ("EMAIL", "RESPONSE TIME", "OPEN TO"). CTA directos y breves ("Explore My Work", "SEND"). El tono valora claridad, minimalismo y oficio — evita superlativos y jerga de marketing.

## Do / Don't
Do
- Dejar que el espacio en blanco respire; padding de sección grande (~8rem).
- Mantener casi todo monocromo; reservar el color para hovers puntuales.
- Usar el mixin glass consistentemente en todo lo flotante (blur 16px, bordes 1px translúcidos).
- Imágenes desaturadas/grises; bordes de sección orgánicos/rasgados.
- Motion lento y suave (fades, reveals de subrayado, respiraciones), 0.25–0.5s ease.
- Tipografía cuidada: pesos contrastados (light vs semibold), labels uppercase con letter-spacing amplio.

Don't
- No usar colores saturados de fondo ni gradientes llamativos.
- No sombras duras ni bordes gruesos; nada de neón salvo el glow mínimo de un icono en hover.
- No animaciones bruscas, rebotes agresivos ni parallax exagerado.
- No saturar de elementos: si dudas, quita.
- No líneas divisorias perfectamente rectas donde encaje un borde orgánico.
- No copy grandilocuente; mantener microcopy honesto y breve.

## Prompt listo para usar
```
Diseña una landing page de un solo scroll para una tienda/tostador de café de especialidad
("cafetería de autor") con una estética wabi-sabi: belleza en lo imperfecto, sobrio y refinado,
donde el espacio en blanco y el detalle tipográfico cargan todo el peso.

Paleta casi monocroma: fondo oscuro (negro #000) con una textura de puntos radiales muy sutil,
islas de contenido en blanco #ffffff y crema muy claro #f9f9f9, texto en grises #222/#555/#666,
y plata #c0c0c0 para líneas y subrayados. Nada de colores saturados; el único acento cálido
(un tono café/tostado apagado) aparece solo en hovers puntuales. Selección de texto en azul suave.

Superficies de "vidrio esmerilado": paneles translúcidos con fondo rgba(255,255,255,0.06),
backdrop-filter blur(16px), borde 1px rgba(255,255,255,0.12) que se aclara en hover, radios de
8–12px y sombras muy suaves. Todo lo flotante comparte esta receta.

Tipografía: Montserrat para cuerpo/UI (pesos 300–700) contrastando light vs semibold; headings
opcionalmente en un serif elegante (Playfair Display) para dar refinamiento. Títulos de sección
en MAYÚSCULAS con letter-spacing amplio; labels diminutas de 0.7rem uppercase con letter-spacing 2px.
Escala: h1 ~3.25rem, títulos 2.5rem, body 1rem, line-height 1.6 en cuerpo. Párrafos con un
word-spacing/letter-spacing ligeramente aireado.

Layout: contenedor 1200px centrado, padding de sección muy generoso (~8rem verticales), ritmo de
spacing en múltiplos (0.5/1/1.5/2/2.5/3rem). Mucho aire; pocos elementos por pantalla.

Secciones, en orden:
1) Intro splash breve: overlay blanco con el nombre de la cafetería que hace fade-in escalonado y
   se autodesvanece con calma.
2) Header fijo transparente que se convierte en panel glass al hacer scroll; nav con subrayado que
   se revela de izquierda a derecha en hover.
3) Hero a pantalla completa (100dvh): video en loop, silenciado, desaturado/atmosférico de granos de
   café / vapor / manos preparando pour-over, bajo un overlay oscuro; a la izquierda el nombre + un
   tagline sobrio ("Café tostado con paciencia", "Slow coffee, hecho a mano") + dos botones glass
   ("Ver el menú", "Visítanos"); indicador de scroll con bounce suave; borde inferior de la sección
   en forma de papel rasgado orgánico (no recto).
4) Nuestra historia / filosofía: fondo claro, dos columnas de texto tranquilo sobre el oficio y la
   imperfección del tueste artesanal.
5) Cafés / menú: grid de 3 cards glass con foto desaturada del grano, nombre, notas de cata en tags
   tipo pill translúcidos y precio; divisores rasgados arriba y abajo de la sección.
6) Visítanos / contacto: datos (dirección, horario, "tiempo de respuesta") con iconos glass en lista,
   junto a un formulario de reserva/contacto en grid de 2 columnas con inputs translúcidos, labels
   uppercase y un botón de envío sólido negro cuyo texto abre su letter-spacing en hover.
7) Footer: panel oscuro glass en 3 columnas (contacto / navegación / redes) con iconos sociales en
   círculos que escalan suave en hover.

Imágenes en escala de grises/desaturadas y fotografía con textura; bordes de sección orgánicos
tipo papel roto en lugar de líneas rectas. Iconografía de línea fina.

Motion lento y orgánico: transiciones 0.25–0.5s ease, fades, subrayados que se revelan,
respiraciones de forma; nada brusco ni llamativo. Un único esquema (fondo oscuro con islas claras),
sin tema conmutable.

Voz del copy: cercana, honesta y breve, en primera persona, con confianza tranquila; valora el
oficio y el minimalismo. Evita superlativos y jerga de marketing.

Prioriza siempre el espacio en blanco: si dudas, quita. La sensación final debe ser calma,
artesanal y de gama alta.
```
