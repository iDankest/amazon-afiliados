# Worker (esqueleto — Día 1)

Pequeño contenedor Node que, por ahora, **solo valida el JSON del registro** (y sabe
invocar `scripts/add-snapshot.mjs` cuando haya un precio anotado a mano). Nada más.

## Qué NO hace

- **No scrapea Amazon.** Ni Selenium, ni requests al listing, ni PA-API sin elegibilidad.
- No despliega el sitio (el sitio público sigue siendo estático).
- No toca Medusa, ni el compose de la tienda, ni el puerto `5433`.

## Docker

```sh
docker build -t adc-worker ./worker
docker run --rm -v "$PWD/data:/app/data" adc-worker
```

El `CMD` ejecuta `node scripts/validate-json.mjs` (valida `data/catalog.json` y
`data/snapshots/*.json`).

Para añadir un snapshot dentro del contenedor (dato manual):

```sh
docker run --rm -v "$PWD/data:/app/data" --entrypoint node adc-worker \
  scripts/add-snapshot.mjs --id loop-quiet-2 --price 24.95
```

## Cron en el host Ubuntu

El host ya corre Minecraft. Este worker va **aparte**:

- Compose/contenedor propio (nunca compartido con el de Minecraft).
- Cron del sistema dedicado (p. ej. `/etc/cron.d/adc-worker`), usuario sin privilegios.
- Sin exponer puertos.

Ejemplo de línea de cron (validación diaria a las 07:15):

```
15 7 * * *  adc  cd /opt/adc/amazon-afiliados && docker compose -f worker/compose.yml run --rm worker
```

## PA-API

Ver `worker/paapi.md`. Resumen: si Amazon responde `AssociateNotEligible`,
no hay API y el registro sigue siendo manual (`add-snapshot.mjs`).
