import { ImageResponse } from "next/og";
import { markDataUri } from "@/lib/mark";

// The tab icon: the Axio mark, rendered at build time from the same SVG the
// desktop apps' icons are generated from, so the tab shows the object the
// dock does. The tile bleeds to the edge here because a 32px tab icon has no
// room for the margin the app icons keep.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* The mark's own canvas keeps a 64px margin on 1024; oversize and
            offset it so the tile fills the icon. */}
        <img alt=""
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
