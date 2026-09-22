import { StatusBadge as Badge } from "@tessera/ui";
import type { Product } from "@/lib/products";

// The site's status vocabulary is the registry's; Tessera's badge takes it as
// a tone and the Axio theme sets it in mono.
export default function StatusBadge({ product }: { product: Product }) {
  return (
    <Badge tone={product.status} dot>
      {product.statusLabel}
    </Badge>
  );
}
