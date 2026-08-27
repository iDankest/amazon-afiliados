# 08 — API Contract

El frontend no adivina el backend; el backend no asume cómo se renderiza el frontend. Cualquier cambio a este contrato se documenta aquí y en `24-decision-log.md` **antes** de implementarse.

## Convenciones

- Base: `/api/v1`
- Auth: `Authorization: Bearer <JWT>` en endpoints protegidos
- Paginación: query params `page`, `per_page`; respuesta incluye `meta.total`
- Rate limiting: headers `X-RateLimit-Limit` / `X-RateLimit-Remaining`

## Envelope de respuesta

```json
{
  "data": { },
  "meta": { "page": 1, "per_page": 20, "total": 134 },
  "error": null
}
```

## Envelope de error

```json
{
  "data": null,
  "meta": null,
  "error": { "code": "NOT_FOUND", "message": "Product not found", "details": null }
}
```

## Endpoints (MVP)

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | /products | No | Listar/filtrar/paginar catálogo |
| GET | /products/:id | No | Detalle de producto |
| GET | /products/:id/price-history?range=90d | No | Serie de histórico de precio |
| GET | /categories | No | Listado de categorías |
| GET | /categories/:slug | No | Productos de una categoría |
| GET | /search?q= | No | Búsqueda híbrida + intent parsing (`12-search.md`) |
| GET | /compare?ids=a,b,c | No | Comparación de 2–3 productos |
| GET | /deals | No | Ofertas activas (Deal Score) |
| POST | /auth/register | No | Alta de cuenta |
| POST | /auth/login | No | Login |
| POST | /auth/telegram-link | Sí | Vincular cuenta con Telegram (V1) |
| GET | /me | Sí | Perfil del usuario autenticado |
| GET | /alerts | Sí | Alertas del usuario |
| POST | /alerts | Sí | Crear alerta de precio |
| DELETE | /alerts/:id | Sí | Borrar alerta |
| GET | /admin/sources | Admin | Estado de los connectors |
| GET | /admin/jobs | Admin | Estado de jobs de ingestión/agregados |
| POST | /admin/products/:id/refresh | Admin | Forzar re-ingesta de un producto |

Los parámetros exactos de `/search` (estructura de `parsed_requirements`) se cierran junto con el intent parser en `11-recommendation-engine.md` — no se fijan aquí de antemano para evitar un contrato que quede obsoleto antes de implementarse.
