---
name: design-dark-wabisabi
description: Dark Wabi-Sabi — warm charcoal / teak / plaster on dark paper, calm and permanent, with one sober electric tech accent. Invoke when building a software-factory or product landing that must feel calm, lasting and trustworthy, with a very restrained cyberpunk hint.
---

# Dark Wabi-Sabi — beauty in imperfection, engineered to last

Modern Dark Wabi-Sabi: warm darkness, raw material texture, generous silence.
Everything ages, nothing is loud. The base is a design atelier in the dark;
the brand layer adds ONE contained electric signal that "breathes" — never a
neon dashboard. Calm and permanence first, tech accent second.

> Source note: all HEX, fonts, sizes, easings and grain values below are
> extracted verbatim from the reference repo (`globals.css`, `constants.ts`,
> section components). The **tech accent** is NOT in the source — the reference
> is pure warm earth. That section is additive brand guidance and is flagged as
> such.

---

## Identidad / vibe

- **Wabi-sabi**: beauty in imperfection, asymmetry, the mark of the hand, the
  record of growth (knots, fissures, throwing rings). Things *improve* with age.
- **Warm darkness, not black**: the page is a dim room lit by filtered light,
  not a void. Charcoal has brown/clay undertones, never neutral gray, never pure
  `#000`.
- **Subtraction over decoration**: "We do not decorate. We edit — until the room
  breathes." Whitespace is the primary material.
- **Calm + permanence**: slow reveals, long line-height, quiet type. For a
  software factory this reads as *long-term, trustworthy, unhurried craft*.
- **Restraint**: three background tones, one text family, one accent rule. The
  discipline IS the aesthetic.

---

## Paleta de color

Dark warm earth. HEX exact from `globals.css` / `constants.ts`.

| Token | HEX | Rol |
|---|---|---|
| `warm-charcoal` | `#1E1B18` | Primary page / body background. The default dark. |
| `deep-clay` | `#2C2520` | Alternate/darker section band (Work, CTA) to segment the scroll. |
| `oiled-teak` | `#3C2A1A` | Deepest warm wood tone — accent fills, wood-grain, hover depths. |
| `raw-plaster` | `#C4B0A0` | The warm accent: focus outlines, link hover, hairline rules. Muted, dusty. |
| `filtered-light` | `#F0EBE0` | Headings / brightest text — light "entering the room". |
| `text-on-dark` | `#d4cfc8` | Default body text. Soft warm off-white, never `#fff`. |
| `text-muted` | `#8a8278` | Captions, mono labels, secondary copy. Warm gray-taupe. |

**Alpha usage patterns (from source):**
- Body copy is `filtered-light` at reduced opacity: `text-light/60`, `/55`, `/50`, `/45`.
- Hairlines / borders: `rgba(212,207,200,0.04–0.12)` (i.e. `text-on-dark` at 4–12%).
- Plaster rule accent: `rgba(196,176,160,0.3)`.
- Hero image sits at `opacity:0.50` under a gradient to `warm-charcoal/95`.

**Contrast:** brightest surface (`#F0EBE0`) never touches darkest; text steps
down by opacity, not by new colors.

---

## Tipografía

- **Family**: `Inter` (Google font), `system-ui`, `sans-serif`. Single family
  for everything. No serif, no display face.
- **Weights**: 400 regular, 500 medium, 700 bold. Headings are **500**, not 700
  — quiet, not heavy.
- **Body**: `15px` / line-height `1.85`, antialiased. Long, airy leading is core
  to the calm.
- **Headings** (`h1–h3`): weight 500, line-height `1.1`, letter-spacing
  `-0.02em`.
- **Scale** (`constants.ts`): xs 11 · sm 13 · base 15 · lg 18 · xl 24 · 2xl 32 ·
  3xl 44 · 4xl 60 · 5xl 80 (px). Hero brand mark runs `56px → 88px`.
- **Mono-caption / eyebrow** (`.mono-caption`): `11px`, `letter-spacing 0.12em`,
  `uppercase`, color `#8a8278`, weight 500. Used as section labels
  ("Materials", "Work", "Services").
- **Wide-tracked small caps**: sub-eyebrows use `tracking 0.08–0.14em uppercase`
  at `text-light/25–35` for whispered supporting lines.
- Headline tone: short declarative sentences, big type, negative tracking.

---

## Layout y espaciado

