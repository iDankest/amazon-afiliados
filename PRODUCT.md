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

**ORZA** es una plataforma moderna de compras inteligentes, cazador de chollos y seguimiento de precios para Amazon.es. Permite encontrar el momento óptimo de compra en periféricos, teclados mecánicos, audio y descanso mediante seguimiento de precios reales, detección de mínimos históricos y redirección honesta de afiliados.

## Positioning

Frente a blogs genéricos de afiliados con relleno y reseñas inventadas, ORZA se posiciona como una **Guía de Compras Inteligentes & Cazador de Chollos Reales**:
1. **Datos Reales y Fechados**: Sin inventar precios ni rebajas ficticias; cada precio registrado proviene de un snapshot temporal real.
2. **Criterio Técnico y Curación**: Selección cuidada de productos de alta demanda (teclados hot-swap, ratones ergonómicos, auriculares ANC, descanso).
3. **Experiencia Visual Cuidada**: Diseño moderno, cálido, ágil y visualmente atractivo, pensado para invitar a la exploración y al ahorro.

## Operating Context

- Mobile-first y desktop optimizado.
- Mercado: Amazon.es (España).
- Sin backend pesado ni base de datos de pago: datos versionados en JSON (`data/catalog.json` y `data/snapshots/`).
- Avisos legales y de afiliación siempre presentes y conformes con la normativa de Amazon Associates.

## Capabilities and Constraints

- **Seguimiento de Precios**: Cotizaciones históricas por producto con cálculo de mínimos, máximos y variaciones porcentuales.
- **Detección de Chollos**: Identificación automática de productos en mínimo histórico o con descuentos relevantes.
- **Gráficas de Evolución**: Sparklines y curvas canvas con cotas numéricas y fechas de control.
- **Buscador y Filtros**: Filtrado instantáneo por texto y por categorías en tiempo real.
- **Modo Claro y Oscuro**: Dos temas cuidados y contrastados.

## Brand Commitments

- **Nombre**: ORZA (rumbo firme hacia la mejor compra en Amazon.es).
- **Identidad**: Isotipo geométrico en SVG combinando dirección y vector de ahorro en azul cobalto y ámbar cálido.
- **Estilo Visual**: Tech Magazine & Curated Deal Hub (estética moderna, acogedora, con tarjetas visuales ricas, tipografía Outfit/Figtree y cero artificios vacíos).

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
