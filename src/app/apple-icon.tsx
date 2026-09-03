import { ImageResponse } from "next/og";
import { markDataUri } from "@/lib/mark";

// Home-screen icon. iOS applies its own mask, so the tile fills the canvas
// rather than sitting inside a margin, the same way the apps' icon.png is
// masked by macOS.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <img
          src={markDataUri()}
          width={size.width * (1024 / 896)}
          height={size.height * (1024 / 896)}
          style={{ marginLeft: -size.width * (64 / 896), marginTop: -size.height * (64 / 896) }}
        />
      </div>
    ),
    size,
  );
}