- **Container widths** by intent: `500px` (statements/CTA), `640px` (hero copy),
  `960px` (content sections), `1200px` (nav + full-bleed work). Centered `mx-auto`.
- **Horizontal padding**: `px-6` everywhere (mobile-safe gutters).
- **Vertical rhythm**: sections `py-32` (128px); the pure philosophy statement
  gets `py-40` (160px) for extra silence. Whitespace is deliberate and large.
- **Inter-item spacing**: `space-y-24 / -28 / -32` between stacked blocks; grid
  gaps `10–12`.
- **Grids**: `md:grid-cols-2` (image + text, alternating order via `order-1/2`)
  and `md:grid-cols-3` (services). Everything collapses to single column on
  mobile.
- **Aspect ratios**: `aspect-square` (material details), `aspect-[16/8]`
  (cinematic wide shots).
- Content is **left-aligned in grids, center-aligned for statements/CTA**.

---

## Componentes

- **Nav**: fixed, top, transparent by default; after `scrollY > 60` fades to
  `bg-warm-charcoal/97` with a `1px` hairline `rgba(212,207,200,0.04)` bottom
  border. `transition-colors duration-500`. Links are `.mono-caption`, hover →
  `plaster`. Wordmark in wide tracking (`0.15em`).
- **Hero**: full `min-h-screen`, background photo at `opacity:0.50`, gradient
  overlay `from-warm-charcoal/30 via-transparent to-warm-charcoal/95` so the
  bottom dissolves into the page. Centered stacked type: giant mark → tiny
  glyph/whisper → one-line description → uppercase category line.
- **Statement section**: single large sentence (`28–36px`, weight 500) centered
  in a `500px` column with huge vertical padding. No image.
- **Content pair (Materials/Spaces)**: alternating `image | text` two-column,
  square image, `22px` heading, `14px` body at `text-light/60`.
- **Work / case blocks**: full-bleed `16/8` wide image, then a text band where a
  **detail image sits behind the copy at `opacity:0.40`** under a horizontal
  gradient `from-deep-clay/95 via-/85 to-/70` — texture bleeding through text.
- **Services cards**: no card chrome; each item marked by an `8px × 2px` rule in
  `rgba(196,176,160,0.3)` (plaster), then heading + muted body. Minimal.
- **CTA form**: underline-only email input (`border-b rgba(212,207,200,0.12)`,
  focus → `plaster`), plus a **ghost button** (`border border-light/20`, hover
  inverts to `bg-light text-warm-charcoal`).
- **BackToTop**: `44×44` square, hairline border, appears after `scrollY > 500`,
  hover inverts fill.
- **Buttons/inputs are ghost/hairline** — no filled solids, no rounded pills, no
  shadows. Sharp corners throughout (no `border-radius` in source).

---

## Motion / animación

- **Library**: framer-motion. Everything enters, nothing bounces (except one
  button).
- **Signature enter**: `initial {opacity:0, y:20–40}` → `whileInView {opacity:1,
  y:0}`, `viewport {once:true}`. Reveal upward, fade in.
- **Durations** (`constants.ts`): fast `0.25` · normal `0.4` · slow `0.7` ·
  reveal `1.0`. Sections use `0.9–1.2s` — slow and calm.
- **Signature ease**: `[0.25, 1, 0.25, 1]` (a soft ease-out-quart-ish curve).
  This single easing = the "breathing" feel.
- **Stagger**: children delayed by `i * 0.1–0.15`.
- **Button spring**: hover scale `1.03`, active `0.97`, via
  `cubic-bezier(0.34, 1.56, 0.64, 1)` — the ONE playful overshoot, only on the
  primary button.
- **Transitions on state**: nav/back-to-top use `duration-400/500` color/opacity
  fades.
- **Accessibility**: `@media (prefers-reduced-motion: reduce)` clamps all
  animation/transition to `0.01ms`. Always keep this.

---

## Anatomía de secciones

Reference page order (`page.tsx`):

1. **Nav** — fixed, minimal, transparent→charcoal on scroll.
2. **Hero** — full-screen photo dissolving to charcoal + stacked centered type.
3. **Philosophy** — one large centered statement, max silence (`py-40`).
4. **Work** — full-bleed case studies with texture-behind-text bands (on
   `deep-clay`).
