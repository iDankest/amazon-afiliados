# Telegram bot: grammY vs Telegraf

**Decisión: grammY para V1. Coste 0 €.**

## V1 (a construir): recordatorio al dueño

Un check diario (cron del worker) lee `data/snapshots/` y manda **DM al dueño**
si el último snapshot de un producto tiene más de 7 días. Nada público.

## grammY vs Telegraf

| | grammY | Telegraf |
|---|---|---|
| Mantenimiento | Activo, releases frecuentes | Estancado años |
| Docs | grammy.dev, excelentes, con tutoriales | Correctas pero envejecidas |
| TS | Tipados de primera, genéricos correctos | Herencia de tipos más frágil |
| Tamaño | Modular (core pequeño) | Más pesado |
| Long polling + webhooks | Ambos, bien documentados | Ambos |

Telegraf fue el estándar, pero hoy es un proyecto en mantenimiento mínimo.
Para algo que debe seguir funcionando sin tocarlo meses, grammY es la apuesta segura.

## Reglas del proyecto

- **Token solo por env** (`TELEGRAM_BOT_TOKEN`), jamás en git. El worker lee `.env` local
  o variables del servidor; el repo no lleva ni un ejemplo con token real.
- **Sin canal público ahora.** V1 = DM al owner (chat_id también por env).
- **Futuro (cuando haya usuarios):** alerta «este producto vuelve a estar a X €».
  Misma fuente de verdad: los snapshots JSON. El esquema de alertas (precio objetivo
  por producto) se diseña entonces; ahora no se adelanta schema.

## V1: forma del dry-run

`worker/telegram/check.mjs`:

1. Lee `data/snapshots/*.json` (sin tocar Amazon).
2. Calcula antigüedad del último snapshot por producto.
3. **Modo dry-run (por defecto):** imprime qué mandaría. Sin token no falla.
4. Modo real: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_OWNER_CHAT_ID` presentes → envía DM vía
   `https://api.telegram.org/bot<token>/sendMessage` (fetch nativo, sin SDK).

Con fetch nativo ni siquiera hace falta instalar grammY para V1; grammY entra
cuando haya comandos/flows de usuario. La decisión de librería queda anotada para ese día.
