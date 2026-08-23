#!/usr/bin/env node
/**
 * validate-json: valida catálogo y snapshots (esquema ligero).
 * Exit 0 = datos sanos. Lo usa el worker (Día 1) como única tarea real.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogFile = path.resolve(repoRoot, 'data/catalog.json');
const snapshotsDir = path.resolve(repoRoot, 'data/snapshots');

const errors = [];
const CATS = new Set(['descanso', 'teclados']);
const TESTED = new Set(['yes', 'no', 'partial']);
const DATE = /^\d{4}-\d{2}-\d{2}$/;

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
    if (!CATS.has(p.category)) errors.push(`${where}: category debe ser descanso|teclados`);
    if (p.asin !== undefined && !/^[A-Z0-9]{10}$/.test(p.asin)) errors.push(`${where}: asin no parece ASIN`);
    if (typeof p.amazonQuery !== 'string' || !p.amazonQuery) errors.push(`${where}: falta amazonQuery`);
    if (!TESTED.has(p.tested)) errors.push(`${where}: tested debe ser yes|no|partial`);
    if (typeof p.notes !== 'string') errors.push(`${where}: notes debe ser string`);
  }
} else if (!errors.length) {
  errors.push('catalog.json: se esperaba un array');
}

if (existsSync(snapshotsDir)) {
  for (const f of readdirSync(snapshotsDir)) {
    if (!f.endsWith('.json')) continue;
    const id = f.replace(/\.json$/, '');
    if (!ids.has(id)) errors.push(`snapshots/${f}: id "${id}" no está en el catálogo`);
    let arr;
    try {
      arr = JSON.parse(readFileSync(path.join(snapshotsDir, f), 'utf8'));
    } catch (e) {
      errors.push(`snapshots/${f}: JSON inválido (${e.message})`);
      continue;
    }
    if (!Array.isArray(arr)) {
      errors.push(`snapshots/${f}: se esperaba un array`);
      continue;
    }
    arr.forEach((s, i) => {
      const where = `snapshots/${f}[${i}]`;
      if (!s || typeof s.date !== 'string' || !DATE.test(s.date)) errors.push(`${where}: date inválida`);
      if (typeof s.price !== 'number' || !(s.price > 0) || s.price > 100000) errors.push(`${where}: price inválido`);
      if (s.currency !== 'EUR') errors.push(`${where}: currency debe ser "EUR"`);
      if (s.source !== 'manual') errors.push(`${where}: source debe ser "manual"`);
    });
  }
}

if (errors.length) {
  console.error(`validate-json: ${errors.length} problema(s):`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}
console.log(
  `validate-json: OK (catálogo: ${catalog.length} productos, snapshots: ${ids.size ? 'revisados' : 'ninguno todavía'})`
);
