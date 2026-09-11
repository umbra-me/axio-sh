import type { ReactNode } from "react";
import { LEGAL_UPDATED, NAV } from "@/lib/site";

// The frame every legal page shares: heading, summary, the date the text last
// changed, and a row of links to the other legal pages with the current one
// marked. A page that belongs to a product rather than to the site (the
// Polaris licence) shows the way back to its product instead of that row.
export default function LegalPage({
  title,
  summary,
  current,
  back,
  children,
}: {
  title: string;
  summary: string;
  current: string;
  back?: { name: string; href: string };
  children: ReactNode;
}) {
  return (
    <>
      <section className="page-head">
        <div className="container container--narrow">
          {back ? (
            <ol className="crumbs">
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href={back.href}>{back.name}</a>
              </li>
              <li aria-current="page">{title}</li>
            </ol>
          ) : null}
          <h1 className="display display--lg">{title}</h1>
          <p>{summary}</p>
          <p className="updated">Last updated {LEGAL_UPDATED}</p>
        </div>
      </section>
      <section className="section--tight">
        <div className="container container--narrow">
          {back ? null : (
            <nav className="legal-nav" aria-label="Legal pages">
              {NAV.legal.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={item.href === current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
