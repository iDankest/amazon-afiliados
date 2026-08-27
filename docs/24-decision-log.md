# 24 — Decision Log

Estas son propuestas fundamentadas de la fase de Discovery, listas para tu confirmación antes de implementar — no decisiones ya ejecutadas en código. A partir de Phase 1, cualquier agente añade aquí sus propias decisiones no triviales con el mismo formato.

---

**Decision:** Arquitectura de monolito modular (no microservicios) para el MVP.
**Context:** Sección 14 del spec pide evitar microservicios prematuros y preferir un monolito modular mientras el volumen no lo justifique.
**Options considered:** microservicios desde el inicio · monolito modular · monolito sin modularidad interna.
**Chosen option:** monolito modular sobre NestJS.
**Why:** equipo pequeño (2 agentes de IA + 1 persona), coste operativo bajo, NestJS ya impone límites de módulo sin la complejidad de red distribuida.
**Trade-offs:** extraer un módulo a servicio independiente más adelante requerirá trabajo de extracción explícito.
**Date:** 2026-08-26

---

**Decision:** PostgreSQL + pgvector como única base de datos del MVP (sin motor de búsqueda ni vector DB dedicados).
**Context:** Necesidad de integridad relacional fuerte para precios/históricos y de búsqueda semántica, sin sobrediseñar.
**Options considered:** Postgres+pgvector · Postgres + vector DB dedicada (Qdrant/Weaviate) · Elasticsearch desde el inicio.
**Chosen option:** Postgres + pgvector.
**Why:** una sola pieza de infraestructura para el MVP; evita sobrediseño (principio 2.5).
**Trade-offs:** el rendimiento de búsqueda semántica a gran escala puede requerir migrar a una vector DB dedicada en V2.
**Date:** 2026-08-26

---

**Decision:** Next.js (React) como framework de frontend.
**Context:** SEO es crítico para el modelo de negocio (páginas de producto/comparación/categoría deben indexarse bien).
**Options considered:** Next.js · Astro · Nuxt/Vue.
**Chosen option:** Next.js.
**Why:** SSR/ISR nativo, ecosistema maduro de gráficas y data-fetching para un producto muy data-heavy.
**Trade-offs:** más pesado que Astro para páginas puramente estáticas (no es el caso principal de ORZAR).
**Date:** 2026-08-26

---

**Decision:** Redis + BullMQ para colas de ingestión y notificaciones (incluye Telegram).
**Context:** Ingestión programada, cálculo de agregados y envío de notificaciones necesitan reintentos y control de rate limits (especialmente Telegram, ver `14-telegram.md`).
**Options considered:** BullMQ · colas gestionadas externas (SQS y similares) · cron simple sin cola.
**Chosen option:** Redis + BullMQ.
**Why:** encaja directamente en el stack Node/TS, suficiente para el volumen del MVP, con dashboard de estado disponible (Bull Board).
**Trade-offs:** añade Redis como pieza de infraestructura adicional.
**Date:** 2026-08-26

---

**Decision:** Prisma como ORM.
**Context:** Backend en TypeScript sobre PostgreSQL.
**Options considered:** Prisma · TypeORM · queries SQL manuales.
**Chosen option:** Prisma.
**Why:** tipado end-to-end, migraciones versionadas, encaja con la experiencia previa del equipo.
**Trade-offs:** menos flexible que SQL manual para queries muy complejas de agregación (mitigable con SQL crudo puntual vía Prisma cuando haga falta).
**Date:** 2026-08-26

---

**Decision:** El precio de referencia para calcular un descuento es el mínimo real de los últimos 30 días — no el "precio anterior" bruto que reporte la fuente.
**Context:** Riesgo de amplificar descuentos inflados de terceros; existe un estándar legal externo (Directiva Ómnibus) que usa exactamente este criterio.
**Options considered:** usar el "precio anterior" tal cual lo reporta la fuente · calcular el mínimo real de 30 días.
**Chosen option:** mínimo real de 30 días.
**Why:** alineado con lo que la Directiva Ómnibus (UE) 2019/2161 exige a los propios retailers desde 2022; refuerza el posicionamiento de confianza del producto.
**Trade-offs:** un producto recién añadido al catálogo no tendrá 30 días de histórico — necesita una regla explícita de "sin badge de descuento hasta tener datos suficientes" en vez de mostrar un dato poco fiable.
**Date:** 2026-08-26

---

**Decision:** Eliminar el tracker automático de precios (`scripts/track-prices.mjs` + workflow `price-tracker.yml`) y mantener el registro manual como única fuente de snapshots hasta resolver la OQ #3. *(Decisión ejecutada, no propuesta de Discovery.)*
**Context:** El tracker (anterior a la adopción de la documentación ORZAR) hacía fetch de listings de Amazon.es con User-Agent de navegador falso y escribía snapshots con `source: "tracker"`, que `validate-json.mjs` rechaza — de haber registrado un solo precio habría roto su propio workflow y el deploy de Pages. Además contradecía frontalmente reglas ya adoptadas: "No scrape" (HANDOFF), la prohibición de evadir protecciones de terceros (AGENTS.md §6), y la estrategia de ingestión de `docs/09-data-ingestion.md` y `worker/paapi.md`.
**Options considered:** eliminarlo · ratificarlo (decision log + validador que acepte "tracker" + reescribir docs) · pausarlo (desactivar cron, conservar script).
**Chosen option:** eliminarlo; registro manual (`scripts/add-snapshot.mjs`) como política interina hasta resolver `docs/25-open-questions.md` #3.
**Why:** cumplir las reglas adoptadas, eliminar un riesgo real de rotura del deploy, y no dar por tomada una decisión de estrategia de datos (OQ #3) que sigue abierta y requiere revisión legal. El código eliminado queda recuperable en el historial git (commit `7e19a48`).
**Trade-offs:** sin automatización de precios hasta que la OQ #3 defina una fuente legítima (connector compatible con robots.txt/ToS o PA-API cuando haya elegibilidad); el registro manual exige disciplina de comprobación visual.
**Date:** 2026-08-27
