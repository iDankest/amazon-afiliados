# Agentes

Marca: **Orza** (retirados: "Oscuro y quieto", "Antes del clic"). Nicho: descanso y teclados / Amazon.es. No convertir esto en wiki de WARDOGS ni en tienda Medusa.

- Enlaces de afiliado solo vía `src/lib/affiliate.ts` / `src/components/AmazonLink.astro` (rel=nofollow sponsored siempre).
- Tag solo en `PUBLIC_AMAZON_TAG` (`.env` local / variable de Pages). Vacío = enlaces sin `tag=`.
- Sin testimonios inventados. Sin claims médicos.
- No comprar a través de los propios enlaces.

---

# Manual de operación para agentes de IA en ORZAR

Primera lectura obligatoria para cualquier agente (Kimi, GLM, o cualquier otro) que vaya a tocar este repositorio, en cualquier pane de herdr.

## 1. Qué es ORZAR

Plataforma de descubrimiento, comparación, análisis de precios y alertas de productos. NO es una web de afiliados: cada página y cada funcionalidad debe aportar valor propio (precio, histórico, comparación, explicación) más allá de "nombre + imagen + botón de compra". Visión completa: `docs/00-project-vision.md`.

Este repositorio contiene además el sitio Astro actual (marca Orza), que convive con la documentación ORZAR mientras dure la transición:

- `src/` — sitio Astro (páginas, layouts, componentes, estilos).
- `data/` — catálogo y snapshots de precios (`data/catalog.json`, `data/snapshots/`).
- `scripts/` — utilidades de datos (`add-snapshot.mjs`, `validate-json.mjs`). El tracker de scraping se eliminó el 2026-08-27 (ver `docs/24-decision-log.md`); recuperable desde el historial de git.
- `worker/` — worker de Telegram (Dockerfile + notas PA-API).
- `docs/` — documentación ORZAR (00–31), `docs/noche/` (notas operativas antiguas) y `docs/estudio-modelos-ia-frontend.html` (informe standalone).
- El sitio VIEJO pre-Astro (HTML suelto en raíz, `guias/`, `css/`, `js/`) se eliminó el 2026-08-27; recuperable desde el historial de git. El despliegue es GitHub Actions → `dist/` (Astro build).

## 2. Cómo leer la documentación

Antes de tocar código:
1. `docs/00-project-vision.md` y `docs/01-product-requirements.md` — contexto de producto.
2. `docs/06-architecture.md` y `docs/07-data-model.md` — contexto técnico.
3. El/los documento(s) específicos de la funcionalidad (`docs/09` a `docs/19`, o `docs/26` a `docs/31` si es frontend/UI).
4. `docs/24-decision-log.md` — por si ya existe una decisión tomada sobre lo que ibas a decidir.
5. `docs/25-open-questions.md` — si tu tarea depende de una pregunta abierta ahí, NO la resuelvas por tu cuenta.

## 3. Qué archivos son autoridad (y en qué orden, si se contradicen)

1. `docs/01-product-requirements.md`
2. `docs/06-architecture.md`
3. `docs/08-api-contract.md`
4. `docs/07-data-model.md`
5. Documentación específica de la funcionalidad (`docs/09`–`docs/31`)
6. Este archivo (`AGENTS.md`)
7. El código fuente

Si dos documentos se contradicen: **no improvises**. Registra el conflicto en `docs/25-open-questions.md` con prioridad Critical y detente en esa parte de la tarea.

## 4. Cómo trabajar (flujo obligatorio por tarea)

Para cualquier tarea tipo "Implementa X":
1. Leer la documentación relevante (sección 2).
2. Identificar dependencias (¿toca contratos de API? ¿toca el modelo de datos?).
3. Inspeccionar el código existente relacionado.
4. Crear un plan corto antes de escribir código.
5. Implementar **únicamente X** — nada más, aunque veas otras cosas mejorables.
6. Ejecutar tests.
7. Revisar que no haya regresiones.
8. Actualizar documentación si la tarea cambia algo que un doc describe.
9. Informar de los cambios (qué se hizo, qué se tocó, qué queda pendiente).

