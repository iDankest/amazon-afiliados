#!/usr/bin/env node
/**
 * add-snapshot: anota un precio visto a mano para un producto del catálogo.
 *   node scripts/add-snapshot.mjs --id <id> --price <n> [--date YYYY-MM-DD]
 *                              [--snapshots-dir DIR] [--catalog FILE]
 *
 * Append-only: nunca borra ni modifica entradas existentes. Duplicado exacto
 * (misma fecha+precio+origen) se ignora sin reescribir nada.
 * Sin scrape: el dato lo trae quien ha visto el precio.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));

if (args.help || args.h) {
  console.log(
    'uso: node scripts/add-snapshot.mjs --id <id> --price <n> [--date YYYY-MM-DD] [--snapshots-dir DIR] [--catalog FILE]'
  );
  process.exit(0);
}

const id = String(args.id ?? '');
const price = Number(args.price);
const date = String(args.date ?? new Date().toISOString().slice(0, 10));
const catalogFile = path.resolve(repoRoot, String(args.catalog ?? 'data/catalog.json'));
const snapshotsDir = path.resolve(repoRoot, String(args['snapshots-dir'] ?? 'data/snapshots'));

if (!id) fail('falta --id <id> (debe existir en data/catalog.json)');
if (args.price === undefined || !Number.isFinite(price) || price <= 0 || price > 100000) {
  fail('--price debe ser un número > 0 (EUR) y razonable');
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail('--date debe tener formato YYYY-MM-DD');

const today = new Date();
const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
  today.getDate()
).padStart(2, '0')}`;
if (date > todayIso) fail(`fecha futura (${date} > ${todayIso}): no se anota lo no visto`);

let catalog;
try {
  catalog = JSON.parse(readFileSync(catalogFile, 'utf8'));
} catch (e) {
  fail(`no pude leer el catálogo ${catalogFile}: ${e.message}`);
}
if (!Array.isArray(catalog)) fail('catálogo inválido: se esperaba un array');
const product = catalog.find((p) => p && p.id === id);
if (!product) {
  fail(
    `id "${id}" no está en ${catalogFile}. IDs conocidos: ${catalog.map((p) => p.id).join(', ') || '(ninguno)'}`
  );
}

const file = path.join(snapshotsDir, `${id}.json`);

let existing = [];
if (existsSync(file)) {
  try {
    existing = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    fail(`${file} no es JSON válido (${e.message}); arréglalo a mano antes de seguir`);
  }
  if (!Array.isArray(existing)) fail(`${file} inválido: se esperaba un array de snapshots`);
  for (const s of existing) {
    if (!s || typeof s.date !== 'string' || typeof s.price !== 'number' || s.currency !== 'EUR') {
      fail(`${file} tiene una entrada inválida: ${JSON.stringify(s)}`);
    }
  }
  const dup = existing.some((s) => s.date === date && s.price === price && (s.source ?? 'manual') === 'manual');
  if (dup) {
    console.log(`Ya existe ${date} / ${price} EUR para ${id}. No se duplica, no se reescribe nada.`);
    process.exit(0);
  }
}

const snapshot = { date, price, currency: 'EUR', source: 'manual' };
const next = [...existing, snapshot]; // append: historial previo intacto

if (!existsSync(snapshotsDir)) mkdirSync(snapshotsDir, { recursive: true });
writeFileSync(file, JSON.stringify(next, null, 2) + '\n', 'utf8');

console.log(`OK: ${id} + ${date} ${price} EUR → ${path.relative(repoRoot, file)} (${next.length} snapshots)`);
