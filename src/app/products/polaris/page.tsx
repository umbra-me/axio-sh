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
    src: "/demos/polaris/timer-create.jpg",
    kind: "image",
    alt: "Axio Polaris New Timer panel with a two minute timer named tea",
    eyebrow: "new timer",
    title: "Describe the timer you want.",
    description: "A two-minute timer named Tea, parsed inside the development app.",
  },
  {
    src: "/demos/polaris/notch-timer.jpg",
    kind: "image",
    alt: "Axio Polaris expanded notch showing an active countdown timer",
    eyebrow: "notch · timer",
    title: "Keep the countdown in reach.",
    description: "The same running timer in the expanded notch on the VM desktop.",
  },
  {
    src: "/demos/polaris/notch-notes.jpg",
    kind: "image",
    alt: "Axio Polaris expanded notch showing the Notes tab and a sample Inbox entry",
    eyebrow: "notch · notes",
    title: "Capture a thought at the top of the screen.",
    description: "The real Notes module with a sample Inbox line in the isolated VM.",
  },
  {
    src: "/demos/polaris/timer-pause-resume.mp4",
    kind: "video",
    poster: "/demos/polaris/notch-timer.jpg",
    alt: "Screen recording of an Axio Polaris timer counting down, pausing and resuming",
    eyebrow: "11 second demo",
    title: "Pause and resume without leaving the notch.",
    description: "Recorded from development build 84 at five frames per second; time gaps between edited segments are intentional.",
  },
  {
    src: "/demos/polaris/focus-overview.jpg",
    kind: "image",
    alt: "Axio Polaris Focus settings enabled with a Deep Work blocklist",
    eyebrow: "focus · overview",
    title: "Keep the session controls and limits visible.",
    description: "Real development settings with sample data; this capture is a walkthrough, not full feature acceptance.",
  },
  {
    src: "/demos/polaris/focus-blocklist.jpg",
    kind: "image",
    alt: "Axio Polaris blocklist editor containing sample website rules and an allowed domain",
    eyebrow: "focus · blocklist",
    title: "Name the boundary once, then reuse it.",
    description: "A sample Deep Work list with domain rules and an exception in the real blocklist editor.",
  },
];

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
        lede="Polaris brings the tools that usually scatter across a Mac into one native utility: a launcher for doing, a notch for what is happening now, local notes and tasks, and Focus sessions with explicit recovery controls."
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
              Open it, handle the small thing, and return to your work.
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
                Combine reusable app and domain lists, start now or later, add a
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
              These unretouched captures show the full VM window with sample data
              in development build 84. They are a product walkthrough,
              not complete coverage of every feature; labels and spacing may
              change in later versions.
            </p>
          </div>
          <PolarisMediaGallery items={WALKTHROUGH_MEDIA} />
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="polaris-chapter">
            <div className="polaris-chapter__intro">
              <p className="eyebrow">Launcher and utilities</p>
              <h2 className="display display--md">A command bar that finishes the job.</h2>
              <p className="lede">
                Search ranks apps, windows and commands together. Many results
                work in place: a calculation can be copied, a timer can start,
                and a task can be parsed without opening a separate application.
              </p>
            </div>
            <div className="polaris-detail-grid">
              <article>
                <span className="polaris-detail-grid__index">01</span>
                <h3>Type what you mean</h3>
                <p>
                  Try a calculation, a colour, a unit conversion, a duration such
                  as <code>timer 25m</code>, or a to-do with a due date, priority,
                  tag and project. Results appear while you type.
                </p>
              </article>
              <article>
                <span className="polaris-detail-grid__index">02</span>
                <h3>Go deeper when needed</h3>
                <p>
                  Commands open focused screens for timers, tasks, notes, the
                  Daily Brief, clipboard history, downloads and developer tools.
                  Keyboard actions keep copy, paste and navigation close.
                </p>
              </article>
              <article>
                <span className="polaris-detail-grid__index">03</span>
                <h3>Make frequent actions immediate</h3>
                <p>
                  Assign a global shortcut to a launcher command. Capture modes,
                  notch access and the commands you use most can then run without
                  searching for them again.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="split split--reverse">
            <div className="split__text">
              <p className="eyebrow">Notch, timers and shelf</p>
              <h2 className="display display--md">What is active stays glanceable.</h2>
              <p className="lede">
                The notch is a compact home for ongoing work, with modules inside
                the island and activity pills beside it. You choose what appears,
                where it sits and how much detail it shows.
              </p>
              <ul>
                <li>
                  <span className="polaris-list-mark">01</span>
                  <span><b>Run time visibly.</b> Countdowns, stopwatch laps and Pomodoro phases use the same timer engine as the launcher and continue across an ordinary quit and relaunch.</span>
                </li>
                <li>
                  <span className="polaris-list-mark">02</span>
                  <span><b>Control what is playing.</b> See artwork and track details, scrub, play, pause, skip, shuffle, repeat and adjust volume for supported players.</span>
                </li>
                <li>
                  <span className="polaris-list-mark">03</span>
                  <span><b>Carry files between apps.</b> Drop files, text, images or links onto the shelf, pin what should survive a restart, use Quick Look, then drag items back out.</span>
                </li>
                <li>
                  <span className="polaris-list-mark">04</span>
                  <span><b>Use the space your way.</b> Reorder tabs, place them on either side, tune the island width, choose activity priority and respect the system Reduce Motion setting.</span>
                </li>
              </ul>
            </div>
            <div className="polaris-module-list" aria-label="Available notch modules">
              <span>Music</span><span>Timers</span><span>Calendar</span><span>Shelf</span><span>Notes</span>
              <span>To-dos</span><span>Clipboard</span><span>Mirror</span><span>Shortcuts</span><span>Apps</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Notes, to-dos and clipboard</p>
            <h2 className="display display--md">A small system for the things between projects.</h2>
            <p>
              These tools are deliberately lightweight. They handle the fragment
              you need to keep, then let you return to the application where the
              deeper work belongs.
            </p>
          </div>
          <div className="polaris-workflows">
            <article>
              <span className="artifact">jot remember the API edge case</span>
              <h3>Append a thought to your inbox.</h3>
              <p>
                Quick Capture adds a timestamped line to <code>Inbox.md</code>.
                Notes are ordinary Markdown files, searchable by title and body,
                and the folder can be changed to an existing notes directory.
              </p>
              <small>Today&apos;s Note creates or opens the file for the date.</small>
            </article>
            <article>
              <span className="artifact">todo send draft tomorrow 5pm !high</span>
              <h3>Turn natural language into a task.</h3>
              <p>
                Polaris understands dates, times, priorities, tags and projects,
                then sorts work into Overdue, Today, Upcoming and No date. Tasks
                can be completed, edited, snoozed, reopened or given a note.
              </p>
              <small>The notch and launcher read the same local task store.</small>
            </article>
            <article>
              <span className="artifact">clipboard history</span>
              <h3>Recover, pin, copy or paste.</h3>
              <p>
                Search recent clipboard items, keep important ones pinned and
                paste an item back into the app you came from. Clipboard capture
                can be paused and sensitive applications can be excluded.
              </p>
              <small>Pasting into another app requires Accessibility access.</small>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Focus sessions</p>
            <h2 className="display display--md">Choose the rules while the choice is easy.</h2>
            <p>
              Focus is a local coordinator for timed sessions. It combines named
              blocklists, selected Mac applications and optional website rules
              into an immutable session snapshot, so editing a list later does
              not quietly change a session already in progress.
            </p>
          </div>
          <ol className="polaris-focus-flow">
            <li><span>1</span><div><h3>Build reusable lists</h3><p>Name a list, choose running or installed Mac apps, add public domains and exceptions, or express an intent to block all sites when the session is imported into the browser companion.</p></div></li>
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
          <div className="split">
            <div className="split__text">
              <p className="eyebrow">Chromium companion</p>
              <h2 className="display display--md">Website rules cross over as a snapshot.</h2>
              <p className="lede">
                The Mac app does not filter websites. To apply a Focus session in
                Chrome, Edge, Brave or another Chromium browser, export that
                session to JSON and import it into the separate local extension.
              </p>
              <ul>
                <li><span className="polaris-list-mark">1</span>Export an active or upcoming session from Polaris.</li>
                <li><span className="polaris-list-mark">2</span>Import the JSON file into the unpacked browser companion.</li>
                <li><span className="polaris-list-mark">3</span>The extension applies top-level HTTP and HTTPS navigation rules and keeps its own session clock locally.</li>
              </ul>
            </div>
            <div className="polaris-boundary-card">
              <span className="artifact">manual snapshot</span>
              <h3>What does not cross over</h3>
              <p>
                The export omits notes, ratings, selected Mac apps, audio paths
                and activity data. Changes made on the Mac after export do not
                update the browser, and ending or taking a break from the Mac
                session does not alter the imported browser session.
              </p>
              <hr />
              <h3>What the companion can do</h3>
              <p>
                Alongside imported sessions, it supports local timed and recurring
                sessions, visit delays, per-domain daily budgets and optional
                approximate foreground-use totals for the current day.
              </p>
              <small>It can be disabled or removed with normal browser controls and is not yet packaged for public distribution.</small>
            </div>
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
                <tr><th scope="row">Browser companion</th><td className="state state--none">browser local</td><td>Keep rules, sessions, budgets and optional usage in Chromium extension storage; it has no Polaris cloud backend.</td></tr>
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
              Download signed and notarised version 0.2.3 (103) for Apple Silicon
              Macs running macOS 15 or newer. Start your 14-day trial explicitly
              in the app; no payment card is needed and it never charges automatically.
              The personal licence is A$59 once, tax included, for two Macs, with no
              subscription. Your licence key arrives by email after purchase.
            </p>
          </div>
          <div className="ledger-card">
            <table className="ledger"><tbody>
              <tr><th scope="row">Mac app</th><td className="state state--met">implemented</td><td>Native launcher, notch, shelf, productivity tools, capture and local Focus sessions are included in the Mac download.</td></tr>
              <tr><th scope="row">Browser companion</th><td className="state state--unmet">development source</td><td>The local Chromium extension and policy tests exist, but an installed-browser acceptance run and packaged distribution are still outstanding.</td></tr>
              <tr><th scope="row">Other platforms</th><td className="state state--none">not built</td><td>There is no iPhone, iPad, Windows or Linux client, cloud sync, cross-device control or web dashboard.</td></tr>
            </tbody></table>
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
            <details><summary>Does Polaris block websites across my Mac?</summary><p>No. The Mac app stores domain intent and exports a session snapshot. Website blocking is performed only by the separate Chromium companion in the browser where it is installed.</p></details>
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
