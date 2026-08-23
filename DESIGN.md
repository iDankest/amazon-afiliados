---
name: Orza
description: Guías honestas de descanso y teclados con registro manual de precios y estética editorial sobria.
colors:
  primary: "#0f766e"
  primary-dark: "#2dd4bf"
  neutral-bg: "#f4f0e8"
  neutral-bg-dark: "#0c100f"
  neutral-card: "#fffcf7"
  neutral-card-dark: "#151a19"
  neutral-ink: "#1c1917"
  neutral-ink-dark: "#e7e5e4"
  neutral-muted: "#57534e"
  neutral-muted-dark: "#a3a09b"
  neutral-line: "#d6d3d1"
  neutral-line-dark: "#242c2a"
  banner-bg: "#ecfdf5"
  banner-bg-dark: "#09211d"
  banner-ink: "#065f46"
  banner-ink-dark: "#a7f3d0"
  banner-line: "#a7f3d0"
  banner-line-dark: "#134e4a"
typography:
  display:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.85rem, 4vw, 2.35rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.2rem, 2.5vw, 1.4rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  sub:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
  note:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.4
  fine:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.6
  badge:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  sm: "0.45rem"
  md: "0.6rem"
  full: "999px"
spacing:
  xs: "0.35rem"
  sm: "0.7rem"
  md: "1.15rem"
  lg: "1.75rem"
  xl: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.65rem 1.15rem"
  button-primary-hover:
    backgroundColor: "#115e59"
  card:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.md}"
    padding: "1.15rem"
---

# Design System: Orza

## Overview

**Creative North Star: \"The Honest Curator's Ledger\"**

Orza is an editorial buying guide and transparent price registry focused on sleep quality and mechanical keyboards for Spain (Amazon.es). The visual language feels like an authentic field notebook or curator's ledger: calm, confident, tactile, and completely devoid of artificial marketing noise, aggressive badges, or fabricated urgency.

The atmosphere balances warm natural bone/ivory paper in light mode with deep pine-charcoal night in dark mode. Both modes are first-class citizens designed for prolonged reading and late-night decision-making on mobile devices.

**Key Characteristics:**
- Restrained editorial typography with generous line-height and strict 65–75ch column measure.
- Organic, dual-theme palette: Deep Teal and Warm Bone by day; Luminous Mint and Pine Slate by night.
- Flat-by-default architectural surfaces with hairline tonal dividers instead of heavy dropshadows.
- Explicit visual honesty: untested items, price histories, and affiliate disclosures receive dignified, structured space.

## Colors

The palette is rooted in natural pigments: bone paper, charcoal stone, and botanical pine/teal accents that evoke restorative sleep and precise craftsmanship.

### Primary
- **Pine Teal** (`#0f766e` in light, `#2dd4bf` in dark): The focused signature accent for primary interactive elements, links, and verified highlights.
- **Accent Ink** (`#f0fdfa` in light, `#04211d` in dark): High-contrast foreground pairing for text sitting directly on primary accent fills.

### Neutral
- **Page Canvas** (`#f4f0e8` light, `#0e1211` dark): Warm unbleached paper by day; deep midnight charcoal by night.
- **Card Surface** (`#fffcf7` light, `#161b1a` dark): Crisp elevated container tone providing quiet structural separation.
- **Stone Ink** (`#1c1917` light, `#e7e5e4` dark): High-contrast primary reading tone.
- **Muted Stone** (`#57534e` light, `#a8a29e` dark): Secondary labels, timestamps, metadata, and body context.
- **Hairline Divider** (`#d6d3d1` light, `#2b3230` dark): 1px structural framing for cards, header, and tabular data.

### Functional Disclosures
- **Banner Pine/Mint** (`#ecfdf5` bg / `#115e59` ink in light; `#0b2420` bg / `#99f6e4` ink in dark): Quiet, non-alarmist status and transparency notice banner.

### Named Rules
**The Dual-Sovereign Theme Rule.** Dark mode is never an inverted filter or gray tint; it is an authored midnight atmosphere with recalibrated contrast, luminosity, and accent radiance.
**The Intentional Accent Rule.** The primary accent is reserved strictly for interactive triggers, active routes, and price trend signals. It covers ≤10% of any viewport.

## Typography

