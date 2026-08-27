# 10 — Pricing Engine

Todo lo que se pueda calcular con código, se calcula con código — nunca con un LLM (principio 2.3 de `00-project-vision.md`).

## Cálculos base

```text
avg_price(offer, window)    = SUM(snapshot.price) / COUNT(snapshot)  sobre la ventana
median_price(offer, window) = percentile_50(snapshot.price)          sobre la ventana
discount_pct                = (reference_price - current_price) / reference_price
```

## Precio de referencia para mostrar un descuento

**Nunca** se usa el "precio anterior" bruto que reporte la fuente sin más. Se calcula como el **mínimo real de los últimos 30 días** de PriceSnapshot — el mismo criterio que la Directiva Ómnibus (UE) 2019/2161, en vigor en España desde mayo de 2022, exige a los propios comercios al anunciar una rebaja. Esto tiene dos efectos:
1. El badge de descuento de ORZAR es, como mínimo, tan riguroso como lo que la ley exige a un retailer — reduce el riesgo de amplificar un "descuento" inflado de un tercero.
2. Convierte a ORZAR en una herramienta útil para que el propio usuario verifique si el descuento que anuncia un retailer es genuino — refuerza el posicionamiento de "confianza" del producto (ver `27-ux-guidelines.md`, regla de trust).

Esta directiva obliga directamente al comercio que vende (Amazon u otra tienda), no necesariamente a ORZAR como comparador — pero aplicar el mismo estándar internamente es tanto una buena práctica de producto como una forma de reducir ambigüedad legal propia. Confirmar con asesoría legal el alcance exacto sobre ORZAR como agregador — ver `18-compliance.md` y `25-open-questions.md` #6.

## Deal Score (0–100, configurable)

```text
DealScore = w1 * HistoricalPositionScore
          + w2 * DiscountMagnitudeScore
          + w3 * ReferenceReliabilityScore

HistoricalPositionScore   = 100 * (1 - percentile_rank(current_price, prices_90d))
DiscountMagnitudeScore    = 100 * clamp((median_90d - current_price) / median_90d, 0, 1)
ReferenceReliabilityScore = 100 si el mínimo de 30d se sostuvo ≥7 días antes de la rebaja;
                             penalizado si el precio "anterior" solo estuvo vigente <7 días
                             (patrón típico de descuento inflado / falsa promoción)

Pesos iniciales (punto de partida, no un resultado empírico — requieren calibración
con datos reales una vez haya histórico suficiente; tarea de V1, no del MVP):
  w1 = 0.5   w2 = 0.3   w3 = 0.2
```

No se asume que "50% de descuento = buena oferta": un precio anterior inflado hace que el descuento aparente sea engañoso — por eso `ReferenceReliabilityScore` existe como componente separado, no como un ajuste oculto dentro de `DiscountMagnitudeScore`.

## Presentación en UI (no exponer solo el número crudo)

| Rango | Etiqueta |
|---|---|
| ≥ 85 | Mínimo histórico |
| 70–84 | Muy buen precio |
| 50–69 | Buen precio |
| 30–49 | Precio normal |
| < 30 | Precio elevado |

El valor 0–100 se guarda y sirve para ordenar/filtrar; la interfaz muestra la etiqueta, no el número crudo (ver `26-design-system.md` y `28-ui-component-spec.md`).
