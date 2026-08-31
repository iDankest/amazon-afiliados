/**
 * Single source of truth para URLs de imágenes de producto.
 *
 * Reglas del proyecto (docs/24-decision-log.md, 2026-08-29):
 * - Host moderno `m.media-amazon.com` (el legado `images-na.ssl-images-amazon.com`
 *   sirve el mismo contenido; queda retirado del código).
 * - Sin scraping ni almacenamiento: solo se construyen URLs al CDN público.
 * - Sin datos inventados: si el catálogo trae `images[]` (datos reales, p. ej.
 *   futura PA-API) manda la primera URL; si no, se deriva del ASIN.
 * - El sondeo de salud (scripts/probe-images.mjs → .image-probe.json, gitignored)
 *   marca ASINs cuya imagen principal es inválida (HTTP 200 + GIF 1×1, etc.).
 *   Ninguna fuente de render emite una URL marcada como inválida.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export type ImageSize = 'sm' | 'md' | 'lg' | 'hero';

/** Host CDN de imágenes de Amazon (moderno). */
export const MEDIA_CDN = 'https://m.media-amazon.com';

/** Anchura en px de cada variante, mapeada al parámetro de resize `_SX{n}_` de la fuente. */
export const SIZE_PX: Record<ImageSize, number> = {
  sm: 160,
  md: 360,
  lg: 500,
  hero: 760,
};

/** Resolución de respaldo cuando la variante pedida no existe. Cadena completa: pedida → SX500 → placeholder. */
export const FALLBACK_PX = 500;

/** Mínima forma de producto que necesita este módulo (compatible con `Product` de catalog.ts). */
export interface ImageCarrier {
  asin?: string;
  images?: string[];
}

/** URL del CDN de Amazon para un ASIN a una anchura dada (imagen principal, variante `.01.`). */
export function amazonImageUrl(asin: string, widthPx: number): string {
  return `${MEDIA_CDN}/images/P/${asin}.01._SCLZZZZZZZ_SX${widthPx}_.jpg`;
}

type ProbeStatus = 'ok' | 'invalid' | 'unknown';

interface ProbeEntry {
  status: ProbeStatus;
  reason?: string;
  productId?: string;
}

interface ProbeReport {
  asins: Record<string, ProbeEntry>;
  explicitImages: Record<string, ProbeEntry>;
}

let probeCache: ProbeReport | null | undefined;

/** Lee el último sondeo local si existe (`.image-probe.json`, generado por scripts/probe-images.mjs). */
function loadProbe(): ProbeReport | null {
  if (probeCache !== undefined) return probeCache;
  try {
    const file = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.image-probe.json');
    if (!existsSync(file)) return (probeCache = null);
    const report = JSON.parse(readFileSync(file, 'utf8')) as Partial<ProbeReport>;
    const asins =
      report && typeof report === 'object' && report.asins && typeof report.asins === 'object' ? report.asins : null;
    // Informes anteriores a 2026-08-31 no traen `explicitImages`: se tratan como vacío.
    const explicitImages =
      report && typeof report === 'object' && report.explicitImages && typeof report.explicitImages === 'object'
        ? report.explicitImages
        : {};
    probeCache = asins ? { asins, explicitImages } : null;
  } catch {
    probeCache = null;
  }
  return probeCache;
}

/** ¿La imagen principal derivada de este ASIN consta como inválida en el último sondeo? */
export function isKnownBadImage(asin: string | undefined): boolean {
  if (!asin) return false;
  return loadProbe()?.asins?.[asin]?.status === 'invalid';
}

/** ¿La URL explícita de `images[0]` consta como inválida en el último sondeo? */
export function isKnownBadImageUrl(url: string | undefined): boolean {
  if (!url) return false;
  return loadProbe()?.explicitImages?.[url]?.status === 'invalid';
}

/**
 * URL principal de imagen para un producto y tamaño, o `null` si no hay imagen legítima.
 * Prioridad: `images[0]` del catálogo si el sondeo no la marcó inválida → derivada del ASIN.
 * Devuelve `null` si no queda ninguna URL válida (el componente pinta su placeholder).
 */
export function imageUrlFor(product: ImageCarrier, size: ImageSize): string | null {
  const explicit = product.images?.[0];
  if (explicit && !isKnownBadImageUrl(explicit)) return explicit;
  if (!product.asin) return null;
  if (isKnownBadImage(product.asin)) return null;
  return amazonImageUrl(product.asin, SIZE_PX[size]);
}

/**
 * Cadena de fallback del cliente: URL en uso → derivada(tamaño) → derivada(SX500)
 * → (el componente aporta el placeholder). Permite que una `images[0]` rota en
 * caliente caiga a la imagen derivada del ASIN sin recargar la página.
 */
export function fallbackChain(product: ImageCarrier, size: ImageSize): string[] {
  const src = imageUrlFor(product, size);
  if (!src) return [];
  const chain = [src];
  if (product.asin && !isKnownBadImage(product.asin)) {
    for (const px of [SIZE_PX[size], FALLBACK_PX]) {
      const u = amazonImageUrl(product.asin, px);
      if (!chain.includes(u)) chain.push(u);
    }
  }
  return chain;
}
