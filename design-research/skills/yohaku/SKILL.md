---
name: design-yohaku
description: Zen / Yohaku (余白) editorial-minimalist look for Japanese café & restaurant landings — warm paper off-white, near-black ink, serif editorial headings, uppercase mono micro-labels, hairline borders and generous negative space. Invoke when designing a calm, refined, whitespace-first landing for a café, tea house, ramen bar, izakaya or artisan food brand.
---

# Yohaku — Quiet paper, ink, and negative space

Design language distilled from the SORA reference (a Vite + React + Tailwind v4 single-page site). It is an editorial-minimalist take on Japanese calm: warm paper background, near-black ink, serif display type against tiny uppercase monospaced labels, hairline borders instead of heavy shadows, and lots of breathing room. Capture the *language*, not the code.

## Identidad / vibe
Calm, unhurried, refined — a printed menu card more than a flashy website. The whole page lives on one warm paper tone (`#F9F7F2`) with near-black ink (`#1A1A1A`); color is almost entirely absent so **the emptiness itself becomes the design** — this is the yohaku (余白) principle: negative space is an active, protagonist element, not leftover. Restraint reads as quality: no gradients, no glow, no bright accents (the only saturated color, an amber `#D97706`, appears solely in the favicon). Sharp-cornered ink blocks, hairline borders and tiny monospaced uppercase captions give it a quiet editorial / gallery-label seriousness.

## Paleta de color
Almost monochrome on warm paper. Exact values from the repo:

| Token | Hex | Rol |
|---|---|---|
| Paper (canvas) | `#F9F7F2` | Page background, inverted text on dark |
| Ink | `#1A1A1A` | All text, borders, dark blocks, buttons, footer |
| Card surface | `#EFECE6` | Card/panel fill (often at `/80`, `/60`, `/40`, `/90` opacity) |
| Image placeholder | `#E8E4DB` | Behind images while loading / empty media wells |
| Pure black | `#000000` | Button *hover* only (`hover:bg-black`) |
| Stone 300–800 | Tailwind `stone-*` | Secondary text, muted captions, footer text on dark |
| Amber | `#D97706` | Accent — favicon ONLY, never in the page UI |
| Emerald | `emerald-100/300/400/700/800` | "Copied!" success feedback only |

Borders are the ink at low opacity: `border-[#1A1A1A]/10`, `/15`, `/20`, `/30` — hairlines, never solid heavy rules. No dedicated dark mode: the *footer and notice banner* invert to ink background with paper text, giving contrast without a second theme.

## Tipografía
Two contrasting system stacks (no web fonts loaded — fast, quiet, print-like):

- **Editorial serif** (headings `h1–h3`, prices, quotes): `Georgia, Cambria, "Times New Roman", Times, serif`. Weight `normal` (400) even at large sizes — never bold display. `tracking-tight`, `leading-[1.05]` on the hero. An `.editorial-italic` variant (serif + italic) is used for the second hero line, review quotes and category descriptions to add a soft literary voice.
- **Body / UI sans**: `'Helvetica Neue', Helvetica, Arial, sans-serif`. Body copy is `font-light` (300) for airiness.
- **Micro-label mono**: Tailwind `font-mono` for all the tiny eyebrow labels, badges, dates, disclaimers and footer nav — `text-[9px]`–`text-[11px]`, `uppercase`, wide `tracking-[0.2em]` to `tracking-[0.25em]`, often `font-bold`.
- **Brand mark** (`.brand-sans`): Helvetica Neue `700`, `letter-spacing: -0.03em`, uppercase.

Rough scale seen in repo: hero `h1` `text-4xl → 6xl` leading `1.05`; section `h2` `text-3xl → 5xl`; card/item titles serif `text-lg → xl`; body `text-base/lg` light; labels `text-[10px]/[11px]` mono. Signature move: **large calm serif headline paired with a tiny wide-tracked uppercase mono eyebrow above it.**

## Layout y espaciado
Whitespace is the core rasgo. How it's used:

- **Containers vary by density** — the site deliberately narrows for reading: hero/contact/footer `max-w-7xl`, menu `max-w-6xl`/`max-w-5xl` grid, about & reviews `max-w-4xl`, intro copy `max-w-xl`/`max-w-3xl` centered. Narrow measures + centered text create air on the sides.
- **Generous vertical rhythm**: sections `py-10 sm:py-14` up to `py-12 sm:py-16`; hero `pt-28 sm:pt-36 lg:pt-40`. Content stacks with `space-y-*` (6–12) rather than crammed.
- **Hairline section dividers**: every section is separated only by `border-b border-[#1A1A1A]/10` — no color bands, no heavy separators. The dividing line *is* the decoration.
- **Grids**: hero and footer use a 12-col grid (`lg:grid-cols-12`, split `col-span-6` / `5-3-4`); menu items `grid-cols-1 md:grid-cols-2` with `gap-6 lg:gap-8`; reviews/contact `grid-cols-2`.
- **Padding scale**: cards `p-3` (compact) to `p-8` (contact panels); consistent `px-4 sm:px-6 lg:px-8` gutters.
- Scroll: `scroll-behavior: smooth`, `scroll-padding-top: 6.5rem`, sections carry `scroll-mt-28 sm:scroll-mt-32` to clear the floating header.

