# Worker (validación de datos)

Pequeño contenedor Node que **valida el catálogo** (`scripts/validate-json.mjs`)
y puede verificar la existencia de cada ASIN contra Keepa
(`scripts/verify-asins.mjs`). Nada más.

## Qué NO hace

- **No scrapea Amazon.** Ni Selenium, ni requests al listing, ni PA-API sin elegibilidad.
- **No almacena precios.** El histórico lo sirve Keepa; el repo solo guarda ASIN verificados.
- No despliega el sitio (el sitio público sigue siendo estático).
- No toca Medusa, ni el compose de la tienda, ni el puerto `5433`.

## Docker

```sh
docker build -t adc-worker ./worker
docker run --rm -v "$PWD/data:/app/data" adc-worker
```

El `CMD` ejecuta `node scripts/validate-json.mjs` (valida `data/catalog.json`).

Para verificar que cada ASIN del catálogo existe en amazon.es (serie real en
Keepa; sin esta comprobación un ASIN inventado rompería cada enlace de afiliado):

```sh
docker run --rm -v "$PWD/data:/app/data" adc-worker node scripts/verify-asins.mjs
```

`verify-asins.mjs` necesita salida a red hacia `graph.keepa.com` (no toca
amazon.es). Es el mismo gate que ejecuta el CI antes de cada deploy.

## Cron en el host Ubuntu

El host ya corre Minecraft. Este worker va **aparte**:

- Compose/contenedor propio (nunca compartido con el de Minecraft).
- Cron del sistema dedicado (p. ej. `/etc/cron.d/adc-worker`), usuario sin privilegios.
- Sin exponer puertos.

Ejemplo de línea de cron (validación diaria a las 07:15):

```
15 7 * * *  adc  cd /opt/adc/amazon-afiliados && docker compose -f worker/compose.yml run --rm worker
```

## Creators API (estado)

Ver `worker/paapi.md`. PA-API 5 está retirada; el sucesor (Creators API) exige
10 ventas cualificadas en los últimos 30 días. Mientras no haya elegibilidad,
no hay API: el catálogo se mantiene con ASIN verificados a mano y el histórico
de precios vive exclusivamente en Keepa.
