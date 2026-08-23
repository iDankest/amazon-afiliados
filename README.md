# Orza — Amazon afiliados (ES)

Marca: **Orza**. Dominio previsto: `orza.es` (comprobar en el registrador; no comprado). Nicho: descanso y teclados. Registro de precios anotados a mano. No es una wiki de videojuegos.

- GitHub: https://github.com/iDankest/amazon-afiliados
- Registro afiliados: https://afiliados.amazon.es/

## Por qué este repo y no una wiki Tarkov/WARDOGS

WARDOGS ya tiene wikis EN y guía ES. El juego se vende en Steam: Amazon no paga comisión. Este sitio afilia **Amazon.es**, donde sí hay antifaces y tapones.

## Arranque

1. Publicar el sitio (GitHub Pages, rama `main`, carpeta `/`).
2. URL pública → pedir alta en Amazon Associates con esa URL.
3. Cuando Amazon te dé el **tag** (tipo `algo-21`), pégalo en `js/config.js` → `AFFILIATE.tag`.
4. 3 ventas cualificadas en 180 días o cierran la cuenta.
5. Aviso de afiliado ya está en cabecera y pie.

No comprar stock. No claims médicos. No auto-clics en tus enlaces.

## Local

Dos sitios conviven hasta que el HTML suelto se tuelle:

- **Astro (nuevo, con registro de precios):** `npm install`, `npm run dev` (preview en localhost), `npm run build` → `dist/`.
- **HTML suelto (viejo):** abre `index.html` o un static server.

Tag de afiliado (Astro): variable `PUBLIC_AMAZON_TAG` (ver `.env.example`). Vacío = enlaces sin `tag=`.

## Registro de precios

- `data/catalog.json` — productos (`id`, `title`, `category`, `asin?`, `amazonQuery`, `tested`, `notes`).
- `data/snapshots/{id}.json` — array `{ date, price, currency: "EUR", source: "manual" }`, append-only.
- Añadir snapshot: `node scripts/add-snapshot.mjs --id <id> --price <n> [--date YYYY-MM-DD]`.
- Validar datos: `node scripts/validate-json.mjs` (lo que corre el worker del Día 1).

Regla: sin snapshot no hay cifra. Si el último es de hace 7+ días se muestra «visto el {fecha}», nunca «precio actual». Worker (esqueleto, sin scrape): `worker/`.

## Relacionado

- Contenido 0€ (vídeos): `dropshipping-research/operacion/SEMANA_0_EUROS.md`
- Estudio wiki vs Amazon: `income-ideas/docs/estudio-wiki-wardogs-amazon.md`
