FROM node:22-alpine

WORKDIR /app

# Solo lo mínimo para validar el catálogo y verificar ASIN.
COPY scripts ./scripts
COPY data ./data

# verify-asins.mjs necesita salida a graph.keepa.com; validate-json.mjs no usa red.
CMD ["node", "scripts/validate-json.mjs"]
