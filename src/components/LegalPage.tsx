import type { ReactNode } from "react";
import { LEGAL_UPDATED, NAV } from "@/lib/site";

// The frame every legal page shares: heading, summary, the date the text last
// changed, and a row of links to the other legal pages with the current one
// marked.
export default function LegalPage({
  title,
  summary,
  current,
  children,
}: {
  title: string;
  summary: string;
  current: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="page-head">
        <div className="container container--narrow">
          <p className="eyebrow">Legal</p>
          <h1 className="display display--lg">{title}</h1>
          <p>{summary}</p>
          <p className="updated">Last updated {LEGAL_UPDATED}</p>
        </div>
      </section>
      <section className="section--tight">
        <div className="container container--narrow">
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
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
