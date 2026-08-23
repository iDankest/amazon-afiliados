# Brief GLM 5.2 — motor de registro de precios

Cwd: `C:\code\amazon-afiliados`
Lee primero: `PRODUCT.md` (autoridad).

## Qué construir

Migrar el prototipo HTML suelto a **Astro**. Corazón: registro de precios propio (JSON + gráfica), no scrape, no Keepa.

### Datos

- `data/catalog.json` — productos: `id`, `title`, `category` (`descanso`|`teclados`), `asin` (opcional), `amazonQuery`, `tested` (`yes`|`no`|`partial`), `notes`
- `data/snapshots/{id}.json` — array `{ date, price, currency: "EUR", source: "manual" }`
- Script `scripts/add-snapshot.mjs --id <id> --price <n> [--date YYYY-MM-DD]` append + no reescribe historial.
- **Cero productos con precio inventado.** Catálogo puede tener 1–2 stubs SIN snapshots, o vacío. No inventes ASINs. Loop Quiet 2 solo si no pones precio.

### Astro

- `src/pages/index.astro` — home: Descanso + Teclados; productos estrella solo si están en catalog.
- `src/pages/registro/index.astro` — índice (sparkline, último visto, min/max).
- `src/pages/p/[id].astro` — ficha: historial, sparkline canvas (sin lib de pago), Amazon link con tag si existe.
- Portar copy de `guias/*.html`, aviso, privacidad, cookies, sobre. Nav: Inicio, Registro, Descanso, Teclados, Guías, Afiliados.
- Dark **y** light de verdad (`html[data-theme]`, toggle, persist localStorage, ambos legibles).
- `PUBLIC_AMAZON_TAG` o `src/lib/affiliate.ts` — tag vacío = URL sin `tag=`.
- Enlaces Amazon: `rel="nofollow sponsored noopener"`.
- Ofertas de la semana: vacío a propósito hasta que un snapshot sea mínimo reciente.

### Worker (esqueleto, no scrape)

- `worker/README.md` + `worker/Dockerfile` (node alpine) + nota: cron en Ubuntu **aparte** de Minecraft. Día 1 el worker solo corre `add-snapshot` / valida JSON.
- No PA-API keys en el repo. Stub `worker/paapi.md` “si AssociateNotEligible → manual”.

### STOP

- No scrape Amazon. No Nuxt. No Medusa. No push. No inventar ofertas ni €.
- No tumbar HTML hasta que `pnpm build` / `npx astro build` pase y las rutas Astro existan.
- Commit local OK. Tests: script add-snapshot con un id de prueba en `/tmp` o fixture, no un precio falso en catalog público.

Al terminar: lista de archivos, comando de preview (`astro dev`), cómo añadir un snapshot.
