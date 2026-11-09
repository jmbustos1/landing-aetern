---
name: design-tui-terminal
description: Estética TUI/terminal para el browser (monospace, cajas ASCII, badges de statusline, paletas rice como Catppuccin/Nord/Gruvbox). Invócala al diseñar o generar landings de software factory con condimento tech CALMADO y tasteful.
---

# TUI Terminal — el terminal como lenguaje de calma tech

Destilado del sistema de diseño **WebTUI** (CSS modular, MIT). Aquí se captura el LENGUAJE de diseño para recrearlo, no el código verbatim: reglas, tokens con sus nombres exactos, paletas rice con hex reales y primitivos. Cuando algo no existe en el sistema, se dice explícitamente.

## Identidad / vibe

- **Idea central:** una TUI (Terminal User Interface) renderizada en el navegador. Todo se dibuja con caracteres monospace, cajas de box-drawing ASCII y badges tipo statusline de editor (Vim/Neovim, tmux, Arch ricing).
- **Diferencia TUI vs GUI:** las TUIs representan la UI con caracteres ASCII/Unicode en vez de widgets gráficos. Dos reglas fundacionales: (1) fuente monospace, (2) pensar en **celdas de carácter** (`ch` de ancho, `lh` de alto) para todo espaciado, tamaño y posición — nunca en `px/rem/%`.
- **Vibe de marca para software factory:** el terminal es el CONDIMENTO, no el plato. Limpio, ordenado, sobrio. Transmite calma, confianza y largoplacismo: un `git status` limpio, un statusline en `NORMAL`, nada de "hacker caótico", glitch, matrix rain ni ruido. Rice sobrio = Arch bien configurado, no un desktop saturado de conky.
- Filosofía del sistema: **modular** (importa solo lo que usas), **purista** (markup y CSS mínimos), apoyado en **CSS `@layer`** para precedencia (`@layer base, utils, components;`) casi sin `!important`.

## Paleta y motor de temas (rice)

El motor NO tiene colores de marca hardcodeados: define **roles semánticos** y cada tema rice los rellena. Re-tematizar = cambiar `data-webtui-theme` en `<html>` (o cualquier ancestro), sin tocar componentes.

**Roles base (tokens exactos)** — 4 niveles de fondo + 3 de texto:

- `--background0` (fondo principal) · `--background1` · `--background2` · `--background3` (cada nivel = más contraste/elevación)
- `--foreground0` (texto principal) · `--foreground1` (texto secundario, es el default de párrafos) · `--foreground2` (texto atenuado / placeholders / links)
- Tokens de borde derivados: `--box-border-color`, `--table-border-color`, `--separator-color` (por defecto `= var(--foreground0)`).

**Light/dark base** (sin plugin): claro `--background0:#fff … --foreground0:#000`; `[data-webtui-theme='dark']` → `#000 … #fff`. Grises intermedios `#ddd/#bbb/#999` y `#444/#888`.

Los temas rice se aplican con `data-webtui-theme='<tema>'`; el motor usa selectores de prefijo (`[data-webtui-theme|='catppuccin']`) para mapear la paleta cruda a los roles. Paletas incluidas en el repo con sus hex:

**Catppuccin** (4 flavours: mocha default, macchiato, frappe, latte). Mapeo de roles (mocha):
- `--background0=--base #1e1e2e` · `--background1=--surface0 #313244` · `--background2=--surface1 #45475a` · `--background3=--surface2 #585b70`
- `--foreground0=--text #cdd6f4` · `--foreground1=--subtext1 #bac2de` · `--foreground2=--overlay2 #9399b2`
- Fondos extra fuera de rango: `--mantle #181825`, `--crust #11111b` (útiles para "escenario" detrás de una caja).
- Acentos (mocha): `--rosewater #f5e0dc` `--flamingo #f2cdcd` `--pink #f5c2e7` `--mauve #cba6f7` `--red #f38ba8` `--maroon #eba0ac` `--peach #fab387` `--yellow #f9e2af` `--green #a6e3a1` `--teal #94e2d5` `--sky #89dceb` `--sapphire #74c7ec` `--blue #89b4fa` `--lavender #b4befe`. `latte` es la variante clara (base `#eff1f5`, text `#4c4f69`).