## Componentes
- **Header**: floating "pill" nav — `max-w-4xl`, centered, `rounded-full`, `bg-[#F9F7F2]/85 backdrop-blur-md`, hairline `border-[#1A1A1A]/10`, `shadow-sm` → `shadow-lg` on scroll. Sits *below* a dismissible notice banner and slides up (`top-4`) once scrolled. Brand = small ink circle icon + serif name + mono `Japanese Dining` sub-label. Nav links: `text-xs uppercase tracking-[0.15em]` stone, with an animated underline (`w-0 → group-hover:w-full`, `h-px`).
- **Buttons**: two styles, both `uppercase` mono/semibold, `tracking-[0.15em]–widest`. Primary = solid ink `bg-[#1A1A1A] text-[#F9F7F2]`, hover to pure black. Secondary = ghost, transparent with hairline `border-[#1A1A1A]/30`, hover `bg-[#1A1A1A]/5`. **Primary CTAs are square-cornered** (`px-7 py-3.5`, no radius) for editorial crispness; pills (`rounded-full`) are used for nav and category tabs.
- **Cards** (menu items, panels): fill `bg-[#EFECE6]/80`, hairline `border-[#1A1A1A]/15`, hover deepens border to `/40`. Mostly **square corners** (`shadow-sm` only); some softer cards use `rounded-lg/xl/md`. Image wells are `aspect-[16/9]`/`[4/3]`/`[16/10]`, cover, with a subtle `contrast-[1.05] brightness-95` filter.
- **Badges / tags**: solid ink chips, `bg-[#1A1A1A] text-[#F9F7F2]`, `text-[9px]/[10px]` mono uppercase `tracking-widest` — square corners; often overlaid top-left on images ("Popular" with a Sparkles icon).
- **Category tabs**: `rounded-full` pill toggles — active = solid ink, inactive = transparent with `border-[#1A1A1A]/20`, hover darkens border.
- **Forms/inputs**: none present (walk-in restaurant). Interactive bits are copy-to-clipboard email buttons and tel/map links styled as bordered cells. Prices sit under a serif number with a hairline underline (`border-b border-[#1A1A1A]/30`).
- **Footer**: full ink block (`bg-[#1A1A1A] text-[#F9F7F2]`), inverted — 12-col grid: brand + tagline + review pills, quick mono nav links, contact summary; bottom bar with © and a bordered "Top ↑" button.

## Motion / animación
Deliberately minimal and CSS-only (a `motion` lib is in package.json but **unused** — no scroll-reveal, no parallax). Everything is Tailwind transitions:
- Durations `200–500ms`, default/`ease-out` easing.
- Hover: link underline grow (`duration-300`), image zoom on menu cards (`group-hover:scale-105`, `duration-500`), button color/border shifts (`duration-200`).
- Header restyles on scroll (`duration-500`); notice banner collapses via `max-h`/opacity (`duration-300`); mobile menu and menu drawer use scale + opacity transforms (`origin-top`, `active:scale-95/[0.98]`).
- Success micro-feedback: "Copied!" chip fades in. Restraint is the point — motion is functional, never decorative.

## Anatomía de secciones
1. **Notice banner** (dismissible, top): ink bar, mono uppercase micro-text, Info + X icons — a guest/price disclaimer.
2. **Header**: floating blur pill nav (see above).
3. **Hero**: 2-col (`lg:grid-cols-12`, 6/6). Left = image well with an "Est. {year} • {cuisine}" ink caption tab anchored bottom-left. Right = mono badge → big serif headline (2nd line italic, muted) → light body → primary (ink) + secondary (ghost, Google Reviews) CTAs. Below: a bordered `#EFECE6` mini-grid with Location + Hours (icon + mono label + value).
4. **About**: centered mono eyebrow + serif subtitle, then a compact card (`8/4` split): story paragraph(s) light serif-adjacent + small thumbnail.
5. **Menu**: centered header, `rounded-full` category tabs, optional tag filters, italic category description, 2-col item cards (image-topped for food, image-less for drinks), then a bordered "Important Notice" disclaimer. Floating "Menu" FAB + category-picker popover while scrolling the section.
6. **Reviews**: compact ink-avatar header with a `★ 4.8` pill + CTA, then 2-col italic quote cards with star rows and mono dates.
7. **Contact**: centered header, 2-col panels — "Get in Touch" (address/phone/email copy + social buttons) and "Operating Hours" list — all bordered `#EFECE6` cells.
8. **Footer**: inverted ink block (see above).

