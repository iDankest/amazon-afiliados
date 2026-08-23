# Handoff — Orza (parar 23-ago-2026)

Clona esto en el otro PC. El chat de Grok **no** viaja; este archivo sí.

```bash
git clone git@github.com:iDankest/amazon-afiliados.git
cd amazon-afiliados
npm install
npm run dev
```

Abre `http://localhost:4321/amazon-afiliados/` (el `base` es GitHub Pages).

## Qué es

Marca **Orza**. Afiliados Amazon.es: guías (descanso + teclados) + **registro de precios anotados a mano**. Sin snapshot no hay euros. Dark/light. Astro, no Nuxt.

Dominio previsto: `orza.es` (no comprado). Tag Associates: vacío (`PUBLIC_AMAZON_TAG`). Cuenta vieja: comprobar si sigue abierta.

Añadir un precio **solo si lo has visto** en Amazon.es:

```bash
node scripts/add-snapshot.mjs --id loop-quiet-2 --price XX.XX --date YYYY-MM-DD
```

## No hacer

No scrape. No inventar tops ni ofertas. No mezclar con Medusa/dropshipping. No auto-clic de afiliado.

## Otros repos (Windows `C:\code`)

| Repo | Estado |
|---|---|
| `iDankest/amazon-afiliados` | Orza. Tip `06b7eca` + este handoff |
| `iDankest/dropshipping-research` | Kit JUEYONG. I4 aparcado: este PC tenía Node 26 y sin Docker |
| `iDankest/income-ideas` | Mapa de vías. Una a la vez |

Vídeos 0€ del antifaz: `dropshipping-research/operacion/SEMANA_0_EUROS.md`.

## Pages

https://github.com/iDankest/amazon-afiliados/settings/pages → Source **GitHub Actions**. URL prevista: https://idankest.github.io/amazon-afiliados/

Impeccable (diseño): `npx impeccable install` luego `/impeccable init` ya tiene `PRODUCT.md`.
