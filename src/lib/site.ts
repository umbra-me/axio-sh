// Site-wide facts. Everything a page or the metadata repeats lives here once.

export const SITE = "https://axio.sh";
export const SITE_NAME = "Axio";
export const TAGLINE = "Developer tools that stay on your machine.";
export const DESCRIPTION =
  "Axio is Umbra's developer-tools family: a local-first coding agent, a screenshot tool with a real editor, an analyst for Binary Ninja, and a control surface for Windows. No accounts, no hosted backend, no telemetry.";

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
export const LEGAL_UPDATED = "3 September 2026";

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
