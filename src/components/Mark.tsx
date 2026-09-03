import { MARK_COLOR } from "@/lib/mark";

// The Axio mark, drawn in JSX for the header and footer: the family's slate
// tile with a geometric single-storey "a" in the accent. The bowl and the stem
// meet at the bowl's rightmost point, as they do in the letter. Same geometry
// as brands/axio/tools/brand/marks/axio.svg and lib/mark.ts.
export default function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      style={{ display: "block", flex: "none" }}
    >
      <defs>
        <linearGradient id="mk-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141925" />
          <stop offset="1" stopColor="#0a0d13" />
        </linearGradient>
        <radialGradient id="mk-glow" cx="0.32" cy="0.22" r="0.75">
          <stop offset="0" stopColor={MARK_COLOR} stopOpacity="0.26" />
          <stop offset="1" stopColor={MARK_COLOR} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mk-lit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1024" height="1024" rx="228" fill="url(#mk-ground)" />
      <rect x="0" y="0" width="1024" height="1024" rx="228" fill="url(#mk-glow)" />
      <rect
        x="6"
        y="6"
        width="1012"
        height="1012"
        rx="224"
        fill="none"
        stroke="url(#mk-lit)"
        strokeWidth="12"
      />
      <svg
        x="200"
        y="200"
        width="624"
        height="624"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11.6" cy="13" r="5.2" stroke={MARK_COLOR} strokeWidth="3" />
        <path d="M16.8 7.8v10.4" stroke={MARK_COLOR} strokeWidth="3" />
      </svg>
    </svg>
  );
}
