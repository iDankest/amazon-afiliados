# Datos: de dónde salen los precios

**Decisión: snapshots manuales hasta ser elegibles para PA-API. Coste 0 €.**

## Estado

- Fuente actual: `data/snapshots/{id}.json` — array `{ date, price, currency, source: "manual" }`,
  append-only, anotado a mano en Amazon.es. Sin snapshot no hay cifra en el sitio.
- Script: `node scripts/add-snapshot.mjs --id <id> --price <n> [--date YYYY-MM-DD]`.
- Validación: `npm run validate:data` (catálogo + snapshots), corre en CI antes del build.

## Por qué no PA-API ahora

El Product Advertising API exige **3 ventas cualificadas en 180 días** para no cerrar
la cuenta de Associates. Antes de eso no hay clave que usar. Cuando lleguen las 3 ventas:

- La PA-API devuelve precio y disponibilidad *en el momento de la petición*; eso es un
  dato legítimo (no scrape), pero mientras tanto no existe.
- Regla a mantener también con PA-API: lo que se pinta en la ficha lleva fecha de cuándo
  se vio («visto el {fecha}»), nunca «precio actual».

## Por qué no Keepa ni similares

- Keepa API: de pago. Rompe el 0 €.
- Rainforest/scrapers de Amazon: scrape. Fuera por norma del proyecto y ToS de Amazon.

## Ads: qué sí y qué no

- **OK futuro:** anuncios en la propia página (on-page), cuando el tráfico lo justifique.
- **NO ok nunca:** anuncios o intersticiales en el salto de clic hacia Amazon
  (el "click hop"). El enlace `data-amazon` debe ir limpio, directo y con
  `rel="nofollow sponsored noopener"`. Meter un hop con anuncios rompe la UX,
  la confianza y la atribución de Associates.

## Checklist para el día de PA-API

1. 3 ventas cualificadas confirmadas en el panel de Associates.
2. Solicitar clave PA-API desde el propio panel (nace atada a la cuenta).
3. Worker en `worker/` que anote snapshots programados **sin borrar los manuales**
   (el `source` distingue `manual` de `api`).
4. Mantener la validación: sin snapshot nuevo, la ficha sigue mostrando el último visto.
