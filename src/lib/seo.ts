/**
 * Scope SEO de la fase actual: solo el core es indexable (home, registro, fichas).
 * Guías y legales/info llevan noindex y quedan fuera del sitemap.
 * Single source of truth para Base.astro y astro.config.mjs
 * (docs/24-decision-log.md, 2026-08-29).
 */
export const NOINDEX_PATH_FRAGMENTS = [
  '/guias/',
  '/sobre/',
  '/privacidad/',
  '/cookies/',
  '/aviso-afiliados/',
];

/** Acepta pathname (`/orza/guias/x/`) o URL absoluta (lo que reciba el filter del sitemap). */
export function isNoIndexPath(input: string): boolean {
  let pathname = input;
  if (/^https?:\/\//.test(input)) {
    try {
      pathname = new URL(input).pathname;
    } catch {
      return false;
    }
  }
  return NOINDEX_PATH_FRAGMENTS.some((f) => pathname.includes(f));
}
