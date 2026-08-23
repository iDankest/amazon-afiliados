---
name: Orza
description: Sitio de producto calmo y legible para guías y registro de precios honesto de Amazon.es. Claro y oscuro reales, mobile-first.
colors:
  accent: "#0e7490"
  accent-dark: "#39c2dd"
  link: "#0e7490"
  link-dark: "#4cc3de"
  bg: "#f7f7f5"
  bg-dark: "#0f141a"
  card: "#ffffff"
  card-dark: "#161c24"
  card-alt: "#f0efec"
  card-alt-dark: "#1c242e"
  ink: "#191c1f"
  ink-dark: "#e8ebee"
  muted: "#5f6b74"
  muted-dark: "#94a1ad"
  line: "#e3e1dc"
  line-dark: "#273039"
  banner-bg: "#ecf5f8"
  banner-bg-dark: "#10242e"
  banner-ink: "#0c4a5e"
  banner-ink-dark: "#9fdceb"
  banner-line: "#d3e7ec"
  banner-line-dark: "#1e4756"
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
  title:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  lede:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.65
  note:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.55
  price:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontWeight: 700
    fontVariantNumeric: tabular-nums
rounded:
  pill: "999px"
  md: "10px"
  lg: "12px"
  xl: "14px"
---

# Design System: Orza

## Principio

Un sitio de producto calmo y honesto para España, mobile-first: guías de descanso y teclados más un registro de precios anotados a mano. La interfaz no actúa: informa. Sin decoración temática, sin dashboard ficticio, sin ornamentos que compitan con el contenido.

## Identidad

- **Marca:** "Orza", texto puro en Outfit 700. Sin iconografía náutica ni emblema en la cabecera.
- **Tono:** directo y en español. Nada de jerga de "bitácora", "sectores" ni relojes de guardia.

## Color

Dos temas reales, sin mezclas:

- **Claro:** fondo `#f7f7f5`, tarjetas blancas, tinta `#191c1f`, acento cian `#0e7490`.
- **Oscuro:** fondo `#0f141a`, tarjetas `#161c24`, tinta `#e8ebee`, acento cian `#39c2dd` con texto de botón oscuro (`#062730`).

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
