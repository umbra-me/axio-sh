"use client";

import { EdgePage } from "@tessera/ui";

export default function NotFound() {
  return (
    <section className="edge">
      <EdgePage kind="not-found" brandName="axio.sh" headingLevel={1} homeHref="/" homeLabel="the home page" />
    </section>
  );
}
