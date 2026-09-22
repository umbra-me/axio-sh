import { SplitHero } from "@tessera/marketing";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";
import { PRODUCT_ICONS } from "./Icons";
import StatusBadge from "./StatusBadge";

/** A product page's hero: crumbs, mark and status, headline, lede, actions, facts, and the drawn product beside them. */
export default function ProductHero({ product, headline, lede, actions, visual, facts }: { product: Product; headline: ReactNode; lede: ReactNode; actions: ReactNode; visual: ReactNode; facts?: string[] }) {
  const Icon = PRODUCT_ICONS[product.id];
  return (
    <SplitHero
      crumbs={[{ label: "Products", href: "/products" }, { label: product.name }]}
      color={product.color}
      meta={
        <>
          <span className="ts-product-card__mark" aria-hidden="true">
            <Icon />
          </span>
          <StatusBadge product={product} />
        </>
      }
      title={headline}
      lede={lede}
      actions={actions}
      facts={facts ?? [<b key="stack">{product.stack}</b>, product.platforms.join(" · "), product.license ?? "not yet distributed"]}
      visual={visual}
    />
  );
}
