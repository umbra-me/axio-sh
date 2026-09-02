import { ImageResponse } from "next/og";
import {
  ACCENT,
  AMBER,
  BG,
  CYAN,
  FG,
  MARK_INK,
  MINT,
  MUTED,
  SLATE,
  VIOLET,
  geistMono,
  geistSans,
} from "./brand";

// The card a pasted link unfurls into. It carries the same things the hero
// does: the mark, the headline, the install command, and the four product
// colours, which are the part of the identity a sentence cannot deliver at
// this size.
export const alt = "Axio — developer tools that stay on your machine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRODUCTS = [
  ["Agent", ACCENT],
  ["Capture", MINT],
  ["Analyst", VIOLET],
  ["Deck", AMBER],
] as const;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(900px 520px at 20% -10%, rgba(123,160,255,0.22), rgba(5,7,10,0) 64%), radial-gradient(700px 400px at 85% 0%, rgba(99,203,220,0.12), rgba(5,7,10,0) 64%)`,
          padding: 72,
          fontFamily: "Geist",
          color: FG,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: ACCENT,
                borderRadius: 11,
                color: MARK_INK,
                fontFamily: "Geist Mono",
                fontSize: 27,
                fontWeight: 700,
                paddingLeft: 2,
              }}
            >
              a
            </div>
            <div
              style={{
                marginLeft: 18,
                fontFamily: "Geist Mono",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              axio
            </div>
            <div style={{ marginLeft: 18, fontSize: 22, color: MUTED }}>by Umbra</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {PRODUCTS.map(([name, color]) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${color}55`,
                  background: `${color}1a`,
                  borderRadius: 999,
                  padding: "8px 16px",
                  fontSize: 18,
                  color: FG,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: color,
                    marginRight: 10,
                  }}
                />
                {name}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
            }}
          >
            <div style={{ display: "flex" }}>Developer tools that</div>
            <div
              style={{
                display: "flex",
                backgroundImage: `linear-gradient(92deg, ${ACCENT}, ${CYAN})`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              stay on your machine.
            </div>
          </div>
          <div style={{ marginTop: 26, fontSize: 27, color: MUTED, lineHeight: 1.45, maxWidth: 900 }}>
            A coding agent, a screenshot tool, an analyst for Binary Ninja and a
            Windows control surface. No accounts, no hosted backend, no telemetry.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: SLATE,
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 10,
              padding: "18px 26px",
              fontFamily: "Geist Mono",
              fontSize: 24,
            }}
          >
            <div style={{ display: "flex", color: MUTED, marginRight: 14 }}>$</div>
            curl -fsSL https://axio.sh/install | sh
          </div>
          <div style={{ fontSize: 21, color: MUTED }}>axio.sh</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistSans("Regular"), weight: 400, style: "normal" },
        { name: "Geist", data: geistSans("Bold"), weight: 700, style: "normal" },
        { name: "Geist Mono", data: geistMono("Regular"), weight: 400, style: "normal" },
        { name: "Geist Mono", data: geistMono("SemiBold"), weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono("Bold"), weight: 700, style: "normal" },
      ],
    },
  );
}
