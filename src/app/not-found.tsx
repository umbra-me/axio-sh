import { EdgePage } from "@tessera/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Axio" },
};

export default function NotFound() {
  return (
    <section className="edge">
      <EdgePage kind="not-found" brandName="axio.sh" headingLevel={1} homeHref="/" homeLabel="the home page" />
    </section>
  );
}
