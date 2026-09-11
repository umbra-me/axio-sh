# Polaris page and identity refresh — September 10, 2026

> Historical September 10 record. The page it describes was rebuilt on the
> site's own design system on 2026-09-11; the `polaris-*` classes, sub-nav and
> private palette it names no longer exist. See
> [the September 11 site redesign](site-redesign-2026-09-11.md).

The product page now leads with a real-app introduction, followed by timer,
notes and launcher demos, a concise toolkit overview, local-data/permission
principles, pricing and an accessible disclosure FAQ. It retains the A$59
one-time, two-Mac licence and explicit 14-day trial without automatic charging.
The new north-pointing compass mark replaces the former star in product
navigation, the page, social preview and video title/end cards.

The eight silent H.264 videos under `public/demos/polaris/launch` have separate
landscape and portrait edits. They use sample data recorded from the notarized
0.2.3 (103) app in Lodestar UX Lab; the 0.2.4 (104) update changes the app icon.
Source footage and deterministic Swift/FFmpeg edit scripts remain in the private
Polaris marketing workspace. Only the finished public assets ship in this site.
Videos are requested after an explicit play action. Posters render before play;
accessible button names and adjacent prose describe the silent actions.

Validation: npm tests (3), TypeScript, ESLint and production build passed.
Browser checks at 1440, 390 and 320 pixels confirmed no horizontal overflow,
correct landscape/portrait playback, no page errors, and working FAQ disclosure.
Native 104 package is signed and notarized; its public Sparkle signature and
server-side ZIP/DMG hashes were verified before updating page download links.

No checkout configuration or licence-service behavior changes in this refresh.
The first genuine live sale remains outside the existing sandbox acceptance.
