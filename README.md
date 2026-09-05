# axio-sh

Current source changes and verification gates: [September 5 change set](docs/change-set-2026-09-05.md).

The axio.sh website, and the install scripts it serves. Next.js 16, App Router,
plain CSS, no runtime dependencies beyond React and the Geist fonts.

```sh
npm ci
npm run dev        # http://localhost:3311
npm run build      # production build
npm run typecheck
npm test
```

This was `apps/site` inside `umbra-me/axio` until ADR 0013 split it out. It is
the `axio/site` component of the `axio` workspace; the agent is `axio/core`. The
two share a product and nothing else — different language, different release
cadence, and a website deploy should not appear in the agent's history.

Port 3311 is the host port the deployed container maps to. It sits between 3310
and 3312, which the retired Axio cloud used and which are now free.

Umbra manages this website's portfolio record, health, analytics identity, and
public configuration through `admin.umbra.me`. The site exposes no Admin API,
receives no Admin credential, does not revive hosted accounts or the retired
Axio cloud, and has no standalone Admin site.

## What the site is

The brand site for the Axio family, not the agent's page alone. Since the
2026-09-03 redesign it has these routes:

| Route | Is |
| --- | --- |
| `/` | The landing page: hero, the five products, the agent's drawn surface, the rules every product keeps, and the Umbra attribution |
| `/products` | The product index and a status table |
| `/products/agent`, `/products/capture`, `/products/analyst`, `/products/deck`, `/products/local` | One page per product: drawn interface, behaviours, verification ledger, install or download |
| `/download` | Every product's install route on one page |
| `/about` | What the brand is, the rules, licensing, how the site is operated, who builds it |
| `/legal/privacy`, `/legal/terms`, `/legal/security`, `/legal/licenses` | The legal pages, written for what the products actually do |
| `/install`, `/install.ps1` | The install scripts, as `text/plain` |

`src/lib/products.ts` is the product registry — name, status, licence,
platforms, colour, features, download assets — and every page reads it, so a
release bumps one file. `src/lib/site.ts` holds the site-wide facts: origin,
company, contact addresses, the legal pages' last-updated date, and the
navigation.

## Design

Dark, one palette, no light variant. The ground is cold near-black (`#05070a`)
rather than neutral, because the accents are blue-leaning and a neutral ground
behind them reads as a colour cast. The layout language is the one the
umbra.me landing pages use — centred section heads under a tracked mono
eyebrow, a stats strip under the hero, product cards with a colour each and a
status badge, a four-column footer — without being a copy of it: the site keeps
its own palette, its own type and its own illustrations.

**Every product owns a colour**, declared once as `--p-agent`, `--p-capture`,
`--p-analyst`, `--p-deck` and `--p-local` in `globals.css` and threaded through as `--pc` on
whatever subtree belongs to that product: its badge, its icon tile, its card's
tagline and bullets, its page's primary button and headline accent. Chrome
never borrows a product colour. The site's own accent is the agent's periwinkle
(`#7ba0ff`), and the one gradient on the site (`.grad`, periwinkle to cyan) is
spent on one phrase per page, never on chrome.

**Type.** Geist Sans carries the display type at 700 with tight tracking; Geist
Mono carries labels, artifacts and anything a product actually prints. Both are
self-hosted through `next/font`; the page makes no external request. The
earlier site set its headline in Geist Mono, and it paid for it in characters.

**Nothing is a screenshot.** Every product interface on the site is drawn:
`Surface.tsx` for the agent's window, `CaptureMock.tsx`, `AnalystMock.tsx` and
`DeckMock.tsx` for the others. A screenshot is one size, one theme, one moment,
and these have to reflow into a phone and sit behind text. They are
`aria-hidden`; every fact in them is stated in words beside them. The icons are
drawn too, on a 24-unit grid at a 1.6 stroke, in `Icons.tsx`, and the product
glyphs there are the same shapes the products' app icons carry; the
Analyst glyph is the split diamond the plugin itself paints. No icon library
and no stock imagery.

