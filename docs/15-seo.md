# 15 — SEO

## Por qué esto no es opcional ni cosmético

La política de spam de Google distingue explícitamente entre sitios de afiliación "thin" (penalizados) y sitios que añaden valor real: información de precio, reseñas originales, testing riguroso, navegación/comparación de productos — eso último es justo lo que hace ORZAR. La política de "scaled content abuse" (definida desde marzo de 2024, con aplicación reforzada en 2026) es agnóstica al método: penaliza páginas generadas en volumen para manipular rankings con poco o ningún valor para el usuario, sea el contenido escrito por IA, por humanos, o extraído por scraping. En 2026, sitios de afiliación con comparativas generadas por IA sin experiencia práctica del producto ni diferenciación real frente a las specs del fabricante han sufrido caídas de tráfico de entre 40% y 70%.

**Implicación directa para ORZAR:** cada página indexable debe mostrar algo que la propia política de Google reconoce como valor legítimo — histórico de precio real, Deal Score explicado, comparación razonada — nunca specs republicadas sin más. Nunca generar automáticamente miles de páginas de combinación vacías (regla ya establecida en `00-project-vision.md`).

## Datos estructurados

`Product`, `Offer`, `AggregateRating` (solo cuando el rating es genuinamente agregado/atribuido a la fuente — nunca inventado, ver `07-data-model.md`), `BreadcrumbList`. Verificar los campos exactos requeridos/recomendados en la documentación vigente de Google Search Central antes de implementar — estos requisitos se actualizan con cierta frecuencia.

## Estructura de páginas indexables

`/products`, `/categories`, `/compare`, `/deals`, `/guides` (V1). Sitemap segmentado por tipo. Estrategia de canonical para variantes casi-duplicadas de un mismo producto (evitar que dos URLs compitan por la misma keyword).

## Performance

Next.js con SSR/ISR permite servir HTML ya renderizado para páginas críticas de SEO sin sacrificar Core Web Vitals — evaluar métricas reales (LCP/INP/CLS) desde el primer despliegue, no al final.

## Auto-auditoría recomendada (V1)

Antes de escalar el número de páginas generadas programáticamente, aplicar el propio test que usa la industria para detectar "scaled content abuse": *si la búsqueda no existiera, ¿esta página seguiría mereciendo publicarse?* Si la respuesta depende solo del volumen de tráfico potencial y no del valor específico de esa página, no se publica todavía.
