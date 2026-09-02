"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

/**
 * Sets --mx and --my on every `.card` inside it as the pointer moves, so the
 * card's spotlight follows the pointer. That is the whole job. Cards render
 * and hover without it; without a fine pointer it attaches nothing.
 */
export default function SpotlightGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    function onMove(e: PointerEvent) {
      const cards = root!.querySelectorAll<HTMLElement>(".card");
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    }
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
