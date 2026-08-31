#!/usr/bin/env node
/**
 * verify-asins: gate de existencia de ASIN sobre Keepa (fail-closed).
 *
 * Cada ASIN del catálogo debe tener serie histórica en keepa.com para el
 * marketplace español. Si no la tiene, el ASIN no existe (o no lo sigue
 * nadie) en amazon.es, y la ficha sería un enlace de afiliado a un 404.
 *
 * Método (verificado empíricamente, docs/24-decision-log.md 2026-08-31):
 *   GET https://graph.keepa.com/pricehistory.png?asin=<ASIN>&domain=es
 *   - con datos → PNG real, hash propio
 *   - sin datos → PNG placeholder byte-idéntico (mismo hash que un ASIN
 *     centinela inexistente, B00ZZZZZZZ)
 *
 * NO toca amazon.es: usa el mismo endpoint público de Keepa que embebe el
 * sitio, así que no reintroduce tráfico automatizado contra Amazon.
 * No almacena nada: solo compara hashes en memoria.
 *
 * Semántica de salida:
 *   - Keepa/caída de red en el centinela → aviso y exit 0 (no bloquear el
 *     deploy por la caída de un tercero).
 *   - Error de red en un ASIN concreto → unknown, no bloquea.
 *   - ≥1 ASIN sin datos → lista todos y exit 1.
 *
 * Uso: npm run verify:asins
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogFile = path.resolve(repoRoot, 'data/catalog.json');

const SENTINEL_ASIN = 'B00ZZZZZZZ';
const TIMEOUT_MS = 10_000;
const RETRIES = 2;
const PAUSE_MS = 700;
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const graphUrl = (asin) => `https://graph.keepa.com/pricehistory.png?asin=${asin}&domain=es`;

async function fetchSha256(asin) {
  const url = graphUrl(asin);
  let lastErr;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const { createHash } = await import('node:crypto');
      return { ok: true, hash: createHash('sha256').update(buf).digest('hex') };
    } catch (e) {
      lastErr = e;
      if (attempt < RETRIES) await new Promise((r) => setTimeout(r, PAUSE_MS * (attempt + 1)));
    }
  }
  return { ok: false, error: lastErr?.message ?? 'error desconocido' };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let catalog;
try {
  catalog = JSON.parse(readFileSync(catalogFile, 'utf8'));
} catch (e) {
  console.error(`verify-asins: catalog.json ilegible: ${e.message}`);
  process.exit(1);
}
if (!Array.isArray(catalog)) {
  console.error('verify-asins: catalog.json no es un array');
  process.exit(1);
}

// 1) Centinela: define el hash del PNG «sin datos».
const sentinel = await fetchSha256(SENTINEL_ASIN);
if (!sentinel.ok) {
  console.warn(
    `verify-asins: no se pudo descargar el centinela de Keepa (${sentinel.error}); se omite el gate.`
  );
  process.exit(0);
}

const errors = [];
const unknowns = [];
let verified = 0;

for (const p of catalog) {
  if (!p.asin) {
    errors.push(`catálogo[${p.id ?? '?'}]: sin campo asin`);
    continue;
  }
  const res = await fetchSha256(p.asin);
  if (!res.ok) {
    unknowns.push(`catálogo[${p.id}]: ASIN ${p.asin} sin verificar (${res.error})`);
  } else if (res.hash === sentinel.hash) {
    errors.push(
      `catálogo[${p.id}]: ASIN ${p.asin} sin datos en Keepa para amazon.es — probablemente no existe`
    );
  } else {
    verified++;
    console.log(`verify-asins: catálogo[${p.id}]: ASIN ${p.asin} con datos en Keepa ✓`);
  }
  await sleep(PAUSE_MS);
}

for (const u of unknowns) console.warn(`verify-asins: ${u} (unknown, no bloquea)`);

if (errors.length) {
  console.error(`verify-asins: ${errors.length} ASIN sin verificar:`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log(`verify-asins: OK (${verified} ASIN con datos en Keepa, ${unknowns.length} sin verificar)`);
