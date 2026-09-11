import type { CSSProperties } from "react";
import { PRODUCT_LIST, productHref } from "@/lib/products";
import { PRODUCT_ICONS } from "./Icons";
import StatusBadge from "./StatusBadge";

/**
 * The six tools as rows rather than cards.
 *
 * The landing page used to carry six full product cards, about 700 words of
 * marketing in one section and the same six cards as the products index. A
 * row holds what a visitor scanning the family wants: the name, what it is in
 * one line, where it runs and where it stands. The card, the description and
 * the four features live on the products index and the product page.
 */
export default function ProductRail() {
  return (
    <ul className="rail">
      {PRODUCT_LIST.map((p) => {
        const Icon = PRODUCT_ICONS[p.id];
        return (
          <li key={p.id}>
            <a
              className="rail__row"
              href={productHref(p.id)}
              style={{ "--pc": p.color } as CSSProperties}
            >
              <span className="card__icon">
                <Icon />
              </span>
              <span className="rail__name">
                <strong>{p.name}</strong>
                <span>{p.tagline}</span>
              </span>
              <span className="rail__where">{p.platforms.join(" · ")}</span>
              <StatusBadge product={p} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
