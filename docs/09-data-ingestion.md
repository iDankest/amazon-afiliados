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

La Product Advertising API (PA-API) de Amazon exige una cuenta de Associates con **al menos 3 ventas cualificadas en los primeros 180 días** para el acceso inicial, y hay reportes consistentes (no confirmados oficialmente por Amazon en su documentación pública) de que **mantener** el acceso requiere ventas cualificadas recurrentes dentro de una ventana continua de referencia — el propio FAQ de Amazon advierte pérdida de acceso tras 30 días consecutivos sin ventas cualificadas. Esto crea un problema de arranque: para tener catálogo/precios fiables hacen falta datos, pero para acceder a la API oficial hacen falta ventas que dependen de tener ya el catálogo funcionando.

Esta es una decisión de negocio/legal, no solo técnica — ver `25-open-questions.md` #3. El pipeline de arriba está diseñado para que la fuente inicial sea intercambiable: se puede arrancar con un connector que respete robots.txt/ToS mientras se gana elegibilidad para PA-API, y sustituirlo por el connector oficial en cuanto esté disponible, sin rediseñar nada aguas abajo del Normalizer.

## Consideración regional (Canarias)

Si en el futuro se muestra el mismo producto para usuarios peninsulares y de Canarias/Ceuta/Melilla, el precio final puede diferir (IVA vs IGIC, gastos de envío). El modelo de datos debe dejar claro a qué región/impuesto corresponde un `current_price` — no se asume MVP, pero es una nota de diseño a tener presente al definir `Offer.currency`/precio.
