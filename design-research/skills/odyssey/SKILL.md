---
name: design-odyssey
description: Sober, modular marketing design language (Astro "Odyssey" theme) — serif headings on clean sans body, generous whitespace, rounded surface cards, and a fully token-driven re-theming system. Invoke when building a calm, elegant landing page assembled from swappable content sections (hero / features / quote / sticky text+image / CTA / store blocks) that must be recolorable and re-fontable by editing tokens alone.
---

# Odyssey — Sober modular marketing, re-themed by tokens

## Identidad / vibe
Calm, editorial, and confident. The look reads like a well-set magazine spread turned into a product page: large serif headlines paired with a quiet humanist sans, lots of breathing room, soft rounded cards floating on near-white surfaces, and almost no decorative noise. Nothing shouts — hierarchy comes from type scale and whitespace, not from color or shadow. The defining trait is **modularity**: every page is a vertical stack of self-contained sections, and the entire visual identity (color + font + corner roundness) lives in a handful of CSS custom properties, so one landing can be re-skinned into a totally different brand without touching markup. Bundled themes (default/light, dark, earth, ocean, sand) prove the same layout carries radically different moods.

## Paleta de color
Semantic token system on `:root`, overridden per theme via `[data-theme='...']`. Colors are always referenced by **role**, never by hex, in components. Each surface ships with its own "on-" foreground for contrast.

Default (light) tokens — exact values:
- `--theme-primary: hsl(0,0%,0%)` (black) · `--theme-primary-hover: hsl(0,0%,20%)` · `--theme-on-primary: #fff`
- `--theme-bg: #fff` · `--theme-on-bg: #000`
- `--theme-surface-1: #f2f2f2` (light gray card) · `--theme-on-surface-1: #000`
- `--theme-surface-2: #cce6d0` (soft mint accent) · `--theme-on-surface-2: #000`

Theme variants (show how re-theming works — same roles, new values):
- `dark`: primary white on `--theme-bg: hsl(0,0%,2%)`, surface-1 `hsl(0,0%,20%)`, surface-2 `#203422`; also sets `--theme-shape-radius: 0` (dark theme goes square).
- `earth`: primary `#2c3e2d` (deep forest green), bg `#eeeff1`, surface-2 `#c3d9c4`, button radius softened to `0.5rem`.
- `ocean`: primary `#1556ac` (blue), bg `#fafafa`, surface-2 `#072650` (navy).
- `sand`: primary `#e38a20` (amber), on-bg `#5e4536` (warm brown), surface-1 `#ffecd9`, surface-2 `#6a4d34`.

Theming mechanics: a build-time inline script (`ThemeProvider`) reads `localStorage.theme` and stamps `data-theme` on `<html>` before paint (no flash); an optional Lit `ThemeSwitcher` web component writes the choice and swaps the hero image per theme. To make a NEW brand you copy one `[data-theme]` block and change the ~8 role tokens — nothing else.

## Tipografía
Two self-hosted families (woff2/woff, `font-display: swap`), exposed as tokens:
- `--theme-font-family-serif: 'Roboto Serif', Georgia, Cambria, 'Times New Roman', Times, serif` — used for **h1/h2/h3 headings**, weight 700 (h3 500). Loaded weights: 600, 700.
- `--theme-font-family-sans: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif` — used for **body**, base weight 400. Loaded weights: 300, 400, 700, 700italic. (Note: `FeatureCard` titles deliberately override to sans.)

Fluid modular scale (`clamp()`, min→max across viewport):
- `--font-size-sm: clamp(14.4px, .07vw+14.13px, 15px)`
- `--font-size-base: clamp(18px, .23vw+17.09px, 20px)` — body
- `--font-size-md: clamp(22.5px, .47vw+20.61px, 26.66px)`
- `--font-size-lg: clamp(28.13px, .84vw+24.76px, 35.54px)` — h3
- `--font-size-xl: clamp(35.16px, 1.39vw+29.6px, 47.37px)` — h2
- `--font-size-xxl: clamp(43.95px, 2.18vw+35.22px, 63.15px)` — h1
- `--font-size-xxxl: clamp(54.93px, 3.32vw+41.64px, 84.17px)` — display/hero-only

