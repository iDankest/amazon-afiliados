# 00 — Project Vision

## Resumen ejecutivo

ORZAR es una plataforma inteligente de descubrimiento, comparación, análisis de precios y seguimiento de productos. Responde a la pregunta "¿qué debería comprar?" — no solo mostrando productos, sino explicando qué encaja con las necesidades de cada persona, si el precio actual es bueno, cómo ha evolucionado, y cuándo podría convenir comprar. La monetización (afiliación, publicidad, premium) es un mecanismo, no el producto.

## Qué es ORZAR

Una combinación conceptual de buscador semántico + comparador + tracker de precios + detector de ofertas + asistente de compras, con identidad propia — no una copia de Google Shopping, CamelCamelCamel o Idealo.

Funcionalmente, ORZAR debe poder responder:
- qué producto encaja mejor con una necesidad expresada en lenguaje natural, y por qué
- cuánto cuesta ahora, y si ese precio es bueno frente a su historial
- qué alternativas existen y cuál ofrece mejor relación calidad/precio
- cuándo podría convenir comprar, y cuándo avisar de una bajada

## Qué NO es ORZAR

- No es una página de afiliados: nunca una tarjeta que sea solo nombre + imagen + precio + botón.
- No es una tienda online — ORZAR no vende ni gestiona inventario propio.
- No es un dashboard financiero, aunque use datos y gráficas de forma central.
- No es un generador de contenido en masa: cada página indexable debe aportar valor propio (ver `15-seo.md` — Google penaliza explícitamente el contenido de afiliación a escala sin valor añadido).

## Principios fundamentales (obligatorios)

1. **Los datos y la IA son cosas diferentes.** Precios, disponibilidad, specs, históricos, URLs, tiendas y descuentos vienen siempre de fuentes verificables y estructuradas. La IA interpreta, clasifica, resume, compara y explica — nunca inventa un dato verificable. Ver `07-data-model.md` y `11-recommendation-engine.md`.
2. **Determinismo cuando sea posible.** Si un cálculo se puede hacer con código (medias, percentiles, variaciones, deal score base), no se usa un LLM para calcularlo. Ver `10-pricing-engine.md`.
3. **Modularidad.** El sistema se diseña para crecer de 1 tienda a N tiendas/marketplaces/feeds sin asumir una única fuente. Ver `09-data-ingestion.md`.
4. **No sobrediseñar el MVP.** Existe una frontera explícita entre MVP / V1 / V2 (`04-mvp.md`, `05-roadmap.md`). Una funcionalidad no entra al MVP solo porque sea técnicamente interesante.
5. **Transparencia.** ORZAR distingue siempre entre dato verificado, estimación, recomendación, predicción y opinión — nunca presenta una inferencia de IA como un hecho.

## Objetivos

**Principal:** ayudar a decidir qué comprar mediante búsqueda, comparación, análisis de precios, histórico, recomendaciones, ofertas y alertas.

**Secundarios:** tráfico orgánico sostenible, conversión de afiliación, usuarios recurrentes, una base de datos de productos propia como ventaja competitiva, un canal propio (Telegram), y una base preparada para funcionalidades premium futuras.

## Por qué esto no es "solo otra idea de afiliación"

La política de spam de Google distingue explícitamente entre "thin affiliate sites" (penalizados) y sitios de afiliación que añaden valor real — precio, reseñas originales, testing, comparación —, que están permitidos. En 2026 Google ha penalizado con fuertes caídas de tráfico a sitios de afiliación con comparativas generadas por IA sin experiencia de producto propia ni diferenciación real frente a las specs del fabricante. El histórico de precios, el Deal Score explicable y la comparación razonada de ORZAR son exactamente el tipo de valor añadido que separa un sitio permitido de uno penalizado — no son un "nice to have" estético, son la base de la viabilidad SEO a medio plazo. Ver `15-seo.md`.
