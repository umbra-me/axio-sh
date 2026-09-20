"use client";

import { useEffect } from "react";
import { EdgePage } from "@tessera/ui";

/** Error boundary for route segments; rendered inside the site chrome. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[axio.sh error]", { name: error.name, message: error.message, digest: error.digest });
  }, [error]);
  return (
    <section className="edge">
      <EdgePage kind="error" brandName="axio.sh" headingLevel={1} digest={error.digest} onRetry={reset} homeHref="/" homeLabel="the home page" />
    </section>
  );
}
