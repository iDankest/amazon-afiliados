# Worker Ubuntu: checklist compose + cron

**Regla dura: el worker de Orza NUNCA convive con el servidor de Minecraft en el mismo
compose ni comparte red/volúmenes con él. Son stacks separados por diseño.**

**Estado** (2026-08-30): repo clonado en el server (`dankest-server`) en `~/orza` —
NO en `/opt/orza`: el usuario `agent` no tiene permisos de escritura en `/opt` ni
sudo sin contraseña. Desviación registrada; si se prefiere `/opt/orza`, crearlo y
dar ownership con sudo y mover el checkout. `validate-json` y el dry-run de
`worker/telegram/check.mjs` corren OK con el Node del host (sin compose todavía).
Pendiente del checklist: compose, cron elegido, `.env` con los secretos de Telegram.
La regla dura de separación con Minecraft sigue vigente: `~/orza` está fuera de las
carpetas del servidor de Minecraft.

**Estado** (2026-08-31): nota OBSOLETA en lo relativo a Telegram. `worker/telegram/check.mjs`
fue eliminado y el bot de alertas quedó bloqueado por la cláusula §6(y) de la licencia de
Associates (`docs/24-decision-log.md` y `docs/14-telegram.md`, 2026-08-31). La tarea real del
worker ahora es `scripts/validate-json.mjs` + `scripts/verify-asins.mjs` (`worker/README.md`).
El checklist de separación con Minecraft sigue vigente.

## Qué hace el worker (V1, desde 2026-08-31)

- `node scripts/validate-json.mjs`: valida `data/catalog.json`.
- `node scripts/verify-asins.mjs`: verifica que cada ASIN del catálogo existe en
  amazon.es (serie real en Keepa). Necesita salida a `graph.keepa.com`.
- Cron diario. Nada más. Sin scrape, sin escuchar puertos, sin Telegram.

## Checklist de despliegue (futuro)

1. **Directorio propio:** `/opt/orza/` — código, `.env` (600), `docker-compose.yml`.
   Nada dentro de las carpetas del servidor de Minecraft.
2. **compose mínimo:** un solo servicio `orza-worker`, `restart: unless-stopped`,
   sin puertos publicados (no necesita escuchar nada; el bot usa HTTPS saliente).
3. **Red aislada:** network propia en compose. Sin `network_mode: host`.
4. **Secretos:** `TELEGRAM_BOT_TOKEN` y `TELEGRAM_OWNER_CHAT_ID` en `.env`
   (permisos 600, fuera de git). El compose los inyecta por `env_file`.
5. **Datos:** montar solo `data/` (catálogo + snapshots) como read-only
   (`./data:/app/data:ro`). El worker de V1 no escribe.
6. **Cron:** contenedor ligero con crontab interno (o host cron con
   `docker compose run --rm orza-worker node check.mjs`). Elegir uno y documentarlo
   en este mismo archivo cuando se haga.
7. **Logs:** `docker compose logs -f orza-worker`; rotación con `logging: json-file`
   y `max-size` definido.
8. **Actualización de datos:** git pull + `npm run validate:data` antes de reiniciar
   el check. Un snapshot inválido no debe llegar al aviso.
9. **Separación de Minecraft, verificada:** `docker network ls` y `docker volume ls`
   sin solapamientos; si algún día comparten máquina, recursos limitados
   (`mem_limit`, `cpus`) para que el cron no compita con el juego.
10. **Primer encendido:** dry-run manual (`node check.mjs`) viendo stdout antes de
    cargar el cron. El primer mensaje real llega al DM del dueño, a nadie más.

## Qué NO hace el worker

- No scrapea Amazon (nunca).
- No escribe en el repo ni empuja commits.
- No abre canal público ni envía a terceros.
- No compone con, ni depende de, ningún servicio de Minecraft.
