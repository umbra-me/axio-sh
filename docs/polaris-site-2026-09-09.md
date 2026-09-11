# Polaris product page — 2026-09-09

> Historical September 9 record. The current public page and media are described
> in [the September 10 redesign](polaris-page-redesign-2026-09-10.md), itself
> superseded by [the September 11 site redesign](site-redesign-2026-09-11.md).


Axio Polaris is now the sixth product in the site registry. The registry marks
it private, gives it no public repository or licence link, and describes its
current platform as Apple Silicon Macs on macOS 15 or newer. Registry-driven
cards, desktop and mobile navigation, footer links, the product ledger and the
sitemap include `/products/polaris` automatically.

The product page presents the native launcher, notch, shelf, utilities and local
Focus sessions, initially with a drawn interface. The subsequent detailed walkthrough replaces
that illustration with six real app screenshots and a timer clip; see
`polaris-real-demos-2026-09-09.md`. It also
states the practical boundaries of cooperative app hiding and the local Chromium
companion. The download page says no public download or notarised customer
release exists. No pricing, waitlist or public source call to action was added.

The privacy page records what Polaris stores locally and when requested online
features, licensing or a future update channel may use the network. Product
counts and family copy now cover all six products without promising that every
workflow has no account or backend.

Validation for this change is recorded in the handoff that publishes it. Source
publication and a production deployment are separate actions.

## Validation

- ESLint and TypeScript checks passed.
- Product tests passed: 3/3.
- Production build passed and generated 23 static pages, including Polaris.
- Workspace site coverage passed: six products and one website exclusion.
- Local browser preview returned HTTP 200, rendered the product hero, followed
  the Development status anchor, and showed no horizontal overflow at 816 px or
  captured console errors. The generated sitemap includes the Polaris URL.
- Subsequent production acceptance on September 9: site `d62aac3`, workspace
  `34af015`, control plane `4a7e0a4d`. The page and all seven demo assets returned
  200; media hashes matched source. The initial runtime image omitted `public/`;
  the Dockerfile repair was rebuilt and verified before final deployment.
  Umbra’s `docs/production-operator-rollout-2026-09-09.md` records the rollout.
