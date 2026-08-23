---
name: Orza
description: Orza — Rastreador de Precios, Chollos y Compras Inteligentes en Amazon.es. Modern SaaS, claro y oscuro reales, mobile-first.
colors:
  accent: "#0284c7"
  accent-dark: "#38bdf8"
  link: "#0284c7"
  link-dark: "#38bdf8"
  bg: "#f8fafc"
  bg-dark: "#0b0f17"
  card: "#ffffff"
  card-dark: "#111827"
  card-alt: "#f1f5f9"
  card-alt-dark: "#1a2234"
  ink: "#0f172a"
  ink-dark: "#f8fafc"
  muted: "#475569"
  muted-dark: "#94a3b8"
  line: "#e2e8f0"
  line-dark: "#1f293d"
  banner-bg: "#f0f9ff"
  banner-bg-dark: "#082f49"
  banner-ink: "#0369a1"
  banner-ink-dark: "#7dd3fc"
  banner-line: "#bae6fd"
  banner-line-dark: "#0369a1"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 6vw, 2.9rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 3vw, 1.55rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title-lg:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
  title:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.35
  title-sm:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
  lede:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.65
  nav:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 500
  note:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.55
  tag:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.88rem"
  banner:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.85rem"
    lineHeight: 1.5
  fine:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.84rem"
    lineHeight: 1.6
  control:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
  meta:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.78rem"
  kicker:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  stamp:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
  caption:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
  price-hero:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "clamp(1.9rem, 6vw, 2.6rem)"
    fontWeight: 700
    fontVariantNumeric: tabular-nums
  price:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontWeight: 700
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

# Design System: Orza

## Principio

Un sitio de producto calmo y honesto para España, mobile-first: guías de descanso y teclados más un registro de precios anotados a mano. La interfaz no actúa: informa. Sin decoración temática, sin dashboard ficticio, sin ornamentos que compitan con el contenido.

## Identidad

- **Marca:** "Orza", texto puro en Outfit 700. Sin iconografía náutica ni emblema en la cabecera.
- **Tono:** directo y en español. Nada de jerga de "bitácora", "sectores" ni relojes de guardia.

## Color

Dos temas reales, sin mezclas:

- **Claro:** fondo `#f7f7f5`, tarjetas blancas, tinta `#191c1f`, acento cian `#09637c`.
- **Oscuro:** fondo `#0d1217`, tarjetas `#151b22`, tinta `#e6edf3`, acento cian `#38c2de` con texto de botón oscuro (`#041c24`).

El acento se usa con moderación: enlaces, botones primarios, etiquetas y estados activos. Nunca como fondo de página. El banner de afiliación usa la familia cian en tono suave, siempre visible en ambos temas.

## Tipografía

- **Display:** `Outfit` (500–700) — títulos, nombre de marca, encabezados de tarjeta.
- **Cuerpo:** `Figtree` (400–700) — lectura, notas, navegación.
- **Precios/fechas:** monoespaciada del sistema con `tabular-nums`, para que las cifras del registro alineen siempre.

Prohibidos: Cinzel, Inter, Fraunces, Playfair, Space Grotesk y cualquier serif grabada.

## Componentes

- **Tarjetas:** blancas (o `#161c24`), radio 14px, borde 1px, sombra mínima; hover con elevación sutil de 2px.
- **Botones:** primario cian con texto `--accent-ink`; fantasma con borde para acciones secundarias. Altura mínima 44px.
- **Badges:** pastilla (`999px`) con tres estados: probado, parcial, no probado. El estado "no probado" es siempre visible, nunca se oculta.
- **Notas:** bloque con borde y radio 12px para reglas del registro y avisos de afiliación.
- **Tablas del registro:** monoespaciadas, `tabular-nums`, cabecera en mayúsculas pequeñas.

## Reglas

- Contraste AA en ambos temas, siempre.
- Mobile-first: una columna; el grid de tarjetas pasa a multi-columna desde 600px.
- La preferencia de tema se guarda en `localStorage` (`adc-theme`), con detección de `prefers-color-scheme`.
- Sin precios, ASINs ni claims médicos inventados: el diseño nunca dibuja una cifra que no venga de un snapshot fechado.
