#!/usr/bin/env node
/**
 * validate-json: valida catálogo (esquema ligero).
 * Exit 0 = datos sanos. La existencia real de cada ASIN la comprueba
 * scripts/verify-asins.mjs (gate de CI).
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogFile = path.resolve(repoRoot, 'data/catalog.json');

const errors = [];
const CATS = new Set(['descanso', 'teclados', 'audio', 'perifericos']);
const TESTED = new Set(['yes', 'no', 'partial']);

let catalog = [];
try {
  catalog = JSON.parse(readFileSync(catalogFile, 'utf8'));
} catch (e) {
  errors.push(`catalog.json ilegible: ${e.message}`);
}

const ids = new Set();
if (Array.isArray(catalog)) {
  for (const p of catalog) {
    if (!p || typeof p !== 'object') {
      errors.push('catálogo: entrada que no es objeto');
      continue;
    }
    const where = `catálogo[${p.id ?? '?'}]`;
    if (typeof p.id !== 'string' || !/^[a-z0-9-]+$/.test(p.id)) errors.push(`${where}: id inválido`);
    if (ids.has(p.id)) errors.push(`${where}: id duplicado`);
    ids.add(p.id);
    if (typeof p.title !== 'string' || !p.title) errors.push(`${where}: falta title`);
    if (!CATS.has(p.category)) errors.push(`${where}: category debe ser descanso|teclados|audio|perifericos`);
    if (p.asin !== undefined && !/^[A-Z0-9]{10}$/.test(p.asin)) errors.push(`${where}: asin no parece ASIN`);
    if (p.images !== undefined) {
      if (!Array.isArray(p.images)) {
        errors.push(`${where}: images debe ser un array`);
      } else {
        if (p.images.length > 8) errors.push(`${where}: images tiene más de 8 entradas`);
        const seen = new Set();
        for (const [i, url] of p.images.entries()) {
          if (typeof url !== 'string' || !/^https:\/\/m\.media-amazon\.com\/images\/.+/.test(url)) {
            errors.push(`${where}: images[${i}] debe ser una URL https de m.media-amazon.com/images/*`);
            continue;
          }
          if (seen.has(url)) errors.push(`${where}: images[${i}] duplicada`);
          seen.add(url);
        }
      }
    }
    if (typeof p.amazonQuery !== 'string' || !p.amazonQuery) errors.push(`${where}: falta amazonQuery`);
    if (p.tested !== undefined && !TESTED.has(p.tested)) errors.push(`${where}: tested debe ser yes|no|partial`);
    if (typeof p.notes !== 'string') errors.push(`${where}: notes debe ser string`);
  }
} else if (!errors.length) {
  errors.push('catalog.json: se esperaba un array');
}

if (errors.length) {
  console.error(`validate-json: ${errors.length} problema(s):`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}
console.log(`validate-json: OK (catálogo: ${catalog.length} productos)`);
