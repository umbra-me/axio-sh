import { environmentUrl } from "../../public-environment.mjs";
// Site-wide facts. Everything a page or the metadata repeats lives here once.

import { PRODUCT_LIST, productHref } from "./products";

export const SITE = environmentUrl("https://axio.sh");
export const SITE_NAME = "Axio";
export const TAGLINE = "Developer tools that stay on your machine.";
export const DESCRIPTION =
  "Axio is Umbra's family of local-first coding, capture, analysis and workstation tools for macOS, Windows and Linux. No product telemetry.";

// A subpage's Open Graph object replaces the layout's object, including its
// file-generated image. Keep that image explicit when giving a page its title.
export const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Axio — developer tools that stay on your machine",
};

export const ORG = "https://github.com/umbra-me";
export const UMBRA = environmentUrl("https://umbra.me");

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

/** Default visible legal date; pages with newer policy text override it. */
export const LEGAL_UPDATED = "10 September 2026";

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
    // The agent repository is private, so its docs, changelog and security
    // files 404 for anonymous visitors. Do not link them until it is public.
    links: [
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

