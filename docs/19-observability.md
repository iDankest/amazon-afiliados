# 19 — Observability

No hace falta construirlo todo en el MVP, pero sí diseñar dónde encaja cada pieza desde ahora.

- **Logs estructurados:** nunca con secretos, tokens o PII completa (ver `17-security.md`).
- **Errores:** tracking centralizado (tipo Sentry) desde el primer despliegue de Foundation (Phase 1).
- **Jobs/colas:** panel de estado de BullMQ (p. ej. Bull Board) — visibilidad de jobs en curso, fallidos, reintentos.
- **Estado de ingestión por connector:** última corrida, tasa de éxito, nº de items nuevos/actualizados/rechazados, alerta si un connector lleva N corridas fallando.
- **Latencia y tasa de error de la API.**
- **Anomalías de precio:** un PriceSnapshot que se desvía de forma extrema de la mediana reciente (p. ej. >70% por debajo) se marca para revisión antes de poder alimentar un "mínimo histórico" — nunca se publica automáticamente como tal sin ese filtro (ver reglas de calidad de datos en `07-data-model.md`).
- **Fallos de notificación:** entregas fallidas por canal (email/Telegram), especialmente relevante para no perder alertas de precio silenciosamente.

Panel de Admin (`06-architecture.md`, módulo Admin) es la superficie donde todo esto se hace visible a un humano — sin él, una plataforma de datos se convierte rápido en una caja negra.