**Nord** (`data-webtui-theme='nord'`, solo oscuro). Grupos con nombres nativos:
- Polar Night `--nord0 #2e3440 … --nord3 #4c566a` → fondos. Snow Storm `--nord4 #d8dee9` `--nord5 #e5e9f0` `--nord6 #eceff4` → textos (`--foreground0=--nord6`).
- Frost `--nord7 #8fbcbb` `--nord8 #88c0d0` `--nord9 #81a1c1` `--nord10 #5e81ac`. Aurora `--nord11 #bf616a`(rojo) `--nord12 #d08770`(naranja) `--nord13 #ebcb8b`(amarillo) `--nord14 #a3be8c`(verde) `--nord15 #b48ead`(morado).

**Gruvbox** (dark/light × hard/medium/soft). Dark medium: `--background0 #282828`, `--gb-dark-bg1 #3c3836`, fg `--gb-dark-fg1 #ebdbb2`. Hard `#1d2021`, soft `#32302f`. Acentos: `--gb-red #fb4934` `--gb-green #b8bb26` `--gb-yellow #fabd2f` `--gb-blue #83a598` `--gb-purple #d3869b` `--gb-aqua #8ec07c` `--gb-orange #fe8019` (dark). Light usa hex más apagados (`--gb-red #cc241d`, etc.).

**Otras rice del repo:** **Vitesse** (dark/black/light, muy sobrio y de bajo croma — fg `#dbd7ca`, acentos mate `--red #cb7676` `--green #4d9375` `--blue #6394bf`; ideal para el tono más calmado). **Everforest** (dark/light × hard/medium/soft, verdes tierra `--green #a7c080` `--blue #7fbbb3`). **Osmium** (oscuro azul-violeta, `--root #14131e`, fg `#c8d5f1`, pares bg/fg por acento). Cada tema añade sus variantes de acento a badges/buttons/mark.

**Acentos entre temas:** los nombres difieren (`--blue` vs `--aqua`). Para código agnóstico usa fallbacks: `color: var(--gb-aqua, var(--blue, var(--cyan)));`.

## Tipografía

- **Todo monospace, siempre.** `--font-family: monospace` por defecto; recomendado sobrescribir con una mono con ligaduras: JetBrains Mono, Menlo, Monaco, IBM Plex Mono, Berkeley Mono. Se activan `font-variant-ligatures: common-ligatures`.
- Tokens: `--font-size: 16px`, `--line-height: 1.3`, `--font-weight-normal: 400`, `--font-weight-bold: 700`. Se ajustan en `:root` bajo `@layer base`.
- **Escala tipográfica plana:** los headings `h1–h6` usan el MISMO `font-size` que el body; solo cambia el peso (bold). La jerarquía se crea con badges, cajas, espaciado y color — no con tamaños grandes. (Para una landing puedes escalar `h1` con `ch`/múltiplos, pero mantén la lógica monospace.)
- Detalle heredado del terminal: `word-break: break-all` en body (rompe como una terminal real). Para landing marketing quizá prefieras `normal`; decisión consciente.

## Layout y espaciado

- **Rejilla de caracteres.** Unidades: `ch` (ancho de una celda, el del glifo `0`) y `lh` (alto de línea). Una caja de 10×5 celdas = `width:10ch; height:5lh`. El padding canónico de cajas es `1lh 1ch`.
- **Anchos de contenido en `ch`:** columnas de lectura ~`64ch` de max-width; se puede cuantizar el ancho a celdas exactas con `round(calc(100% - 2ch), 1ch)`.
- **Layout declarativo (plugin):** elementos `row` y `column` (flex). Modificadores por atributo con sufijo `-`: `gap-="1"` (=`1lh 1ch`), `gap-="2"`; `self-="grow|nogrow|shrink|noshrink|nobasis"`; `align-="<items> <justify>"` (p.ej. `start-between`, `center-center`).
- **Convención sintáctica clave:** todos los modificadores son atributos **con guion final** — `box-`, `is-`, `variant-`, `size-`, `cap-`, `shear-`, `marker-`, `gap-`. `box="..."` (sin guion) NO funciona. Selectores usan match parcial: `[is-~='badge']` (palabra), `[cap-^='round']` (empieza), `[cap-$='round']` (termina).

## Componentes / primitivos

Se activan con `box-="..."` (utilidad) o `is-="..."` (componente). Todos respetan la rejilla `ch/lh` y los roles de color.

