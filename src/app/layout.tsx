import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { accentOptions, brands } from "@tessera/themes";
import { ThemeScript, createSiteRegistry } from "@tessera/next";
import { TesseraProvider } from "@tessera/next/client";
import SiteChrome from "@/components/SiteChrome";
import { DESCRIPTION, SITE, SITE_NAME, TAGLINE } from "@/lib/site";
import { BG } from "./brand";
import "./globals.css";

/** axio.sh on the Axio brand theme. One palette: dark, with no switch rendered. */
const registry = createSiteRegistry({
  presets: brands.filter((b) => b.id === "axio"),
  accentOptions: accentOptions.filter((o) => o.presets?.includes("axio")),
  defaultPreset: "axio",
});
const theme = { namespace: "axio-site", defaults: { preset: "axio", mode: "dark" } } as const;

// Geist is the Umbra house face. next/font self-hosts it, so the page still
// makes no external request. The Axio theme bundles Geist too, but only the
// latin subsets: it has no arrows or keyboard symbols and no box drawing in
// the mono, all of which this site prints. globals.css points Tessera's font
// tokens at these complete faces, so the theme's files are never fetched.
//
// metadataBase is what makes the og:image absolute. Without it Next emits the
// generated card as a relative path, every scraper that reads it resolves the
// path against its own host, and the unfurl arrives with no image and no error
// anywhere to say why.
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Umbra", url: "https://umbra.me" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  // The card and its alt text come from opengraph-image.tsx by file
  // convention; Next reuses them here, so naming the image twice would only
  // create somewhere for the two to disagree.
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
  },
};

// The site has one palette and no light variant. Declaring that stops the
// browser rendering scrollbars, form controls and the address bar in light
// chrome around a page that is cold near-black throughout.
export const viewport: Viewport = {
  themeColor: BG,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The preset and mode are also written here, not only by ThemeScript: the
    // theme's tokens are scoped to [data-preset], and a visitor without
    // JavaScript must still get a styled page.
    <html
      lang="en"
      data-preset="axio"
      data-mode="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="ts-root">
        <ThemeScript registry={registry} {...theme} />
        <TesseraProvider registry={registry} {...theme}>
          {/* Hidden until focused, first in the tab order. */}
          <a className="ts-button ts-skip-link" data-variant="primary" href="#content">
            Skip to content
          </a>
          <div className="bg" aria-hidden="true" />
          <SiteChrome>{children}</SiteChrome>
        </TesseraProvider>
        {/* Umbra's own collector: page loads and presses on marked links as
            hourly totals, no cookie, no identifier, honours Do Not Track. The
            privacy policy describes it; keep the two in step. */}
        <script
          defer
          src={
            process.env.NEXT_PUBLIC_UMBRA_ANALYTICS_URL ??
            "https://api.umbra.me/api/v1/analytics/script.js"
          }
        />
      </body>
    </html>
  );
}
