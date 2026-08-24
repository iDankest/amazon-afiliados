# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- **Framework**: Astro (generación estática de alta velocidad, SEO optimizado para Amazon.es).
- **Hosting**: GitHub Pages (0€ coste de infraestructura).
- **Monetización**: Amazon Associates EU (tags legales `data-amazon`, `rel="nofollow sponsored"`), espacios publicitarios limpios.

## Users

- Compradores en España (y Canarias) que buscan tecnología, periféricos, audio, ergonomía y productos de descanso en Amazon.es.
- Usuarios que quieren saber el momento óptimo de compra: si un producto está en su mínimo histórico, si tiene una rebaja real o si el precio está inflado.
- Perfil que valora la densidad de datos, la velocidad y la ausencia de texto de relleno o reseñas falsas.

## Product Purpose

**ORZA** es una terminal de inteligencia y seguimiento de precios para Amazon.es. Ofrece análisis cuantitativo de precios, registro histórico fechado, cálculo automático de mínimos históricos, alertas de chollos y redirección con afiliación para comprar al mejor precio posible.

## Positioning

Frente a blogs genéricos de afiliados y granjas de reseñas falsas, ORZA se posiciona como una **Terminal de Datos & Precisión**:
1. **Datos Reales y Fechados**: Sin inventar precios ni descuentos; cada cotización proviene de un snapshot temporal registrado.
2. **Cero Reseñas Falsas ni Relleno**: La interfaz presenta métricas duras (mínimo, máximo, media, delta de ahorro, evolución temporal).
3. **Alta Utilidad y Velocidad**: Búsqueda instantánea en cliente, filtrado por categorías y acceso directo a las mejores cotizaciones de Amazon.es.

## Operating Context

- Mobile-first y desktop de alta densidad.
- Mercado: Amazon.es (España).
- Sin backend pesado ni base de datos de pago: datos versionados en JSON (`data/catalog.json` y `data/snapshots/`).
- Avisos legales y de afiliación siempre presentes y conformes con la normativa de Amazon Associates.

## Capabilities and Constraints

- **Seguimiento de Precios**: Cotizaciones históricas por producto con cálculo de mínimos, máximos, medias y variaciones porcentuales.
- **Detección de Chollos**: Identificación automática de productos en mínimo histórico o con descuentos relevantes.
- **Gráficas de Evolución**: Sparklines y curvas canvas con cotas numéricas y fechas de control.
- **Buscador y Filtros**: Command palette rápida con atajos de teclado (`/`) y filtrado en vivo.
- **Modo Claro y Oscuro Real**: Dos paletas contrastadas, sin tintes lavados.

## Brand Commitments

- **Nombre**: ORZA (firmeza de rumbo + corte a través del ruido del mercado hacia el mínimo de precio).
- **Identidad**: Isotipo geométrico vectorial en SVG (monograma "O" con vector descendente de valor).
- **Estilo Visual**: Terminal de Datos & Precisión (alta densidad, tipografía técnica, tablas con cotizaciones, estética moderna inspirada en Linear/Keepa).

## Evidence on Hand

- Catálogo estructurado de productos en `data/catalog.json`.
- Snapshots fechados en `data/snapshots/*.json`.
- Rutas públicas: `/`, `/p/[id]/`, `/registro/`, `/guias/ofertas-semana/`, `/sobre/`, `/aviso-afiliados/`.

## Product Principles

1. **Datos sobre Relleno**: Cada elemento en pantalla informa o ayuda a decidir; cero texto decorativo.
2. **Precisión sin Falsedades**: Si un producto no tiene histórico en mínimo, no se finge la oferta.
3. **Velocidad y Densidad**: Interfaz rápida, escaneable y con alta densidad de información útil.
4. **Transparencia Total**: Enlaces claros a Amazon.es con atribución legal y aviso de comisiones.

## Accessibility & Inclusion

- Contraste AA verificado en temas Claro y Oscuro.
- Navegación completa por teclado con indicadores de foco visibles.
- Semántica HTML limpia y textos legibles en mobile y desktop.
