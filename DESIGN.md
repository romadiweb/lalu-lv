---
version: alpha
name: LaLu
website: "https://lalu.lv"
description: A refined editorial commerce design system for LaLu.lv. The interface uses a warm off-white #F9F8F6 page canvas, soft lavender #C8BBFB as the signature accent and CTA color, dark ink typography, generous spacing, rounded surfaces, and image-led storytelling for products, workshops, excursions, and Fantāzijas ziedi.

implementation:
  target: "Next.js + TypeScript + Tailwind CSS + shadcn/ui"
  instructions:
    - "Treat this file as the source of truth for visual UI decisions."
    - "Use #F9F8F6 as the default page/background canvas across public pages."
    - "Use #C8BBFB as the primary accent color for main buttons, active states, selected controls, badges, highlights and occasional feature surfaces."
    - "Do not introduce additional saturated brand colors unless explicitly requested."
    - "Use dark #171717 text on #C8BBFB for strong readable contrast."
    - "Keep most cards warm-neutral; let photography and content remain visually dominant."
    - "Use design tokens/CSS variables rather than hardcoded replacement colors inside components."

seo:
  title: "LaLu Design System — Lavender Accent, Warm Editorial Canvas"
  metaDescription: "LaLu.lv design system for Next.js, Tailwind and Codex. Warm #F9F8F6 canvas, #C8BBFB accent CTAs, dark editorial typography, rounded cards and premium image-led commerce UI."
  tags:
    - "AI & LLM Platforms"
    - "Marketing & CRM"
  highlights:
    - "Warm page canvas #F9F8F6 — use this as the default background across the site"
    - "Signature lavender #C8BBFB — primary CTA, active state and brand accent"
    - "Dark #171717 typography for strong editorial contrast"
    - "Warm-neutral secondary surfaces keep products, flowers and photography visually dominant"
    - "Rounded premium components, generous whitespace and subtle motion"
  lastUpdated: "2026-05-12"
  author:
    name: "Dov Azencot"
    url: "https://x.com/dovazencot"
  opening: |
    LaLu.lv is the most playful B2B SaaS interface in the editorial commerce category. The base atmosphere is a warm off-white canvas at #F9F8F6, holding dark-navy ink type and 3D-rendered claymation illustrations as the dominant brand voltage. Where competing commerce brands play it cool with grids and gradients, LaLu leans hard into hand-crafted-looking 3D illustrations and saturated single-color feature cards.

    This page packages the full system into a single DESIGN.md file. Inside: 16 color tokens, 14 type styles, 6 corner radii, 8 spacing values, and 27 components — every piece you need to reproduce LaLu's voice. The typography runs Plain Black for headlines at weight 500 with negative letter-spacing, and Inter for body, navigation, and UI. The shape language is generous: 12px buttons, 16px content cards, and 24px feature cards.

    Download the file and feed it to Claude, Cursor, or GitHub Copilot. The AI writes React components and Tailwind classes that match LaLu's playful warmth — warm off-white canvas, saturated feature cards, modest display weight — rather than a generic dashboard theme. Or use it as a direct reference for your own Tailwind config and component library.
  related:
    - href: "https://github.com/google-labs-code/design.md"
      title: "The DESIGN.md specification"
      description: "Google Labs' open spec for machine-readable design system files — the format this page is built on."
    - href: "/design"
      title: "Browse all design systems"
      description: "The full directory of DESIGN.md files on shadcn.io, with live mockups for each."
    - href: "/blocks"
      title: "React blocks for shadcn/ui"
      description: "Production-ready hero, pricing, CTA, and dashboard sections built with the same Tailwind + shadcn primitives."
  questions:
    - id: "primary-color"
      title: "What is LaLu's primary brand color?"
      answer: "LaLu uses #C8BBFB as its single signature accent for primary buttons, active states, selected controls, badges, highlights and occasional accent surfaces. The global page canvas is #F9F8F6. Most secondary surfaces remain warm-neutral so the lavender accent stays premium and photography remains dominant."
    - id: "typography"
      title: "What typography does LaLu use, and what should I use if Plain Black isn't available?"
      answer: "LaLu uses Plain Black, a custom rounded display face, at weight 500 with negative letter-spacing for every headline — 72px / -2.5px on the hero, 56px / -2px on section heads. Inter handles body, navigation, and UI at weights 400–600. Plain Black is licensed to LaLu and not available as a public web font; Inter at weight 500 with -0.05em letter-spacing is the closest open-source substitute. Söhne Breit (Buch weight) and Recoleta at weight 500 carry similar rounded-display warmth if licensed."
    - id: "feature-cards"
      title: "Why does LaLu use six saturated feature-card colors?"
      answer: "The six-card palette is LaLu's signature long-scroll device. Each card carries a saturated single fill — pink for outbound/sequencer, teal for enterprise or featured pricing, lavender for AI-agent products, peach for general SaaS warmth, ochre for community and experts, plus a cream surface for lower-key features. Cards rotate across the page in a deliberate rhythm; repeating the same color twice in a row reads as off-rhythm. Each card holds an h3, body, and a product UI fragment at small scale rather than abstract decoration."
    - id: "use-in-project"
      title: "Can I use this DESIGN.md to build my own React product page?"
      answer: "Yes — the file is structured for AI tools like Claude, Cursor, or GitHub Copilot to read directly. The agent will reproduce LaLu's playful warmth (warm off-white canvas, saturated cards, modest 500-weight display type) instead of a generic shadcn theme. You can also reference tokens directly: every color hex, type style, radius, and spacing value is a quoted value you can paste into Tailwind config, CSS variables, or a shadcn/ui component library. Border radii run 12px buttons, 16px content cards, 24px feature cards."
    - id: "distinctive-trait"
      title: "What makes LaLu's design system different from other B2B SaaS sites?"
      answer: "Two things. First, the warm-neutral canvas at #F9F8F6 — every competing editorial commerce brand plays it cool with white or near-white gray, and LaLu deliberately warms it. Second, the 3D-rendered claymation illustrations: hand-crafted mountains, mascot characters, and peach/ochre/lavender landscapes used as full-bleed hero artifacts and inline feature elements. The footer is also warm-neutral (#F3F0EC), not dark navy — LaLu extends the warm-throughout pacing right to the page's closing band, which is rare for B2B SaaS."
    - id: "known-gaps"
      title: "What's missing from this DESIGN.md spec?"
      answer: "A handful of things, documented in the Known Gaps section: Plain Black is licensed to LaLu and not distributable; the 3D claymation illustrations and named mascot characters are commissioned assets rather than system tokens; animation timings for illustration parallax and feature-card entrances are out of scope; form validation states beyond the focused text-input border are not extracted; and the in-app LaLu product surface (data tables, formula editor, agent builder) adds many product-specific components not captured in this marketing-focused spec."