5. **Services** — 3-column minimal offering list with plaster rule marks.
6. **CTA / Contact** — centered statement + underline input + ghost button (on
   `deep-clay`).
7. **BackToTop** — floating utility.

Rhythm principle: alternate `warm-charcoal` and `deep-clay` bands to segment the
scroll without borders. Alternate photo-heavy and pure-type sections so the eye
rests.

**Software-factory adaptation of the same skeleton**: Hero (promise) →
Philosophy/Manifesto (how you work) → Work/Cases (proof) → Services/Capabilities
→ Process or "How we build" → CTA. Keep one statement-only section for breathing
room.

---

## Imágenes e iconografía

- **Global film grain**: fixed full-viewport SVG `feTurbulence` fractal noise
  (`baseFrequency 0.85`, `numOctaves 4`, `stitchTiles`), `opacity 0.02`,
  `z-index 9999`, `pointer-events:none`, `aria-hidden`. Subtle paper/analog
  tooth over the entire page — a defining texture.
- **Photography**: raw natural materials — oiled wood grain (knots, fissures),
  hand-thrown clay (throwing rings), plaster, linen, filtered light. Warm, dim,
  matte. Always desaturated / darkened via `opacity` + gradient so it never
  overpowers text.
- **Wood/paper texture**: reuse detail photos AS backgrounds behind copy at low
  opacity (`0.40`) under a clay gradient — texture through type.
- **Iconography**: essentially none. Structure is drawn with **hairline rules**
  (`8px × 2px` marks, `1px` borders) and arrows (`↑`), not an icon set. If icons
  are needed, use thin 1px-stroke line icons in `plaster`, sparingly.
- No illustrations, no gradients-as-decoration, no glossy UI.

---

## Voz / copy

- **Short, declarative, confident**: "We do not decorate. We edit — until the
  room breathes." / "Everything ages. Nothing stays the same. That is the
  point."
