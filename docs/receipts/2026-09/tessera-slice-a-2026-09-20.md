# The site on Tessera, slice A (2026-09-20)

What changed when axio.sh moved onto Tessera, Umbra's design system, what was
checked, and what the next slice inherits. The design is
`docs/superpowers/specs/2026-09-20-axio-site-on-tessera-slice-a-design.md` in
the control plane. Nothing here records a deployment.

## What changed

- The site installs and builds from the Axio workspace's pnpm root and
  resolves `@tessera/*` from `axio/tessera`, a pinned clone. `package-lock.json`
  and this repository's `Dockerfile` are gone; the image is built by the control
  plane's `infra/docker/workspace-next.Dockerfile`. `agentRules` is off, so
  `next dev` no longer writes untracked `AGENTS.md` and `CLAUDE.md`.
- The Axio theme and `TesseraProvider` are live. The preset and mode are on
  `<html>` in the markup as well as from `ThemeScript`, so the page is styled
  without JavaScript, and the mode is dark under a light system preference
  (`tests/visual/dark-only.mjs`).
- Header, mobile menu and footer are `SiteHeader` and `SiteFooter`
  (`components/SiteChrome.tsx`). Page calls to action are Tessera's `Button`
  through `components/ButtonLink.tsx`. `not-found` renders `EdgePage`, and the
  site has `error` and `global-error` boundaries for the first time. The skip
  link is Tessera's.
- `globals.css` went from 3,414 to about 2,800 lines.

## The alias layer

`:root` in `globals.css` points a site name at a Tessera token only where the
theme resolves to exactly the value the site used:

| Site | Tessera |
| --- | --- |
| `--ground`, `--slate`, `--slate-2`, `--slate-deep` | `--ts-surface-canvas`, `-panel`, `-raised`, `-sunken` |
| `--text`, `--text-2`, `--muted`, `--faint` | `--ts-text-primary`, `-secondary`, `-muted`, `-disabled` |
| `--p-agent` … `--p-polaris` | `--ts-product-*` |
| `--agent-claude`, `--agent-codex`, `--agent-pi` | `--ts-hosted-agent-*` (added to the Axio theme for this) |

Everything else keeps its literal: `--accent` (the theme's only `#7ba0ff` is
`product.agent`, the wrong meaning), `--cyan` and `--rose` (no twin), the
`--line*` alpha borders, radii, shadows, motion and layout measures. The spec
asked for the alpha borders to move upstream; they did not, because no exact
twin exists and four alpha tokens for one site is the next slice's call.

The font tokens run the other way: `--ts-font-family-*` point at the site's
`next/font` Geist. The theme bundles Fontsource's latin subsets of Geist, which
lack U+2192, U+2318, U+21E7 and (in the mono) box drawing, all printed here.
With the bundled faces the licence page's arrow and the terminal mocks fell
back to a system font. The theme's font files are declared and never fetched.

`body.ts-root` and the `.ts-root`-prefixed focus rule exist because Tessera's
`.ts-root` sets a type base (size, leading, `cv11 ss01 tnum`) and a focus ring
with class specificity; under a bare `body` rule every page came out 2 to 3
per cent shorter.

## Left for the next slice, against the spec

- **The status badge.** It sits inside the product rail, cards and hero, is
  set in mono with a lit dot, and marks private products in violet; Tessera's
  `Badge` has no such tone. Swapping it changed nearly every page.
- **Legal and about prose.** Tessera's `Prose` is a blog treatment. On the
  privacy page it flattened the boxed two-column contents into a plain list
  and dropped the reading size to 14px (13,863px to 7,901px tall on a phone).

## What a visitor can see

- The header wordmark no longer says "by Umbra" (`SiteHeader` has no slot for
  it); the footer still does.
- External links in the chrome open in a new tab with `rel="noreferrer"`.
- Buttons are 44px tall with medium-weight labels (were 46.8px, semibold).
- The 404 is Tessera's compact state page with one link home (was a display
  heading with links home and to Products).
- Footer and sheet titles are kept in sentence case by a site override.

## Evidence

Captures are `tests/visual/capture.mjs` against `next start`, off-origin
requests blocked, 16 routes at 390, 768 and 1440 px. Two runs of one build are
byte-identical.

| Step | Compared with the build before the work | Result |
| --- | --- | --- |
| npm to the pnpm workspace | 48 full pages, `/install`, `/install.ps1`, CSP | byte-identical |
| Theme and provider | 48 full pages | byte-identical |
| Header and footer | `<main>` on 48 pages | same within tolerance; the 404 differs in height |
| Buttons and edge pages | `<main>` with `--button-height=46.8` | same except inside button rows, and the 404 |

`tests/*.test.mjs` (approval strings, response headers, product registry),
`typecheck`, `lint` and `build` pass. `tests/visual/axe.mjs` (WCAG 2.1 A and
AA; home, a product page, a legal page and the 404 at 1440 and 390, plus the
open menu sheet) finds nothing in the header, footer, sheet or edge page. It
reports `scrollable-region-focusable` on the terminal transcripts' `<pre>` at
390, on the home and agent pages; those components were not touched and the
finding predates this work.

## What the next slice inherits

The alias layer; `body.ts-root` and the focus prefix; `ButtonLink` and the
`.btn-product` override; the badge and the prose; the client boundary
`ButtonLink` exists only because `@tessera/ui`'s entry module has no
`"use client"`; and every component slice A left alone: `ApprovalTranscript`,
`HeroTranscript`, `Surface`, `Term`, the three mocks, `NetworkTable`,
`ProductRail`, `ProductCard`, `SpotlightGrid`, the Polaris gallery and video,
`CopyButton`, `Mark`, `Icons` and `.bg`. Tessera's handoff lists the gaps this
port found.


## Addendum, later on 2026-09-20: Tessera closed the gaps this port found

Tessera decision 37 removed most of what this record calls a workaround, and
the site dropped each one. Nothing here records a deployment.

- `ButtonLink` is a server component again: Tessera marks its own client
  components, and `Button` no longer creates a click handler when idle (the
  site's build is what found that).
- The header says "by Umbra" again, through `SiteHeader`'s `byline`.
- The GitHub link is `IconButton asChild`; the footer's Umbra link carries
  `data-umbra-link` as data, and `renderLink` no longer matches its URL.
- Sentence-case footer and sheet titles come from the Axio theme's
  `label.transform` and `label.tracking`; the site override is gone.
- `next/font` is gone from the layout and the `--ts-font-family-*` overrides
  from `globals.css`. The theme's Geist now carries the complete face for
  U+2190-21FF, U+2300-23FF, U+2500-259F and U+25A0-25FF. Checked in a browser:
  `/about` and `/legal/terms` fetch the two Latin subsets only, the licence
  page also fetches `geist-full` for its arrow, and the home and agent pages
  fetch `geist-mono-full` for the terminals' box drawing.

Evidence: `<main>` on all 16 routes at three widths matches production, both
before and after the font change; `dark-only.mjs` passes; `axe.mjs` reports
only the terminal `<pre>` finding this record already lists. Still the next
slice's: the status badge, the legal and about prose, `body.ts-root` and the
focus prefix, `.btn-product`, and the alias layer.

