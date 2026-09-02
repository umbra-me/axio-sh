import type { MetadataRoute } from "next";
import { PRODUCT_LIST, productHref } from "@/lib/products";
import { NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/products`, changeFrequency: "weekly", priority: 0.9 },
    ...PRODUCT_LIST.map((p) => ({
      url: `${SITE}${productHref(p.id)}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE}/download`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...NAV.legal.map((item) => ({
      url: `${SITE}${item.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
  return pages;
}
