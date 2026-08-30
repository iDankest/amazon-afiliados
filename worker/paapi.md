# Creators API: no todavía

**Actualización 2026-08-30:** PA-API 5.0 fue deprecada por Amazon (endpoints retirados
el 2026-05-15). Este archivo conserva el nombre por referencias existentes, pero el
plan aplica ahora a la **Creators API**, su sucesor oficial:

- REST + OAuth 2.0 (client credentials), SDKs para Node.js/Python/PHP/Java.
- Operaciones: `SearchItems`, `GetItems`, `GetVariations`, `GetBrowseNodes`.
- Elegibilidad: **10 ventas cualificadas en los últimos 30 días** (acceso y
  mantenimiento). Registro en Associates Central como dueño primario de la cuenta.
- Credenciales globales; el marketplace se elige con el header `x-marketplace`
  (`www.amazon.es` para España) y un Partner Tag válido de esa tienda.
- Fuente oficial: `https://affiliate-program.amazon.com/creatorsapi/docs`

Hasta cumplir la elegibilidad:

- **No hay API.** El registro de precios sigue siendo manual:
  `node scripts/add-snapshot.mjs --id <id> --price <n>`.
- No se scrapea el listing como alternativa (regla del proyecto).
- No se guardan claves en este repo, ni en el Dockerfile, ni en el compose.

Cuando la cuenta sea elegible: credenciales OAuth en variables de entorno del host
(los nombres concretos dependen del SDK elegido; nunca en git), y un módulo nuevo del
worker que llame a la Creators API y escriba snapshots con `source: "creatorsapi"`.
