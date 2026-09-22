# The site on Tessera, slice B1 (2026-09-22)

The generic shapes this site drew with its own CSS are Tessera's now. The
design is `docs/superpowers/specs/2026-09-22-axio-site-on-tessera-slice-b1-design.md`
in the control plane. Nothing here records a deployment.

## What moved into Tessera

Lifted from this site, each as one component and one recipe (decision 38):
`StatusBadge` (mono on Axio through `badge.voice`, with the lit dot),
`Terminal` and `TerminalFrame` with the `«dim»`/`‹acc›` mark renderer,
`CopyButton`, `Ledger`, `Callout`, the `ledger` table density with row marks,
`Prose variant="document"`, `Contents`, `LegalDocument`, `ProductList` (the
rail), `SplitHero` (the product-page hero), a `badge` and `platforms` on
`ProductCard`, a `bordered` `FeatureGrid` with a kicker, the `product` button
tone and the eyebrow's lit dot.

## What the site is now

- Pages compose Tessera components over `lib/products.ts` and `lib/site.ts`.
  The old components are thin adapters: `StatusBadge`, `NetworkTable`,
  `ProductRail`, `ProductCard`, `ProductHero`, `LegalPage`. `Term`,
  `CopyButton`, `SpotlightGrid` and `ButtonLink` are gone.
- `globals.css` is the Tessera imports and the backdrop (54 lines);
  `tests/css-budget.test.mjs` keeps it so. `site.css` (823 lines) holds the
  alias layer the drawings still read, the home hero, the transcript players'
  phases, the boxed verification ledger and the download rows. Each drawing
  keeps its CSS beside its component: `Surface.css`, `ProductMocks.css`,
  `PolarisVideo.css`, `PolarisPage.css`. Slice B2 lifts those shapes and
  deletes the alias layer with them.
- The two transcripts animate their own bodies inside `TerminalFrame`; the
  TUI strings did not move and `tests/approval.test.mjs` still pins them.

## What a visitor can see

The 2026-09-11 design, with these differences: the legal pages are shorter
(document prose is tighter than the old 17px/1.7 treatment) and the products
page's licence table is Tessera's ledger table. Everything else was reviewed
route by route at three widths beside production and approved by the owner.

## Evidence

Tests (approval strings, headers, products, CSS budget), typecheck, lint and
build pass. `tests/visual/dark-only.mjs` passes. `tests/visual/axe.mjs` finds
no violation on any route: the terminal `<pre>` is focusable now, which closes
the finding that stood since slice A. umbra.me, Umbra Account and Umbra Admin
build unchanged and capture byte-identical to their deployed builds (one
anti-aliased pixel on umbra.me's phone home page aside).

## Found on the way

- `@tessera/patterns` had no client boundary, so `LegalDocument` could not be
  imported from a server page; fixed upstream with the guard.
- Tessera's size scale is 2px steps; recipes now carry this site's rem values
  literally, after the terminal's padding came out half size.
- Three new small-text colours failed AA on the core theme; moved to muted.
- The standalone product mark first changed umbra.me's product page by a
  36px tile; the rule was narrowed until umbra.me was byte-identical again.
