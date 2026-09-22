import { ProductCard as Card } from "@tessera/marketing";
import { productHref, type Product } from "@/lib/products";
import { PRODUCT_ICONS } from "./Icons";
import StatusBadge from "./StatusBadge";

export default function ProductCard({ product }: { product: Product }) {
  const Icon = PRODUCT_ICONS[product.id];
  return <Card name={product.name} tagline={product.tagline} description={product.description} color={product.color} icon={<Icon />} kicker={product.stack} features={product.features} platforms={product.platforms} badge={<StatusBadge product={product} />} href={productHref(product.id)} cta="About the product" />;
}
