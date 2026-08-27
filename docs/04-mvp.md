# 04 — MVP

## Criterio de aceptación del MVP en su conjunto

> Un usuario puede buscar un producto, entender si su precio es bueno, comparar alternativas y llegar a una compra.

Si el MVP no cumple esta frase completa, no está terminado — aunque tenga muchas otras cosas construidas.

## Alcance incluido

- Catálogo inicial de **una categoría acotada** (recomendación de partida: periféricos PC — teclados, ratones, auriculares; ver `25-open-questions.md` #2 para la decisión final).
- **Una fuente de productos** (Amazon; ver `09-data-ingestion.md` para la estrategia de adquisición y `25-open-questions.md` #3 para la decisión pendiente sobre cómo empezar dado el requisito de ventas cualificadas de la Product Advertising API).
- Precios: actual, snapshots, histórico con mínimo/máximo/media a 30-90 días.
- Búsqueda por texto/filtros + búsqueda semántica básica en lenguaje natural.
- Página de producto completa (precio, histórico, specs, pros/contras si hay datos, CTA).
- Comparación de 2–3 productos.
- Listado de ofertas con Deal Score básico (ver `10-pricing-engine.md`).
- Scoring de recomendación básico (una sola dimensión "mejor opción", no las 5 variantes de V1).
- Enlaces de afiliación correctamente etiquetados.
- Analytics básico (tráfico, clics a afiliados, búsquedas realizadas).
- Cuenta de usuario mínima con favoritos.
- Alerta de precio por email (justo por encima del MVP estricto — MVP+, incluir si el tiempo lo permite sin retrasar el resto).

## Explícitamente fuera del MVP

- Telegram (bot, canal, alertas) — V1.
- Multi-tienda por producto — V1.
- Personalización por historial — V2.
- Publicidad activa (los ad slots se diseñan desde ya, pero no se activan sin tráfico real) — V1/V2.
- Premium — V2.
- Reseñas nativas de usuarios — a decidir, ver `25-open-questions.md` #8.
- Comparación de más de 3 productos a la vez.

## Por qué una sola categoría y una sola fuente

Modularidad significa que el sistema *soporte* crecer a N tiendas y N categorías — no que el MVP las tenga todas desde el día uno. Empezar acotado permite validar el pipeline completo (ingestión → catálogo → precios → búsqueda → recomendación → comparación → afiliación) sobre un volumen de datos manejable antes de multiplicar la complejidad operativa.
