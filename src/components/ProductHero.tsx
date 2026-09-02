import type { CSSProperties, ReactNode } from "react";
import type { Product } from "@/lib/products";
import { PRODUCT_ICONS } from "./Icons";
import StatusBadge from "./StatusBadge";

// The top of every product page: breadcrumb, mark, badge, headline, lede,
// actions, and the facts a visitor asks first. The visual sits beside it on
// wide screens and under it on narrow ones.
export default function ProductHero({
  product,
  headline,
  lede,
  actions,
  visual,
}: {
  product: Product;
  headline: ReactNode;
  lede: ReactNode;
  actions: ReactNode;
  visual: ReactNode;
}) {
  const Icon = PRODUCT_ICONS[product.id];
  return (
    <section className="phero" style={{ "--pc": product.color } as CSSProperties}>
      <div className="container">
        <ol className="crumbs">
          <li>
            <a href="/products">Products</a>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
        <div className="split">
          <div className="split__text">
            <div className="phero__meta">
              <span className="card__icon">
                <Icon />
              </span>
              <StatusBadge product={product} />
            </div>
            <h1 className="display display--lg">{headline}</h1>
            <p className="lede">{lede}</p>
            <div className="phero__actions">{actions}</div>
            <ul className="phero__facts">
              <li>
                <b>{product.stack}</b>
              </li>
              <li>{product.platforms.join(" · ")}</li>
              <li>{product.license ?? "not yet distributed"}</li>
            </ul>
          </div>
          <div>{visual}</div>
        </div>
      </div>
    </section>
  );
}
