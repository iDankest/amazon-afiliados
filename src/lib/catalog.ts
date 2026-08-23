/**
 * Capa de datos del registro de precios.
 * Catálogo: data/catalog.json. Snapshots: data/snapshots/{id}.json (array, append-only).
 * Regla de honestidad: sin snapshot no hay cifra. Nada se inventa aquí.
 */

export type Category = 'descanso' | 'teclados';
export type Tested = 'yes' | 'no' | 'partial';

export interface Product {
  id: string;
  title: string;
  category: Category;
  asin?: string;
  amazonQuery: string;
  tested: Tested;
  notes: string;
}

export interface Snapshot {
  date: string; // YYYY-MM-DD
  price: number; // EUR
  currency: 'EUR';
  source: 'manual';
}

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dataDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data');
const snapshotsDir = path.join(dataDir, 'snapshots');

import catalogRaw from '../../data/catalog.json';
export const products: Product[] = catalogRaw as Product[];

const snapshotsById = new Map<string, Snapshot[]>();
if (existsSync(snapshotsDir)) {
  for (const f of readdirSync(snapshotsDir)) {
    if (!f.endsWith('.json')) continue;
    let arr: unknown;
    try {
      arr = JSON.parse(readFileSync(path.join(snapshotsDir, f), 'utf8'));
    } catch {
      continue; // validate-json.mjs es el guardián; el build no debe tronar por un JSON malo
    }
    if (Array.isArray(arr)) snapshotsById.set(f.replace(/\.json$/, ''), arr as Snapshot[]);
  }
}

export function getSnapshots(id: string): Snapshot[] {
  return snapshotsById.get(id) ?? [];
}

/** Ordenados por fecha (empate: orden de escritura, que es append-only). */
export function sortedSnapshots(id: string): Snapshot[] {
  return getSnapshots(id)
    .map((s, i) => ({ s, i }))
    .sort((a, b) => (a.s.date < b.s.date ? -1 : a.s.date > b.s.date ? 1 : a.i - b.i))
    .map(({ s }) => s);
}

export const RECENT_DAYS = 7;

export interface PriceStats {
  count: number;
  last?: Snapshot;
  min?: number;
  max?: number;
  lastIsMin: boolean;
  isRecent: boolean; // último snapshot <= 7 días (respecto al build)
  lastSeenLabel: string;
}

const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const dateFmt = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

export function fmtEur(n: number): string {
  return eur.format(n);
}

export function fmtDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z');
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

function daysBetween(iso: string, now: Date): number {
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return Number.POSITIVE_INFINITY;
  return Math.floor((now.getTime() - d.getTime()) / 86400000);
}

export function priceStats(id: string, now = new Date()): PriceStats {
  const snaps = sortedSnapshots(id);
  if (snaps.length === 0) {
    return { count: 0, lastIsMin: false, isRecent: false, lastSeenLabel: 'Sin snapshots todavía' };
  }
  const prices = snaps.map((s) => s.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const last = snaps[snaps.length - 1];
  const age = daysBetween(last.date, now);
  const isRecent = age <= RECENT_DAYS && age >= 0;
  const lastSeenLabel = isRecent
    ? `Último precio visto: ${fmtEur(last.price)} (hace ${age === 0 ? 'hoy' : age + (age === 1 ? ' día' : ' días')})`
    : `Visto el ${fmtDate(last.date)}: ${fmtEur(last.price)}`;
  return { count: snaps.length, last, min, max, lastIsMin: last.price === min, isRecent, lastSeenLabel };
}

export const testedLabel: Record<Tested, string> = {
  yes: 'Probado',
  partial: 'Probado en parte',
  no: 'No lo he probado',
};

export const categoryLabel: Record<Category, string> = {
  descanso: 'Descanso',
  teclados: 'Teclados',
};

/** ¿Apto para "ofertas de la semana"? Solo si el último snapshot es reciente Y es un mínimo. */
export function isRecentMinimum(id: string, now = new Date()): boolean {
  const st = priceStats(id, now);
  return st.count > 0 && st.isRecent && st.lastIsMin;
}
