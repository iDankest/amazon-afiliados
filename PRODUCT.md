# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

**Astro** (static HTML per ficha, SEO). Not Nuxt (that stays on the Medusa store). Affiliate tag in env/`js` config. Marketplace Amazon.es only.

Small **worker** (not a shop backend): appends price snapshots (manual CLI now; Amazon PA-API later if Associates keys work). Public site stays static. Optional Docker on the existing Ubuntu Minecraft host, **separate** compose, never Medusa/`5433`.

## Users

Primary: someone in Spain (including Canarias) on a phone, about to buy on Amazon.es. Two jobs:

1. Search arrival (`antifaz para dormir`, `teclado mecánico`, etc.): read a short guide, then leave to Amazon.
2. Return visitor who trusts Kilian's taste, especially keyboards.

Not a store customer of a first-party shop. Not a gamer looking for a WARDOGS/Tarkov wiki.

## Product Purpose

Amazon Associates site with **categories**, buying **guides**, **featured products**, short **tops**, and **weekly deals**. Success is qualified clicks to Amazon.es that can convert inside Amazon's cookie window, without fake reviews. Operational gate: three qualifying sales in 180 days or Amazon closes the account.

## Positioning

Category SEO **and** honesty in front. Farms can copy tops and “deals of the week”. They cannot copy Kilian's real taste (keyboards he loves, sleep he lives) plus a visible **“no lo he probado”** label. Never a top or discount without a source.

## Operating Context

- 0€ hosting: GitHub Pages (`iDankest/amazon-afiliados`).
- Spanish copy. Mobile first.
- Affiliate disclosure on every page. Tag may be empty; links still go to Amazon.es without commission until Associates issues a tag.
- Sleep-mask videos (0€) can send traffic here later. No first-party checkout. No Steam/game wiki.

## Capabilities and Constraints

- Categories start with **descanso** (antifaz, tapones) and **teclados**; more categories only when there is a reason, not a blank farm.
- Guides, productos estrella, listas cortas (tops), descuentos de la semana — the last two require a source (Amazon listing, public price). No invented star ratings.
- **Price registry:** each product has dated snapshots. The page may show a euro amount only from a snapshot. If the last snapshot is older than 7 days, label it “visto el {fecha}”, never “precio actual”. No snapshots → no fake price. Sparkline + min/max when 2+ points exist. Weekly deals only if a snapshot hits a recent minimum. Seed without inventing ASINs.
- Binding visual constraint (user): **real dark mode and real light mode**, not a tint.
- No medical claims. No fabricated testimonials. No clicking own affiliate links.
- Not Medusa, not dropshipping storefront, not WARDOGS wiki.

Undecided: Associates tag (user has an old account — confirm if still open), PA-API eligibility (likely needs recent sales), extra categories beyond sleep and keyboards.

## Brand Commitments

Site name: **Orza**. Spanish. Target domain: `orza.es` (unconfirmed availability). Dark + light themes are a product constraint, not a later aesthetic whim. Retired titles: “Oscuro y quieto”, “Antes del clic”. “Antes del clic” may remain a line of copy, never the brand.

## Evidence on Hand

- Public Amazon.es price bands for sleep kits (generics ~6–12€, Loop Quiet ~25€). Not lab-tested SKUs.
- Founder uses a sleep mask daily; that mask is **not** confirmed as a listed Amazon product.
- No keyboard reviews or photos on hand yet. Do not invent them.
- No weekly deal feed. Do not invent discounts.
- Paths: `index.html`, `guias/*.html`, `js/config.js`, `aviso-afiliados.html`.

## Product Principles

1. Honesty before ranking: untested stays labeled.
2. Short lists beat fake top-50s.
3. Every top or deal cites a source.
4. Founder taste is the edge; absence of experience is stated, not filled.
5. Stay on Amazon.es, 0€ ops, disclosure always on.

## Accessibility & Inclusion

Mobile-first. Both themes must remain readable. Keyboard navigation and real labels on controls. WCAG AA was not adopted as a formal bar in init.
