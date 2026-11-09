# 🎨 Skills de diseño — landings de tienda de café

Seis "skills" de diseño destiladas de repos reales de GitHub. Cada una captura **solo el
lenguaje visual** (paleta, tipografía, layout, componentes, motion, anatomía de secciones) —
no el código con copyright — para recrear ese look en una landing NUEVA desde cero.

> **Cómo probarlas por separado:** abre el `SKILL.md` de la estética que quieras, copia su
> bloque **"Prompt listo para usar"** y pídeme generar la landing con ese prompt. Cada una es
> independiente: pruébalas de a una y compara.

---

## Las 6 estéticas

| Skill | Vibe en una frase | Paleta clave | Tipografía | Rasgo distintivo |
|---|---|---|---|---|
| **`nordic-coffee`** | Café artesanal nórdico-japonés, luz de invierno | Linen `#F8F7F2` · taupe `#8B7E74` · tinta `#1A1A1A` | Noto Serif JP + Inter uppercase | Grano de papel ~3.5% + reveals lentos + grids editoriales |
| **`japandi`** | Japonés + escandinavo, sereno y cálido | Oatmeal (OKLCH) · **terracota** · sand | Fraunces serif + Geist | Marcos de imagen con 2 esquinas diagonales `rounded-[3rem]` |
| **`yohaku`** | Editorial japonés, espacio negativo protagonista | Papel `#F9F7F2` · tinta `#1A1A1A` (ámbar solo en favicon) | Georgia/Times serif + mono uppercase | Un solo tono de papel, secciones separadas por hairlines |
| **`wabi-sabi`** | Monocromo, vidrio esmerilado, imperfección | Negro `#000` · islas blancas · plata | Montserrat + Poppins | Glass (blur 16px) sobre video desaturado + divisores papel rasgado |
| **`fresh`** | Premium neutro de estudio, aireado | Blue-grey `#444F60` · acento naranja `#F39200` | Nunito + Roboto Flex | Divisor-barra naranja 60×3px bajo cabeceras centradas |
| **`odyssey`** | Marketing modular sobrio, 100% re-tematizable | Primary negro · surface gris/menta | Roboto Serif + Lato | Páginas = pila de secciones modulares por tokens `[data-theme]` |

---

## Cuál elegir según lo que busques

- **Máximo toque asiático + café de una:** `nordic-coffee` o `japandi`.
- **Zen / calma / whitespace extremo:** `yohaku`.
- **Dramático, oscuro, cinematográfico:** `wabi-sabi`.
- **Claro, comercial, seguro:** `fresh`.
- **Que sea trivial cambiarle colores/fuentes por cliente:** `odyssey` (su fuerte es el theming por tokens).

---

## Notas

- Cada `SKILL.md` es una skill real de Claude Code (frontmatter `name`/`description` + secciones
  de diseño + Do/Don't + prompt paste-ready).
- Los repos originales están clonados en `../../_referencias/<slug>/` (gitignored) por si quieres
  ver el código o levantar el demo local.
- **Legal:** las skills describen la *estética*, no copian código. Aun así, para producción
  prioriza los repos con licencia MIT (ver `ESTRATEGIA-ESCALADO.md` y el listado de licencias).
- Hallazgos que anotaron los agentes: `fresh` NO es Tailwind (es Astro + Bulma + Alpine);
  `wabi-sabi` importa Playfair pero no la aplica; `yohaku` tiene `motion` en deps pero no lo usa
  (todo es CSS). Detalle en cada SKILL.md.
