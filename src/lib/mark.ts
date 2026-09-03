// The Axio mark as an SVG string, for the places that need an image rather
// than JSX: the generated favicon, home-screen icon and social card, which
// satori renders from a data URI.
//
// This is a copy of brands/axio/tools/brand/marks/axio.svg, the source of
// truth for every rendered icon in the family. Mark.tsx draws the same
// geometry in JSX for the page. Change all three together.

export const MARK_COLOR = "#7ba0ff";

export function markSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#141925"/>
      <stop offset="1" stop-color="#0a0d13"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.32" cy="0.22" r="0.75">
      <stop offset="0" stop-color="${MARK_COLOR}" stop-opacity="0.26"/>
      <stop offset="1" stop-color="${MARK_COLOR}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="lit" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.03"/>
    </linearGradient>
  </defs>
  <rect x="64" y="64" width="896" height="896" rx="200" fill="url(#ground)"/>
  <rect x="64" y="64" width="896" height="896" rx="200" fill="url(#glow)"/>
  <rect x="68" y="68" width="888" height="888" rx="196" fill="none" stroke="url(#lit)" stroke-width="8"/>
  <svg x="248" y="248" width="528" height="528" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11.6" cy="13" r="5.2" stroke="${MARK_COLOR}" stroke-width="3"/>
    <path d="M16.8 7.8v10.4" stroke="${MARK_COLOR}" stroke-width="3"/>
  </svg>
</svg>`;
}

/** The mark as a data URI an <img> can load. */
export function markDataUri(): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(markSvg())}`;
}