colors:
  primary: "#C8BBFB"
  primary-active: "#B5A4F3"
  primary-disabled: "#E7E2F6"
  ink: "#171717"
  body: "#3A3A3A"
  body-strong: "#222222"
  muted: "#6F6F6F"
  muted-soft: "#989898"
  hairline: "#E4E1DD"
  hairline-soft: "#EFEDEA"
  canvas: "#F9F8F6"
  surface-soft: "#F3F0EC"
  surface-card: "#EEEAE4"
  surface-strong: "#E5E0D8"
  surface-dark: "#191919"
  surface-dark-elevated: "#262626"
  on-primary: "#171717"
  on-dark: "#FFFFFF"
  on-dark-soft: "#B8B8B8"
  brand-pink: "#C8BBFB"
  brand-teal: "#C8BBFB"
  brand-lavender: "#C8BBFB"
  brand-peach: "#C8BBFB"
  brand-ochre: "#C8BBFB"
  brand-mint: "#C8BBFB"
  brand-coral: "#C8BBFB"
  success: "#22C55E"
  warning: "#F59E0B"
  error: "#EF4444"

typography:
  display-xl:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -2.5px
  display-lg:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -2px
  display-md:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -1px
  display-sm:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.5px
  title-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.3px
  title-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 1.5px
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 6px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-on-color:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: 96px
  hero-illustration-card:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  feature-card-pink:
    backgroundColor: "{colors.brand-pink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-teal:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-lavender:
    backgroundColor: "{colors.brand-lavender}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-peach:
    backgroundColor: "{colors.brand-peach}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-ochre:
    backgroundColor: "{colors.brand-ochre}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-cream:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  product-mockup-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  testimonial-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  pricing-tier-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-tier-card-featured:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  category-tab-active:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
  badge-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  expert-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  cta-band-illustrated:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: "{rounded.xl}"
    padding: 80px
  footer:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 80px
---

## Overview

