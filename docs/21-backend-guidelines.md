# 21 — Backend Guidelines (GLM)

## Convenciones

- Un módulo NestJS = una responsabilidad de `06-architecture.md`. No importar directamente entre módulos sin pasar por su interfaz pública.
- `08-api-contract.md` es la fuente de verdad del contrato — cualquier cambio se documenta ahí y en el decision log antes de tocar el endpoint.
- Todo cálculo estadístico o monetario (medias, percentiles, Deal Score, Overall Score) vive en código de aplicación determinista — nunca en un prompt de LLM (principio 2.3).
- Migraciones de Prisma versionadas — nunca editar el esquema de la base de datos sin una migración.
- Jobs (BullMQ) idempotentes y seguros ante reintento — una corrida repetida no debe duplicar PriceSnapshots ni disparar alertas duplicadas.
- Nuevos connectors de ingestión implementan la interfaz `Connector` de `09-data-ingestion.md` — no se acopla lógica específica de una fuente al resto del pipeline.

## Qué reportar al terminar una tarea

Qué módulo(s) tocó, si añadió una migración, si tocó una cola/job, y si cambió algo del contrato de API documentado.
