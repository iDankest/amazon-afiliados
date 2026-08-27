# 20 — Frontend Guidelines (Kimi)

## Convenciones

- Next.js App Router. Server Components para páginas críticas de SEO (producto, categoría, comparación, deals); Client Components solo donde hace falta interactividad real (filtros, gráficas interactivas, formularios).
- Ningún cálculo de precio, descuento o score se hace en el frontend — todo llega ya calculado desde la API (`08-api-contract.md`). El frontend renderiza y formatea, no decide.
- Componentes construidos siguiendo `28-ui-component-spec.md`; tokens de color/tipografía/espaciado siempre desde `26-design-system.md` — nunca valores hardcodeados sueltos.
- Estado: preferir estado de servidor (fetch + cache de Next.js) sobre estado global de cliente; usar estado local solo cuando el dato no necesita sobrevivir a un refresh.

## Accesibilidad

Objetivo WCAG 2.2 AA desde el primer componente, no como pase final — ver `31-accessibility.md`. Especial atención a SearchBar, ProductComparison, Modal y a que el Score/DealScore comunique con texto, no solo con color.

## Qué reportar al terminar una tarea

Qué endpoints consumió, qué componentes creó/modificó, si algo del contrato de API no encajó con lo documentado (eso va a `24-decision-log.md` si implica un cambio de contrato).
