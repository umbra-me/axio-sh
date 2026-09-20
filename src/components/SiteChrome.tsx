"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Button } from "@tessera/ui";
import {
  SiteFooter,
  SiteHeader,
  type RenderLink,
  type SiteNavItem,
} from "@tessera/marketing";
import { PRODUCT_LIST, productHref } from "@/lib/products";
import { COMPANY, FOOTER_COLUMNS, NAV, ORG, TAGLINE_LONG, UMBRA } from "@/lib/site";
import { IconGitHub, PRODUCT_ICONS } from "./Icons";
import Mark from "./Mark";

// Every link on this site is a plain anchor: the pages are static and the
// install routes are scripts, not pages. data-umbra-link is what the shared
// collector watches for. The press is counted as an hourly total against this
// site and this link name, with no visitor identifier.
const renderLink: RenderLink = ({ href, children, ...rest }) => (
  <a
    href={href}
    {...rest}
    {...(href === UMBRA ? { "data-umbra-link": "umbra-attribution" } : {})}
  >
    {children}
  </a>
);

// IconButton wraps its children, so it cannot render as an anchor; this is the
// same markup on a link.
const GitHubLink = () => (
  <Button asChild variant="ghost" size="sm" data-icon-only="">
    <a href={ORG} aria-label="Umbra on GitHub" title="Umbra on GitHub" rel="noopener">
      <span className="ts-button__icon">
        <IconGitHub />
      </span>
    </a>
  </Button>
);

/** Tessera's header and footer around every page, on the site's own data. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const items: SiteNavItem[] = NAV.main.map((item) => ({
    label: item.name,
    href: item.href,
    current: pathname === item.href || pathname.startsWith(`${item.href}/`),
    ...(item.href === "/products"
      ? {
          // Each product owns a colour; its menu tile carries it, the chrome
          // never does.
          children: PRODUCT_LIST.map((p) => {
            const Icon = PRODUCT_ICONS[p.id];
            return {
              label: p.name,
              href: productHref(p.id),
              description: p.tagline,
              icon: (
                <span className="product-tile" style={{ "--pc": p.color } as CSSProperties}>
                  <Icon />
                </span>
              ),
            };
          }),
          footer: { label: "All products", href: "/products" },
        }
      : {}),
  }));
  return (
    <div className="ts-site">
      <SiteHeader
        brand={{ name: "axio", mark: <Mark size={22} /> }}
        items={items}
        renderLink={renderLink}
        actions={
          <>
            <GitHubLink />
            <Button asChild variant="primary" size="sm">
              <a href="/download">Download</a>
            </Button>
          </>
        }
      />
      {/* tabIndex -1 so the skip link actually moves focus here rather than
          only scrolling. */}
      <main className="ts-site__main" id="content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter
        brand={{ name: "axio", mark: <Mark size={22} />, tagline: TAGLINE_LONG }}
        columns={FOOTER_COLUMNS}
        renderLink={renderLink}
        meta={
          <>
            <span>
              © {new Date().getFullYear()} {COMPANY.name}. Software licences
              apply to each product; see <a href="/legal/licenses">Licences</a>.
            </span>
            <span>Built independently in {COMPANY.location}.</span>
            <GitHubLink />
          </>
        }
      />
    </div>
  );
}
