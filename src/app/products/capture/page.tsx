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
    <div style={{ "--pc": P.color } as CSSProperties}>
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
            <a className="btn btn--product" href="#download">
              Download {CAPTURE_VERSION}
              <IconDownload />
            </a>
            <a className="btn btn--ghost" href={REPO} rel="noopener">
              Repository
              <IconArrowUpRight />
            </a>
          </>
        }
        visual={<CaptureMock />}
      />

      <div className="container">
        <hr className="rule" />
      </div>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What it does</p>
            <h2 className="display display--md">The ShareX basics, done properly.</h2>
            <p>
              The first cut captures a region, lets you annotate it, and keeps
              itself updated. Window and full-screen capture, recording,
              uploaders and the agent-facing API are later milestones, not
              missing pieces of this one.
            </p>
          </div>
          <div className="features">
            <article className="feature">
              <span className="artifact">Ctrl+Shift+2 · ⌘⇧2</span>
              <h3>One hotkey, one drag.</h3>
              <p>
                The hotkey, the tray icon, or running <code>axio-capture</code>{" "}
                again starts a capture. Escape or a right-click cancels it. The
                chord is configurable in Tauri’s accelerator syntax and takes
                effect as soon as you save.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">A L R E P H T N B</span>
              <h3>Nine tools, one key each.</h3>
              <p>
                Arrows, lines, rectangles, ellipses, freehand pen, highlighter,
                text, numbered steps and blur. Hold Shift to constrain a shape;
                undo with the usual key. The last tool, colour and stroke width
                are remembered.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">%year%/%month%/%day%</span>
              <h3>File names that sort themselves.</h3>
              <p>
                A pattern relative to the save folder, where a slash creates a
                subfolder. Twenty tokens, a live example in the settings panel,
                and <code>%n%</code>{" "}for the smallest number that keeps the name
                unused.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">after a capture</span>
              <h3>Skip the editor when you know what you want.</h3>
              <p>
                Open the editor, copy to the clipboard, save to the folder, or
                both. The editor can close itself after a copy or a save, and a
                desktop notification can say what happened.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">latest.json · minisign</span>
              <h3>Updates you can verify.</h3>
              <p>
                Installed copies check GitHub Releases shortly after launch and
                every six hours. Every update artifact is signature-checked
                against the public key shipped in the app before it is
                installed. The check can be turned off.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">LSUIElement</span>
              <h3>A menu-bar app that stays out of the Dock.</h3>
              <p>
                On macOS it lives in the menu bar by default. The Dock icon can
                be always, never, or only while the editor is open. Launch at
                login is a Login Item, a Run key, or an autostart entry.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal" id="status">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Verification</p>
            <h2 className="display display--md">
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
                  <th scope="col" className="label">
                    Platform
                  </th>
                  <th scope="col" className="label">
                    State
                  </th>
                  <th scope="col" className="label">
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
          <div className="callout callout--warn" style={{ marginTop: "1.5rem" }}>
            <strong>macOS bundles are signed but not notarised.</strong>
            <p>
              On another Mac, the first launch needs right-click, Open. The app
              then asks for Screen Recording permission, opens the right pane,
              and relaunches itself once you flip the toggle. That toggle is the
              one thing macOS reserves for you.
            </p>
          </div>
        </div>
      </section>

      <section className="section reveal" id="download">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Download</p>
            <h2 className="display display--md">Axio Capture {CAPTURE_VERSION}</h2>
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
          <p className="note">
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
