# Worker Ubuntu: checklist compose + cron

**Regla dura: el worker de Orza NUNCA convive con el servidor de Minecraft en el mismo
compose ni comparte red/volúmenes con él. Son stacks separados por diseño.**

Y esta noche: **no conectarse al servidor**. Este documento es solo el checklist;
la conexión y el despliegue se hacen en su momento con calma y desde cero.

## Qué hace el worker (V1)

- `check.mjs` (Node, sin dependencias): lee `data/snapshots/` y avisa por DM
  si el último snapshot de un producto tiene 7+ días.
- Cron diario. Nada más. Sin scrape, sin escuchar puertos.

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
