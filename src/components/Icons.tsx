import type { ProductId } from "@/lib/products";

// Every icon is drawn on a 24-unit grid at a 1.6 stroke, so the product
// marks and the few interface glyphs read as one set. No icon library: the
// page ships nothing it does not draw.

const base = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function IconAgent() {
  return (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M7 9l3 3-3 3" />
      <path d="M12.5 15H17" />
    </svg>
  );
}

export function IconCapture() {
  return (
    <svg {...base}>
      <path d="M4 9V6.5A2.5 2.5 0 0 1 6.5 4H9" />
      <path d="M15 4h2.5A2.5 2.5 0 0 1 20 6.5V9" />
      <path d="M20 15v2.5a2.5 2.5 0 0 1-2.5 2.5H15" />
      <path d="M9 20H6.5A2.5 2.5 0 0 1 4 17.5V15" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// The plugin's own mark: a split diamond, one bounded context read two ways,
// solid on the right and stroked on the left. Same shape as ui/branding.py in
// umbra-me/axio-analyst.
export function IconAnalyst() {
  return (
    <svg {...base}>
      <path d="M12 3l9 9-9 9-9-9 9-9Z" />
      <path d="M12 3l9 9-9 9V3Z" fill="currentColor" />
    </svg>
  );
}

export function IconDeck() {
  return (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
      <path d="M6 6.5h.01" />
    </svg>
  );
}

export const PRODUCT_ICONS: Record<ProductId, () => React.JSX.Element> = {
  agent: IconAgent,
  capture: IconCapture,
  analyst: IconAnalyst,
  deck: IconDeck,
  local: IconHome,
};

export function IconArrowUpRight() {
  return (
    <svg {...base}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function IconArrowRight() {
  return (
    <svg {...base}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconChevron() {
  return (
    <svg {...base}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg {...base}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconDownload() {
  return (
    <svg {...base}>
      <path d="M12 4v11" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 19h16" />
    </svg>
  );
}

export function IconMenu() {
  return (
    <svg {...base}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function IconShield() {
  return (
    <svg {...base}>
      <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconHome() {
  return (
    <svg {...base}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v10h12V10" />
    </svg>
  );
}

export function IconEye() {
  return (
    <svg {...base}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconBranch() {
  return (
    <svg {...base}>
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="8" r="2.2" />
      <path d="M6 7.2v9.6" />
      <path d="M18 10.2c0 4-4 4.5-9 4.5" />
    </svg>
  );
}

export function IconOpen() {
  return (
    <svg {...base}>
      <path d="M8 4h8" />
      <path d="M5 8l7-4 7 4v8l-7 4-7-4V8Z" />
      <path d="M5 8l7 4 7-4" />
      <path d="M12 12v8" />
    </svg>
  );
}

export function IconPin() {
  return (
    <svg {...base}>
      <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}
