# 22 — Agent Workflow

## Roles

- **Kimi (K3):** frontend — ver `20-frontend-guidelines.md`.
- **GLM (5.3):** backend — ver `21-backend-guidelines.md`.
- Ningún agente modifica el trabajo del otro sin necesidad directa para su propia tarea, cambia contratos de API arbitrariamente, introduce dependencias con impacto arquitectónico sin justificar, o cambia la arquitectura sin documentarlo (regla ya establecida en `AGENTS.md`).

## herdr como capa de orquestación

herdr es un multiplexor de terminal que ejecuta agentes de IA en panes independientes, con seguimiento en tiempo real de su estado (working / idle / blocked) y una API/socket local que permite crear panes, ejecutar comandos, leer resultados y — si se configura así — que un agente coordine con otro programáticamente. Es agnóstico del agente que corre dentro de cada pane, así que no impone un formato propio de tareas: **el formato de tarea que usamos es el que define este documento (TASK-ID, abajo)**, independientemente de que cada agente corra dentro de un pane de herdr.

En la práctica: Kimi corre en un pane, GLM en otro; herdr da visibilidad de cuál está trabajando, cuál está bloqueado esperando una decisión (probablemente una entrada de `25-open-questions.md`), y cuál ha terminado. Si el flujo de trabajo requiere que un agente espere a que el otro termine de tocar un archivo compartido (p. ej. el contrato de API), esa coordinación se hace visible a través del estado de herdr y se resuelve documentando el cambio antes de que el segundo agente implemente contra él (ver sección "Contratos compartidos" abajo).

## Formato de tarea (TASK-ID)

```text
TASK-ID: ORZ-XXX
Title:
Goal:
Context:
Dependencies:
Files involved:
Implementation requirements:
Acceptance criteria:
Tests:
Documentation impact:
Risks:
Assigned agent: Kimi | GLM
```

## Contratos compartidos (API contract, data model)

Si una tarea de cualquiera de los dos agentes requiere cambiar `08-api-contract.md` o `07-data-model.md`: el agente que lo detecta primero propone el cambio en `24-decision-log.md` **antes** de implementarlo. El otro agente revisa esa entrada antes de implementar código que dependa de ella. Ningún agente implementa contra un contrato que solo existe en su cabeza.
