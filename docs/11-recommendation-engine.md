# 11 — Recommendation Engine

## Pipeline

```text
User Query → Intent Parser → Structured Requirements → Candidate Retrieval → Hard Filters → Scoring → Ranking → LLM Explanation
```

Ejemplo — consulta: *"Quiero un teclado para programar y jugar, inalámbrico, silencioso y máximo 120€."*

```json
{
  "category": "keyboard",
  "budget_max": 120,
  "wireless": true,
  "noise": "low",
  "use_cases": ["programming", "gaming"]
}
```

A partir de ahí, Candidate Retrieval y Hard Filters trabajan **solo sobre productos reales del catálogo** — el LLM nunca inventa productos ni resultados.

## Overall Score (componentes, pesos explícitos y configurables)

- Requirement Match — cuánto cumple la consulta estructurada
- Price Value — relación calidad/precio
- Product Quality — señales de calidad (specs, rating agregado si existe)
- Historical Price — posición del precio actual frente a su histórico (reutiliza `HistoricalPositionScore` de `10-pricing-engine.md`)
- User Preference — personalización por historial (V2, no MVP)
- Deal Quality — reutiliza el Deal Score si el producto tiene una oferta activa

Cada componente necesita fórmula, rango y peso documentados antes de implementarse — igual que el Deal Score, calibrar con datos reales es tarea de V1.

## Regla de grounding (crítica — aplica el principio 2.2 del proyecto)

El paso de LLM Explanation recibe **únicamente** el registro estructurado y verificado del producto recuperado como contexto. El modelo no debe mencionar ninguna característica que no esté presente en ese registro. Requisito de implementación: el prompt de explicación debe incluir el registro estructurado completo como única fuente de verdad, con instrucción explícita de no añadir specs no listadas; y conviene un paso de validación posterior (aunque sea ligero — comprobación de que las afirmaciones de la explicación aparecen en el registro estructurado) que descarte o marque explicaciones que introduzcan datos no anclados, antes de que lleguen al usuario.

## Separación importante

Qué agente de IA escribe el código de este módulo (Kimi/GLM) es independiente de qué LLM se llama en tiempo de ejecución dentro de la aplicación para el Intent Parser y la LLM Explanation. Esa segunda decisión está abierta — ver `25-open-questions.md` #4.
