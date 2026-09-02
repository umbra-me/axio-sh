import type { CSSProperties } from "react";
import { productHref, type Product } from "@/lib/products";
import { IconArrowUpRight, PRODUCT_ICONS } from "./Icons";
import StatusBadge from "./StatusBadge";

export default function ProductCard({
  product,
  wide = false,
}: {
  product: Product;
  wide?: boolean;
}) {
  const Icon = PRODUCT_ICONS[product.id];
  return (
    <a
      className={`card pcard${wide ? " pcard--wide" : ""}`}
      href={productHref(product.id)}
      style={{ "--pc": product.color } as CSSProperties}
    >
      <div className="pcard__head">
        <span className="card__icon">
          <Icon />
        </span>
        <StatusBadge product={product} />
      </div>
      <div className="pcard__body">
        <p className="pcard__by">Axio · {product.stack}</p>
        <h3>{product.name}</h3>
        <p className="pcard__tag">{product.tagline}</p>
        <p className="pcard__desc">{product.description}</p>
        <ul>
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="pcard__foot">
          <span className="mono">{product.platforms.join(" · ")}</span>
          <IconArrowUpRight />
        </div>
      </div>
    </a>
  );
}
