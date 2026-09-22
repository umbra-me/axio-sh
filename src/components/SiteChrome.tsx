"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Button, IconButton } from "@tessera/ui";
import {
  SiteFooter,
  SiteHeader,
  type RenderLink,
  type SiteNavItem,
} from "@tessera/marketing";
import { PRODUCT_LIST, productHref } from "@/lib/products";
import { COMPANY, FOOTER_COLUMNS, NAV, ORG, TAGLINE_LONG } from "@/lib/site";
import { IconGitHub, PRODUCT_ICONS } from "./Icons";
import Mark from "./Mark";

// Every link on this site is a plain anchor: the pages are static and the
// install routes are scripts, not pages.
const renderLink: RenderLink = ({ href, children, ...rest }) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

const GitHubLink = () => (
  <IconButton asChild label="Umbra on GitHub">
    <a href={ORG} rel="noopener">
      <IconGitHub />
    </a>
  </IconButton>
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
                <span className="product-tile" style={{ "--ts-product-color": p.color } as CSSProperties}>
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
        brand={{ name: "axio", mark: <Mark size={22} />, byline: "by Umbra" }}
        items={items}
        renderLink={renderLink}
        actions={
          <>
            <GitHubLink />
            <Button asChild variant="primary">
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
