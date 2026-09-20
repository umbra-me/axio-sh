// The site has one palette. A visitor whose system prefers light must still
// get it: the theme follows the system unless the mode is set.
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3311";
const browser = await chromium.launch();
const context = await browser.newContext({ colorScheme: "light" });
await context.route((url) => !url.href.startsWith(base), (route) => route.abort());
const page = await context.newPage();
await page.goto(base + "/", { waitUntil: "load" });
const seen = await page.evaluate(() => ({
  mode: document.documentElement.dataset.mode,
  preset: document.documentElement.dataset.preset,
  canvas: getComputedStyle(document.body).backgroundColor,
}));
await browser.close();
const expected = { mode: "dark", preset: "axio", canvas: "rgb(5, 7, 10)" };
for (const [key, value] of Object.entries(expected)) {
  if (seen[key] !== value) {
    console.error(`FAIL: ${key} is ${seen[key]}, expected ${value}`);
    process.exit(1);
  }
}
console.log("PASS: dark under a light system preference");