- **Cajas ASCII** (`box-`): tipos de borde `square`, `round`, `double`, combinables (`double round`). Dibujadas con `::before/::after` imitando box-drawing. Props: `--box-border-color`, `--box-border-width` (2px), `--box-rounded-radius` (4px), `--box-double-border-width` (1px). **Shear** (`shear-="top|bottom|both"`): quita el padding de un borde para incrustar contenido SOBRE la línea del marco (así se logran títulos/badges "colgando" del borde, como captions en un box de TUI).
- **Badges** (`is-="badge"`): la pieza estrella. Píldora tipo statusline con caps configurables: `cap-="round"`, `triangle`, `slant-top`, `slant-bottom`, `ribbon` (aplicables a inicio `cap-^=` y/o fin `cap-$=`). Variantes de color por rol (`variant-="background1"`, `foreground2`, …) y por acento del tema (`variant-="blue"`, `green`, `mauve`…). Alto = `1lh`. Componen statuslines encadenando badges (modo NORMAL, rama git, archivo, encoding, posición).
- **Buttons** (`<button>` o `is-="button"`): tamaños `size-="small|default|large"` (default = `3lh` de alto). `box-="round"` los vuelve outline (borde en vez de relleno). Variantes por rol/acento. Estados con lenguaje terminal: `:focus` → bold + underline; `:disabled` → `line-through`; `:active` invierte fg/bg.
- **Inputs / textarea** (`is-="input"`): fondo `--background1`, `min-width:24ch`, tamaños `small|default|large`, placeholder en `--foreground2`.
- **Pre / code** (`is-="pre"`, `<pre>`): bloque de código con fondo `--background1` (o degradado sutil en variante default). En texto, `code` inline lleva fondo `--background1` y padding `1ch`.
- **Separator** (`is-="separator"`): línea horizontal/vertical (`direction-="x|y"`) hecha con degradado a media celda; caps `bisect`/`edge`; color por `--separator-color` o `variant-`.
- **Mark** (`<mark>` / `is-="mark"`): resaltado con `bg-="..."` y `fg-="..."` mapeando roles.
- **Listas con marcadores de árbol:** `ul` usa `- ` por defecto; `marker-="bullet"` (`•`), `marker-="tree"` (`├`, `┌`, `└`) y `marker-="round-tree"` (`╭ ╰`). Permite dibujar **file trees ASCII** reales.
- **Typography:** blockquote con barra lateral (`::before` sobre `--background2`); links subrayados en `--foreground2`; `strong` sube a `--foreground0`.
- **Otros del sistema** (en `@webtui/css`): `table`, `checkbox`, `radio`, `switch`, `range`, `progress`, `tooltip`, `popover`, `dialog`, `accordion`, `view`, `spinner`. Todos monospace y por celdas.

## Motion / animación

- **Casi nula, y esa es la estética.** El sistema base no tiene transiciones de hover ni parallax. La única animación nativa es el **spinner** (`is-="spinner"`): recorre una cadena de glifos con `steps()` — sin interpolación suave, avanza carácter a carácter como una terminal real. Variantes: default `/-\|`, `dots ⣷⣯⣟⡿⢿⣻⣽⣾`, `arrows`, `cross +x`, `square ◰◳◲◱`, `pie`, `half ◐◓◑◒`, `bar-vertical/horizontal`. Velocidad `speed-="slow|medium|fast"` (2s/1s/0.5s), `direction-="reverse"`.
- Regla de marca: si añades motion, que sea **discreto y "de terminal"**: cursor parpadeante (step, no fade), typing por caracteres, statusline que cambia de modo. Nada de easing exuberante, nada que distraiga de la calma.

## Anatomía de secciones

Patrón observado en la landing del propio sistema (hero WebTUI):

