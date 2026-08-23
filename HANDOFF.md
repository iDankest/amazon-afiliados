# Handoff — Orza (parar 23-ago-2026)

Clona esto en el otro PC. El chat de Grok **no** viaja; este archivo sí.

```bash
git clone git@github.com:iDankest/orza.git
cd orza
npm install
npm run dev
```

Abre `http://localhost:4321/orza/` (el `base` es GitHub Pages). En este Mac el directorio local sigue siendo `Documents/amazon-afiliados/`.

## Qué es

Marca **Orza**. Afiliados Amazon.es: guías (descanso + teclados) + **registro de precios anotados a mano**. Sin snapshot no hay euros. Dark/light. Astro, no Nuxt.

Dominio `orza.es` / `orzar.es`: **no comprar**. Tag: `dankest-21` en `js/config.js`; Astro usa `PUBLIC_AMAZON_TAG` (var de Pages). StoreID Associates: `dankest-21`.

**Associates:** URL de la web `https://idankest.github.io/orza/` (ya listada). La caja de apps va vacía. Pulsa Confirmar. Sin auto-clic. 3 ventas cualificadas / 180 días.

**Futuro (apagado, no condenado):** ClaveCD-shaped pero solo Amazon.es — gráfica, chollo si el snapshot toca mínimo, avisos a precio X, Telegram primero a ti, anuncios en página (nunca en el salto a Amazon). Mismo `data/catalog.json` + snapshots. No scrape. No repo nuevo. No esta noche.

Añadir un precio **solo si lo has visto** en Amazon.es:

```bash
node scripts/add-snapshot.mjs --id loop-quiet-2 --price XX.XX --date YYYY-MM-DD
```

## No hacer

No scrape. No inventar tops ni ofertas. No mezclar con Medusa/dropshipping. No auto-clic de afiliado.

## Otros repos (Windows `C:\code`)

| Repo | Estado |
|---|---|
| `iDankest/orza` | Orza. Repo renombrado (antes `amazon-afiliados`) |
| `iDankest/dropshipping-research` | Kit JUEYONG. I4 aparcado: este PC tenía Node 26 y sin Docker |
| `iDankest/income-ideas` | Mapa de vías. Una a la vez |

Vídeos 0€ del antifaz: `dropshipping-research/operacion/SEMANA_0_EUROS.md`.

## Pages

Live: https://idankest.github.io/orza/ (source: GitHub Actions). GitHub redirige la URL vieja `/amazon-afiliados/` un tiempo.

Impeccable (diseño): `npx impeccable install` luego `/impeccable init` ya tiene `PRODUCT.md`.
