---
name: Orza
description: ORZA — Terminal de Inteligencia y Seguimiento de Precios en Amazon.es. High-density data grid, claro y oscuro contrastados, mobile-first.
colors:
  accent: "#0284c7"
  accent-dark: "#38bdf8"
  link: "#0284c7"
  link-dark: "#38bdf8"
  bg: "#f8fafc"
  bg-dark: "#090d13"
  card: "#ffffff"
  card-dark: "#0f172a"
  card-alt: "#f1f5f9"
  card-alt-dark: "#131d31"
  ink: "#0f172a"
  ink-dark: "#f8fafc"
  muted: "#64748b"
  muted-dark: "#94a3b8"
  line: "#e2e8f0"
  line-dark: "#1e293b"
  banner-bg: "#f0f9ff"
  banner-bg-dark: "#082f49"
  banner-ink: "#0369a1"
  banner-ink-dark: "#7dd3fc"
  banner-line: "#bae6fd"
  banner-line-dark: "#0369a1"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 5vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-lg:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
  title:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 700
    lineHeight: 1.35
  title-sm:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
  lede:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
  nav:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 600
  note:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
  tag:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.82rem"
  banner:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.82rem"
    lineHeight: 1.45
  fine:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.78rem"
    lineHeight: 1.55
  control:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 700
  meta:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
  caption:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
  price-hero:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "clamp(1.85rem, 5vw, 2.5rem)"
    fontWeight: 800
    fontVariantNumeric: tabular-nums
  price:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "1.35rem"
    fontWeight: 800
    fontVariantNumeric: tabular-nums
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  "2xl": "14px"
  pill: "999px"
---

# Design System: ORZA — Terminal de Datos & Precisión

## Principio

Una terminal de inteligencia de precios para Amazon.es, de alta densidad informativa y velocidad. La interfaz es sobria, técnica y funcional: sin widgets decorativos vacíos ni reseñas fingidas. Cada cifra está respaldada por un snapshot fechado.

## Identidad

- **Marca:** "ORZA", isotipo geométrico vectorial (monograma "O" de precisión con vector descendente de rumbo y valor).
- **Tono:** directo, técnico y cuantitativo. Métricas reales: mínimos históricos, cotizaciones registradas y ahorro frente a máximos.

## Color

Dos temas reales, sin mezclas:

- **Claro:** fondo `#f8fafc`, tarjetas `#ffffff`, superficies secundarias `#f1f5f9`, tinta `#0f172a`, acento cian eléctrico `#0284c7`.
- **Oscuro:** fondo `#090d13`, tarjetas `#0f172a`, superficies secundarias `#131d31`, tinta `#f8fafc`, acento cian eléctrico `#38bdf8`.
- **Semántica de Estado:** verde terminal (`#059669` / `#34d399`) para mínimos y ahorro; ámbar (`#d97706` / `#fbbf24`) para cotizaciones habituales o picos.

## Tipografía

- **Display & Titulares:** `Outfit` (700–800) — nombres de producto, cabeceras de sección y marca.
- **Cuerpo & UI:** `Figtree` (400–600) — navegación, notas de producto y avisos.
- **Métricas & Precios:** Monoespaciada del sistema con `tabular-nums` — precios actuales, variaciones, fechas y ASINs.

## Componentes

- **Terminal Cards:** contenedores de 10px de radio con borde nítido de 1px, bloque de precio integrado y botón directo a Amazon.es.
- **Command Box:** buscador estilo palette con atajo de teclado accesible (`/`) y respuesta en tiempo real.
- **Ticker Grid:** cuatro celdas de métricas compactas que resumen el estado actual del mercado monitoreado.
- **Tablas del Registro:** formato de base de datos compacta con `tabular-nums`, fechas y sparklines integradas.
