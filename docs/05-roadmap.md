# 05 — Roadmap

Cada fase indica objetivo, entregable, riesgo principal y qué NO hacer todavía. Las fases no se solapan más de lo necesario; no se empieza una fase antes de que la anterior cumpla su criterio de aceptación.

## Phase 0 — Discovery / Arquitectura
**Objetivo:** documentación completa de producto y arquitectura, decisiones registradas, preguntas abiertas identificadas. **Entregable:** este repositorio de docs. **Riesgo:** ninguno técnico — riesgo es avanzar sin resolver `25-open-questions.md` #1–3. **No hacer:** escribir código de producto.

## Phase 1 — Foundation
**Objetivo:** repos, CI básico, entornos (dev/staging), esqueleto NestJS + Next.js, conexión a Postgres/Supabase, auth mínima. **Riesgo:** sobreinvertir en infraestructura antes de tener datos reales. **No hacer:** microservicios, colas complejas todavía.

## Phase 2 — Data ingestion
**Objetivo:** primer connector, pipeline Raw → Normalizer → Validator → Product Resolver → Canonical Product, primeros PriceSnapshots reales. **Riesgo:** bloqueo por elegibilidad de la fuente de datos (ver open question #3). **No hacer:** construir connectors para más tiendas todavía.

## Phase 3 — Catalog + pricing
**Objetivo:** catálogo consultable, PriceHistory agregado, Deal Score v0 calculado y validado contra datos reales. **Criterio de aceptación:** todo precio/descuento mostrado es verificable contra los snapshots crudos.

## Phase 4 — Frontend
**Objetivo:** Home, página de producto, listados, componentes base del design system implementados por Kimi sobre datos reales de la API. **Riesgo:** construir UI contra datos mockeados que luego no encajan con la API real. **No hacer:** pulir microinteracciones antes de que el flujo funcione end-to-end.

## Phase 5 — Search + comparison
**Objetivo:** búsqueda híbrida (keyword + semántica), intent parser básico, comparador de 2–3 productos.

## Phase 6 — Recommendation engine
**Objetivo:** pipeline completo intent → retrieval → filtros → scoring → ranking → explicación LLM anclada en datos reales (ver regla de grounding en `11-recommendation-engine.md`).

## Phase 7 — Deals
**Objetivo:** job que materializa Deals desde Offers usando el Deal Score, páginas de ofertas.

## Phase 8 — Telegram
**Objetivo:** bot básico + alertas + canal de ofertas, respetando los rate limits documentados en `14-telegram.md`.

## Phase 9 — SEO
**Objetivo:** structured data, sitemaps, estrategia de indexación por tipo de página, auditoría propia contra el patrón de "scaled content abuse" de Google.

## Phase 10 — Monetization
**Objetivo:** activar afiliación medible, evaluar ad slots reales con tráfico real, decidir escenario (A–E, `16-monetization.md`) según datos reales — no antes.

## Phase 11 — Optimization
**Objetivo:** performance, recalibración del Deal Score y del scoring de recomendación con datos reales de uso, reducción de deuda técnica.
