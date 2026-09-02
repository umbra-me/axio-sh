import type { Product } from "@/lib/products";

export default function StatusBadge({ product }: { product: Product }) {
  return (
    <span className="badge" data-status={product.status}>
      <i aria-hidden="true" />
      {product.statusLabel}
    </span>
  );
}
