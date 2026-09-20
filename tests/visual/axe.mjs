// WCAG 2.1 A and AA on one page of each kind, at a desktop and a phone width,
// with the phone's menu sheet open as a second state.
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3311";
const routes = ["/", "/products/agent", "/legal/privacy", "/this-route-does-not-exist"];
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const browser = await chromium.launch();
let violations = 0;
const report = (where, result) => {
  for (const v of result.violations) {
    violations++;
    console.error(`${where}: ${v.id} (${v.nodes.length}) ${v.help}\n    ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join("\n    ")}`);
  }
};
for (const width of [1440, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: "dark", reducedMotion: "reduce" });
  await context.route((url) => !url.href.startsWith(base), (route) => route.abort());
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "load" });
    report(`${width} ${route}`, await new AxeBuilder({ page }).withTags(tags).analyze());
  }
  if (width === 390) {
    await page.goto(base + "/", { waitUntil: "load" });
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").waitFor();
    report("390 / with the menu open", await new AxeBuilder({ page }).withTags(tags).analyze());
  }
  await context.close();
}
await browser.close();
console.log(violations ? `FAIL: ${violations} violations` : "PASS: no violations");
process.exit(violations ? 1 : 0);