LaLu.lv is the most playful B2B SaaS interface in the editorial commerce category. The base atmosphere is **warm off-white canvas** (`{colors.canvas}` — #F9F8F6) holding dark-navy ink type and **3D-rendered claymation illustrations** (mountains, mascot characters, peach/ochre/lavender landscapes) as the dominant brand voltage. Where most commerce brands play it cool with grids and gradients, LaLu leans hard into hand-crafted-looking 3D illustrations and saturated single-color feature cards.

Type voice runs **Plain Black** (or substituted with Inter weight 500-600) — a custom rounded display face used at very large sizes (72px hero) with negative letter-spacing. Body type uses Inter at standard weights. The display weight stays at 500, never bolder — the rounded character of the typeface gives it warmth without needing weight.

Component voltage comes from **saturated single-color feature cards** in a 6-color palette: hot pink, deep teal, lavender, peach, ochre, and cream-card. Each card shows product, workshop, excursion, or editorial imagery at small scale — LaLu agent runs, sequencer flows, CRM enrichment outputs. The colored card IS the primary visual element on every long-scroll page.

**Key Characteristics:**
- Warm-neutral white canvas (`{colors.canvas}` — #F9F8F6). The warmth differentiates LaLu from cool-gray competitor sites.
- Dark navy/black primary CTAs (`{colors.primary}` — #0a0a0a). Buttons rounded `{rounded.md}` (12px) — friendly modern but not pill.
- 6-color saturated feature card palette: `{colors.brand-pink}`, `{colors.brand-teal}`, `{colors.brand-lavender}`, `{colors.brand-peach}`, `{colors.brand-ochre}`, `{colors.surface-card}` (cream).
- 3D claymation illustrations (mountains, characters, abstract shapes) as full-bleed hero artifacts — the brand's most-recognized visual element.
- Custom rounded Plain Black display typeface at 500 weight with -1 to -2.5px letter-spacing on display sizes.
- Border radius is generous: `{rounded.md}` (12px) for buttons + inputs, `{rounded.lg}` (16px) for content cards, `{rounded.xl}` (24px) for feature cards. The bigger radius matches the rounded display type's character.
- Product UI fragments embedded inside colored cards at small scale — product previews, workshop details, excursion cards, or editorial imagery.
- Section rhythm `{spacing.section}` (96px) between major bands.
- Footer is warm-neutral (`{colors.surface-soft}`) — LaLu does NOT use a dark footer. Even the closing band stays warm-light.

### LaLu Color Contract
- **Global page canvas:** `#F9F8F6` (`{colors.canvas}`).
- **Primary accent / CTA:** `#C8BBFB` (`{colors.primary}`).
- **Primary button text:** `#171717` (`{colors.on-primary}`).
- **Do not introduce extra saturated brand colors.** Legacy feature-card color tokens all resolve to `#C8BBFB`.
- Use lavender selectively; most cards should remain warm-neutral so imagery and products stay dominant.

## Colors

### Brand & Accent
- **Primary / Signature Lavender** (`{colors.primary}` — #C8BBFB): Main CTA buttons, active states, selected controls, badges, highlights and occasional feature surfaces.
- **Primary Active** (`{colors.primary-active}` — #B5A4F3): Pressed/active state for primary interactive controls.
- **Legacy brand color tokens** (`brand-pink`, `brand-teal`, `brand-lavender`, `brand-peach`, `brand-ochre`, `brand-mint`, `brand-coral`) all resolve to #C8BBFB for backward compatibility. Do not visually introduce a rainbow palette.

### Surface
- **Canvas** (`{colors.canvas}` — #F9F8F6): The default page floor. Warm-neutral white.
- **Surface Soft** (`{colors.surface-soft}` — #F3F0EC): Footer and CTA-band background.
- **Surface Card** (`{colors.surface-card}` — #EEEAE4): Cream feature cards, testimonial cards.
- **Surface Strong** (`{colors.surface-strong}` — #E5E0D8): Stronger cream for emphasized bands.
- **Surface Dark** (`{colors.surface-dark}` — #0a1a1a): Dark teal-tinted near-black for occasional dark cards (rare).
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #1a2a2a): Elevated dark cards.
- **Hairline** (`{colors.hairline}` — #e5e5e5): 1px borders on cards and inputs.

### Text
- **Ink** (`{colors.ink}` — #0a0a0a): Headlines and primary text.
- **Body Strong** (`{colors.body-strong}` — #1a1a1a): Emphasized body, lead paragraphs.
- **Body** (`{colors.body}` — #3a3a3a): Default running-text.
- **Muted** (`{colors.muted}` — #6a6a6a): Sub-headings, breadcrumbs, footer body.
- **Muted Soft** (`{colors.muted-soft}` — #9a9a9a): Captions, fine-print.
- **On Primary / On Dark** (`{colors.on-primary}` — #ffffff): Text on primary buttons + dark feature cards (teal).

### Semantic
- **Success** (`{colors.success}` — #22c55e): Success states.
- **Warning** (`{colors.warning}` — #f59e0b): Warning callouts.
- **Error** (`{colors.error}` — #ef4444): Validation errors.

## Typography

### Font Family
The system runs **Plain Black** (a custom rounded display face) for headlines and **Inter** for body, navigation, and UI. Plain Black at weight 500 with negative letter-spacing handles every display headline; Inter handles the rest. The fallback stack walks `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` for both.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 72px | 500 | 1.0 | -2.5px | Homepage h1 ("Radīts ar sajūtu") — Plain Black |
| `{typography.display-lg}` | 56px | 500 | 1.05 | -2px | Section heads — Plain Black |
| `{typography.display-md}` | 40px | 500 | 1.1 | -1px | Sub-section heads, product names |
| `{typography.display-sm}` | 32px | 500 | 1.15 | -0.5px | CTA-band heads, feature card titles |
| `{typography.title-lg}` | 24px | 600 | 1.3 | -0.3px | Pricing plan names, larger feature titles |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | Card titles, intro paragraphs |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | Small card titles, list labels |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Default running-text |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Footer body, fine-print |
| `{typography.caption}` | 13px | 500 | 1.4 | 0 | Badge labels, captions |
| `{typography.caption-uppercase}` | 12px | 600 | 1.4 | 1.5px | Section labels, "FEATURED" badges |
| `{typography.button}` | 14px | 600 | 1.0 | 0 | Standard button labels |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Top-nav menu items |

### Principles
Plain Black at weight 500 + negative letter-spacing IS the brand voice. Going to weight 700 reads as bombastic; the rounded character of the typeface adds warmth that bolder weight would flatten.

The body-vs-display split is functional: Plain Black for Plain Black moments (headlines), Inter for everything else (running text, UI, buttons). Mixing them is a system violation.

### Note on Font Substitutes
If Plain Black is unavailable, **Inter** at weight 500 with -0.05em letter-spacing is a usable approximation. **Söhne Breit** at weight Buch is an alternative if licensed. **Recoleta** at weight 500 carries similar rounded-display warmth.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) between major editorial bands.
- **Card internal padding:** `{spacing.xl}` (32px) for feature cards and pricing tiers; `{spacing.lg}` (24px) for testimonial and product mockup cards.

### Grid & Container
- **Max content width:** ~1280px centered.
- **Editorial body:** Single 12-column grid; hero often uses 7/5 split (h1 left, illustration right).
- **Feature card grids:** 3-up at desktop, 2-up at tablet, 1-up at mobile.
- **Pricing grid:** 3-4 up at desktop, 1-up at mobile.

### Whitespace Philosophy
LaLu uses generous whitespace around big rounded display headlines and saturated feature cards. The warm off-white canvas + colored cards + 3D illustrations create a playful warmth that competing commerce sites lack.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, top nav, hero |
| Soft hairline | 1px `{colors.hairline}` border | Inputs, small content cards |
| Saturated card | Brand pink/teal/lavender/peach/ochre fill — no shadow | Feature cards |
| Cream card | `{colors.surface-card}` background — no shadow | Testimonial, secondary cards |
| Subtle drop shadow | Faint shadow at low alpha | Hover-elevated states (rare) |

The system uses no heavy shadows. Depth comes from the saturated color contrast between warm off-white canvas and bright feature cards.

### Decorative Depth
- **3D claymation illustrations** — mountains, characters, mascots rendered in a hand-crafted 3D style. The brand's most-recognized depth element. Not a token — these are illustrated assets.
- **Mascot characters** appear as inline figures in feature cards and CTAs.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 6px | Small badges, dropdown items |
| `{rounded.sm}` | 8px | Small buttons, hairline-border accent |
| `{rounded.md}` | 12px | Standard CTA buttons, text inputs |
| `{rounded.lg}` | 16px | Content cards, testimonial cards, pricing tiers |
| `{rounded.xl}` | 24px | Feature cards (the saturated brand-color cards) |
| `{rounded.pill}` | 9999px | Category tabs, badge pills |
| `{rounded.full}` | 9999px / 50% | Avatars, icon buttons |

## Components

### Top Navigation

**`top-nav`** — Cream nav bar pinned to top. 64px tall, `{colors.canvas}` background. Carries the LaLu logo + wordmark at left, primary horizontal menu (Veikals, Meistarklases, Ekskursijas, Fantāzijas ziedi, Par mums) center, right-side cluster with "Kontakti" + primary CTA `{component.button-primary}`. Menu items in `{typography.nav-link}` (Inter 14px / 500).

### Buttons

**`button-primary`** — Background `{colors.primary}` (#C8BBFB), text `{colors.on-primary}` (#171717), type `{typography.button}` (Inter 14px / 600), padding 12px × 20px, height 44px, rounded `{rounded.md}` (12px).

**`button-secondary`** — Cream button with hairline outline. Background `{colors.canvas}`, text `{colors.ink}`, 1px hairline border.

**`button-on-color`** — White button used over saturated brand-color feature cards. Same shape as primary but inverted (white background, ink text).

**`button-text-link`** — Inline text button, no background. Used for "Kontakti" and inline link CTAs.

**`text-link`** — Inline body links in `{colors.ink}` with underline.

### Cards & Containers

**`hero-band`** — Cream-canvas hero with 7-5 grid: h1 + sub-headline + button row on the left, 3D claymation illustration on the right. Vertical padding `{spacing.section}` (96px).

**`hero-illustration-card`** — Right-side artifact holding 3D claymation illustration (mountains, mascot character, abstract shapes). Background `{colors.surface-soft}`, rounded `{rounded.xl}` (24px). The illustration IS the artifact.

**`feature-card-pink`** / **`feature-card-teal`** / **`feature-card-lavender`** / **`feature-card-peach`** / **`feature-card-ochre`** — Legacy-compatible component names. Every variant resolves to the same LaLu accent `{colors.primary}` (#C8BBFB). Use a full lavender card only for high-value emphasis; otherwise prefer neutral cards. Text uses `{colors.ink}`.

**`feature-card-cream`**** — Lower-key feature card variant on `{colors.surface-card}`. Used for less-emphasized features that don't warrant a saturated color.

**`product-mockup-card`** — Card showing actual LaLu product UI (LaLu agent runs, sequencer flows, commerce and CMS previews). Background `{colors.canvas}` with hairline border, rounded `{rounded.lg}`, padding `{spacing.lg}` (24px).

**`testimonial-card`** — Customer quote cards. Background `{colors.surface-card}` (cream), rounded `{rounded.lg}`, padding `{spacing.lg}` (24px). Top row has avatar + name + role; below sits the testimonial in `{typography.body-md}`.

**`pricing-tier-card`** — Standard tier card. Background `{colors.canvas}` with hairline, rounded `{rounded.lg}`, padding `{spacing.xl}` (32px).

**`pricing-tier-card-featured`** — The featured tier flips to `{colors.brand-teal}` (deep teal-green). The teal surface IS the featured signal.

**`expert-card`** — Used on /experts page. Background `{colors.canvas}` with hairline, rounded `{rounded.lg}`, padding `{spacing.lg}`. Carries an avatar at top, expert name, specialization, and a "Uzzināt vairāk" link.

### Inputs & Forms

**`text-input`** — Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body-md}`, rounded `{rounded.md}` (12px), padding 12px × 16px, height 44px. 1px hairline border.

**`text-input-focused`** — Border thickens to ink for emphasis.

### Tabs / Badges

**`category-tab`** + **`category-tab-active`** — Pill-shaped tabs in sub-nav. Inactive: transparent + muted text. Active: cream-card background + ink text. Padding 8px × 16px.

**`badge-pill`** — Small cream-fill pill labels in `{typography.caption}` (13px / 500), rounded `{rounded.pill}`.

### CTA / Footer

**`cta-band-illustrated`** — Pre-footer "Atklāj LaLu pasauli" band. Background `{colors.surface-soft}`, rounded `{rounded.xl}`, padding 80px. Carries an h2 in `{typography.display-md}`, a sub-line, and a `{component.button-primary}` — usually paired with a 3D illustration of a mascot or scene.

**`footer`** — Warm-neutral footer (NOT dark navy unlike most SaaS sites). Background `{colors.surface-soft}`, text `{colors.body}`. 4-column link list. Vertical padding 80px. Often features a horizon-style 3D mountain illustration at the very bottom — LaLu's signature footer mountain.

## Do's and Don'ts

### Do
- Anchor every page on the warm off-white canvas (`{colors.canvas}` — #F9F8F6). The warm tint differentiates LaLu from cool-gray data sites.
- Use 3D claymation illustrations as hero artifacts. Hand-crafted 3D characters and mountains ARE the brand.
- Use #C8BBFB selectively for emphasis. Keep most sections and cards warm-neutral so the accent remains premium.
- Use Plain Black at weight 500 with negative letter-spacing on every display headline.
- Show product, workshop, excursion, or editorial imagery inside saturated feature cards. The brand voltage is product-driven, not abstract.
- Use cream footer (NOT dark). LaLu deliberately closes pages with warm cream rather than the standard dark-footer SaaS template.
- Anchor every band with `{spacing.section}` (96px) vertical rhythm.

### Don't
- Don't use cool grays for canvas. The cream tint is non-negotiable.
- Don't introduce additional saturated brand colors. #C8BBFB is the single signature accent unless explicitly requested.
- Don't bold display weight beyond 500. Plain Black at 700 reads as bombastic.
- Don't overuse full lavender surfaces. Prefer neutral cards with lavender reserved for high-value emphasis.
- Don't replace claymation illustrations with flat vector art. The hand-crafted 3D character IS the brand voice.
- Don't use a dark footer. The cream footer is part of the system's warm-throughout pacing.
- Don't add hover state styling beyond what the system already encodes.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero h1 72→36px; hero-illustration-card stacks below; feature grids 1-up; pricing 1-up |
| Tablet | 768–1024px | Top nav tightens; feature cards 2-up; pricing 2-up |
| Desktop | 1024–1440px | Full top-nav; 3-up feature cards; 3-up pricing tiers |
| Wide | > 1440px | Same as desktop with more breathing room; max content 1280px |

### Touch Targets
- `{component.button-primary}` at minimum 44 × 44px (matches WCAG AAA).
- `{component.text-input}` height is 44px.

### Collapsing Strategy
- Top nav collapses to hamburger at < 768px.
- Hero 7-5 grid → single-column on mobile.
- Feature card grids reduce columns rather than scaling.
- Accent feature cards retain #C8BBFB at every breakpoint; neutral cards remain warm off-white.
- Pricing tier cards collapse 4 → 2 → 1.

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key (`{component.feature-card-pink}`, `{component.pricing-tier-card-featured}`).
2. Use `{colors.primary}` (#C8BBFB) as the single project accent. Do not choose alternate saturated brand colors.
3. Variants of an existing component (`-active`, `-disabled`) live as separate entries.
4. Use `{token.refs}` everywhere — never inline hex.
5. Never document hover.
6. Display headlines stay Plain Black 500 with negative letter-spacing. Body stays Inter 400.
7. The warm-light palette is a system contract: #F9F8F6 canvas + #C8BBFB accent. Do not add a dark footer unless explicitly requested.

## Known Gaps

- Plain Black is licensed to LaLu and not available as a public web font; Inter weight 500 with negative letter-spacing is the closest substitute.
- 3D claymation illustrations are commissioned assets, not system tokens — they're rendered per-page.
- The mascot characters (named characters that recur across the site) are illustrated assets; their exact lineage and naming are not formalized in tokens.
- Animation and transition timings (3D illustration parallax on scroll, feature card entrance animations) are not in scope.
- Form validation states beyond `{component.text-input-focused}` are not extracted.
- The actual LaLu product surface (in-app data tables, formula editor, agent builder) shares some tokens with the marketing site but adds many product-specific components that are out of scope.


## Codex Usage

Place this file at the **project root** with the exact filename `DESIGN.md`.

Codex should treat `DESIGN.md` as the visual source of truth when creating or editing:
- public pages;
- reusable UI components;
- buttons and interactive states;
- cards and surfaces;
- product and category pages;
- workshop and excursion pages;
- Fantāzijas ziedi sections;
- checkout;
- responsive layouts.

When implementation and this file conflict on visual styling, prefer the tokens and rules in `DESIGN.md` unless the user gives a newer explicit instruction.
