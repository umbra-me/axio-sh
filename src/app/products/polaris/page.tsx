import type { CSSProperties } from "react";
import type { Metadata } from "next";
import PolarisMediaGallery, {
  PolarisMediaFrame,
  type PolarisMediaItem,
} from "@/components/PolarisMediaGallery";
import ProductHero from "@/components/ProductHero";
import { PRODUCTS } from "@/lib/products";

const P = PRODUCTS.polaris;

const HERO_MEDIA: PolarisMediaItem = {
  src: "/demos/polaris/calculator.jpg",
  kind: "image",
  alt: "Axio Polaris launcher calculating 120 divided by 4 as 30",
  eyebrow: "launcher · real app",
  title: "Act on the result in place.",
  description: "The development app evaluating a calculation in the launcher.",
};

const WALKTHROUGH_MEDIA: PolarisMediaItem[] = [
  {
    src: "/demos/polaris/timer-pause-resume.mp4",
    kind: "video",
    poster: "/demos/polaris/notch-timer.jpg",
    alt: "Screen recording of an Axio Polaris timer counting down, pausing and resuming",
    eyebrow: "11 second demo",
    title: "Pause and resume without leaving the notch.",
    description: "A short edited recording of a timer counting down, pausing and resuming.",
  },
  {
    src: "/demos/polaris/notch-notes.jpg",
    kind: "image",
    alt: "Axio Polaris expanded notch showing the Notes tab and a sample Inbox entry",
    eyebrow: "notch · notes",
    title: "Capture a thought at the top of the screen.",
    description: "An inbox for the thought you want to keep, right where you are.",
  },
];

export const metadata: Metadata = {
  title: P.name,
  description: `${P.tagline}. ${P.description}`,
  alternates: { canonical: "/products/polaris" },
};

