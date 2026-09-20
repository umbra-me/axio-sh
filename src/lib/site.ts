// Site-wide facts. Everything a page or the metadata repeats lives here once.

import { PRODUCT_LIST, productHref } from "./products";

export const SITE = "https://axio.sh";
export const SITE_NAME = "Axio";
export const TAGLINE = "Developer tools that stay on your machine.";
export const DESCRIPTION =
  "Axio is Umbra's family of local-first coding, capture, analysis and workstation tools for macOS, Windows and Linux. No product telemetry.";

export const ORG = "https://github.com/umbra-me";
export const UMBRA = "https://umbra.me";

/** The company behind the brand, as the legal pages state it. */
export const COMPANY = {
  name: "Umbra",
  description: "an independent product studio",
  location: "Australia",
  jurisdiction: "Victoria, Australia",
  courts: "Melbourne, Australia",
};

export const CONTACT = {
  privacy: "privacy@umbra.me",
  legal: "legal@umbra.me",
  security: "security@umbra.me",
};

/** Shown on every legal page. Change it when the policy text changes. */
export const LEGAL_UPDATED = "2026-09-10";

export const NAV = {
  main: [
    { name: "Products", href: "/products" },
    { name: "Download", href: "/download" },
    { name: "About", href: "/about" },
  ],
  legal: [
    { name: "Privacy", href: "/legal/privacy" },
    { name: "Terms", href: "/legal/terms" },
    { name: "Security", href: "/legal/security" },
    { name: "Licences", href: "/legal/licenses" },
  ],
};

/** The footer's one-line description of the family. */
export const TAGLINE_LONG =
  "Local-first coding, capture, analysis and workstation tools for macOS, Windows and Linux, built by Umbra.";

const AGENT_REPO = "https://github.com/umbra-me/axio";

/** Footer columns, in the shape Tessera's SiteFooter takes. */
export const FOOTER_COLUMNS = [
  {
    title: "Products",
    links: [
      ...PRODUCT_LIST.map((p) => ({ label: p.name, href: productHref(p.id) })),
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Agent repository", href: AGENT_REPO, external: true },
      { label: "Architecture", href: `${AGENT_REPO}/blob/main/docs/architecture.md`, external: true },
      { label: "Roadmap", href: `${AGENT_REPO}/blob/main/docs/roadmap.md`, external: true },
      { label: "Changelog", href: `${AGENT_REPO}/blob/main/CHANGELOG.md`, external: true },
      { label: "Install script", href: "/install" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Axio", href: "/about" },
      // data-umbra-link is what the shared collector watches for. The press is
      // counted as an hourly total against this site and this link name, with
      // no visitor identifier.
      { label: "Umbra", href: UMBRA, attributes: { "data-umbra-link": "umbra-attribution" } as const },
      ...NAV.legal.map((item) => ({ label: item.name, href: item.href })),
    ],
  },
];

