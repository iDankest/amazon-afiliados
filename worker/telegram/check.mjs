#!/usr/bin/env node
/**
 * Check de frescura del registro (V1, DM al dueño).
 *
 * Lee data/snapshots/ y avisa si el último snapshot de un producto
 * tiene más de 7 días (o si no tiene ninguno). NO toca Amazon.
 *
 * Modo dry-run (por defecto): imprime qué mandaría y no envía nada.
 * Modo real: TELEGRAM_BOT_TOKEN + TELEGRAM_OWNER_CHAT_ID definidos → DM vía API.
 * El token NUNCA vive en git ni se imprime. Sin canal público.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STALE_DAYS = 7;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const snapsDir = path.join(root, 'data/snapshots');
const catalogFile = path.join(root, 'data/catalog.json');

function daysSince(iso, now) {
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return Number.POSITIVE_INFINITY;
  return Math.floor((now.getTime() - d.getTime()) / 86400000);
}

function loadCatalogTitles() {
  try {
    const raw = JSON.parse(readFileSync(catalogFile, 'utf8'));
    if (Array.isArray(raw)) return new Map(raw.map((p) => [p.id, p.title]));
  } catch {
    // sin catálogo legible seguimos con los ids de snapshots
  }
  return new Map();
}

const now = new Date();
const titles = loadCatalogTitles();
const products = [...titles.keys()];
const seen = new Set();
const stale = [];
const fresh = [];

if (existsSync(snapsDir)) {
  for (const f of readdirSync(snapsDir).filter((f) => f.endsWith('.json')).sort()) {
    const id = f.replace(/\.json$/, '');
    seen.add(id);
    let arr;
    try {
      arr = JSON.parse(readFileSync(path.join(snapsDir, f), 'utf8'));
    } catch {
      stale.push({ id, reason: `JSON inválido en ${f}` });
      continue;
    }
    if (!Array.isArray(arr) || arr.length === 0) {
      stale.push({ id, reason: 'array vacío' });
      continue;
    }
    const last = arr.reduce((a, b) => (String(b.date) >= String(a.date) ? b : a));
    const age = daysSince(String(last.date), now);
    if (age > STALE_DAYS) {
      stale.push({ id, reason: `último snapshot ${last.date} (${age} días)` });
    } else {
      fresh.push({ id, date: last.date, age });
    }
  }
}

for (const id of products) {
  if (!seen.has(id)) stale.push({ id, reason: 'sin ninguna anotación' });
}

const label = (id) => titles.get(id) ?? id;

const dryRun = process.argv.includes('--dry-run') || !(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_OWNER_CHAT_ID);

console.log(`check.mjs · ${now.toISOString()}`);
console.log(`productos en catálogo: ${products.length} · snapshots leídos: ${seen.size} · frescos (<=${STALE_DAYS}d): ${fresh.length} · a avisar: ${stale.length}`);

if (fresh.length > 0) {
  console.log('\n— Al día —');
  for (const f of fresh) console.log(`  ✓ ${label(f.id)}: ${f.date} (${f.age}d)`);
}
if (stale.length > 0) {
  console.log('\n— A avisar —');
  for (const s of stale) console.log(`  ✗ ${label(s.id)}: ${s.reason}`);
}

const message =
  stale.length === 0
    ? null
    : `Orza · registro con anotaciones caducadas (${stale.length}):\n` +
      stale.map((s) => `· ${label(s.id)} — ${s.reason}`).join('\n') +
      `\nAnota un precio visto a mano con: node scripts/add-snapshot.mjs --id <id> --price <n>`;

if (dryRun) {
  if (message) {
    console.log('\n[dry-run] Mensaje que se enviaría por DM al dueño:');
    console.log(message.split('\n').map((l) => `  | ${l}`).join('\n'));
  } else {
    console.log('\n[dry-run] Nada que enviar: todo el registro está al día.');
  }
  process.exit(0);
}

const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_OWNER_CHAT_ID,
      text: message ?? 'Orza · registro al día. Nada que anotar.',
      disable_web_page_preview: true,
    }),
  });
  const body = await res.json();
  if (!res.ok || body.ok !== true) {
    console.error(`Telegram rechazó el envío (HTTP ${res.status}).`);
    process.exit(1);
  }
  console.log('\nDM enviado al dueño.');
} catch (err) {
  console.error(`Fallo de red contra Telegram: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}