export default function PolarisPage() {
  return (
    <div className="polaris-page" style={{ "--pc": P.color } as CSSProperties}>
      <ProductHero
        product={P}
        facts={["14-day free trial", "Apple Silicon · macOS 15+", "No subscription"]}
        headline={
          <>
            Your Mac,
            <br />
            <em>a little calmer.</em>
          </>
        }
        lede="Launch an app. Catch a thought. Make room to focus. Your everyday Mac tools, together in one native app."
        actions={
          <>
            <a className="btn btn--product" href="/downloads/polaris/Axio-Polaris-0.2.3.dmg">
              Download for Mac
            </a>
            <a className="btn btn--ghost" href="https://buy.stripe.com/dRm8wQ6GA7MWfcF4V73gk00">
              Buy once — A$59
            </a>
          </>
        }
        visual={<PolarisMediaFrame item={HERO_MEDIA} priority />}
      />

      <div className="container">
        <hr className="rule" />
      </div>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">One place to reach for</p>
            <h2 className="display display--md">
              Small tasks. Less switching.
            </h2>
            <p>
              Polaris lives in the menu bar and opens with a global launcher.
              Its tools share the same local data, so a timer started from the
              launcher can appear at the notch and a task captured there can be
              finished later without moving through another service.
            </p>
          </div>
          <div className="features">
            <article className="feature">
              <span className="artifact">launcher</span>
              <h3>Search actions as well as apps.</h3>
              <p>
                Launch applications, find open windows, run commands, calculate,
                convert, inspect developer text, create notes and tasks, control
                music, start timers, or give a command its own hotkey.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">notch · shelf</span>
              <h3>Keep live context at the edge.</h3>
              <p>
                Music, timers, calendar, files, notes, tasks, clipboard, camera,
                Shortcuts and chosen apps can live in a configurable island.
                The wings surface useful activity without opening the full panel.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">local productivity</span>
              <h3>Capture before the thought disappears.</h3>
              <p>
                Jot into a Markdown inbox, create a dated note, parse a natural
                language to-do, recover clipboard history, or take a screenshot.
                The core stores remain files on this Mac.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">focus</span>
              <h3>Decide the boundary before you begin.</h3>
              <p>
                Choose the apps to set aside, start now or later, add a
                recurring schedule, choose whether controls are locked, and keep
                deliberate break and early-exit paths available.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--polaris-media reveal" id="walkthrough">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Real app walkthrough</p>
            <h2 className="display display--md">One utility, several ways in.</h2>
            <p>
              Polaris is designed around short visits. Open the launcher for an
              action, expand the notch when you want a small workspace, or stay
              in Settings when you are shaping a Focus routine.
            </p>
          </div>
          <div className="polaris-demo-note">
            <span className="artifact">development build 84</span>
            <p>
              Real app captures with sample data from development build 84. The current release may look slightly different.
            </p>
          </div>
          <PolarisMediaGallery items={WALKTHROUGH_MEDIA} />
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Focus sessions</p>
            <h2 className="display display--md">Choose the rules while the choice is easy.</h2>
            <p>
              Choose the apps to set aside and how long you want to focus.
              Save your lists for next time, or build a recurring routine.
              Changes to a saved list won’t alter a session already in progress.
            </p>
          </div>
          <ol className="polaris-focus-flow">
            <li><span>1</span><div><h3>Build reusable lists</h3><p>Name a list and choose the Mac apps you want to set aside during a session. Website blocking is not included in this release.</p></div></li>
            <li><span>2</span><div><h3>Start now, later or on a schedule</h3><p>Sessions last from one minute to 24 hours. Recurring schedules choose weekdays, a start time, duration and named time zone; overlapping sessions combine their restrictions.</p></div></li>
            <li><span>3</span><div><h3>Let Polaris hold the line</h3><p>While a session is active, selected regular Mac apps are hidden and hidden again if reopened. Polaris records which apps it hid so it can restore only those apps at a break, expiry or relaunch.</p></div></li>
            <li><span>4</span><div><h3>Keep recovery deliberate</h3><p>Locked controls allow a one-minute correction window after starting. After that, optional recovery allows one five-minute break each local day and an early exit once every seven days; an unlocked session can be ended normally.</p></div></li>
          </ol>
          <div className="callout" style={{ marginTop: "1.5rem" }}>
            <strong>Focus supports attention; it is not device security.</strong>
            <p>
              Mac app enforcement is cooperative hiding, not process termination.
              Force quit, uninstall, another user account or administrative access
              can bypass it. Focus can be switched off to suspend an unlocked
              session, while an active locked session prevents that in the app. If
              Polaris is forcibly stopped and never reopened, an app it hid may
              remain hidden until opened again or restored manually.
            </p>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Local data and permissions</p>
            <h2 className="display display--md">Features ask when you use them.</h2>
            <p>
              Core utility and Focus state is stored on the Mac. Polaris requests
              macOS access at the point a feature needs it, so installing the app
              does not mean granting every permission up front.
            </p>
          </div>
          <div className="ledger-card">
            <table className="ledger">
              <thead><tr><th scope="col">Area</th><th scope="col">Access</th><th scope="col">Why it is used</th></tr></thead>
              <tbody>
                <tr><th scope="row">Calendar and Reminders</th><td className="state state--none">on first use</td><td>Show events, reminders, the Daily Brief and upcoming-event activity.</td></tr>
                <tr><th scope="row">Accessibility</th><td className="state state--none">feature dependent</td><td>Paste clipboard history into another app, manage windows and support optional notification and menu-overlap behavior.</td></tr>
                <tr><th scope="row">Screen Recording</th><td className="state state--none">capture only</td><td>Capture screenshots or screen recordings when you ask.</td></tr>
                <tr><th scope="row">Camera</th><td className="state state--none">mirror only</td><td>Show the notch Mirror preview while that tab is open.</td></tr>
                <tr><th scope="row">Input Monitoring</th><td className="state state--none">optional controls</td><td>Replace selected hardware-key HUDs and route media keys.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="note" style={{ marginTop: "1rem" }}>
            Requested online features can still use the network. Examples include
            an enabled lyrics lookup, a public-IP request, configured AI providers,
            licensing and signed update checks. Polaris does not claim that
            every optional tool is offline.
          </p>
        </div>
      </section>

      <section className="section reveal" id="status">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Availability</p>
            <h2 className="display display--md">Try Polaris free for 14 days.</h2>
            <p>
              A signed and notarised Mac app. Try it in your own routine, then buy a personal licence when you’re ready.
            </p>
          </div>
          <div className="polaris-pricing">
            <div>
              <p className="eyebrow">Yours for two Macs</p>
              <p className="polaris-pricing__price">A$59 <span>once</span></p>
              <p>Tax included. No subscription. Licence delivered by email.</p>
              <a className="btn btn--product" href="https://buy.stripe.com/dRm8wQ6GA7MWfcF4V73gk00">Buy Polaris</a>
            </div>
            <div className="polaris-pricing__trial">
              <h3>Make yourself at home first.</h3>
              <p>Start your 14-day trial in the app. No card needed, and no automatic charge when it ends.</p>
              <a className="btn btn--ghost" href="/downloads/polaris/Axio-Polaris-0.2.3.dmg">Download free trial</a>
              <small>Version 0.2.3 · Apple Silicon · macOS 15+</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Questions</p>
            <h2 className="display display--md">Before you start.</h2>
          </div>
          <div className="polaris-faq">
            <details><summary>Can I download Polaris today?</summary><p>Yes. Download the signed and notarised Mac app above, open the disk image and drag Axio Polaris to Applications. The 14-day trial starts only when you choose Start Trial. You can buy a personal licence using the Buy once link above.</p></details>
            <details><summary>How do licensing and support work?</summary><p>The A$59 one-time personal licence covers two Macs. Initial activation needs internet; activated copies can work offline for up to 30 days after verification. Purchase and licence recovery use your checkout email. For product help, email <a href="mailto:support@umbra.me">support@umbra.me</a>.</p></details>
            <details><summary>Where are the licence and refund details?</summary><p>Read the <a href="/products/polaris/licence">personal licence, delivery and refund information</a> and <a href="/legal/privacy#polaris">Polaris privacy details</a>. Billing receipts and transaction support are provided through Stripe Managed Payments and Link.</p></details>
            <details><summary>Does Polaris block websites across my Mac?</summary><p>No. The Mac app stores domain intent and exports a session snapshot. The separate Chromium companion is still in development and is not included in this download. Polaris does not currently provide website blocking.</p></details>
            <details><summary>Can I get out of a locked Focus session?</summary><p>There is a one-minute correction window after starting. After that, optional recovery can allow one five-minute break per local day and one early exit every seven days. Locked controls prevent normal in-app exits, but they are not tamper-proof and cannot stop force quit, uninstall or administrative access.</p></details>
            <details><summary>Does Polaris upload my notes, tasks or clipboard?</summary><p>The core stores are local files. There is no Polaris cloud sync. Individual online features send only what their action requires; configured AI actions, for example, send the selected request to the provider you chose.</p></details>
            <details><summary>Will it work on an Intel Mac or older macOS?</summary><p>The Mac download requires Apple Silicon with macOS 15 or newer. Other Mac configurations are not currently offered.</p></details>
            <details><summary>Is Focus the same as Pomodoro?</summary><p>They are separate tools. Pomodoro alternates timed work and break phases and tracks daily minutes. Focus sessions apply selected app restrictions and exportable website rules for a defined interval.</p></details>
          </div>
        </div>
      </section>
    </div>
  );
}
