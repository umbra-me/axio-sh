import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { ROUTES, WIDTHS, slug } from "./routes.mjs";

const [outDir, base = "http://localhost:3311"] = process.argv.slice(2);
if (!outDir) throw new Error("usage: capture.mjs <outDir> [baseUrl]");

const browser = await chromium.launch();
for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "dark",
  });
  // Only this origin: the analytics collector and anything else off-site would
  // make a capture depend on the network it ran on.
  await context.route((url) => !url.href.startsWith(base), (route) => route.abort());
  const page = await context.newPage();
  await mkdir(join(outDir, String(width)), { recursive: true });
  for (const route of ROUTES) {
    // Not networkidle: a streaming video never lets the network go idle.
    await page.goto(base + route, { waitUntil: "load" });
    // Videos decode asynchronously and would differ between runs.
    await page.addStyleTag({ content: "video { visibility: hidden !important; }" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(outDir, String(width), `${slug(route)}.png`), fullPage: true });
  }
  await context.close();
}
await browser.close();