- **Escenario:** fondo oscuro profundo (`--crust`/`--mantle` en Catppuccin) como "wallpaper del ricing", sobre él una **ventana**: `column box-="square"` con `--box-border-color: var(--background1)` (borde sutil, no de alto contraste), max-width `~64ch`, centrada.
- **Hero:** `h1` que mezcla texto plano con badges de acento (`<span is-="badge" variant-="green"> Terminal UIs</span> for the <span is-="badge" variant-="blue"> Web</span>`), párrafo en `--foreground1`, un `separator`, y una `row gap-="1"` de botones (primario sólido + secundario `variant-="background1"`).
- **Statusline (firma del estilo):** barra inferior fija de `2lh` con badges encadenados imitando Vim: `NORMAL` (acento), ` master` (rama git con glyph), nombre de archivo (`self-="grow"` empuja el resto a la derecha), `utf-8`, `Top`, `1:1`. Es el detalle que más "vende" el terminal sin ensuciar.
- **Secciones de contenido:** cada feature como una caja ASCII con badge-título "colgado" del borde superior vía `shear-`. Widgets decorativos de terminal (reloj, mini-chart ASCII, file tree, player) como acento ambiental, en dosis pequeñas.
- **Orden típico de landing software factory:** statusline/nav → hero (ventana con badges) → prueba social como badges/logos mono → features en cajas ASCII → "cómo trabajamos" como file tree o comandos `$` → CTA en caja → footer estilo prompt.

## Iconografía

- **Nerd Fonts** vía plugin `@webtui/plugin-nf`: da acceso a glyphs de Font Awesome, Devicons, Octicons, etc. (referencia: nerdfonts.com/cheat-sheet). Se usa añadiendo `"Symbols Nerd Font"` AL FINAL del stack `--font-family` y luego insertando el codepoint (`&#xf36f;` en HTML o `content: "\e68b"` en CSS `::before`). Ejemplos vistos: `` (rama git), logos de lenguajes, iconos de web.
- Alternativa sin dependencias: **glyphs Unicode/box-drawing** directos — `├ ┌ └ ╭ ╰ │ ─`, bloques `▁▃▄▅▆▇█`, círculos `◐◓◑◒`, flechas `←↑→↓`. Suficientes para el 90% del look y más ligeros.
- Regla sobria: iconos monocromos, tamaño de una celda, mismo color que el texto contiguo. Nada de iconos multicolor tipo emoji.

## Voz / copy

- **Tono de terminal, medido.** Etiquetas cortas en minúsculas o mayúsculas de modo (`NORMAL`, `INSERT`, `utf-8`, `master`). Comandos como copy: `$ npm i`, `git commit -m "ship"`, prompts con `~/`. Rutas y nombres de archivo como títulos (`index.astro`, `README.md`).
- Para software factory: mezcla la precisión del terminal con frases de confianza y largo plazo. Ej.: `$ ./ship --calm`, "software que envejece bien", "commits pequeños, decisiones sostenibles". Micro-copy en badges: `● stable`, `v1.0`, `uptime 99.99`.
- Evita jerga de "hacker" agresiva, exclamaciones o hype. La voz es la de un ingeniero senior tranquilo: concisa, honesta, sin ruido.

## Cómo mantenerlo SOBRIO (calma sobre tech)

1. **Un solo tema rice, de bajo croma.** Prefiere Vitesse, Nord, Everforest o Catppuccin (mocha/latte) — no mezcles varias paletas. El acento es UNA familia (p.ej. azul/teal), no un arcoíris.
2. **Acentos con cuentagotas.** El 90% de la superficie vive en `background0/1` y `foreground0/1`. Los `variant-` de color solo en badges puntuales (statusline, un CTA, un estado). Nunca cajas enteras de acento.
3. **Bordes sutiles.** Usa `--box-border-color: var(--background1|2)` en vez de `--foreground0`; el marco debe insinuarse, no gritar.
4. **Aire generoso en celdas.** Espaciado en múltiplos de `1lh`/`1ch`; deja respirar. La calma nace del ritmo regular de la rejilla.
5. **Motion mínimo.** Como mucho un cursor o spinner discreto. Sin parallax, sin glitch, sin matrix.
6. **Jerarquía por estructura, no por tamaño.** Cajas, separadores, badges y peso bold — no headings gigantes.
7. **Iconos monocromos y escasos.** Un glyph por concepto; que compartan color con el texto.
8. **Contenido honesto.** Copy calmado y concreto; el terminal es marco, no personaje.

## Do / Don't

**Do**
- Pensar todo en `ch`/`lh`; alinear a la rejilla de caracteres.
- Re-tematizar solo cambiando `data-webtui-theme` y los tokens de rol.
- Statusline con badges encadenados como firma sutil del estilo.
- Cajas ASCII con `shear-` para títulos colgados del borde.
- Monospace consistente en TODO (incluidos headings y números).
- Fallbacks de acento entre temas (`var(--aqua, var(--blue))`).

