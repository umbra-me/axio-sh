import { Callout, FeatureGrid } from "@tessera/marketing";
import { Button } from "@tessera/ui";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import CaptureMock from "@/components/CaptureMock";
import { IconArrowUpRight, IconDownload } from "@/components/Icons";
import ProductHero from "@/components/ProductHero";
import {
  CAPTURE_DOWNLOADS,
  CAPTURE_RELEASE,
  CAPTURE_VERSION,
  PRODUCTS,
} from "@/lib/products";

const P = PRODUCTS.capture;
const REPO = P.repo!;

export const metadata: Metadata = {
  title: "Axio Capture",
  description: `${P.tagline}. ${P.description}`,
  alternates: { canonical: "/products/capture" },
};

export default function CapturePage() {
  return (
    <div style={{ "--ts-product-color": P.color } as CSSProperties}>
      <ProductHero
        product={P}
        headline={
          <>
            Press. Drag.
            <br />
            <em>Draw on it.</em>
          </>
        }
        lede={P.description}
        actions={
          <>
            <Button asChild size="lg" variant="primary" tone="product">
<a href="#download">
              Download {CAPTURE_VERSION}
              <IconDownload />
            </a>
</Button>
            <Button asChild size="lg" variant="secondary">
<a href={REPO} rel="noopener">
              Repository
              <IconArrowUpRight />
            </a>
</Button>
          </>
        }
        visual={<CaptureMock />}
      />

      <div className="ts-container">
        <hr className="ts-separator" />
      </div>

      <section className="ts-section">
        <div className="ts-container">
          <div className="site-head">
            <p className="ts-eyebrow" data-mono="">What it does</p>
            <h2 className="ts-display" data-size="section">The ShareX basics, done properly.</h2>
            <p>
              The first cut captures a region, lets you annotate it, and keeps
              itself updated. Window and full-screen capture, recording,
              uploaders and the agent-facing API are later milestones, not
              missing pieces of this one.
            </p>
          </div>
          <FeatureGrid variant="bordered" items={[{ kicker: "Ctrl+Shift+2 · ⌘⇧2", title: <>One hotkey, one drag.</>, body: <>The hotkey, the tray icon, or running <code>axio-capture</code>{" "} again starts a capture. Escape or a right-click cancels it. The chord is configurable in Tauri’s accelerator syntax and takes effect as soon as you save.</> }, { kicker: "A L R E P H T N B", title: <>Nine tools, one key each.</>, body: <>Arrows, lines, rectangles, ellipses, freehand pen, highlighter, text, numbered steps and blur. Hold Shift to constrain a shape; undo with the usual key. The last tool, colour and stroke width are remembered.</> }, { kicker: "%year%/%month%/%day%", title: <>File names that sort themselves.</>, body: <>A pattern relative to the save folder, where a slash creates a subfolder. Twenty tokens, a live example in the settings panel, and <code>%n%</code>{" "}for the smallest number that keeps the name unused.</> }, { kicker: "after a capture", title: <>Skip the editor when you know what you want.</>, body: <>Open the editor, copy to the clipboard, save to the folder, or both. The editor can close itself after a copy or a save, and a desktop notification can say what happened.</> }, { kicker: "latest.json · minisign", title: <>Updates you can verify.</>, body: <>Installed copies check GitHub Releases shortly after launch and every six hours. Every update artifact is signature-checked against the public key shipped in the app before it is installed. The check can be turned off.</> }, { kicker: "LSUIElement", title: <>A menu-bar app that stays out of the Dock.</>, body: <>On macOS it lives in the menu bar by default. The Dock icon can be always, never, or only while the editor is open. Launch at login is a Login Item, a Run key, or an autostart entry.</> }]} />        </div>
      </section>

      <section className="ts-section" id="status">
        <div className="ts-container">
          <div className="site-head">
            <p className="ts-eyebrow" data-mono="">Verification</p>
            <h2 className="ts-display" data-size="section">
              What {CAPTURE_VERSION} rests on.
            </h2>
            <p>
              Released for all three platforms on 2 September 2026. This is
              what that claim is backed by, and what it is not.
            </p>
          </div>
          <div className="ledger-card">
            <table className="ledger">
              <thead>
                <tr>
                  <th scope="col" className="ts-text" data-mono="" data-size="xs">
                    Platform
                  </th>
                  <th scope="col" className="ts-text" data-mono="" data-size="xs">
                    State
                  </th>
                  <th scope="col" className="ts-text" data-mono="" data-size="xs">
                    Basis
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">macOS, Apple Silicon</th>
                  <td className="state state--met">verified</td>
                  <td>
                    By the owner: region capture and overlay placement, the
                    Screen Recording recovery flow, the editor and its tools,
                    settings persistence, real window close, and menu-bar mode.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Windows</th>
                  <td className="state state--unmet">built, not run</td>
                  <td>
                    The installers compile, bundle and sign in CI. Nobody has
                    launched them yet.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Linux</th>
                  <td className="state state--unmet">built, not run</td>
                  <td>
                    Same as Windows, and the least certain: on Wayland, capture
                    goes through the desktop portal and the hotkey depends on
                    the compositor implementing the GlobalShortcuts portal.
                  </td>
                </tr>
                <tr>
                  <th scope="row">In-app updating</th>
                  <td className="state state--unmet">wired, not exercised</td>
                  <td>
                    The feed is live, but nothing older than {CAPTURE_VERSION}{" "}
                    exists to update from. The first patch release is the test.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Callout tone="warning" style={{ marginTop: "1.5rem" }} title={<>macOS bundles are signed but not notarised.</>}>
            <p>
              On another Mac, the first launch needs right-click, Open. The app
              then asks for Screen Recording permission, opens the right pane,
              and relaunches itself once you flip the toggle. That toggle is the
              one thing macOS reserves for you.
            </p>
          </Callout>
        </div>
      </section>

      <section className="ts-section" id="download">
        <div className="ts-container">
          <div className="site-head">
            <p className="ts-eyebrow" data-mono="">Download</p>
            <h2 className="ts-display" data-size="section">Axio Capture {CAPTURE_VERSION}</h2>
            <p>
              Installers for every platform, from{" "}
              <a href={CAPTURE_RELEASE} rel="noopener">
                the release on GitHub
              </a>
              . Each updater artifact ships with its signature beside it.
            </p>
          </div>
          <div className="dl">
            {CAPTURE_DOWNLOADS.map((d) => (
              <a key={d.file} className="dl__row" href={d.href} rel="noopener">
                <b>
                  {d.platform}
                  <small>{d.note}</small>
                </b>
                <code>{d.file}</code>
                <IconDownload />
              </a>
            ))}
          </div>
          <p className="ts-text ts-note" data-tone="muted">
            Building it yourself needs Rust 1.85 or newer, Node 22, pnpm and
            the Tauri platform dependencies for your OS. The{" "}
            <a href={`${REPO}#build`} rel="noopener">
              README
            </a>{" "}
            has the exact list, including the Linux packages capture needs.
          </p>
        </div>
      </section>
    </div>
  );
}
