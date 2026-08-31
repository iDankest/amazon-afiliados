#!/usr/bin/env node
/**
 * probe-images: sondeo de salud de las imágenes de producto.
 *
 * Pregunta al CDN público de Amazon (HEAD) por dos URLs de cada producto: la
 * derivada del ASIN y, si existe, la explícita del catálogo (`images[0]`).
 * NO scrapea listings, NO descarga ni almacena imágenes: escribe solo un archivo
 * de estado local `.image-probe.json` (gitignored) que
 * ProductImage/productImages.ts usan para no emitir URLs inválidas.
 *
 * Critérios de invalidez (ver docs/24-decision-log.md, 2026-08-29):
 *   - status ≠ 200
 *   - content-type no es imagen válida (el placeholder GIF 1×1 de Amazon cae aquí)
 *   - content-length presente y ≤ MIN_BYTES
 *   - content-length AUSENTE no es señal de invalidez por sí solo (OK si el resto pasa)
 *
 * Fail-open: errores de red → `unknown`, nunca bloquean build/deploy.
 *
 * Uso: node scripts/probe-images.mjs
 * Exit 0 siempre (herramienta de mejora, no gate).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogFile = path.resolve(repoRoot, 'data/catalog.json');
const probeFile = path.resolve(repoRoot, '.image-probe.json');

const MEDIA_CDN = 'https://m.media-amazon.com';
const TIMEOUT_MS = 8000;
const MIN_BYTES = 100;
const VALID_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
// GIFs del CDN de Amazon con ≤ MIN_BYTES son el placeholder 1×1 (43 bytes).
const GIF_PLACEHOLDER_MAX = MIN_BYTES;

const imageUrl = (asin, px = 500) => `${MEDIA_CDN}/images/P/${asin}.01._SCLZZZZZZZ_SX${px}_.jpg`;

/** URL de imagen explícita del catálogo (mandan sobre la derivada del ASIN). */
const explicitImageUrl = (p) =>
  Array.isArray(p.images) && typeof p.images[0] === 'string' ? p.images[0] : null;

async function probeUrl(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timer);

    if (res.status !== 200) {
      return { status: 'invalid', reason: `HTTP ${res.status}` };
    }

    const type = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    const length = Number(res.headers.get('content-length'));

    if (type === 'image/gif') {
      // Sin content-length no podemos medir el GIF → sin señal suficiente: desconocido.
      if (!Number.isFinite(length)) return { status: 'unknown', reason: 'gif sin content-length' };
      if (length <= GIF_PLACEHOLDER_MAX) return { status: 'invalid', reason: `placeholder gif 1x1 (${length}B)` };
      return { status: 'ok', reason: `gif ${length}B` };
    }

    if (!VALID_TYPES.has(type)) {
      return { status: 'invalid', reason: `content-type ${type || '(vacío)'}` };
    }

    if (Number.isFinite(length) && length <= MIN_BYTES) {
      return { status: 'invalid', reason: `sospechosamente pequeña (${length}B)` };
    }

    return { status: 'ok', reason: Number.isFinite(length) ? `${type} ${length}B` : `${type} (sin content-length)` };
  } catch (err) {
    // Fail-open: red caída, timeout o bloqueo → desconocido, se asume OK al render.
    return { status: 'unknown', reason: err?.name === 'AbortError' ? 'timeout' : String(err?.message ?? err) };
  }
}

let catalog;
try {
  catalog = JSON.parse(readFileSync(catalogFile, 'utf8'));
} catch (e) {
  console.error(`probe-images: no pude leer ${path.relative(repoRoot, catalogFile)}: ${e.message}`);
  process.exit(1);
}
if (!Array.isArray(catalog)) {
  console.error('probe-images: catálogo inválido (se esperaba un array)');
  process.exit(1);
}

const results = {};
const explicitImages = {};
let ok = 0;
let invalid = 0;
let unknown = 0;
let explicitTotal = 0;
let explicitInvalid = 0;

for (const p of catalog) {
  if (!p || typeof p !== 'object') continue;

  if (typeof p.asin === 'string' && p.asin) {
    const r = await probeUrl(imageUrl(p.asin)); // secuencial: cortesía con el CDN, sin concurrencia agresiva
    results[p.asin] = { ...r, productId: p.id };
    if (r.status === 'ok') ok++;
    else if (r.status === 'invalid') invalid++;
    else unknown++;
    console.log(`probe-images: ${p.asin} (${p.id}) → ${r.status} · ${r.reason}`);
  }

  const explicit = explicitImageUrl(p);
  if (explicit) {
    const re = await probeUrl(explicit);
    explicitImages[explicit] = { ...re, productId: p.id };
    explicitTotal++;
    if (re.status === 'invalid') explicitInvalid++;
    console.log(`probe-images: ${p.id} images[0] → ${re.status} · ${re.reason}`);
  }
}

const report = { generatedAt: new Date().toISOString(), asins: results, explicitImages };
writeFileSync(probeFile, JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log(
  `probe-images: ${ok} ok · ${invalid} inválidas · ${unknown} desconocidas · ` +
    `${explicitTotal} explícitas (${explicitInvalid} inválidas) → ${path.relative(repoRoot, probeFile)}`
);
