import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// The canonical origin lives in lib/site.ts; re-exported so the generated
// images and the pages read one value.
export { SITE } from "@/lib/site";

// The same values globals.css declares as custom properties. Generated images
// are rendered by satori, which never sees the stylesheet, so the tokens have to
// exist here too. Keep them in step by hand — nothing checks it, which is the
// same trade the site already makes against web-stack's Tailwind config.
//
// They are the coding agent's own tokens, which the site adopted as its brand
// palette: cold near-black ground, periwinkle for axio, and one colour per
// product.
export const BG = "#05070a";
export const SLATE = "#0a0d13";
export const LINE = "rgba(255,255,255,0.10)";
export const FG = "#f4f5f7";
export const TEXT_2 = "#bfc3cb";
export const MUTED = "#8f939d";
export const FAINT = "#63666f";

/** axio's own. The mark, the site accent, and the agent product's colour. */
export const ACCENT = "#7ba0ff";
export const CYAN = "#63cbdc";
/** The other three product colours, as globals.css declares --p-*. */
export const MINT = "#55dcb0";
export const VIOLET = "#b492fd";
export const AMBER = "#e2c67e";


// satori cannot read woff2, and geist ships both — these are the .ttf twins of
// the faces next/font serves to the browser, so the generated images render in
// the same typeface the page does rather than in a fallback.
//
// The product owns its Geist dependency and traces its fonts into the build.
const SUFFIX = path.join("node_modules", "geist", "dist", "fonts");
function fontDir(): string {
  const candidate = path.join(process.cwd(), SUFFIX);
  if (!existsSync(candidate)) throw new Error(`geist fonts not found: ${candidate}`);
  return candidate;
}

function font(family: "geist-sans" | "geist-mono", file: string): ArrayBuffer {
  const buf = readFileSync(path.join(fontDir(), family, file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export const geistSans = (weight: "Regular" | "SemiBold" | "Bold") =>
  font("geist-sans", `Geist-${weight}.ttf`);
export const geistMono = (weight: "Regular" | "SemiBold" | "Bold") =>
  font("geist-mono", `GeistMono-${weight}.ttf`);
