# 09 — Data Ingestion

## Pipeline

```text
Data Source → Connector → Raw Data → Normalizer → Validator → Product Resolver → Canonical Product → Price History
```

Cada fuente implementa la misma interfaz `Connector` (método para obtener items, método para mapear a Raw Data). Ninguna fuente es una pieza central irremplazable — `AmazonConnector` es una implementación más de esa interfaz, no un caso especial del sistema.

- **Raw Data:** lo que devuelve la fuente, sin tocar.
- **Normalizer:** homogeneiza unidades, moneda, formato de specs.
- **Validator:** rechaza precios imposibles/negativos, URLs inválidas, moneda incorrecta (ver `07-data-model.md` — reglas de calidad de datos).
- **Product Resolver:** intenta emparejar el item con un Product/ProductVariant ya existente — primero por identificador exacto (ASIN/GTIN/EAN si están disponibles), después por coincidencia aproximada de título+marca+specs con revisión manual en el Admin Panel para casos ambiguos (evita duplicados).
- **Canonical Product / Price History:** una vez resuelto, genera el Offer/PriceSnapshot correspondiente.

## Scheduling y resiliencia

Jobs programados vía BullMQ (frecuencia configurable por Store), con reintentos con backoff, detección de fallos consecutivos (marca el connector como degradado en `19-observability.md`), y logging de cada corrida (nº de items procesados, nuevos, actualizados, rechazados por el Validator).

## Regla explícita

Nunca diseñar mecanismos para evadir sistemas de protección o límites de acceso de una fuente. Si una fuente no permite técnica o legalmente una estrategia de adquisición, se documenta y se busca una alternativa — no se fuerza.

## Amazon: la restricción que condiciona el MVP

**Actualización 2026-08-30:** PA-API 5.0 fue deprecada por Amazon; sus endpoints quedaron retirados el 2026-05-15. El sucesor oficial es la **Creators API** (REST + OAuth 2.0 client credentials, operaciones `SearchItems`/`GetItems`/`GetVariations`/`GetBrowseNodes`), que exige **10 ventas cualificadas en los últimos 30 días** para acceder y mantener el acceso (verificado en la documentación oficial: `affiliate-program.amazon.com/creatorsapi`). El problema de arranque persiste: para acceder a la API oficial hacen falta ventas que dependen de tener el catálogo funcionando.

Esta es una decisión de negocio/legal, no solo técnica — ver `25-open-questions.md` #3 (resuelta parcialmente el 2026-08-30: registro manual interino). El pipeline de arriba está diseñado para que la fuente inicial sea intercambiable: se arranca con registro manual mientras se gana elegibilidad para la Creators API, y se sustituye por el connector oficial en cuanto esté disponible, sin rediseñar nada aguas abajo del Normalizer.

## Consideración regional (Canarias)

Si en el futuro se muestra el mismo producto para usuarios peninsulares y de Canarias/Ceuta/Melilla, el precio final puede diferir (IVA vs IGIC, gastos de envío). El modelo de datos debe dejar claro a qué región/impuesto corresponde un `current_price` — no se asume MVP, pero es una nota de diseño a tener presente al definir `Offer.currency`/precio.
