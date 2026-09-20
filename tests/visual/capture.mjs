import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { ROUTES, WIDTHS, slug } from "./routes.mjs";

// --main captures only <main>: the way to compare page content across a change
// to the header or footer, whose heights would otherwise shift everything.
const args = process.argv.slice(2);
const mainOnly = args.includes("--main");
const [outDir, base = "http://localhost:3311"] = args.filter((a) => !a.startsWith("--"));
if (!outDir) throw new Error("usage: capture.mjs <outDir> [baseUrl] [--main]");

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
    const path = join(outDir, String(width), `${slug(route)}.png`);
    if (mainOnly) await page.locator("main#content").screenshot({ path });
    else await page.screenshot({ path, fullPage: true });
  }
  await context.close();
}
await browser.close();
