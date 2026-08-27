# Changelog

Formato: fecha, resumen. Registra cambios relevantes de producto/arquitectura/documentación — no cada commit de código.

## 2026-08-27

- Incorporada al repo la documentación completa de ORZAR (`docs/00`–`docs/31`); eliminado el directorio `files/` y el sitio HTML legacy pre-Astro (raíz, `guias/`, `css/`, `js/`). Creados `CHANGELOG.md` y reescritos `README.md`/`HANDOFF.md`/`PRODUCT.md`/`DESIGN.md`; fusionado `AGENTS.md` (reglas Orza + manual de operación ORZAR).
- Quick wins de transparencia y SEO en el sitio Astro (auditoría contra los principios de `docs/00`, `15-seo`, `18-compliance`, `24-decision-log`): el descuento mostrado toma ahora como referencia el mínimo real de los últimos 30 días (criterio Ómnibus) y no el máximo histórico; sin histórico suficiente no hay badge de descuento. Añadidos JSON-LD `Product`/`Offer`/`BreadcrumbList` en la ficha, meta OG/Twitter en el layout, fechas junto a precios del sidebar, contadores de categoría dinámicos y banner destacado derivado de datos.
- Eliminado el tracker de scraping (`scripts/track-prices.mjs` + workflow `price-tracker.yml`) por contradecir las reglas adoptadas y poder romper el deploy; registro manual como política vigente (ver `docs/24-decision-log.md`).
- Aclaración sobre la entrada del 2026-08-26: "ninguna línea de código de aplicación" se refiere a código de producto de la plataforma ORZAR nueva. El sitio Astro, `scripts/` y `worker/` ya existían como activo de transición pre-ORZAR y siguen siendo la base operativa (Phase 0).

## 2026-08-26

- Creada la documentación inicial completa del proyecto (Discovery Report): visión, requisitos, personas, flujos, MVP, roadmap, arquitectura, modelo de datos, contrato de API, ingestión de datos, motor de precios, motor de recomendación, búsqueda, deals, Telegram, SEO, monetización, seguridad, compliance, observabilidad, guías de frontend/backend, flujo de trabajo entre agentes, testing, decision log, open questions, y el Design System completo (docs 00–31, `AGENTS.md`, `README.md`).
- Ninguna línea de código de aplicación todavía — repositorio en fase de Discovery (Phase 0).
