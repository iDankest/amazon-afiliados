# 13 — Deals

Una oferta debe responder de inmediato: **¿por qué esto es una oferta?** (ver `28-ui-component-spec.md`, DealCard).

## Generación

Job programado (BullMQ) recorre los Offers activos, recalcula el DealScore (`10-pricing-engine.md`) y materializa/actualiza filas de `Deal` cuando el score cruza un umbral. El umbral es configurable — por defecto global, con la opción de variar por categoría si los datos reales muestran que "buen precio" significa cosas distintas según el tipo de producto (`25-open-questions.md` #10).

## Superficies

- **Listado de ofertas (MVP):** todas las Deals activas, ordenables por DealScore o por descuento.
- **Ofertas del día/semana, por categoría (V1):** queries acotadas por ventana temporal y categoría sobre la misma tabla `Deal` — no requiere un modelo de datos nuevo.
- **Ofertas personalizadas (V2):** cruza `Deal` con productos/categorías seguidos por el usuario.

## Regla de calidad

Un Deal nunca se muestra sin poder explicar su `DealScore` desglosado (posición histórica, magnitud del descuento, fiabilidad del precio de referencia) — la explicación no es opcional ni se genera por IA, sale directamente de `DealScore`.
