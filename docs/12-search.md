# 12 — Search

La búsqueda debe sentirse como "cuéntame qué necesitas", no como "introduce una keyword" (ver `27-ux-guidelines.md`).

## Arquitectura (MVP)

Búsqueda híbrida sobre PostgreSQL, sin motor dedicado:
- **Keyword:** `tsvector`/`tsquery` nativo de Postgres sobre título, marca, specs.
- **Semántica:** embedding de la consulta comparado contra embeddings de producto (pgvector) — captura intención aunque no coincidan las palabras exactas.
- Ambas señales se combinan y re-rankean; el resultado alimenta el pipeline de `11-recommendation-engine.md` cuando la consulta tiene forma de necesidad ("teclado silencioso para programar") en vez de un nombre de producto exacto.

## Funcionalidad

- Sugerencias instantáneas (debounced, prefix + fuzzy match) — V1.
- Filtros generados dinámicamente a partir de `ProductFeature.is_filterable` por categoría — no hardcodeados por categoría.
- Cada resultado puede mostrar por qué aparece (qué requisito de la consulta cumple) — V1, ver `01-product-requirements.md`.

## Cuándo migrar a un motor dedicado

Solo si Postgres FTS + pgvector demuestra ser insuficiente en latencia o relevancia con datos reales (Meilisearch o Typesense como candidatos) — no se introduce por adelantado. Ver `25-open-questions.md` #12.
