"use client";

import { useEffect } from "react";
import { EdgePage } from "@tessera/ui";
import "./globals.css";

/** The root layout failed, so this renders its own document on the Axio theme. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[axio.sh critical error]", { name: error.name, message: error.message, digest: error.digest });
  }, [error]);
  return (
    <html lang="en" data-preset="axio" data-mode="dark">
      <body className="ts-root">
        <EdgePage kind="error" frame="document" brandName="axio.sh" digest={error.digest} onRetry={reset} homeHref="/" homeLabel="the home page" />
      </body>
    </html>
  );
}
