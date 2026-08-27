# 14 — Telegram

Fase V1 (MVP+), no MVP estricto — ver `04-mvp.md`.

## Librería y transporte

Candidato recomendado: **grammY** (TypeScript-first, mantenimiento activo, ecosistema de plugins para control de flood/rate limit) — alternativa: `node-telegram-bot-api`. Decisión final de librería concreta: `25-open-questions.md` #11. Webhook en producción (no polling), verificado por secreto en la URL o header, nunca long-polling en el servicio principal.

## Límites reales de la Bot API (a respetar en el diseño de colas)

| Límite | Valor |
|---|---|
| Mensajes a un mismo chat | ~1 / segundo |
| Difusión a múltiples chats (nivel gratuito) | ~30 / segundo en total |
| Mensajes a un mismo grupo | ~20 / minuto |
| Longitud de texto por mensaje | 4.096 caracteres (1.024 en captions) |
| Al superar el límite | HTTP 429 con `retry_after`; incumplir el retry alarga el "cooldown" |

Telegram no publica estos números como contrato formal — son los que documenta su propio Bot FAQ y los que reporta la comunidad; el diseño debe tratar los límites como dinámicos, no como constantes fijas en código.

## Arquitectura de envío

Cola BullMQ dedicada para salida a Telegram, con limitador tipo token-bucket (por ejemplo `aiolimiter`-style o el plugin de auto-retry de grammY) que respeta el límite global y el límite por chat de forma independiente, reintentos con el `retry_after` que devuelve Telegram, y colas separadas para: (a) alertas personales, (b) canal público de ofertas. Un broadcast a miles de seguidores con el límite gratuito de 30 msg/s tarda del orden de minutos — está bien para un canal de ofertas, no para algo que deba llegar "al instante".

**Paid Broadcasts** (función de Telegram de 2026) permite subir el techo hasta 1.000 msg/s pagando con Telegram Stars por encima del tramo gratuito — evaluar solo si el volumen de suscriptores lo justifica (`25-open-questions.md` #13), no desde el lanzamiento.

## Comandos base (V1)

`/start`, `/buscar <consulta>`, `/seguir <producto>`, `/alertas`, `/baja <producto> <precio>`.
