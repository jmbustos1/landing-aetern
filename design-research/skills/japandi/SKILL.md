---
name: design-japandi
description: Serene Japandi (Japanese + Scandinavian) aesthetic — warm oatmeal canvas, terracotta pulse, Fraunces serif headings, generous whitespace and slow reveals. Invoke when designing a calm, minimalist, editorial landing page (Next.js + Tailwind v4 + shadcn) that should feel unhurried, natural and elegant.
---

# Japandi — Stillness, warmth and considered emptiness

Design language distilled from the "Hanare" reference (a slow-living membership landing). Recreate the *feeling* and the system below from scratch — do not copy the source markup verbatim.

## Identidad / vibe
Wabi-sabi meets hygge: a sunlit-paper canvas, natural imperfect materials, and a single warm terracotta pulse against muted earth tones. Everything whispers — nothing shouts. The page reads like an editorial spread with vast breathing room, elegant Fraunces serif display type, and content that fades up slowly "like a slow exhale." Serene, tactile, unhurried, premium-but-humble.

## Paleta de color
Built on Tailwind v4 `@theme` + shadcn CSS variables, authored in **OKLCH** (warm hues concentrated around 45–85° = terracotta/sand/oat; greens ~140°, indigo ~250°). Light mode is the identity; dark mode falls back to a neutral grayscale (see Do/Don't).

**Light mode (`:root`) — the signature palette**
| Token | OKLCH | Role / feel |
|---|---|---|
| `--background` | `0.96 0.012 80` | Warm oatmeal / sunlit paper — the whole canvas |
| `--foreground` | `0.27 0.012 60` | Deep warm charcoal-brown ink (never pure black) |
| `--card` | `0.975 0.01 85` | Near-white warm, a touch lighter than bg |
| `--popover` | `0.975 0.01 85` | = card |
| `--primary` / `--terracotta` | `0.56 0.11 45` | Terracotta — the one warm accent (CTAs, eyebrows, active) |
| `--primary-foreground` | `0.97 0.012 80` | Paper text on terracotta |
| `--secondary` | `0.92 0.014 80` | Soft sand — alternating section fills (used at `/40`–`/50`) |
| `--secondary-foreground` | `0.30 0.012 60` | Ink on sand |
| `--muted` | `0.93 0.012 82` | Barely-there fill |
| `--muted-foreground` | `0.50 0.015 65` | Warm taupe — all body/secondary copy |
| `--accent` | `0.88 0.03 140` | Pale sage-green wash |
| `--accent-foreground` | `0.30 0.02 140` | Deep sage ink |
| `--border` / `--input` | `0.87 0.014 78` | Faint warm hairline (usually shown at `/60`–`/70`) |
| `--ring` | `0.56 0.11 45` | Terracotta focus ring |
| `--sage` | `0.62 0.045 145` | Muted eucalyptus — icon accent |
| `--indigo` | `0.46 0.06 250` | Faded indigo — icon accent |
| `--destructive` | `0.55 0.16 30` | Warm rust-red |
| `--radius` | `0.5rem` | Base radius token |

Icon accent trio used across pillars: **terracotta / sage / faded-indigo** — the classic Japandi natural-dye triad.

**Dark mode (`.dark`)** is the stock shadcn neutral grayscale — `--background 0.145 0 0`, `--foreground 0.985 0 0`, chroma 0 (no warmth). It works but loses the identity. If dark mode matters, re-author it warm (add ~0.01 chroma at hue ~60–80 and keep terracotta primary).

## Tipografía
Three families wired via `next/font` → CSS vars, mapped in `@theme`:
- **Display / headings — `--font-heading`: Fraunces** (serif, `'Fraunces Fallback', serif`). An optical/"soft-serif" with character; carries all `h1`–`h3`, stats, prices, section eyebrows-turned-numbers. Applied via a `font-heading` utility.
- **Body / UI — `--font-sans`: Geist** (`'Geist Fallback'`). Default on `<body>`, `antialiased`. Clean neutral grotesque for all prose and nav.
- **`--font-mono`: Geist Mono** (available, not prominently used).

Scale & treatment (real values):
- Hero `h1`: `text-5xl → sm:6xl → md:7xl`, `leading-[1.05]`, `tracking-tight`, `text-balance`.
- Section `h2`: `text-4xl → md:5xl`, `leading-tight`, `tracking-tight`, `text-balance`.
- Card `h3`: `text-2xl` (or `text-xl`); stats/prices `text-3xl`–`text-5xl` Fraunces.
- Body: `text-lg leading-relaxed` (primary) / `text-sm leading-relaxed`, always in `muted-foreground`.
- **Eyebrows** (recurring motif): `text-sm uppercase tracking-[0.32em]` in `text-primary` (or `muted-foreground`) above every section heading. Footer/labels use `tracking-[0.24em]`–`[0.3em]`.
- Weights stay modest; letter-spacing does the work: tight on serif display, very wide on small uppercase labels. `text-pretty`/`text-balance` used liberally.

## Layout y espaciado
- **Container:** `max-w-6xl` (~72rem) centered, `px-6 md:px-10`. Narrow variants: `max-w-4xl` (quote), `max-w-2xl` (centered intros).
- **Grid:** 12-column (`lg:grid-cols-12`) with asymmetric splits — hero & philosophy use **7/5**, ritual copy uses **4/8**. Feature/step rows use even 3-col grids.
- **Vertical rhythm (generous):** sections `py-24 → py-28 → md:py-32 → md:py-40`. Hero starts `pt-32 md:pt-40` (clears fixed header). Inner stacks step in `mt-` increments of `5 / 6 / 8 / 10 / 16 / 20 / 24`.
- **Whitespace philosophy:** emptiness is a material. Big gaps between sections and elements, wide gutters (`gap-8`–`gap-16`), lots of `max-w-xl`/`max-w-md` line-length caps so text never sprawls. Alternating rhythm: plain `background` sections interleaved with `secondary/40` tinted bands, separated by faint `border-y border-border/60` hairlines.

## Componentes
- **CTA buttons (bespoke, pill):** `rounded-full`. Primary = `bg-primary text-primary-foreground px-8 py-4 text-sm`; hover lifts `hover:-translate-y-[2px]` + `hover:shadow-lg hover:shadow-primary/20`, `transition-all duration-500 ease-out`. Secondary/ghost = `border border-foreground/20` that fills terracotta on hover. Text-link CTA = inline with an arrow `→` that slides `group-hover:translate-x-1`. NOTE: these are hand-rolled `<a>`/`<button>`, **not** the shadcn Button.
- **shadcn Button (`components/ui/button.tsx`, base-nova style over @base-ui):** present but largely unused on the page. It is `rounded-lg` (square-ish), `h-8` default, `font-medium`, `focus-visible:ring-3 ring-ring/50`, `active:translate-y-px`, with default/outline/secondary/ghost/destructive/link variants. Re-theme note: its terracotta comes for free via `--primary`; if you use it, override to `rounded-full` and taller padding to match the pill language.
- **Cards:** big soft corners `rounded-3xl` (pricing) / `rounded-2xl` (feature grids), `border border-border/70` on `bg-card`, `p-9`. Hover = gentle `hover:-translate-y-1` + faint `shadow-sm`. Featured/pricing card: `border-primary/40 bg-primary/5` with a `rounded-full bg-primary` "Loved most" pill badge.
- **Grid cards trick:** feature/step grids render as a hairline-separated mosaic — `grid gap-px rounded-2xl border border-border/60 bg-border/60`, each cell `bg-card`, cell hover `hover:bg-secondary/50`.
- **Signature asymmetric image frames:** each image gets two diagonally-opposite large corners rounded — e.g. `rounded-tr-[3rem] rounded-bl-[3rem]` (mirrored per image) — the most distinctive visual tell of the system.
- **Nav header:** `fixed inset-x-0 top-0 z-50`, transparent at top, on scroll (>24px) becomes `bg-background/80 backdrop-blur-md border-b border-border/60`, `transition-all duration-700`. Links `text-muted-foreground → hover:text-foreground` with an animated underline (`h-px bg-primary w-0 → group-hover:w-full`, `duration-500`). Wordmark in Fraunces beside its kanji (`離れ`) in wide-tracked uppercase.
- **Forms:** pill inputs — `rounded-full border border-border bg-background px-5 py-3.5 text-sm`, `outline-none`, `focus:border-primary` (border color is the only focus signal), muted placeholder. Inline email-capture pairs input + pill submit in a `flex-col sm:flex-row` row.
- **Icons:** lucide, thin and airy — `strokeWidth={1.4}`, `h-7 w-7`, tinted with the terracotta/sage/indigo trio.

## Motion / animación
Slow, organic, respectful of `prefers-reduced-motion` (all disabled there).
- **Scroll reveal (`.reveal`):** IntersectionObserver (threshold `0.15`, `rootMargin 0px 0px -8% 0px`) toggles `.is-visible`. From `opacity:0; translateY(28px)` → settled, over **1.2s** on `cubic-bezier(0.22, 1, 0.36, 1)` (a gentle overshoot-free ease-out). Staggered via inline `transition-delay` in ~120–160ms steps down the page.
- **Ambient loops:** `@keyframes drift` (9s, ±10px + 2° rotate) and `breathe` (7s, scale 1→1.08, opacity 0.55→0.8) for the small live terracotta dot in the hero eyebrow.
- **Hover:** long `duration-500 ease-out` lifts (`-translate-y-[2px]`/`-1`), soft terracotta-tinted shadows, sliding arrows, growing underlines. `duration-300` for color fades, `duration-700` for the header.
- `html { scroll-behavior: smooth }`.

## Anatomía de secciones
Single-page, anchor-linked, in order:
1. **SiteHeader** — fixed transparent nav → blur-on-scroll; wordmark + kanji, 3 links, outlined pill CTA.
2. **Hero** — 7/5 split: left = tiny animated dot + eyebrow, Fraunces headline with one terracotta-colored word, `max-w-xl` lede, pill CTA + arrow text-link; right = tall `aspect-[4/5]` asymmetric-cornered image. Below: a thin `border-t` strip with a centered wabi-sabi/hygge tagline.
3. **Philosophy** — 5/7 image-left/text-right; eyebrow + headline + two paragraphs + a 2-col stat block (Fraunces numbers) above a hairline.
4. **Pillars** — tinted `secondary/40` band; eyebrow + headline; 3-col hairline-mosaic cards, each thin lucide icon (sage/terracotta/indigo) + title + body.
5. **Ritual** — 3 tall asymmetric-cornered images (staggered reveal), then a 4/8 split: heading left, numbered 3-step hairline-mosaic list (Fraunces `01/02/03` in terracotta) right.
6. **Quote** — centered `secondary/40` band; oversized Fraunces `"` glyph at `primary/40`, large serif testimonial, wide-tracked uppercase attribution.
7. **Membership** — centered intro; 2 pricing cards (one featured w/ badge, Fraunces price, lucide check list, pill CTA); then a rounded `secondary/50` waitlist panel with inline email form + optimistic success state.
8. **SiteFooter** — `secondary/40`; 5/2/2/2 grid: brand blurb + kanji, three link columns (wide-tracked headings), hairline, copyright ("Made slowly.").

## Imágenes e iconografía
- **Photography:** warm, natural-light, minimalist still-life/interiors — tea house, cabin with misty window, hand-thrown ceramics, folded linen textiles, a slow tea pour. Palette in-frame matches the tokens (oatmeal, terracotta, sage, faded indigo, pale wood). Asset names read like a moodboard (`hero-teahouse`, `ceramics`, `textiles`, `ritual-pour`, `cabin`).
- **Treatment:** `object-cover`, tall portrait aspects `aspect-[4/5]` / `[5/6]`, always inside the two-diagonal-corners `rounded-[3rem]` frame. `next/image` with `fill` + `sizes`; hero `priority`.
- **Icons:** lucide (`Leaf`, `HandHeart`, `Moon`, `Check`), hairline `strokeWidth 1.4`, tinted with the accent trio.

## Voz / copy
Poetic, tactile, unhurried, second-person and reassuring. Verbs of rest: *breathe, exhale, pause, steep, stay, tend, rest.* Nature/craft nouns: *season, ritual, linen, clay, sanctuary, stillness.* Eyebrows are quiet labels ("Our philosophy", "What we tend to", "The ritual"). Headlines are short lyrical fragments ("Less, but considered. Slow, but alive.", "A small ceremony, delivered to your door."). Microcopy is gentle and human ("Pause anytime", "Breathe easy", "Made slowly"). Sprinkle Japanese where it earns meaning (kanji beside the wordmark). Never salesy, never urgent — invite, don't push.

## Do / Don't
**Do**
- Keep the warm oatmeal canvas + a *single* terracotta accent; let sage/indigo appear only as tiny icon tints.
- Pair Fraunces (display) with Geist (body); lean on wide `tracking` uppercase eyebrows and tight-tracked serif headlines.
- Spend whitespace generously — `py-28`–`py-40` sections, capped line-lengths, alternating plain/`secondary/40` bands with faint hairlines.
- Use `rounded-full` pill CTAs and the two-diagonal-corners `rounded-[3rem]` image frames.
- Animate slowly: 1.2s scroll-reveals with the `(0.22,1,0.36,1)` ease, 500–700ms hovers, honor reduced-motion.

**Don't**
- No pure black/white, no saturated or neon color, no more than one accent hue competing.
- No hard shadows, no drop-shadow stacks — only faint terracotta-tinted `shadow-sm/lg`.
- No tight, dense layouts or edge-to-edge text; no small radii on CTAs (avoid the default `rounded-lg` shadcn Button as-is — repill it).
- No fast/bouncy motion, no parallax gimmicks, no urgency/hype copy.
- Don't ship the stock neutral-gray dark mode as-is if dark matters — warm it up.

## Prompt listo para usar
> Design a serene, minimalist single-page landing for a slow-craft **coffee shop / roastery** called (invent a calm name) in a **Japandi** aesthetic — Japanese wabi-sabi restraint meets Scandinavian hygge warmth. Stack: Next.js + Tailwind v4 + shadcn/ui, OKLCH tokens, `next/font`.
>
> **Mood:** a sunlit-paper canvas, unhurried and premium-but-humble; emptiness used as a material. Everything whispers.
>
> **Color:** warm oatmeal background (very light, low-chroma warm hue ~80°), deep warm charcoal-brown ink (never black), one **terracotta** accent (~OKLCH 0.56 0.11 45) for CTAs, eyebrows and highlights, soft sand for alternating section bands, warm-taupe muted body text, faint warm hairline borders. Tiny secondary tints only: muted sage and faded indigo, used solely as icon accents. Author a *warm* dark mode if included (keep chroma, don't go neutral gray).
>
> **Type:** Fraunces (soft serif) for all headlines, stats and the wordmark — tight tracking, `text-balance`; Geist (sans) for body and nav. Every section opens with a small `uppercase tracking-[0.32em]` terracotta eyebrow. Big lyrical headline fragments, `leading-relaxed` muted body, capped line lengths.
>
> **Layout:** centered `max-w-6xl`, `px-6 md:px-10`, asymmetric 7/5 and 4/8 12-col splits, very generous vertical rhythm (`py-28`–`py-40`), alternating plain and soft-sand `secondary/40` bands divided by faint hairlines.
>
> **Components:** `rounded-full` pill buttons that lift `-translate-y-[2px]` with a soft terracotta-tinted shadow on hover; large soft `rounded-3xl` cards with hairline borders on near-white card fill; feature/step grids as `gap-px` hairline mosaics; pill form inputs whose only focus signal is a terracotta border; a fixed transparent nav that turns to `backdrop-blur` + hairline on scroll, with animated underline links; thin lucide icons (`strokeWidth ~1.4`).
>
> **Signature detail:** frame every photo with two diagonally-opposite `rounded-[3rem]` corners (mirror the diagonal per image), tall `aspect-[4/5]`/`[5/6]`, warm natural-light still-life imagery (roasted beans, a slow pour-over, ceramic cups, linen, pale wood).
>
> **Motion:** slow scroll-reveals — fade + 28px rise over ~1.2s on `cubic-bezier(0.22,1,0.36,1)`, staggered ~120ms down the page; 500ms hover transitions; a small "breathing" ambient dot; fully disabled under `prefers-reduced-motion`.
>
> **Sections in order:** fixed nav → hero (headline with one terracotta-colored word + pill CTA + arrow link + tall side image + wabi-sabi tagline strip) → philosophy (image + copy + stat block) → three pillars (icon mosaic on a sand band) → the ritual / how-we-roast (image trio + numbered steps) → a large serif customer quote on a sand band → menu/subscription pricing (two cards, one featured, + waitlist email form) → multi-column footer ("Made slowly.").
>
> **Voice:** poetic, tactile, second-person, unhurried — verbs of rest (breathe, steep, pause, stay), craft/nature nouns (season, ritual, clay, linen). Never salesy, never urgent. Invite, don't push.
