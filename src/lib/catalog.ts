/**
 * Capa de datos del rastreador de precios de Amazon.es.
 * Catálogo: data/catalog.json. Snapshots: data/snapshots/{id}.json (array, append-only).
 * Registro de precios, mínimos históricos y alertas de compra inteligente.
 */

export type Category = 'teclados' | 'audio' | 'perifericos' | 'descanso';
export type Tested = 'yes' | 'no' | 'partial';

export interface Product {
  id: string;
  title: string;
  shortTitle?: string;
  category: Category;
  badge?: string;
  asin?: string;
  amazonQuery: string;
  tested?: Tested;
  notes: string;
}

export interface Snapshot {
  date: string; // YYYY-MM-DD
  price: number; // EUR
  currency: 'EUR';
  source: 'manual' | 'api' | 'feed';
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
      continue;
    }
    if (Array.isArray(arr)) snapshotsById.set(f.replace(/\.json$/, ''), arr as Snapshot[]);
  }
}

export function getSnapshots(id: string): Snapshot[] {
  return snapshotsById.get(id) ?? [];
}

/** Ordenados por fecha (empate: orden de escritura). */
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
  avg?: number;
  lastIsMin: boolean;
  isRecent: boolean;
  lastSeenLabel: string;
  discountPercent: number; // % descuento respecto al máximo
  statusBadge: string;
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
    return {
      count: 0,
      lastIsMin: false,
      isRecent: false,
      lastSeenLabel: 'Sin snapshots todavía',
      discountPercent: 0,
      statusBadge: 'Sin datos',
    };
  }
  const prices = snaps.map((s) => s.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const sum = prices.reduce((acc, val) => acc + val, 0);
  const avg = Number((sum / prices.length).toFixed(2));
  const last = snaps[snaps.length - 1];
  const age = daysBetween(last.date, now);
  const isRecent = age <= RECENT_DAYS && age >= 0;
  const lastSeenLabel = isRecent
    ? `Registrado ${age === 0 ? 'hoy' : `hace ${age}d`}: ${fmtEur(last.price)}`
    : `Visto el ${fmtDate(last.date)}: ${fmtEur(last.price)}`;

  const discountPercent = max > min && max > 0 ? Math.round(((max - last.price) / max) * 100) : 0;
  const lastIsMin = last.price <= min;

  let statusBadge = 'Precio Habitual';
  if (lastIsMin && snaps.length > 1) {
    statusBadge = 'Mínimo Histórico';
  } else if (discountPercent >= 15) {
    statusBadge = `-${discountPercent}% Descuento`;
  } else if (last.price < avg) {
    statusBadge = 'Buen Precio';
  }

  return {
    count: snaps.length,
    last,
    min,
    max,
    avg,
    lastIsMin,
    isRecent,
    lastSeenLabel,
    discountPercent,
    statusBadge,
  };
}

export const testedLabel: Record<Tested, string> = {
  yes: 'Verificado',
  partial: 'Parcial',
  no: 'Por verificar',
};

export const categoryLabel: Record<Category, string> = {
  teclados: 'Teclados',
  audio: 'Audio & Auriculares',
  perifericos: 'Periféricos & Setup',
  descanso: 'Descanso & Salud',
};

/** ¿Apto para sección de ofertas? Si tiene descuento o es mínimo histórico */
export function isRecentMinimum(id: string, now = new Date()): boolean {
  const st = priceStats(id, now);
  return st.count > 0 && (st.lastIsMin || st.discountPercent > 10);
}

