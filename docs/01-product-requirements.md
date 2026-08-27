# 01 — Product Requirements

Funcionalidades clasificadas por dominio y por fase (MVP / V1 / V2). "MVP" es lo que demuestra el criterio de aceptación de `04-mvp.md`. Ninguna fila de V1/V2 debe implementarse antes de tiempo solo porque sea sencilla.

## Catálogo

| Funcionalidad | Fase | Nota |
|---|---|---|
| Productos, categorías, marcas, imágenes, specs básicas | MVP | |
| Variantes simples (color, talla) | MVP | |
| Múltiples ofertas (tiendas) por producto | V1 | MVP arranca con 1 fuente — ver `09-data-ingestion.md` |
| Disponibilidad en tiempo real | V1 | |

## Precios

| Funcionalidad | Fase | Nota |
|---|---|---|
| Precio actual, snapshots, histórico | MVP | |
| Mínimo/máximo histórico, media 30d/90d | MVP | Mínimo de 30 días necesario ya en MVP — ver `10-pricing-engine.md` |
| Mediana, percentiles, variación 7d/90d/anual | V1 | |
| Detección de precio anómalo/erróneo | V1 | Base mínima antifraude sí entra en MVP (`19-observability.md`) |

## Comparación

| Funcionalidad | Fase | Nota |
|---|---|---|
| Comparar 2–3 productos con diferencias resaltadas | MVP | |
| Mejor calidad/precio automatizado | V1 | |
| Comparación N productos con tabla completa | V2 | |

## Búsqueda

| Funcionalidad | Fase | Nota |
|---|---|---|
| Búsqueda por texto y filtros | MVP | |
| Búsqueda semántica en lenguaje natural | MVP | Es diferenciador core — versión simple desde el MVP, ver `12-search.md` |
| Sugerencias instantáneas | V1 | |
| Explicación de por qué aparece cada resultado | V1 | |

## Recomendación

| Funcionalidad | Fase | Nota |
|---|---|---|
| Mejor opción general para una búsqueda (scoring básico) | MVP | |
| Mejor barato / mejor calidad-precio / mejor premium separados | V1 | |
| Personalización por historial de usuario | V2 | |

## Ofertas

| Funcionalidad | Fase | Nota |
|---|---|---|
| Listado de ofertas con Deal Score | MVP | |
| Ofertas del día/semana, por categoría | V1 | |
| Ofertas personalizadas (según seguidos) | V2 | |

## Alertas

| Funcionalidad | Fase | Nota |
|---|---|---|
| Alerta de precio por producto vía email | MVP+ | Justo después del catálogo/búsqueda base |
| Alerta vía Telegram | V1 | |
| Alerta por categoría o condición compuesta | V2 | |

## Telegram

| Funcionalidad | Fase | Nota |
|---|---|---|
| Bot básico: buscar, seguir producto, alertas | V1 | Ver `14-telegram.md` |
| Canal público de ofertas | V1 | |
| Consultas en lenguaje natural vía bot | V2 | |

## Usuario

| Funcionalidad | Fase | Nota |
|---|---|---|
| Cuenta, favoritos, alertas | MVP | |
| Historial de búsquedas, preferencias | V1 | |
| Recomendaciones personalizadas por historial | V2 | |

## SEO

| Funcionalidad | Fase | Nota |
|---|---|---|
| Páginas de producto/categoría indexables con datos únicos | MVP | Ver `15-seo.md` |
| Páginas de comparativa y guías | V1 | |
| Contenido editorial evergreen / rankings | V2 | |

## Monetización

| Funcionalidad | Fase | Nota |
|---|---|---|
| Enlaces de afiliación correctamente etiquetados | MVP | Ver `16-monetization.md` |
| Ad slots reservados en el diseño (activación real cuando haya tráfico) | V1 | |
| Premium (alertas avanzadas, sin publicidad, API de datos) | V2 | |

## Criterios de aceptación

Toda funcionalidad debe tener un criterio verificable antes de darse por implementada. Mal: "crear buscador bueno". Bien: "el usuario puede introducir una consulta en lenguaje natural con presupuesto máximo y recibe productos que cumplen ese presupuesto, con la razón de por qué aparece cada uno".
