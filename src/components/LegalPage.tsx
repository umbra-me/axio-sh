import { LegalDocument } from "@tessera/patterns";
import type { ReactNode } from "react";
import { LEGAL_UPDATED, NAV } from "@/lib/site";

// The frame every legal page shares: heading, summary, the date the text last
// changed, a contents box, and a row of links to the other legal pages with
// the current one marked. A page that belongs to a product rather than to the
// site (the Polaris licence) shows the way back to its product instead.
export default function LegalPage({
  title,
  summary,
  current,
  back,
  contents,
  children,
}: {
  title: string;
  summary: string;
  current: string;
  back?: { name: string; href: string };
  contents?: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="ts-container" data-width="narrow">
      <LegalDocument
        title={title}
        summary={summary}
        updated={LEGAL_UPDATED}
        back={back ? { label: back.name, href: back.href, parent: { label: "Products", href: "/products" } } : undefined}
        nav={back ? undefined : NAV.legal.map((item) => ({ label: item.name, href: item.href, current: item.href === current }))}
        contents={contents}
      >
        {children}
      </LegalDocument>
    </div>
  );
}
