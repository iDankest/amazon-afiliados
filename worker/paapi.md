# PA-API: no todavía

Amazon PA-API (Product Advertising API) requiere una cuenta de Associates
**elegible** (ventas recientes). Si al pedir claves la respuesta es
`AssociateNotEligible`:

- **No hay API.** El registro de precios sigue siendo manual:
  `node scripts/add-snapshot.mjs --id <id> --price <n>`.
- No se scrapea el listing como alternativa (regla del proyecto).
- No se guardan claves en este repo, ni en el Dockerfile, ni en el compose.

Cuando la cuenta sea elegible: claves en variables de entorno del host
(`PAAPI_ACCESS_KEY`, `PAAPI_SECRET_KEY`, `PAAPI_PARTNER_TAG`), y un módulo
nuevo del worker que llame a PA-API y escriba snapshots con
`source: "paapi"`. Hasta entonces, este archivo es todo el "plan PA-API".