Nunca continuar automáticamente con otra funcionalidad no pedida. Formato de tarea (TASK-ID) en `docs/22-agent-workflow.md`.

## 5. Qué está permitido

- Proponer cambios a un contrato de API, documentándolos en `docs/08-api-contract.md` y en el decision log antes de implementarlos.
- Añadir dependencias menores (librerías de utilidad, sin impacto arquitectónico) sin aprobación previa, mencionándolo en el informe de la tarea.
- Refactorizar código que tú mismo tocaste dentro del alcance de tu tarea.
- Crear tests nuevos.

## 6. Qué NO está permitido

- Modificar el trabajo del otro agente (Kimi ↔ GLM) sin necesidad directa para tu tarea.
- Cambiar contratos de API de forma arbitraria o sin documentarlo.
- Introducir dependencias con impacto arquitectónico (nueva base de datos, nuevo framework, nuevo proveedor de infraestructura) sin registrarlo primero en `docs/24-decision-log.md` y, si no está claramente autorizado, en `docs/25-open-questions.md`.
- Cambiar la arquitectura sin documentarlo.
- Usar datos falsos, mocks permanentes o precios inventados en cualquier cosa que pueda llegar a producción.
- Dejar secretos hardcodeados.
- Hacer que la IA (LLM) sea la fuente de verdad de precios, disponibilidad, specs o URLs — eso siempre viene de la capa de datos (`docs/09-data-ingestion.md`, `docs/07-data-model.md`).
- Diseñar o implementar mecanismos para evadir sistemas de protección o límites de acceso de terceros (Amazon, Google, Telegram u otros).

## 7. Cómo probar cambios

Ver `docs/23-testing-strategy.md`. Como mínimo: tests unitarios de lo que tocaste, tests de integración si tocaste un límite entre módulos, y una pasada manual del flujo afectado. Atención especial a precios, descuentos, históricos y recomendaciones — un error ahí destruye la confianza del producto.

## 8. Cómo documentar decisiones

Toda decisión no trivial (elección de librería con impacto real, cambio de modelo de datos, cambio de contrato, trade-off relevante) se registra en `docs/24-decision-log.md` con el formato: Decision / Context / Options considered / Chosen option / Why / Trade-offs / Date.

## 9. Cómo pedir aclaraciones

Si una tarea requiere una decisión de producto o negocio que no está en la documentación (naming, categoría, presupuesto, alcance legal, elección de proveedor con coste): NO la inventes. Añádela a `docs/25-open-questions.md` con su prioridad (Critical/High/Medium/Low) y continúa solo con lo que sí puedas hacer sin esa decisión.

## 10. Cómo evitar scope creep

- Una tarea = un TASK-ID = un alcance. Si detectas algo más que "debería hacerse", anótalo — no lo implementes dentro de la tarea actual.
- No optimices prematuramente ni añadas funcionalidad de una fase posterior del roadmap (`docs/05-roadmap.md`) solo porque "ya que estás".
- Principio del proyecto: **no construyas cosas que no sabemos todavía que necesitamos.**

## 11. Roles

- **Kimi (K3)** — frontend, UX/UI, componentes, accesibilidad, responsive, integración con la API. Ver `docs/20-frontend-guidelines.md`.
- **GLM (5.3)** — backend, base de datos, ingestión de datos, pricing engine, recommendation engine, workers, Telegram, autenticación, infraestructura. Ver `docs/21-backend-guidelines.md`.
- **herdr** — capa de orquestación/observabilidad que ejecuta a ambos agentes en panes independientes con tracking de estado (working/idle/blocked). No sustituye este documento: cada agente sigue siendo responsable de seguir este flujo dentro de su pane.

Detalle de colaboración entre agentes: `docs/22-agent-workflow.md`.
