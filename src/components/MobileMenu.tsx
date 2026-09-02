"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PRODUCT_LIST, productHref } from "@/lib/products";
import { NAV } from "@/lib/site";
import { IconMenu } from "./Icons";

// A details element, so the menu opens with no JavaScript at all. The one
// thing a script adds is closing it: after a navigation, and on a click
// outside it. Without either it still works, it just stays open.
export default function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const el = ref.current;
      if (el?.open && e.target instanceof Node && !el.contains(e.target)) {
        el.open = false;
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <details className="mnav" ref={ref}>
      <summary className="icon-btn" aria-label="Menu">
        <IconMenu />
      </summary>
      <nav className="mnav__panel" aria-label="Mobile">
        {NAV.main.map((item) => (
          <a key={item.href} href={item.href}>
            {item.name}
          </a>
        ))}
        <span className="label">Products</span>
        {PRODUCT_LIST.map((p) => (
          <a
            key={p.id}
            className="mnav__product"
            href={productHref(p.id)}
            style={{ "--pc": p.color } as CSSProperties}
          >
            <i aria-hidden="true" />
            {p.name}
          </a>
        ))}
        <span className="label">Legal</span>
        {NAV.legal.map((item) => (
          <a key={item.href} href={item.href}>
            {item.name}
          </a>
        ))}
      </nav>
    </details>
  );
}