- **Sensory + material**: names things concretely ("Oiled Teak", "Hand-Thrown
  Clay"), describes process and permanence.
- **Restraint as selling point**: "We take on a small number of projects each
  year." Scarcity = craft.
- **Eyebrows are single nouns** in mono-caps ("Materials", "Work", "Services").
- **CTA is an invitation, not a pitch**: "Begin a conversation." / "Enquire".
- Translate to software factory: talk about *craft, longevity, considered
  decisions, systems that age well* — not "10x", "disrupt", "growth hacking".
  Same calm authority.

---

## Acento tech sobrio (cómo y dónde)

> The reference repo has **no** electric accent — it is entirely warm earth.
> This is the brand layer for a software factory: ONE contained cool signal that
> *breathes*, never a neon UI. If in doubt, use less.

**The single accent token** (recommended, harmonizes with the warm dark without
going cyberpunk-loud):
- `--color-signal: #6FE3D2;` — a muted electric cyan/teal (a cool counterpoint
  to the warm palette). Alternatives if you want it warmer: an electric amber
  `#F0B45A`. Pick ONE and never introduce a second accent hue.
- Always used at **low opacity or as a thin line/point** — think a pilot light,
  not a floodlight.

**WHERE it may appear (max ~1 per viewport):**
1. **One live status dot / "breathing" indicator** — a small dot that pulses
   slowly (opacity `0.4 → 1.0` over `3–4s`, the same `[0.25,1,0.25,1]` ease),
   e.g. next to "Systems running" / an availability line. This is the "one neon
   breathing".
2. **Mono micro-labels** — reuse `.mono-caption` styling but tint the eyebrow or
   a keyword in `signal` (e.g. section index `01 / 02` or `[ SHIPPING ]`).
   Terminal/monospace micro-tags, tiny and rare.
3. **Focus / active hairline** — the plaster hairline rule can become `signal`
   on the single primary CTA (its `8px×2px` mark, or the input's focus underline
   on the main form only).
4. **Subtle glow** — a single low-opacity radial `box-shadow` /
   `filter: blur()` halo (`signal` at ~8–15% alpha) behind ONE hero element or
   the primary button on hover. Barely perceptible; it should read as warmth
   from a screen, not a neon sign.

**HOW to keep it calm:**
- Rule of one: one glowing element per screen, max.
- Never fill large areas with `signal`; it lives in points, 1px lines, and 11px
  labels only.
- Motion for the accent is *slow breathing*, never blinking/flashing.
- Backgrounds, headings, and body stay 100% warm earth — the accent never
  touches type at reading size.
- Respect `prefers-reduced-motion`: freeze the pulse to a static mid-opacity dot.

---

## Do / Don't

**Do**
- Use warm `#1E1B18`, never `#000`; warm off-white `#d4cfc8`, never `#fff`.
- Keep body line-height ~`1.85` and sections `py-32`+ — silence is the feature.
- Ship the grain overlay at `opacity 0.02`.
- Headings at weight 500, tracking `-0.02em`.
- Enter with slow `whileInView` fades on `[0.25,1,0.25,1]`.
- Segment scroll by alternating `warm-charcoal` / `deep-clay` bands.
- Let material photos go dim under gradients.
- Confine the tech accent to one breathing point per viewport.

**Don't**
- No pure black/white, no cool grays, no saturated brand colors in the base.
- No border-radius pills, drop shadows, glassmorphism, or filled glossy buttons.
- No icon soup — structure with hairlines, not iconography.
- No fast/bouncy motion except the single primary-button spring.
- No neon dashboards, RGB gradients, or more than one accent hue.
- No loud marketing voice ("10x", "disrupt") — keep the quiet authority.
- Don't let the tech accent touch headings, body text, or large fills.

---

## Prompt listo para usar

```
Build a dark, calm landing page for a software factory in the "Modern Dark
Wabi-Sabi" aesthetic — warm darkness, raw material texture, generous silence,
and ONE sober electric tech accent that breathes.

PALETTE (warm earth, no pure black/white):
- page bg warm-charcoal #1E1B18 · alt band deep-clay #2C2520 · deepest wood
  oiled-teak #3C2A1A
- accent hairlines/hover raw-plaster #C4B0A0 · headings filtered-light #F0EBE0
- body text #d4cfc8 (never #fff) · muted/captions #8a8278
- ONE cool tech signal #6FE3D2, used only as a point/1px line/11px label at low
  opacity — never as a fill.

TYPE: Inter only (weights 400/500/700). Body 15px / line-height 1.85. Headings
weight 500, line-height 1.1, letter-spacing -0.02em. Eyebrows: 11px uppercase,
letter-spacing 0.12em, color #8a8278. Short declarative headlines.

LAYOUT: centered containers 500/640/960/1200px, px-6 gutters, sections py-32
(one statement section py-40). Alternate warm-charcoal and deep-clay bands.
Sharp corners, no border-radius, no shadows. Buttons/inputs are ghost/hairline
only (border-b underline inputs, bordered ghost buttons that invert to
bg-light/text-charcoal on hover).

TEXTURE: full-viewport fixed SVG fractal-noise grain overlay at opacity 0.02,
pointer-events none, aria-hidden. Use dim, warm, matte material photography
(wood grain, clay, plaster, linen) darkened under gradients; reuse detail photos
as low-opacity (0.40) textured backgrounds behind copy.

MOTION (framer-motion): elements enter with opacity 0 → 1 and y 20–40 → 0 on
whileInView (once), duration 0.9–1.2s, ease [0.25,1,0.25,1]; stagger children by
i*0.12. One primary button springs on hover (scale 1.03/0.97, cubic-bezier
0.34,1.56,0.64,1). Honor prefers-reduced-motion.

SECTIONS: fixed minimal nav (transparent → charcoal/97 after 60px scroll, mono
links) · full-screen hero photo dissolving to charcoal with stacked centered
type · one large centered manifesto statement (max silence) · case-study/work
band with texture-behind-text · minimal capabilities list (each item marked by
an 8px×2px plaster rule) · a "how we build / process" section · invitation-style
CTA with underline email input + ghost button · floating back-to-top.

TECH ACCENT (restrained, max ~1 per viewport): a slowly breathing #6FE3D2 status
dot (opacity 0.4→1.0 over ~3s) next to an availability line; occasional mono
micro-labels or section indices (01/02) tinted in the signal color; the primary
CTA's focus underline / rule mark in signal; optionally one barely-visible signal
glow behind the primary button on hover. Never neon, never flashing, never in
headings or body text.

VOICE: calm, confident, material, restrained — sell craft, longevity, and
considered engineering ("systems that age well"), not hype. CTA reads as an
invitation ("Begin a conversation").

Deliver a single responsive page. Base = calm wabi-sabi permanence; tech accent
= one electric point breathing quietly.
```
