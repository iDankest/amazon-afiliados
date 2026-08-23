---
name: Orza
description: Cuaderno de navegación y registro honesto para Amazon.es. Estética de mesa de cartas náuticas, latón pulido y guardia nocturna.
colors:
  primary: "#b45309"
  primary-dark: "#f59e0b"
  beacon: "#0369a1"
  beacon-dark: "#38bdf8"
  neutral-bg: "#f4f0e6"
  neutral-bg-dark: "#070b10"
  neutral-card: "#fdfbf7"
  neutral-card-dark: "#0e151e"
  neutral-ink: "#0f1923"
  neutral-ink-dark: "#e2e8f0"
  neutral-muted: "#475569"
  neutral-muted-dark: "#8493a8"
  neutral-line: "#d3cbbe"
  neutral-line-dark: "#1c2734"
  banner-bg: "#eef4f8"
  banner-bg-dark: "#081a24"
  banner-ink: "#0c4a6e"
  banner-ink-dark: "#7dd3fc"
  banner-line: "#bae6fd"
  banner-line-dark: "#0369a1"
typography:
  display:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "clamp(1.25rem, 3vw, 1.6rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.02em"
  thesis:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)"
    fontWeight: 700
    lineHeight: 1.25
  brand:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  title:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.35
  lede:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  sub:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.35
  card-title:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 500
    lineHeight: 1.65
  body:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  note:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.55
  mono-ui:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
  card-link:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
  nav:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
  badge:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
  meta:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.08em"
  kicker:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
  mono-sub:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.65rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "6px"
  full: "999px"
spacing:
  xs: "0.35rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.35rem"
  button-primary-hover:
    backgroundColor: "#92400e"
  card:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.md}"
    padding: "1.35rem"
---

# Design System: Orza (Nautical Chart Table & Night Helm)

## Overview

**Creative North Star: "The Night Helm & Maritime Chart Table"**

Orza is the daggerboard or tiller that prevents leeway at sea. On the modern web, algorithmic noise, manufactured urgency, fake reviews, and opaque affiliate farms cause perpetual drift. Orza is the captain's solid chart table: deliberate, tactical, illuminated by warm incandescent brass lanterns by night and unrolled over crisp navigation parchment by day.

The aesthetic marries maritime instrument precision (brass compass rules, coordinate telemetry, tabular logbooks) with high-density editorial readability. It refuses generic cream-serif minimalism and neon-cyberpunk clichés.

**Key Characteristics:**
- **Cinzel display typography:** Engraved, authoritative, evoking maritime cartography and navigational astrolabes.
- **Overpass Mono telemetry:** Telemetry headers, coordinates, and manual price snapshots with strict `tabular-nums` fidelity.
- **Tactile Materiality:** Architectural brass accents (`#b45309` / `#f59e0b`), deep ocean canvas (`#070b10` / `#f4f0e6`), and sea-beacon accents (`#0369a1` / `#38bdf8`).
- **Thesis-first Viewport:** The opening viewport acts as a complete navigation bridge with live telemetry, strategic rumbos, and an explicit anti-deriva manifesto.

## Colors

### Primary & Brass Accent
- **Polished Brass** (`#b45309` light, `#f59e0b` dark): The signature instrument accent. Used for primary CTAs, critical bearings, and chart calipers.
- **Beacon Cyan** (`#0369a1` light, `#38bdf8` dark): Secondary signal color for telemetry status, active coordinates, and link interactions.

### Neutral & Surfaces
- **Chart Parchment / Abyssal Night** (`#f4f0e6` light, `#070b10` dark): The foundational chart ground.
- **Instrument Console Surface** (`#fdfbf7` light, `#0e151e` dark): Elevated container cards with technical hairline framing.
- **India Ink / Starlight White** (`#0f1923` light, `#e2e8f0` dark): High-contrast primary reading tones.
- **Slate Markings** (`#475569` light, `#8493a8` dark): Secondary metadata, coordinate labels, and timestamps.
- **Chart Hairline** (`#d3cbbe` light, `#1c2734` dark): 1px structural framing.