Line-height: body `1.5`; h1/h2 tightened to `1.1`. No custom letter-spacing (relies on the fonts' defaults). Blockquotes: italic, weight 500, base size, with a `0.25rem` left border in `--theme-on-bg` and `1.5rem` left padding. Vertical rhythm: every heading and `p` gets `margin: 0 0 1rem 0`.

## Layout y espaciado
- Body capped at `1920px`, centered; content wrapped by a `Container` at `--container-max-width: 1440px`, or `--container-max-width-narrow: 960px` for reading-width text sections. Container padding `0 1rem`.
- Section rhythm token `--section-margin: 3rem` — most sections use `margin: var(--section-margin) auto`; heavier sections (quote, sticky) double it to `calc(var(--section-margin) * 2)`.
- Grid gap token `--theme-grid-gap: 1rem`.
- Two-column content sections are `grid-template-columns: 1fr 1fr` and collapse to a single column at `max-width: 768px`; the sticky variant uses asymmetric `6fr 4fr` (or `4fr 6fr` reversed).
- Heros claim near-full height: `min-height: clamp(90vh, 100vw, calc(100vh - var(--navbar-height)))`; text column is capped at `max-width: 25rem` and centered next to its image.
- Whitespace philosophy: sections are islands separated by uniform margin; padding inside cards/CTAs is generous (`2rem`+, text-card up to `clamp(10vh,12vh,18vh)`). Content never spans the full 1920px — it always sits inside a centered container.

## Componentes
- **Shape tokens**: `--theme-shape-radius: clamp(1rem, 2rem, 3rem)` (cards, images, surfaces) and `--theme-button-border-radius: 3rem` (pill buttons). Set radius to `0` for a hard-edged brand (dark theme does exactly this). `--theme-transition: 0.2s ease-in-out`.
- **Button** (`btn`): pill by default, `padding: .36rem .92rem`, weight 500, `--theme-primary` bg / `--theme-on-primary` text, darkens to `--theme-primary-hover`. Variants: `--outlined` (2px primary border, fills on hover), `--unelevated` (transparent/text-only), `--on-primary`, plus optional trailing `customIcon` slot (24px svg).
- **FeatureCard**: rounded `surface-1` card wrapping a screenshot; the image sits with a soft shadow and `translateY(0.5rem)` that eases to `0` on hover — a subtle lift. Title in sans.
- **Header/Nav**: minimal flex bar, `1rem` vertical padding; logo left, nav links right (or `rightMenu` grid variant with an action button). Nav links are `color: inherit` at `opacity: .72`, → `1` on hover. Below 600px the nav becomes a full-screen fixed overlay toggled by a hamburger (Material icons), with body-scroll locking.
- **Footer**: big (`min-height: 40vh`), `--theme-primary` bg (overridable), top corners rounded; 4-col grid (`2fr 1fr 1fr 1fr`) of brand+socials and link lists, collapsing to 2 then 1 column. Socials are 24px icons.
- **AnnouncementBar**: full-width primary-colored strip above the header for a single link.
- **Forms** (`FormInput`/`FormSelect`/`FormTextarea`): stacked `grid` with `1rem` gap; inputs full-width, `0.5rem` padding, `2px` gray border (`#ccc`) that turns to `--theme-on-bg` on focus, `0.25rem` radius. Label sits above field.
- **Section catalog** (the modular blocks, exported from one barrel file):
  - Heros: `HeroSection` (slotted text+image, 50/50), `TextAndImageHero` (adds a buttons slot + `reversed` order), `HomeHeroSection` (opinionated hero w/ theme switcher).
  - `ThreeColumnTextSection` — 3-up feature/benefit columns (→2→1), each with body + CTA slot.
  - `CustomerQuoteSection` — centered testimonial on `surface-1`, large italic blockquote.
  - `StickyTextImageSection` — long text beside an image that sticks while scrolling (great for feature lists / product detail).
  - `CtaCardSection` — centered call-to-action inside a rounded `surface` card; bg/color overridable per instance.
  - `TextSection` / `TextCardSection` — plain or surface-backed reading blocks (narrow width).
  - `YouTubeEmbedSection`, `FeatureCard` grid, `NewsletterForm`, `ContactForm`, blog list/preview.

## Motion / animación
Restrained and functional. Global `--theme-transition: 0.2s ease-in-out`. Interactions that animate: button bg/color on hover, outlined-button fill, nav link opacity (`150ms linear`), FeatureCard image lift (`translateY`), ThemeSwitcher border/glow. `html:focus-within { scroll-behavior: smooth }`. The sticky text+image is the one "scroll effect" (position: sticky). No parallax, no entrance animations, no auto-playing motion. `prefers-reduced-motion: reduce` globally kills animations/transitions/smooth-scroll — respect it.

## Anatomía de secciones
A page = `Base` layout (`<head>` + skip-link + slots for announcement-bar / header / main / footer) → `Page` layout (injects Header with nav config, Footer with link/social config, Logo) → then the page file stacks section components as children. Example (landing-1): AnnouncementBar → TextAndImageHero(reversed) → CustomerQuoteSection → ThreeColumnTextSection → YouTubeEmbedSection → StickyTextImageSection → CtaCardSection. Content is passed into sections via **named slots** (`text-container`, `image-container`, `btns-container`, `column-N-body`, `column-N-cta`), so structure is fixed and elegant while copy/media are swappable. Build a new page purely by reordering blocks — no custom CSS needed.

## Imágenes e iconografía
Photographic, full-bleed-within-card images with `object-fit: cover`, `border-radius: var(--theme-shape-radius)`, and `max-height: 80vh` in heros. Served via `<picture>` with webp + png/jpg fallback, `loading="lazy"`, explicit width/height. Screenshots in FeatureCards carry a soft `rgba(138,138,138,0.12)` shadow. Icons are Material Design (`astro-icon`, e.g. `ic:baseline-chevron-right`, `ic:baseline-menu`), 24px, monochrome inheriting current color. No illustrations or gradients by default.

## Voz / copy
Plain, direct, benefit-first, lightly encouraging. Short headlines (often a wink: "Don't Reinvent the Wheel"), one-sentence supporting lines, single clear CTA per section ("Get Started" with a chevron). Announcement/testimonial copy is conversational. Nothing salesy or jargon-heavy — the tone matches the sober visuals.

## Do / Don't
- Do drive everything through role tokens (`--theme-primary`, `--theme-surface-1`, `--theme-on-*`, font + radius vars); re-theme by overriding a `[data-theme]` block only.
- Do pair serif headings with the sans body, and let whitespace + the clamp() type scale carry hierarchy.
- Do compose pages as a vertical stack of the provided section blocks via named slots.
- Do keep motion to ~0.2s hover/opacity transitions and honor `prefers-reduced-motion`.
- Don't hardcode hex values in components, add drop-shadows/gradients/heavy borders, or let content run full-bleed past the 1440px container.
- Don't crowd sections — respect the `--section-margin` rhythm; don't mix many accent colors (one primary + two surfaces is the whole palette).

## Prompt listo para usar
Build a landing page for **an artisan coffee house with an Asian touch**, using the Odyssey design language: a sober, editorial, fully token-driven modular system.

Design language:
- Feel: calm, refined, generous whitespace; hierarchy from a large serif headline scale over a quiet humanist sans body; soft rounded cards floating on near-white surfaces; almost no shadows, no gradients, no decorative noise. One primary color plus two surface colors is the entire palette.
- Re-theme the token set to a **warm coffee palette with an Asian accent**: `--theme-primary` a deep roasted espresso brown; `--theme-primary-hover` a slightly lighter brown; `--theme-bg` a warm off-white/cream; `--theme-on-bg` a dark cocoa; `--theme-surface-1` a light latte/oat tone; `--theme-surface-2` a muted matcha/jade green (the Asian touch) with a light foreground. Keep everything referenced by these semantic role tokens — never hardcode hex in components.
- Typography: a serif for headings (weight 700, tight 1.1 line-height) over a humanist sans for body (weight 400, 1.5 line-height); use a fluid clamp() scale (sm→xxxl). Optionally let one accent word render in an italic or a subtly Asian-flavored serif, but keep it tasteful.
- Shape: rounded corners via a single radius token (`clamp(1rem,2rem,3rem)` for cards/images, pill buttons at ~3rem). Motion limited to ~0.2s ease-in-out hover transitions (button fills, link opacity, a gentle card image lift); honor prefers-reduced-motion.

Compose the page as a vertical stack of modular sections (fixed structure, swappable content via slots), roughly:
1. AnnouncementBar — a single line (e.g. "New: seasonal Hojicha latte now pouring").
2. TextAndImageHero — serif headline + one supporting sentence + a primary "See the Menu" pill button with a chevron, beside a full-cover rounded photo of a pour-over/latte.
3. ThreeColumnTextSection — three benefit columns (e.g. "Single-origin beans", "Matcha & Hojicha bar", "Slow-bar craft"), each with a small CTA.
4. FeatureCard grid or a product/menu block — rounded surface-1 cards showing signature drinks/pastries with photo, name, and price; subtle hover lift on the image.
5. StickyTextImageSection — a scroll-sticky image beside a longer story about the roast/brewing ritual.
6. CustomerQuoteSection — a centered large italic testimonial on surface-1.
7. CtaCardSection — a centered rounded card (use surface-2 matcha) with "Visit us" / newsletter signup.
8. Footer — large, primary-brown, top-rounded, with hours, location, and social icons.

Keep all content inside a centered 1440px container (960px for reading blocks), maintain the uniform `--section-margin` rhythm between blocks, use Material-style 24px monochrome icons, and serve images as cover-fit rounded photos with webp fallback. Copy should be plain, warm, and benefit-first with one clear CTA per section. Deliver it so the whole brand can be re-skinned later by editing only the color, font, and radius tokens.
