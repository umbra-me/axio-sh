# Polaris product page — 2026-09-09

Axio Polaris is now the sixth product in the site registry. The registry marks
it private, gives it no public repository or licence link, and describes its
current platform as Apple Silicon Macs on macOS 15 or newer. Registry-driven
cards, desktop and mobile navigation, footer links, the product ledger and the
sitemap include `/products/polaris` automatically.

The product page presents the native launcher, notch, shelf, utilities and local
Focus sessions, with a drawn interface rather than a product screenshot. It also
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
- A production deployment has not been performed.