### Named Rules
**The Dual-Watch Atmosphere Rule.** Day mode is an unrolled parchment chart under daylight; night mode is a darkened ship bridge at 03:00 with glowing amber indicators and phosphorescent gauges.
**The No-Faux-Glow Rule.** No neon blurry halos. Lighting is rendered through high-contrast tonal placement and razor-sharp brass hairline borders.

## Typography

- **Display Face:** `Cinzel, Georgia, serif` — used for site identity, section anchors, and manifesto titles.
- **Body Face:** `Albert Sans, system-ui, sans-serif` — used for long-form reading, guide analysis, and notes.
- **Telemetry / Mono Face:** `Overpass Mono, monospace` — used for coordinates, status pills, timestamps, prices, and telemetry badges.

### Hierarchy
- **Display** (700, `clamp(2rem, 5vw, 2.75rem)`, `line-height: 1.15`): Navigational thesis title.
- **Headline** (600, `clamp(1.25rem, 3vw, 1.6rem)`, `line-height: 1.25`): Section boundaries.
- **Thesis** (700, `clamp(1.4rem, 3.5vw, 1.85rem)`, `line-height: 1.25`): Hero thesis title.
- **Brand** (700, `1.3rem`, `line-height: 1`): Maritime brand name.
- **Title** (600, `1.15rem`, `line-height: 1.35`): Section sub-headings and card titles.
- **Lede** (400, `1.125rem`, `line-height: 1.65`): Core mission statement.
- **Body** (400, `1rem`, `line-height: 1.6`): Standard editorial reading.
- **Note** (400, `0.9rem`, `line-height: 1.55`): Field log notes.
- **Mono UI / CTA** (600, `0.85rem`, `line-height: 1.4`): Buttons and table data.
- **Nav** (500, `0.8rem`, `line-height: 1.4`): Bridge navigation links.
- **Badge** (600, `0.75rem`, `line-height: 1.2`): Testing status pills.
- **Telemetry / Stamp** (500-700, `0.65rem - 0.72rem`): Coordinate badges and kickers.

## Layout

- **Container:** Max-width `48rem` (`768px`) with responsive `1.25rem` gutters.
- **Grid:** Responsive multi-column chart grids (`repeat(auto-fit, minmax(280px, 1fr))`) with `1rem` gaps.
- **Structural Accents:** Corner tick-marks, coordinate stamps, and subtle maritime dividing rules.

## Elevation & Depth

- **Resting state:** Crisp 1px structural boundary (`border: 1px solid var(--line)`) with subtle tonal shift (`var(--card)` on `var(--bg)`).
- **Interactive hover:** Fine brass border highlight (`border-color: var(--accent)`) and subtle lift (`transform: translateY(-2px)`).

## Components

### Navigational Bridge Hero
Instrument-grade split console presenting the Orza manifesto on the port side and live Amazon search telemetry on the starboard side.

### Field Log Cards
Crisp container cards featuring monospace category tags, tested badges, notes, and directional link calipers (`→`).

### Telemetry Badges
Monospace capsule badges indicating testing status (`[PROBADO EN CAMPO]` vs `[NO PROBADO — ETIQUETADO]`).

### Dual-Watch Theme Dial
Rotary-inspired theme toggle displaying current guard watch (`[☾ GUARDIA NOCTURNA]` / `[☼ CARTA DIURNA]`).

## Do's and Don'ts

### Do:
- **Do** treat every product and guide as a dated field log entry with uncompromised honesty.
- **Do** use `Overpass Mono` with `font-variant-numeric: tabular-nums` for all coordinates and price logs.
- **Do** preserve 100% accessible contrast across both daylight chart and night bridge modes.

### Don't:
- **Don't** use generic clipart anchors, cartoon waves, or nautical gimmicks. Materiality is expressed through typography, brass accents, and chart structure.
- **Don't** use Inter, Playfair, Fraunces, or system-ui for display headings.
- **Don't** invent product reviews, ratings, or prices.
