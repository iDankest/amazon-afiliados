FROM node:22-alpine

WORKDIR /app

# Solo lo mínimo para validar datos y anotar snapshots manuales.
COPY scripts ./scripts
COPY data ./data

# Sin red en runtime si se quiere: este worker no llama a ningún servicio.
CMD ["node", "scripts/validate-json.mjs"]
