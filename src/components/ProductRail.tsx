import { ProductList } from "@tessera/marketing";
import { PRODUCT_LIST, productHref } from "@/lib/products";
import { PRODUCT_ICONS } from "./Icons";
import StatusBadge from "./StatusBadge";

/** The six products as rows: icon, name and tagline, platforms, status. */
export default function ProductRail() {
  return (
    <ProductList
      items={PRODUCT_LIST.map((p) => {
        const Icon = PRODUCT_ICONS[p.id];
        return { name: p.name, tagline: p.tagline, href: productHref(p.id), color: p.color, icon: <Icon />, platforms: p.platforms, badge: <StatusBadge product={p} /> };
      })}
    />
  );
}