**Body & Display Font:** `'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
**Tabular Data:** Tabular numerals (`font-variant-numeric: tabular-nums`) for price snapshots and historical dates.

**Character:** Clean, humanist, highly legible at small sizes on mobile screens under any ambient lighting condition.

### Hierarchy
- **Display** (700, `1.75rem` / `clamp(1.75rem, 4vw, 2.2rem)`, `line-height: 1.2`): Page title and primary brand identification.
- **Headline** (600, `1.25rem`, `line-height: 1.3`): Major category and guide section anchors.
- **Title** (600, `1.05rem`, `line-height: 1.4`): Card headings, product titles, and comparative topics.
- **Body** (400, `1rem`, `line-height: 1.55`): Editorial commentary, guide analysis, and product notes. Max line-length constrained to `42rem` (~65-72ch).
- **Label / Fine** (500–600, `0.8rem`–`0.85rem`, `letter-spacing: 0.02em`): Disclosures, testing status badges, timestamps, table headers.

### Named Rules
**The Honest Tabular Rule.** Any numeric price or dated snapshot must render with `font-variant-numeric: tabular-nums` to maintain vertical alignment and ledger credibility.

## Layout

A centered single-column reading column (`max-width: 42rem`) with responsive gutter padding (`1.1rem`). Responsive grid layouts adapt smoothly between mobile single-column cards and multi-column comparison cards.

Vertical rhythm follows a predictable spatial scale:
- Tight inline groupings: `0.35rem`–`0.7rem` (`var(--space-xs)` / `var(--space-sm)`)
- Component inner padding: `1rem`–`1.1rem` (`var(--space-md)`)
- Section separation: `1.6rem`–`2.4rem` (`var(--space-lg)` / `var(--space-xl)`), guaranteeing generous breathing room above headings.

## Elevation & Depth

Flat, architectural layering using tonal hierarchy and hairline borders (`1px solid var(--line)`). No heavy drop-shadows.

### Shadow Vocabulary
- **Resting state:** `box-shadow: none` (flat, clean, honest).
- **Card Interactive Hover:** `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04)` in light mode, `0 4px 16px rgba(0, 0, 0, 0.25)` in dark mode with a subtle border highlight.

### Named Rules
**The Zero-Gimmick Depth Rule.** Depth is created through surface luminance and hairline borders, never through artificial 3D bevels, colorful glow halos, or heavy skeuomorphic shadows.

## Shapes

- **Cards & Visual Containers:** `0.6rem` (`8px`–`10px`) subtle corner radius.
- **Buttons & Interactive Controls:** `0.45rem` (`6px`–`7px`) rounded geometry for clear tactile affordance.
- **Status Pills & Chips:** `999px` full capsule radius.

## Components

### Buttons & Amazon CTAs
- **Shape:** `0.45rem` radius, min 44px touch height.
- **Primary Action:** Solid background (`var(--accent)`), crisp text (`var(--accent-ink)`), padding `0.7rem 1.1rem`.
- **Hover/Active:** Subtle tonal shift to deeper/brighter accent tone, smooth `150ms ease-out` transition.

### Cards & Guide Modules
- **Corner Style:** `0.6rem` radius.
- **Background:** `var(--card)` tone distinct from `var(--bg)` canvas.
- **Border:** `1px solid var(--line)` framing.
- **Internal Padding:** `1.1rem`.

### Status Badges & Chips
- **Style:** Pill shape (`999px`), `font-size: 0.78rem`, `font-weight: 500`.
- **Tested / Untested:** Neutral bordered chip for general status; subtle soft mint/teal tint (`var(--banner-bg)` / `var(--banner-ink)`) for "No lo he probado" notices.

### Price Sparklines & History Tables
- **Sparklines:** Responsive SVG polyline in `var(--accent)`, subtle baseline framing.
- **Tables:** Hairline bottom borders (`1px solid var(--line)`), clean left alignment, muted headers.

### Theme Switcher
- **Style:** Subtly framed control (`min-height: 44px`), clear textual and `aria-pressed` state reflecting current theme.

## Do's and Don'ts

### Do:
- **Do** preserve full WCAG AA contrast (≥4.5:1 for text, ≥3:1 for large text and controls) across both light and dark themes.
- **Do** maintain a strict 44px minimum tap target for all buttons, links, and switches on mobile.
- **Do** use semantic HTML elements (`<main>`, `<header>`, `<article>`, `<nav>`, `<footer>`) with explicit ARIA labels.
- **Do** state "No lo he probado" prominently on unverified products.

### Don't:
- **Don't** use colored side-tab borders (`border-left: 3px solid accent`) on cards or callout notes. Use subtle tonal background tints or clean borders.
- **Don't** invent star ratings, fake sales badges ("¡OFERTÓN!", "Top #1 Ventas"), or false testimonials.
- **Don't** use gradient text or aggressive zero-blur offset drop shadows.
- **Don't** hide affiliate disclosures or Amazon attribution notices.
