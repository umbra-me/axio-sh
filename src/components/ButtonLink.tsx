import type { ComponentProps } from "react";
import { Button } from "@tessera/ui";

// A page's call to action: Tessera's Button rendered as a plain anchor, at the
// 44px height every tap target on this site keeps. "product" is the one look
// Tessera has no variant for, a primary in the colour of the product whose
// page it is on (--pc, set by the section around it).
export default function ButtonLink({
  variant = "primary",
  className,
  children,
  ...anchor
}: Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: "primary" | "secondary" | "product";
}) {
  const product = variant === "product";
  return (
    <Button
      asChild
      size="lg"
      variant={product ? "primary" : variant}
      className={[product ? "btn-product" : "", className ?? ""].join(" ").trim() || undefined}
    >
      <a {...anchor}>{children}</a>
    </Button>
  );
}