## Imágenes e iconografía
- **Photos**: warm, editorial food/interior photography, always in bordered wells with fixed aspect ratios (`4/3` hero, `16/9` menu items, `16/10` about). Uniform treatment: `object-cover` + `filter contrast-[1.05]` (hero also `brightness-95`) so images feel consistent and slightly muted, matching the paper. Placeholder fill `#E8E4DB`.
- **Icons**: `lucide-react`, thin stroke, tiny (`w-3`–`w-5`), monochrome ink or stone. Used as small accents beside mono labels (UtensilsCrossed, Sparkles, MapPin, Clock, Star, Info) — never large or colorful.
- **Favicon**: rounded ink square with a paper bowl + amber chopsticks + steam (the one place amber `#D97706` appears).

## Voz / copy
Warm, understated, hospitable — short declaratives. Serif chef quote ("Good food brings people together."). Micro-labels are terse and gallery-like: "Est. 2021 • Japanese Dining", "Our Menu", "Current Offerings", "Visit Us". Disclaimers are polite and plain ("Guest Notice:", "Please inform your server..."). Emphasize craft and patience (e.g. "16-hour broth", "handcrafted"). Nothing shouty; confidence through calm.

## Do / Don't
**Do**
- Keep the whole page on one warm paper tone; let empty space breathe (yohaku).
- Pair large calm *serif* headings with tiny wide-tracked *mono uppercase* eyebrows.
- Separate sections with hairline ink-at-low-opacity borders, not color bands.
- Use solid-ink blocks/buttons/badges for emphasis; ghost + hairline for secondary.
- Filter photos to a consistent slightly-muted, higher-contrast look.

**Don't**
- Don't introduce bright/saturated accent colors in the UI (keep amber to the favicon).
- Don't use gradients, glows, or heavy drop shadows — `shadow-sm`, hairlines instead.
- Don't bold the display serif or tighten sections; airiness is the brand.
- Don't over-animate — subtle CSS hover/scroll transitions only.
- Don't round everything; primary CTAs and badges stay square-cornered (pills reserved for nav/tabs).

## Prompt listo para usar
> Design a calm, editorial-minimalist landing page for an artisan coffee shop, in the Japanese *yohaku* (余白, negative-space) aesthetic. The entire page sits on a single warm paper off-white background (#F9F7F2) with near-black ink (#1A1A1A) for all text, borders and dark blocks — almost monochrome, no bright accent colors, no gradients, no glows, no heavy shadows. Emptiness is the design: generous margins, narrow centered reading measures, and lots of quiet breathing room.
>
> Typography pairs a normal-weight editorial **serif** (Georgia / Times) for large calm headlines, prices and italic pull-quotes, with **light Helvetica/Arial** body copy, and tiny **monospaced uppercase** micro-labels (9–11px, letter-spacing ~0.2–0.25em) for eyebrows, badges and captions — like gallery labels. Big serif headline + tiny wide-tracked mono eyebrow above it is the signature move.
>
> Surfaces are a slightly darker warm card tone (#EFECE6) with hairline ink borders at 10–20% opacity; sections are divided only by these thin lines, never color bands. Primary buttons and badges are solid ink blocks with paper text, square-cornered, uppercase mono/semibold; secondary buttons are transparent ghosts with a hairline border. Navigation is a floating blurred "pill" bar (rounded-full, translucent paper, backdrop blur) that restyles subtly on scroll; category tabs are also pills. Photography (coffee, beans, interior) lives in bordered wells at fixed aspect ratios with a consistent slightly-muted, higher-contrast filter. Icons are thin, tiny, monochrome (Lucide-style).
>
> Sections in order: dismissible ink notice bar → floating pill header (small ink circle logo + serif name + mono sub-label) → hero (2-column: image well with an "Est. YEAR • Coffee Roasters" ink caption tab on one side, mono badge + large serif headline with an italic second line + light intro + ink primary CTA and ghost secondary CTA on the other, plus a bordered location/hours mini-grid) → about (centered mono eyebrow + serif subtitle + compact story card with thumbnail) → menu (centered header, rounded-pill category tabs, 2-column item cards — image-topped for food, image-less for drinks, serif name + hairline-underlined serif price) → reviews (ink-avatar header with a ★ rating pill + italic quote cards) → contact (two bordered panels: get-in-touch + operating hours) → full ink inverted footer (brand, mono quick links, contact, © and a "Top ↑" button).
>
> Motion is minimal and CSS-only: 200–500ms ease-out transitions, animated underlines on nav hover, gentle image zoom on card hover, header/banner state changes — nothing decorative. Voice is warm, understated and hospitable, emphasizing craft and patience ("small-batch", "slow-poured"). Overall feeling: a printed café menu card brought to the web — quiet, refined, and mostly empty on purpose.
