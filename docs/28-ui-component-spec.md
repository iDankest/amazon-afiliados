# 28 — UI Component Spec

## Componentes críticos (detalle propio)

### ProductCard
**Propósito:** decisión rápida sobre un producto, nunca "nombre + imagen + botón" sin más. **Debe priorizar:** imagen, nombre, rating agregado si existe, precio, badge de calidad del precio (etiqueta del Deal Score, no el número crudo — ver `10-pricing-engine.md`), precio habitual de referencia, mini-indicador de posición histórica, CTA. **Variantes:** completa (listados), compacta (comparador/sidebar). **Cuándo NO usarla:** para publicidad — un anuncio nunca reutiliza el layout exacto de ProductCard (regla de trust, `27-ux-guidelines.md`).

### DealCard
**Propósito:** debe responder de inmediato "¿por qué esto es una oferta?". **Muestra:** precio actual, precio de referencia a 30 días, % de descuento, indicador de mínimo histórico si aplica, etiqueta del Deal Score. **Diferencia visual obligatoria** frente a ProductCard — una oferta no debe poder confundirse con un producto normal ni al pasar rápido la vista.

### PriceHistoryChart
**Propósito:** responder "¿está barato ahora?" de un vistazo. **Rangos:** 24h / 7d / 30d / 90d / 1 año / máximo disponible. **Contexto obligatorio junto al gráfico:** precio actual, media de 90 días, mínimo histórico — el gráfico solo no basta, necesita estas cifras de anclaje en texto.

### Score / DealScoreBadge
**Propósito:** comunicar calidad de precio sin exigir interpretar un número. **Usa las etiquetas de `10-pricing-engine.md`** ("Muy buen precio", etc.), no el 0–100 crudo, salvo en vistas de ordenación/admin. **Accesibilidad:** el significado se comunica también en texto, nunca solo por color (ver `31-accessibility.md`).

### SearchBar
**Propósito:** sentirse como "cuéntame qué necesitas", no como una keyword box. **Estados:** vacío con sugerencias/categorías populares, escribiendo (sugerencias instantáneas), con resultados, sin resultados (con reformulación sugerida, no un callejón sin salida).

### ProductComparison
**Propósito:** priorizar diferencias importantes, no una tabla gigante ilegible. **Debe soportar:** "muéstrame solo las diferencias". **Responsive:** en mobile se convierte en cards/secciones apiladas, nunca una tabla con scroll horizontal forzado (ver `30-responsive-guidelines.md`).

### AdvertisementSlot
**Propósito:** hueco de publicidad como componente de primera clase, nunca disfrazado de contenido. **Obligatorio:** label visible "Publicidad" (o equivalente). **Nunca:** reutilizar el layout visual de ProductCard, DealCard o RecommendationCard. Ver `29-advertising-layout.md`.

## Resto de componentes (patrón estándar, definir al implementar)

| Componente | Propósito breve |
|---|---|
| Button, Input, Select, Dropdown | Controles base del design system |
| Badge, Tag | Etiquetas cortas (categoría, estado) |
| Price, PriceChange | Formato tipográfico de precios y variaciones |
| ProductTable, ProductHero | Vistas de tabla y cabecera de producto |
| RecommendationCard, CategoryCard, StoreBadge | Tarjetas de apoyo — nunca visualmente idénticas a ProductCard/DealCard |
| Rating | Rating agregado de fuente — nunca inventado |
| Alert, Toast, Modal, Tooltip | Feedback y overlays estándar |
| Tabs, Breadcrumb, Pagination | Navegación |
| Skeleton, EmptyState, ErrorState | Estados de carga/vacío/error — obligatorios en toda vista con datos async |
| Navigation, Footer | Estructura global |

Cada componente, al implementarse, documenta: propósito, variantes, estados, comportamiento responsive, requisitos de accesibilidad, cuándo usarlo y cuándo no — como se hizo arriba para los siete críticos.
