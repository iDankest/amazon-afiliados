# 30 — Responsive Guidelines

## Prioridad de diseño: desktop primero, pero completo en todos los tamaños

El comparador y las gráficas de histórico tienen especial valor en pantalla grande — se diseñan primero ahí. Tablet y mobile son objetivo igual de obligatorio, no un recorte del desktop.

## Reglas específicas de mobile

- Ninguna tabla imposible de leer con scroll horizontal forzado — `ProductComparison` se convierte en cards/secciones apiladas (`28-ui-component-spec.md`).
- El precio se mantiene siempre visible, incluso con scroll.
- El CTA principal permanece accesible sin scroll excesivo (considerar CTA fijo/sticky en página de producto).
- Las gráficas de histórico se mantienen legibles con interacción táctil — considerar un rango por defecto más corto (p. ej. 30d en vez de 1 año) en mobile para no saturar la pantalla.

## Tablet

Tratamiento intermedio explícito, no solo "lo que sobra entre desktop y mobile" — especialmente para `ProductComparison` y `ProductTable`, donde 2 columnas suele funcionar mejor que 1 o que el layout completo de desktop.
