# 17 — Security

Checklist, no prosa — cada punto debe poder marcarse como implementado o pendiente.

- **Auth:** JWT, contraseñas con hash (nunca en texto plano ni reversible), roles (`user`/`admin`) verificados en cada endpoint protegido, no solo en el frontend.
- **Secretos:** variables de entorno o gestor de secretos — nunca en el repositorio ni en logs.
- **Rate limiting:** por IP y por usuario en endpoints públicos, especialmente `/search` (evita abuso del intent parser, que tiene coste por llamada a LLM).
- **Validación de input:** esquema validado en cada endpoint; atención especial a lo que llega a un prompt de LLM (consulta de búsqueda) — mitigar intentos de prompt injection sobre el Intent Parser y la LLM Explanation.
- **Telegram:** verificación de firma/secreto del webhook antes de procesar cualquier update.
- **Admin:** detrás de rol +, si es viable, verificación adicional (2FA).
- **Logs:** nunca contienen secretos, contraseñas, tokens ni PII completa (ver `19-observability.md`).
- **Datos personales:** minimización — no se guarda más de lo necesario para cuenta/alertas (ver `18-compliance.md`).
