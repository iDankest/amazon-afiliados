/**
 * Capa de datos del catálogo de Orza.
 * Catálogo: data/catalog.json. Sin snapshots propios: el histórico de precios
 * lo sirve Keepa en el momento de la carga (docs/24-decision-log.md, 2026-08-31).
 * Ningún campo del catálogo contiene precios.
 */

export type Category = 'teclados' | 'audio' | 'perifericos' | 'descanso';
export type Tested = 'yes' | 'no' | 'partial';

export interface Product {
  id: string;
  title: string;
  shortTitle?: string;
  category: Category;
  asin?: string;
  /** URLs de imágenes reales del producto (p. ej. futura Creators API); mandan sobre la derivada del ASIN. */
  images?: string[];
  amazonQuery: string;
  tested?: Tested;
  notes: string;
}

import catalogRaw from '../../data/catalog.json';
export const products: Product[] = catalogRaw as Product[];

const dateFmt = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

export function fmtDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z');
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
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