**Don't**
- Mezclar fuentes proporcionales con la mono (rompe la ilusión de terminal).
- Saturar de colores de acento o usar varias paletas rice a la vez.
- Bordes de máximo contraste en cada elemento (ruido visual).
- Animaciones suaves/exageradas, glitch, neón, "hacker aesthetic".
- Olvidar el guion final en modificadores (`box=` en vez de `box-`).
- Escalar la jerarquía con font-sizes grandes en vez de estructura.
- Copiar el CSS de WebTUI verbatim: recrea el lenguaje con tus tokens.

## Prompt listo para usar

```
Diseña y genera una landing page para una SOFTWARE FACTORY con estética TUI/terminal
CALMADA (rice sobrio, monospace, cajas ASCII), pensada para transmitir calma,
confianza y largoplacismo. El terminal es el CONDIMENTO tech, no el caos.

SISTEMA VISUAL
- Todo monospace (JetBrains Mono / IBM Plex Mono / Berkeley Mono, con ligaduras).
  Headings al mismo tamaño que el body: la jerarquía se crea con estructura, no con
  font-sizes grandes.
- Piensa y maqueta en celdas de carácter: unidades ch (ancho) y lh (alto), padding
  canónico 1lh 1ch, columnas de lectura ~64ch. Nada de px/rem arbitrarios.
- Tokens de rol semántico: --background0..3 (fondo→elevación) y --foreground0..2
  (texto→atenuado). Re-tematizable cambiando un solo atributo data-theme.

PALETA (elige UNA rice sobria de bajo croma; UNA familia de acento)
- Catppuccin Mocha: base #1e1e2e, surface0 #313244, text #cdd6f4; acento único
  blue #89b4fa o teal #94e2d5. Fondo "escenario" crust #11111b.
  (Alternativas igual de sobrias: Nord, Vitesse, Everforest.)
- 90% de la superficie en background0/1 + foreground0/1. Acentos SOLO en badges
  puntuales y un CTA. Bordes sutiles (color = background1/2, no foreground0).

PRIMITIVOS
- Cajas ASCII (box- square/round/double) para agrupar; usa "shear" para colgar un
  badge-título del borde superior.
- Badges tipo statusline de Vim para la firma del estilo: barra con NORMAL /  rama /
  archivo / utf-8 / posición. Caps redondeados o rectos, monocromos.
- Botones: primario sólido + secundario outline (box- round). Focus = bold+underline.
- Listas como file trees ASCII (marcadores ├ ┌ └) para "cómo trabajamos".
- Bloques de código/comandos con prompt $ como prueba de producto.

ICONOGRAFÍA
- Glyphs Unicode/box-drawing (├ ─ │ ● ◐ ▇ ↑) o Nerd Fonts, monocromos, tamaño 1 celda,
  mismo color que el texto contiguo. Sin emoji multicolor.

MOTION
- Mínimo y "de terminal": a lo sumo un cursor parpadeante por steps o un spinner
  discreto (/-\| o dots). Sin parallax, glitch ni neón.

VOZ / COPY
- Tono de ingeniero senior tranquilo: conciso, honesto, sin hype. Micro-copy de
  terminal (NORMAL, v1.0, ● stable, $ ./ship). Mensaje de fondo: software que
  envejece bien, decisiones sostenibles, relaciones a largo plazo.

ANATOMÍA (orden)
1) Statusline/nav superior con badges.
2) Hero: ventana (caja ASCII, borde sutil) sobre fondo escenario oscuro; h1 que
   mezcla texto + 1-2 badges de acento; párrafo en foreground1; separator; row de
   botones (primario + secundario).
3) Prueba social como logos/badges mono.
4) Features en cajas ASCII con título colgado (shear).
5) "Cómo trabajamos" como file tree o comandos $.
6) CTA dentro de una caja.
7) Footer estilo prompt con statusline inferior fija.

REGLAS DE SOBRIEDAD (no negociables)
- Un solo tema, una familia de acento, aire generoso, motion casi nulo.
- Jerarquía por cajas/separadores/peso bold, nunca por tamaños gigantes.
- Limpio y tasteful: Arch bien configurado, no un desktop saturado.

Entrega HTML/CSS autocontenido, responsive (usa ch/lh y max-width:100%,
tablas/código con overflow-x:auto), theme-aware si aplica. No copies CSS de librerías
verbatim: implementa el lenguaje con tus propios tokens.
```
