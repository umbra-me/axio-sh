"use client";

import { useEffect, useRef, type ReactNode } from "react";

const panes = [
  [".ts-terminal pre", "Example terminal transcript"],
  [".ts-app-frame__diff", "Example code diff"],
  [".ts-app-frame__prompt", "Example approval prompt"],
  [".ts-mock-analyst__il", "Example function code"],
] as const;

/** Keep the drawings' monospace layout, with focusable scrolling and edge hints. */
export default function ReadableMock({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = panes.flatMap(([selector, label]) =>
      [...(root.current?.querySelectorAll<HTMLElement>(selector) ?? [])].map((element) => {
        element.setAttribute("aria-label", label);
        element.setAttribute("role", "region");
        return element;
      }),
    );
    const update = (element: HTMLElement) => {
      const left = element.scrollLeft > 1;
      const right = element.scrollWidth - element.clientWidth - element.scrollLeft > 1;
      element.dataset.scrollEdge = left ? (right ? "both" : "left") : (right ? "right" : "none");
      element.tabIndex = left || right ? 0 : -1;
    };
    const updateAll = () => elements.forEach(update);
    const onScroll = (event: Event) => update(event.currentTarget as HTMLElement);
    const resize = new ResizeObserver(updateAll);
    const content = new MutationObserver(updateAll);
    elements.forEach((element) => {
      element.addEventListener("scroll", onScroll, { passive: true });
      resize.observe(element);
      content.observe(element, { childList: true, subtree: true, characterData: true });
    });
    updateAll();
    void document.fonts.ready.then(updateAll);
    return () => {
      resize.disconnect();
      content.disconnect();
      elements.forEach((element) => element.removeEventListener("scroll", onScroll));
    };
  }, []);

  return <div className="readable-mock" ref={root}>{children}</div>;
}
