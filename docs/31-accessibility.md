# 31 — Accessibility

Objetivo: WCAG 2.2 AA cuando sea razonablemente aplicable, desde el primer componente — no como pase final antes de lanzar.

- **Contraste:** verificar los tokens de color de `26-design-system.md` contra el fondo real donde se usan, especialmente `accent` sobre `surface`.
- **Navegación por teclado:** todos los componentes interactivos, incluidos SearchBar, ProductComparison, Modal y los controles de rango de PriceHistoryChart.
- **Focus states:** visibles en todo elemento enfocable, sin excepciones por estética.
- **Lectores de pantalla:** los badges de Score/DealScore comunican su significado también en texto/aria-label — nunca solo por color (ver `28-ui-component-spec.md`).
- **Reduced motion:** animaciones de gráficas y transiciones respetan `prefers-reduced-motion`.
- **Touch targets:** mínimo 44px en controles táctiles.
- **Formularios:** mensajes de error asociados a su campo mediante `aria-describedby`, nunca solo color rojo sin texto.
