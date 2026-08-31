# 25 — Open Questions

Ninguna de estas decisiones se ha tomado por defecto — se necesita tu confirmación antes de que un agente implemente sobre ellas.

## Critical

1. **Nombre definitivo.** "ORZAR" es el nombre provisional. Verificar disponibilidad de dominio y de marca (registro español OEPM y/o EUIPO a nivel UE) antes de comprometerse — esto no se puede confirmar de forma fiable con una búsqueda web genérica, requiere consulta directa a los registros oficiales.

   **Material para decidir** (2026-08-27):
   - Marca España: localizador de marcas de la OEPM — `https://tramites2.oepm.es/locator/` (buscar "ORZA" y "ORZAR" en clases 35/38/42, las típicas de comercio online/publicidad/telecomunicaciones).
   - Marca UE: eSearch plus de EUIPO — `https://euipo.europa.eu/eSearch/` (mismos términos; una marca UE cubre los 27 estados).
   - Dominios: WHOIS de `orza.es` / `orzar.es` vía cualquier registrador (HANDOFF indica no comprar todavía — solo consultar disponibilidad).
   - Al decidir: registrar la entrada en `docs/24-decision-log.md` (nombre elegido, qué registros se consultaron y resultado, fecha) y actualizar marca en el sitio si cambia.
2. **Categoría(s) de producto para el catálogo inicial del MVP.** Recomendación de partida: periféricos PC (teclados, ratones, auriculares) — es el ejemplo usado en toda la especificación original y tiene alta densidad de specs comparables. Decisión final pendiente.

   **Material para decidir** (2026-08-27):
   - (a) Mantener el nicho del sitio vivo (descanso + teclados): aprovecha contenido y snapshots ya existentes; specs menos comparables en descanso.
   - (b) Periféricos PC (recomendación de la spec): alta densidad de specs comparables, encaja con los ejemplos de toda la documentación; el catálogo actual ya tiene teclados/audio/periféricos (6 de 8 productos).
   - (c) Híbrido: ambos nichos desde el inicio — más superficie, pero diluye el primer connector y la comparación razonada.
   - Impacto directo: define el alcance del primer connector de Phase 2 (`docs/09-data-ingestion.md`) y qué parte del catálogo actual se convierte en semilla del catálogo ORZAR.
3. **Estrategia de adquisición de datos inicial.** La Product Advertising API de Amazon exige 3 ventas cualificadas en 180 días para el acceso inicial, con reportes (no confirmados oficialmente por Amazon) de que mantenerlo exige ventas recurrentes en una ventana continua — problema de "huevo y gallina" para un catálogo nuevo (detalle en `09-data-ingestion.md`). Decidir: empezar con un connector que respete robots.txt/ToS mientras se gana elegibilidad, buscar otra fuente inicial, o esperar. Recomendado: revisión legal antes de decidir.

   **Material para decidir** (2026-08-27):
   - Política interina vigente: registro manual de precios vistos en Amazon.es (`scripts/add-snapshot.mjs`). El tracker de scraping fue eliminado el 2026-08-27 por contradecir las reglas adoptadas (ver `docs/24-decision-log.md`).
   - Opciones: (a) connector que respete robots.txt/ToS mientras se ganan las ventas cualificadas y después API oficial (`worker/paapi.md`); (b) otra fuente inicial (feed/catálogo con licencia); (c) esperar con registro manual hasta tener elegibilidad.
   - Dependencias: la opción (a) necesita revisión legal previa (ToS de Amazon + relacionada con la pregunta #6); la elegibilidad depende del checkpoint de negocio de ventas cualificadas (HANDOFF).
   - Bloquea directamente Phase 2 del roadmap (`docs/05-roadmap.md`).

   **Resolución** (2026-08-31): invalidada por la auditoría de datos. La «resolución parcial» hacia registro manual puro se basaba en una lectura incompleta de la licencia de Associates: la transcripción manual no es ninguna de las dos vías que §2(b) admite para mostrar precios, y conservar precios >24 h choca con §2(h). El subsistema de snapshots fue retirado por completo y el histórico de precios pasa a ser el gráfico público de Keepa embebido, sin almacenamiento propio (`docs/24-decision-log.md`, 2026-08-31). La estrategia de adquisición queda así resuelta de facto: el único dato de producto almacenado es el ASIN (almacenable indefinidamente según §2(h)), verificado en CI contra Keepa. Pendiente solo la revaluación si algún día se alcanza la elegibilidad de la Creators API (10 ventas/30 días) — y aun entonces, sin histórico almacenado.

3b. **Acuerdo por escrito con Amazon para la excepción de §6(y).** La cláusula §6(y) de los requisitos de participación («su Sitio no deberá tener funcionalidad de seguimiento de precios y/o de alertas de precio») alcanza al sitio con independencia del origen del dato: el gráfico de Keepa embebido reduce el riesgo pero probablemente cuenta como «funcionalidad de seguimiento de precios». La única legalización plena es el acuerdo previo que la propia cláusula contempla («Salvo que Amazon acuerde otra cosa»). **Pregunta:** ¿solicitamos a Amazon Associates ese acuerdo por escrito (formulario Contact Us, describiendo exactamente qué hace el sitio), y qué hacemos si lo deniegan — retirar el gráfico de Keepa, o mantenerlo asumiendo el riesgo? Pendiente de acción humana: la solicitud debe enviarla el titular de la cuenta. Riesgo máximo documentado si se incumple: incumplimiento material, resolución del Acuerdo y retención de comisiones a perpetuidad.

## High

4. **LLM en tiempo de ejecución** para el Intent Parser y la LLM Explanation (`11-recommendation-engine.md`) — qué API se usa (Claude, GLM, Kimi u otra) y qué presupuesto por consulta es aceptable. Es una decisión separada de qué agentes escriben el código.
5. **Proveedor y región de hosting definitivos** (recomendado: UE, por GDPR y latencia) — Vercel + Supabase/Railway vs VPS propio (p. ej. Hetzner). Depende de coste real, no decidible sin cifras.
6. **Alcance de revisión legal/fiscal necesaria antes de lanzar:** términos de afiliación, LSSI/GDPR, alcance de la Directiva Ómnibus sobre ORZAR como agregador (no vendedor directo), y tributación de ingresos de afiliación/publicidad operando desde Canarias (régimen IGIC).

## Medium

7. **Escenario de monetización a activar primero** (A–E, ver `16-monetization.md`).
8. **¿Reseñas nativas de usuarios** en V1/V2, o solo agregadas de la fuente en el MVP?
9. **Política de imágenes de producto** — ¿hotlink a la fuente o copia propia? Depende de los términos de cada tienda/proveedor, revisar caso por caso.
10. **Umbral del Deal Score** para materializar un `Deal` — ¿fijo global o configurable por categoría?

## Low

11. **Librería concreta del bot de Telegram** — grammY (recomendado) vs `node-telegram-bot-api` vs otra.
12. **Motor de búsqueda dedicado para V2** si Postgres FTS + pgvector se queda corto — Meilisearch vs Typesense vs otro.
13. **¿Activar Paid Broadcasts de Telegram** si la base de suscriptores crece más allá del límite gratuito de 30 msg/s?
