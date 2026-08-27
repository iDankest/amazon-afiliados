# 23 — Testing Strategy

| Capa | Qué cubre | Nota |
|---|---|---|
| Unit | Funciones puras: fórmulas de `10-pricing-engine.md`, parsers, validadores | Casos límite: precio 0, negativo, subida repentina, moneda distinta |
| Integration | Límites entre módulos (p. ej. Ingestion → Catalog, Pricing → Deals) | |
| API / contract | Cada endpoint de `08-api-contract.md` contra su schema documentado | Rompe el build si el contrato real diverge del documentado |
| Database | Migraciones de Prisma aplican y revierten limpio | |
| E2E | Flujos completos de `03-user-flows.md` (búsqueda→comparación→producto, crear alerta→recibirla) | |
| Data ingestion | Contra fixtures/respuestas mockeadas de la fuente, nunca contra la fuente real en CI | Cubre casos de datos corruptos/incompletos |
| Pricing | Deal Score con series de precios sintéticas conocidas (incl. patrón de "descuento inflado") | |
| Recommendation | La explicación generada no menciona ninguna spec ausente del registro estructurado (test de grounding, ver `11-recommendation-engine.md`) | |
| Telegram | Contra un mock de la Bot API — nunca contra el bot real en CI | |

Atención especial, en todas las capas, a precios, descuentos, históricos, recomendaciones, duplicados y variantes de producto — son las áreas donde un error destruye la confianza del producto.
