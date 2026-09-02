import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DESCRIPTION, SITE, SITE_NAME, TAGLINE } from "@/lib/site";
import { BG } from "./brand";
import "./globals.css";

// Geist is the Umbra house face. next/font self-hosts it, so the page still
// makes no external request.
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {/* Hidden until focused, first in the tab order. */}
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <div className="bg" aria-hidden="true" />
        <Header />
        {/* tabIndex -1 so the skip link actually moves focus here rather than
            only scrolling. */}
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
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