**Cards** carry a lit top edge and a pointer-tracked spotlight. `SpotlightGrid`
sets `--mx`/`--my` on each `.card` as the pointer moves and does nothing else;
without it, or without a fine pointer, the cards still hover. The background is
a fixed engineering grid that fades out toward the edges under two cold glows —
CSS only. The particle and matrix-rain canvases umbra.me runs were considered
and left out: on a site whose argument is restraint they would have argued the
other way.

**Motion.** One curve, `cubic-bezier(0.16, 1, 0.3, 1)`. Sections rise in as
they enter the viewport through `animation-timeline: view()`, which costs no
script and falls back to static content where unsupported. The agent's surface
keeps its two authored moments — the selected session's accent wipes down its
edge, a running session's dot breathes — and the released badge breathes the
same way. Everything honours `prefers-reduced-motion`, through the `--fast`,
`--base` and `--slow` custom properties collapsing to `1ms` plus explicit
`animation: none` on the loops.

**Selectors are scoped to what they style.** Two alignment bugs in review came
from rules that matched more than they meant to: `.split__text ul` turned the
product hero's one-line facts row into a stacked list, and `.menu-item span`
matched the products menu's icon tile and replaced its grid with a block,
which pushed the glyph into the tile's corner. Both are now scoped
(`.phero .phero__facts`, `.menu-item__text`), and icons inside `.card__icon`
and `.menu-item__icon` are pinned to `display: block` so no later rule can
knock them off centre. Inline `<svg>` elsewhere stays inline so an arrow after
a link sits on the link's line.

**No script where none is needed.** The header's products menu opens on hover
and on `:focus-within`, centred under its trigger and opaque, because the
header's own `backdrop-filter` makes it a backdrop root and a translucent panel
below it cannot blur what is behind it. The mobile menu is a `<details>`; its only script closes
it after a navigation and on a click outside. The copy buttons render only
after mount and only where the Clipboard API exists. A skip link precedes the
header and its target takes `tabindex="-1"` so focus actually moves.

### A trap in JSX text

SWC drops the leading space of a JSX text node whose text contains an HTML
entity such as `&apos;`. `<strong>Local-first.</strong> Every product …` renders
as `Local-first.Every` if the sentence later contains `Umbra&apos;s`. The site
therefore uses real typographic characters (`’`, `“`, `”`) in JSX text rather
than entities, and the 2026-09-03 build was checked by grepping the rendered
HTML for `</strong>[A-Za-z]` and friends. Keep doing that after editing prose.

## Metadata and generated images

`layout.tsx` sets `metadataBase`, a title template, Open Graph and card
metadata; each page sets its own title, description and canonical.
`metadataBase` is the load-bearing one: without it Next emits `og:image` as a
relative path, every scraper resolves that against its own host, and the unfurl
arrives with no image and nothing anywhere to say why.

Four images are generated at build time rather than committed. No binary asset
lives in this repository and no dependency was added for them.

| File | Emits | Is |
| --- | --- | --- |
| `icon.tsx` | `/icon` | 32×32 tab icon |
| `apple-icon.tsx` | `/apple-icon` | 180×180 home-screen icon, on the ground rather than bleeding to the edge |
| `opengraph-image.tsx` | `/opengraph-image` | the 1200×630 card, reused for `twitter:image` and by every page |
| `robots.ts`, `sitemap.ts` | `/robots.txt`, `/sitemap.xml` | — |

The mark is the Axio family's: the slate tile with a geometric single-storey
`a` in the accent, whose source of truth is `tools/brand/marks/axio.svg` in
the Axio workspace, the same file the desktop apps' icons are generated from.
The site carries it twice, and both are copies of that file: `src/lib/mark.ts`
holds the SVG as a string for the generated images, which satori loads from a
data URI, and `src/components/Mark.tsx` draws the same geometry in JSX for the
header and footer. The tab and home-screen icons bleed the tile to the edge
because they have no room for the margin the app icons keep; the social card
sets it beside the wordmark. Change the mark in the workspace first, then both
copies here.

