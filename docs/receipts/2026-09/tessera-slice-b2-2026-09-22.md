# The site on Tessera, slice B2 (2026-09-22)

The drawings this site drew with its own CSS are Tessera's now, and the site
has no stylesheet left but `globals.css` and `home.css`. The design is
`docs/superpowers/specs/2026-09-22-axio-site-on-tessera-slice-b2-design.md`
in the control plane. Nothing here records a deployment.

## What moved into Tessera

Lifted from this site, each as one component and one recipe (decision 39):
`AppFrame` and its parts (`Rail`, `Group`, `Item`, `Chip`, `Mark`, `Crumbs`,
`Diff`, `Prompt`, with `measureFrame`), `MediaFrame` and `Gallery` in
`@tessera/marketing`; `AgentSurface`, `AnalystMock`, `CaptureMock`,
`DeckMock` and `TranscriptPlayer` in the new `@tessera/mocks` package, with
the Axio content as `axioFixtures`. `Section` gained `tight` and `ruled`, and
`SplitHero` an `align="start"`.

## What the site is now

- The drawings are content files and one-line renders: `content/agent-surface.ts`,
  `content/transcripts.ts` (the strings `tests/approval.test.mjs` pins),
  `content/polaris-media.ts`; `Surface`, `AnalystMock`, `CaptureMock`,
  `DeckMock`, `HeroTranscript`, `ApprovalTranscript` and `PolarisVideo` are
  thin adapters. `PolarisMediaGallery` is gone (its gallery had already been
  removed from the page in September).
- The Polaris offer is a `PricingGrid` with one `Plan`; the FAQ is `Faq`.
- `site.css`, `Surface.css`, `ProductMocks.css`, `PolarisVideo.css` and
  `PolarisPage.css` are deleted, with the alias layer: the pages set
  `--ts-product-color` inline and `lib/products.ts` names the Tessera product
  tokens. `home.css` (586 lines, against the spec's 200) holds the type base
  and scroll rules, the chrome tweaks, the home hero, the cards, the transcript
  players' phases, the verification ledger, the download rows and the edge
  pages; `tests/css-budget.test.mjs` caps it at 700 lines, refuses any alias
  name in it, and refuses the five deleted files.

## What a visitor can see

Slice B1's production, with these differences:

- The Polaris offer and FAQ on Tessera's pricing and FAQ kits, shown to the
  owner before and after and approved.
- The download page's per-product sections are tighter again and the home
  page's sections have their hairlines back. Slice B1 had rewritten
  `section--tight` and `section--ruled` to `data-tight` and `data-ruled` before
  Tessera styled them, so production silently lost both (about 500px of
  padding on the download page at 1440). The owner chose to restore them.
- Nothing else: every other route captures pixel-identical to production at
  390, 768 and 1440 (`tests/visual/diff.mjs`).

## Evidence

Tests, typecheck, lint and build pass. `tests/visual/dark-only.mjs` passes;
`tests/visual/axe.mjs` finds no violation on any route. Tessera's full `check`
and all 41 Playwright tests pass, including the new `/mocks` route with axe.
umbra.me, Umbra Account and Umbra Admin build unchanged and capture
byte-identical to their deployed builds (one capture per run on umbra.me
differs at the byte level with zero pixels above tolerance, a different page
each run).

## Found on the way

- The product colours in `lib/products.ts` and `content/agent-surface.ts`
  were `var(--p-agent)` and friends, aliases from the deleted `:root` block:
  every product page lost its colour until they named the Tessera tokens.
- The home hero's grid still used the old `container` class.
- Tessera's `measureFrame` sized a prompt's top rule from the row alone, so a
  title longer than its row overflowed; it takes the wider of the two now.
- The `media-frame.css` recipe went out with an unclosed `@media` block once;
  the token check does not catch that, the site's build did.
