# 29 — Advertising Layout

La publicidad es parte del modelo de negocio y se diseña desde el principio como componente de primera clase (`AdvertisementSlot`, `28-ui-component-spec.md`) — no se improvisa rellenando huecos.

## Tipos

`AdBanner`, `AdInline`, `AdSidebar`, `AdNative`, `AdBetweenProducts`.

## Ubicaciones por página

| Página | Dónde |
|---|---|
| Home | Entre bloques de contenido, nunca sobre el hero de búsqueda |
| Category | Entre determinados resultados, con cadencia fija y predecible |
| Search | En posiciones controladas, nunca mezclado entre los primeros resultados relevantes |
| Product | En zonas no críticas — nunca sobre la zona de decisión de compra (precio, CTA, histórico) |
| Comparison | Fuera del área principal de decisión |
| Guides (V1) | Entre secciones |

## Regla de trust (obligatoria, sin excepciones)

La publicidad nunca debe: parecer una recomendación de ORZAR, confundirse con una oferta, manipular el ranking de resultados, ocultar información importante, o degradar la experiencia de forma desproporcionada. Debe llevar siempre un label claro y visible ("Publicidad" o equivalente).

## Principio de equilibrio

No rellenar la interfaz de anuncios solo porque exista un hueco. El balance entre UX, SEO, CTR, revenue y trust se evalúa con datos reales una vez haya tráfico — los slots se diseñan ahora, la densidad real de anuncios se decide en `16-monetization.md` / Phase 10 del roadmap, no aquí.