`brand.ts` holds the tokens the image renderer needs and loads the fonts. Three
things there are easy to get wrong:

- **The renderer never sees the stylesheet.** The tokens are restated in
  `brand.ts`, and nothing checks that they still match `globals.css`.
- **woff2 is unreadable to the image renderer**, and geist ships both formats.
  `brand.ts` loads the `.ttf` twins of the faces `next/font` serves the browser.
- **The fonts are found by walking up for `node_modules/geist/dist/fonts`, not
  by resolving the package.** geist's `exports` map publishes only `./font/*`,
  and a `require.resolve` here is rewritten by webpack into one of its own
  numeric module ids, which fails the build with a type error rather than a
  missing file.

`robots.ts` disallows `/install`, `/install.ps1` and `/admin/`. The scripts stay
reachable — a shell still fetches them — but a crawler that indexes them turns a
search result into a page whose entire content is a script.

The card carries the mark, the headline, the install command and the four
product colours as pills. At that size the palette is the part of the identity
a sentence cannot deliver. If the headline changes, change it in both places.

## Install scripts

`scripts/install.sh` and `scripts/install.ps1` are served at `/install` and
`/install.ps1` by route handlers that read them from disk at build time. They
are real files rather than strings inside a module, so they stay shellcheck-able
and readable here.

Both are served as `text/plain` with `nosniff`, so a browser shows the source
instead of downloading it — anyone about to pipe a script into their shell
should be able to read it first.

Both build from source with cargo, because there is nothing else to do: no
release is tagged, so there is no binary to download and no checksum to verify.
They are shaped so a released-binary path can be added ahead of the source build
when that changes.

Two things in them are easy to get wrong and expensive to find later:

- The version check compares major and minor **numerically**. A string compare
  ranks `1.100` below `1.88`, so a naive check would start rejecting every
  toolchain the day Rust reaches 1.100.
- Success is reported from the binary that was just installed, not from whatever
  `axio` resolves to. An older copy earlier on `PATH` would otherwise let the
  script confirm a build that never took effect.

## Content rule

Every claim on the site is in the product's README, `SECURITY.md` or code.
Where the two disagreed, the code won. The legal pages follow the same rule:
the privacy policy's per-product tables were written from each product's
dependencies and source (no telemetry anywhere; the agent talks only to the
provider you configure; Capture's only outbound call is its signed updater;
Analyst goes through the CLI you chose plus one catalogue call to ollama.com;
Deck makes no network requests of its own), and a change to any of that has to
reach `legal/privacy/page.tsx` in the same change.

The verification tables are the parts most likely to go stale, because they
record what has been run rather than what exists. Update them when a transport
meets its endpoint, a platform is exercised, or a release is cut. A page
claiming a path is unverified after it has been verified is a smaller problem
than the reverse, but both are wrong.

The contact addresses in `site.ts` (`privacy@`, `legal@`, `security@umbra.me`)
are the ones umbra.me publishes. The legal pages' date lives in `LEGAL_UPDATED`
and must move when their text does.

## Deployment

Deployed by the Umbra control plane as the `axio-site` stack:
`infra/deploy/axio-site.yaml`, compose project `site-axio-site`, container
`umbra-axio-site`, host port 3311. It builds to `output: "standalone"` and runs
`node server.js` on port 3000 inside the container.


## Test coverage

`npm test` explicitly runs the product/download contract tests. They evaluate the
real TypeScript registry and ensure product routes are unique and downloads use
the advertised release asset URLs. They do not assert external assets exist or
replace browser/runtime acceptance. A missing suite fails instead of reporting
zero tests as success. The component owns its npm lockfile and needs no family
pnpm root.

Frontend lint and standalone typecheck commands: [September 5 verification](docs/lint-verification-2026-09-05.md).
