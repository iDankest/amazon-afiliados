/**
 * Enlaces de afiliado de Amazon.es.
 * Tag SOLO aquí (vía PUBLIC_AMAZON_TAG). Vacío = URL sin `tag=` = sin comisión.
 * No metas claves de PA-API aquí ni en ningún archivo del repo.
 */

const TAG = (import.meta.env.PUBLIC_AMAZON_TAG ?? '').trim();

export const MARKETPLACE = 'https://www.amazon.es';

export const DISCLOSURE =
  'Como participante en el Programa de Afiliados de Amazon, este sitio puede obtener ingresos por las compras adscritas que cumplen los requisitos aplicables.';

export const hasTag = TAG.length > 0;

function withTag(u: URL): string {
  if (TAG) u.searchParams.set('tag', TAG);
  return u.toString();
}

/** Búsqueda en Amazon.es (k=...). Sin producto concreto, sin precio. */
export function amazonSearchUrl(query: string): string {
  const u = new URL('/s', MARKETPLACE);
  u.searchParams.set('k', query);
  return withTag(u);
}

/** Ficha de producto por ASIN. Solo se llama con ASINs reales del catálogo. */
export function amazonProductUrl(asin: string): string {
  return withTag(new URL(`/dp/${encodeURIComponent(asin)}`, MARKETPLACE));
}

export const AMAZON_REL = 'nofollow sponsored noopener';
