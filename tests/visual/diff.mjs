// Pixel diff of two capture directories. Bands can be masked (the header and
// footer when the chrome is expected to change) and routes left for review by
// eye; with no options every page is compared whole.
//   diff.mjs <before> <after> <out> [--mask-chrome] [--by-eye=/a,/b]
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { ROUTES, WIDTHS, slug } from "./routes.mjs";

const [before, after, out, ...flags] = process.argv.slice(2);
if (!out) throw new Error("usage: diff.mjs <before> <after> <out> [--mask-chrome] [--by-eye=/a,/b]");
const maskChrome = flags.includes("--mask-chrome");
const byEye = new Set((flags.find((f) => f.startsWith("--by-eye="))?.slice(9) ?? "").split(",").filter(Boolean));

// Generous on purpose: the footer stacks into one column on a phone.
const HEADER = 96;
const FOOTER = { 390: 900, 768: 560, 1440: 460 };

let failed = 0;
for (const width of WIDTHS) {
  for (const route of ROUTES) {
    if (byEye.has(route)) continue;
    const name = `${slug(route)}.png`;
    const a = PNG.sync.read(await readFile(join(before, String(width), name)));
    const b = PNG.sync.read(await readFile(join(after, String(width), name)));
    const top = maskChrome ? HEADER : 0;
    const height = Math.min(a.height, b.height) - top - (maskChrome ? FOOTER[width] : 0);
    if (a.width !== b.width || height <= 0 || (!maskChrome && a.height !== b.height)) {
      console.error(`SIZE ${width} ${route}: ${a.width}x${a.height} vs ${b.width}x${b.height}`);
      failed++;
      continue;
    }
    const crop = (png) => {
      const c = new PNG({ width: png.width, height });
      PNG.bitblt(png, c, 0, top, png.width, height, 0, 0);
      return c;
    };
    const [ca, cb] = [crop(a), crop(b)];
    const diff = new PNG({ width: a.width, height });
    const changed = pixelmatch(ca.data, cb.data, diff.data, a.width, height, { threshold: 0.1 });
    const ratio = changed / (a.width * height);
    if (ratio > 0.001) {
      failed++;
      await mkdir(join(out, String(width)), { recursive: true });
      await writeFile(join(out, String(width), name), PNG.sync.write(diff));
      // Where on the page, so the cause can be found without opening the image.
      let first = -1, last = -1;
      for (let y = 0; y < height; y++) for (let x = 0; x < a.width; x++) {
        const i = (y * a.width + x) * 4;
        if (diff.data[i] === 255 && diff.data[i + 1] === 0) { if (first < 0) first = y; last = y; break; }
      }
      console.error(`DIFF ${width} ${route}: ${(ratio * 100).toFixed(3)}% of pixels, rows ${first + top}-${last + top}`);
    } else if (changed) console.log(`same ${width} ${route} (${changed} px within tolerance)`);
    else console.log(`same ${width} ${route}`);
  }
}
process.exit(failed ? 1 : 0);
