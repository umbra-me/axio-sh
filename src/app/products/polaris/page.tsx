import type { CSSProperties } from "react";
import type { Metadata } from "next";
import PolarisMock from "@/components/PolarisMock";
import ProductHero from "@/components/ProductHero";
import { PRODUCTS } from "@/lib/products";

const P = PRODUCTS.polaris;

export const metadata: Metadata = {
  title: P.name,
  description: `${P.tagline}. ${P.description}`,
  alternates: { canonical: "/products/polaris" },
};

export default function PolarisPage() {
  return (
    <div style={{ "--pc": P.color } as CSSProperties}>
      <ProductHero
        product={P}
        headline={
          <>
            Your Mac, gathered.
            <br />
            <em>Your attention, yours.</em>
          </>
        }
        lede={P.description}
        actions={
          <a className="btn btn--ghost" href="#status">
            Development status
          </a>
        }
        visual={<PolarisMock />}
      />

      <div className="container">
        <hr className="rule" />
      </div>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">One place to reach for</p>
            <h2 className="display display--md">
              The useful edges of a Mac, kept close.
            </h2>
            <p>
              Polaris is built as a native menu bar app. Its launcher opens the
              things you need now; the notch and shelf keep live context in view
              without turning the desktop into another dashboard.
            </p>
          </div>
          <div className="features">
            <article className="feature">
              <span className="artifact">launcher</span>
              <h3>Start from one field.</h3>
              <p>
                Launch apps, search commands, create notes and to-dos, check
                calendar items, control music, start timers and get back to the
                thing you meant to do.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">notch · shelf</span>
              <h3>Keep the current thing nearby.</h3>
              <p>
                Now playing, timers, upcoming events and other live activities
                can sit at the notch. The shelf holds files and snippets for the
                short trip between apps.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">clipboard · capture</span>
              <h3>Pick up what just passed through.</h3>
              <p>
                Clipboard history makes recent text and files reachable again.
                Screen capture, quick notes and to-dos turn small interruptions
                into something you can finish or set aside.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">focus</span>
              <h3>Make a session concrete.</h3>
              <p>
                Start now or schedule later, choose reusable blocklists, add
                recurrence and notes, and take a timed break. Polaris can hide
                selected Mac apps while the session is active and restore the
                ones it hid afterward.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="split">
            <div className="split__text">
              <p className="eyebrow">Website focus</p>
              <h2 className="display display--md">
                Browser rules, still on your machine.
              </h2>
              <p className="lede">
                A local Chromium companion can block top-level website visits,
                delay a visit, apply per-domain daily budgets and show today’s
                approximate foreground use. A Polaris session can be exported
                and imported as a snapshot.
              </p>
            </div>
            <div className="card card--static">
              <span className="artifact">local companion</span>
              <h3>A boundary you can see.</h3>
              <p>
                The companion is not packaged for public release. It has no live
                sync with the Mac app, no cloud service, and no native system-wide
                website filter. It can be disabled through normal browser controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="status">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Status</p>
            <h2 className="display display--md">
              Useful now. Still a development build.
            </h2>
            <p>
              Polaris is in private development for Apple Silicon Macs running
              macOS 15 or newer. Public downloads are not available yet.
            </p>
          </div>
          <div className="ledger-card">
            <table className="ledger">
              <tbody>
                <tr>
                  <th scope="row">Available</th>
                  <td className="state state--met">implemented</td>
                  <td>
                    Launcher, notch, music, timers, calendar, shelf, notes,
                    to-dos, clipboard, capture and local Focus sessions.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Distribution</th>
                  <td className="state state--none">private</td>
                  <td>
                    No public download, public repository, notarised release or
                    customer update channel.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Focus strength</th>
                  <td className="state state--unmet">cooperative</td>
                  <td>
                    App hiding is cooperative and website controls live in a
                    separate Chromium companion; neither is tamper-proof.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Future platforms</th>
                  <td className="state state--none">not built</td>
                  <td>
                    No cloud sync, mobile or Windows client, or cross-device
                    controls yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
