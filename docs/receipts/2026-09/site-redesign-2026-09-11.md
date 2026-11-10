# Site redesign, 2026-09-11

A pass over every route on axio.sh, committed and not yet deployed. The
doctrine holds: one dark palette, a colour per product, one gradient per page,
drawn interfaces, no script where none is needed, and every claim traceable to
a product's own README, source or output. What changed is what the landing
page shows, the site's small-label language, the Polaris page's design system,
and a set of defects in copy, accessibility and layout.

## Why

The landing page was a text-only hero over four centred section heads and
four card grids. Nothing on it was a product until the second scroll, every
section had the same shape, and the six product cards were the same six cards
as the products index. The site's most distinctive material, the agent's
approval prompt and the strings the products print, lived only on the agent's
page. Around that, the tracked-caps mono eyebrow over every heading, the
`AXIO ·` bylines and the arrow appended to every button were template chrome
carrying nothing the headings did not.

## What changed

**The hero is the approval prompt.** `ApprovalTranscript` plays one turn of
the agent and stops at the question: a read, the diff it proposes, then the
frame turning into `approve  edit:…` over `allow?  y once   a this session
n no, and say why   esc no`. Every string is what `crates/axio/src/tui/paint.rs`
paints, and `tests/approval.test.mjs` pins them. The stats strip is gone: "0
telemetry" is a claim, and the network table below the hero is the checkable
version of it.

**The landing page has five shapes, not one.** A network table (what each tool
sends, from `Product.network`, the same field the privacy policy is written
from); the six products as a rail of rows rather than cards; the agent's drawn
surface beside its argument; Polaris's real-app film beside its; the six rules
as a ledger keyed by the string a product prints (`allow?  y once`, `exit 5`,
`not met`, `LICENSE`); and a ruled band for the Umbra attribution instead of a
third card. Sections are separated by hairlines. The per-section reveal
animation is gone everywhere; the hero is the page's one orchestrated moment.

**Labels are sentence case.** `.eyebrow`, `.label`, `.badge`, the terminal
bar, the card byline and the footer headings lose their tracking and
uppercase. Eyebrows stay only where they name something the heading cannot
(a film's tool name, a section's subject on a product page). Page heads carry
no eyebrow. Buttons carry no appended arrow; the external-link glyph stays on
links that leave the site.

**Polaris joined the site.** Its page carried a private design system: its
own palette, pixel type scale, buttons and sub-nav. It now uses the site's
tokens, sections, features, buttons and hairlines, keeps its film-led centred
hero (`.phero--center`), all its copy, its four films, the offer and the FAQ.
`PolarisVideo` renders the site's `.film` frame; `PolarisMock` was unused and
is deleted, with about 550 lines of dead Polaris CSS.

**Availability copy is derived.** `AVAILABLE`, `PRIVATE` and `listNames` in
`src/lib/products.ts` write the sentence on the products index and the
download page. `POLARIS_VERSION`, `POLARIS_DOWNLOAD`, `POLARIS_BUY` and
`POLARIS_PRICE` are registry constants; the download page now offers the
Polaris build and links the licence.

## Licensing and legal

- `/products/polaris/licence` shows a breadcrumb back to Polaris instead of the
  site's legal-page row (it is the product's page, not one of the four), is in
  the sitemap, and its seat-release link is relative so a staging host does
  not send customers to production.
- The privacy policy's "Your rights" section said there was ordinarily nothing
  to access or delete; section 4 lists the Polaris purchase and licensing
  records. It now names them and says what deletion means for activation.
  The paragraph that mixed Local, Capture attachments and Analyst exports is
  split into a Local table, an agent Attachments row and the Analyst
  Transcripts row. Third parties names Stripe and Link.
- The terms' section 5 covers Local and Polaris; section 2 lists Local.
- The security page gains a Polaris section and lists Local and Polaris under
  supported versions; the Deck app-removal note that sat after "This website"
  is a bullet in the Deck section. The same stray paragraph on the Deck page
  is inside its status section.
- The licences page links the Polaris row to its terms. The about page's
  licensing paragraph and "open where it ships" rule no longer say Polaris has
  no licence and is private.

## Defects fixed

- `--faint` (3.4:1) set the card bylines, table headers and footer headings.
  It is `#7d808a` (5.1:1); `--text-2` and `--muted` moved with it.
- Heading order: the drawn surface's project names and the Deck mock's pane
  title were headings inside `aria-hidden` illustrations; the products index
  jumped h1 to h3; the 404 page jumped to the footer's h3s. All are spans, a
  visually hidden h2, and footer h2s.
- Header at 0.72 let headlines read through the blur: 0.86 at rest, 0.94
  through a scroll-driven timeline.
- 44px tap targets for the square header controls and small buttons under
  `pointer: coarse`.
- The drawn surface's approval box and breadcrumb clipped at phone width.
- The agent page's `allow? y a n` chip was not a string the agent prints;
  it is `allow?  y once`.

## What was checked

`npm run typecheck`, `npm run lint`, `npm test` (nine tests) and
`npm run build` pass. Every route was rendered over the DevTools protocol at
1440 and at an emulated 390 with a probe: one h1 per page, no heading jumps,
no horizontal overflow, none of the retired phrases in the text. Full-page
captures were reviewed for the home, products, Polaris, download, licence,
about and 404 pages at both widths.

Two things look like bugs locally and are not: the Polaris `.dmg` and the
licence recovery and seat routes 404 under `next dev` but are served by the
deployment, and the dev overlay reports one issue because the site's own CSP
header blocks the `eval` React uses in development.

The six stills in `public/demos/polaris/` listed by
`polaris-demo-assets-2026-09-09.json` are still unreferenced by any page and
are kept as the captured record.

## Files

- `src/app/page.tsx`, `src/components/ApprovalTranscript.tsx`,
  `NetworkTable.tsx`, `ProductRail.tsx` — the landing page.
- `src/app/globals.css` — tokens, labels, header, hero, rail, network table,
  rules ledger, film, offer, FAQ, centred product hero; reveal, stats, the
  Polaris system and other dead rules removed.
- `src/app/products/polaris/page.tsx`, `src/components/PolarisVideo.tsx`,
  `src/components/PolarisMock.tsx` (deleted).
- `src/app/products/page.tsx`, `src/app/download/page.tsx`,
  `src/app/about/page.tsx`, `src/lib/products.ts`, `tests/products.test.mjs`.
- `src/components/LegalPage.tsx`, `src/app/products/polaris/licence/page.tsx`,
  `src/app/legal/{privacy,terms,security,licenses}/page.tsx`,
  `src/app/sitemap.ts`.
- `src/components/{ProductCard,Header,Footer,Surface,DeckMock}.tsx`,
  `src/app/not-found.tsx`, `src/app/products/{agent,deck}/page.tsx`.
- `README.md` — the Design section.
