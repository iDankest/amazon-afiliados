# ORZAR — plataforma de descubrimiento y precios (repo en transición)

**Retomar en otro PC:** lee [HANDOFF.md](HANDOFF.md).

Este es el repo del proyecto **ORZAR**: una plataforma inteligente de descubrimiento, comparación, análisis de precios y alertas de productos. Responde a «¿qué debería comprar?» explicando qué encaja con cada necesidad, si el precio actual es bueno frente a su historial y cuándo avisar de una bajada. No es una web de afiliados: la afiliación es un mecanismo, no el producto.

- GitHub: https://github.com/iDankest/orza
- Pages (sitio Astro actual): https://idankest.github.io/orza/
- Registro afiliados: https://afiliados.amazon.es/

## Estado

Phase 0 → transición. La documentación completa de producto y arquitectura vive en `docs/` (00–31):

- [docs/00-project-vision.md](docs/00-project-vision.md) — qué es y qué no es ORZAR.
- [docs/05-roadmap.md](docs/05-roadmap.md) — fases 0–11, qué hacer y qué no hacer todavía.
- [docs/25-open-questions.md](docs/25-open-questions.md) — decisiones pendientes; si tu tarea depende de una, no la resuelvas por tu cuenta.

El sitio Astro de este repo (marca **Orza**, afiliados Amazon.es, nicho descanso + teclados) sigue vivo como producto existente y es la base de la que parte ORZAR: su registro manual de precios y snapshots es la semilla del pipeline de datos.

## Estructura del repo

- `src/` — sitio Astro actual (páginas, componentes, layouts). Build → `dist/` (GitHub Actions).
- `docs/` — documentación de producto y arquitectura de ORZAR (00–31). Léelos antes de tocar código.
- `data/` — `catalog.json` (productos) y `snapshots/{id}.json` (precios, append-only).
- `scripts/` — `add-snapshot.mjs`, `validate-json.mjs`.
- `worker/` — esqueleto de worker (Telegram/precios), sin scrape.
- `public/`, `astro.config.mjs`, `.env.example`.

## Local

```bash
npm install
npm run dev        # http://localhost:4321/orza/
npm run build      # → dist/
npm run validate:data
npm run snapshot -- --id <id> --price <n> [--date YYYY-MM-DD]
```

Tag de afiliado: variable `PUBLIC_AMAZON_TAG` (ver `.env.example`). Vacío = enlaces sin `tag=`.

## Reglas prácticas

- Sin snapshot no hay cifra. Si el último es de hace 7+ días se muestra «visto el {fecha}», nunca «precio actual».
- No scrape. No auto-clics en tus enlaces. No inventar tops ni ofertas.
- La IA interpreta y explica; nunca es fuente de verdad de precios ni specs (eso es la capa de datos).
- No comprar a través de los propios enlaces.

## GitHub Pages y Associates

1. Pages se publica desde GitHub Actions (rama `main`, build de Astro).
2. URL pública listada en Amazon Associates: `https://idankest.github.io/orza/`.
3. 3 ventas cualificadas en 180 días o cierran la cuenta.
4. Aviso de afiliado presente en cabecera y pie; enlaces con `rel="nofollow sponsored"`.

## Relacionado

- Contenido 0€ (vídeos): `dropshipping-research/operacion/SEMANA_0_EUROS.md`
- Estudio wiki vs Amazon: `income-ideas/docs/estudio-wiki-wardogs-amazon.md`
