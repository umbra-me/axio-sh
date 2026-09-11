import type { Metadata } from "next";
import Image from "next/image";
import PolarisVideo from "@/components/PolarisVideo";

const DOWNLOAD = "/downloads/polaris/Axio-Polaris-0.2.4.dmg";
const BUY = "https://buy.stripe.com/dRm8wQ6GA7MWfcF4V73gk00";
const description = "Timers, notes, a launcher and room to focus. Everyday Mac tools, together in one native app. Try Polaris free for 14 days. A$59 once, for two Macs.";
export const metadata: Metadata = {
  title: "Polaris — Your Mac, a little calmer",
  description,
  alternates: { canonical: "/products/polaris" },
  openGraph: { title: "Polaris — Your Mac, a little calmer", description, url: "https://axio.sh/products/polaris", images: [{ url: "/demos/polaris/social.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Polaris — Your Mac, a little calmer", description, images: ["/demos/polaris/social.png"] },
};

export default function PolarisPage() {
  return (
    <div className="polaris-release">
      <nav className="polaris-subnav container" aria-label="Polaris">
        <a href="#polaris"><Image src="/demos/polaris/icon.svg" alt="" width={36} height={36} />Polaris</a>
        <div><a href="#in-action">In action</a><a href="#pricing">Pricing</a><a href="#questions">Questions</a></div>
      </nav>
      <section className="polaris-intro container" id="polaris">
        <p className="polaris-kicker">A little more Mac. A little less friction.</p>
        <h1>Your Mac,<br /><span>a little calmer.</span></h1>
        <p className="polaris-lede">Start a timer. Catch a thought. Get back to it.<br className="polaris-desktop-break" /> Your everyday tools, together in one native Mac app.</p>
        <div className="polaris-actions"><a className="polaris-button" href={DOWNLOAD}>Download free trial <span aria-hidden="true">↓</span></a><a className="polaris-button polaris-button--quiet" href={BUY}>Buy once · A$59</a></div>
        <p className="polaris-fine">14 days free · No card needed · Apple Silicon · macOS 15+</p>
        <div className="polaris-hero-film"><PolarisVideo name="introduction" label="Polaris introduction: start a timer, pause, save a note and return to it" duration="20 seconds" /></div>
        <p className="polaris-film-note">The real app. Short, silent demos with sample data.</p>
      </section>
      <section className="polaris-section container" id="in-action">
        <div className="polaris-section-heading"><p className="polaris-kicker">Right where you need it</p><h2>Small moments.<br /><span>Less switching.</span></h2><p>Keep the task in front of you. Let Polaris take care of the little things around it.</p></div>
        <article className="polaris-story"><div className="polaris-story__copy"><span className="polaris-index">01 / TIMERS</span><h3>Make room<br />for 25 minutes.</h3><p>Open the notch, pick a timer and begin. Pause when you need a moment. Resume when you’re ready.</p><p className="polaris-detail">Timers and Pomodoro, close at hand.</p></div><PolarisVideo name="timer" label="A notch timer starts, pauses and resumes" duration="12 seconds" /></article>
        <article className="polaris-story polaris-story--reverse"><div className="polaris-story__copy"><span className="polaris-index">02 / NOTES</span><h3>Catch it.<br />Keep going.</h3><p>The thought that arrives halfway through something else? Give it a home in your Markdown inbox, then get back to what you were doing.</p><p className="polaris-detail">Your notes stay on your Mac.</p></div><PolarisVideo name="notes" label="Save a short note from the notch, then return to the timer" duration="11 seconds" /></article>
        <article className="polaris-story"><div className="polaris-story__copy"><span className="polaris-index">03 / LAUNCHER</span><h3>A few keystrokes.<br />One less detour.</h3><p>Open apps, calculate, find a command or start a timer. One launcher for the actions you reach for throughout the day.</p><p className="polaris-detail">Make frequent actions your own with hotkeys.</p></div><PolarisVideo name="launcher" label="Start a timer directly from the Polaris launcher" duration="13 seconds" /></article>
      </section>
      <section className="polaris-toolkit"><div className="container polaris-toolkit__inner"><div><p className="polaris-kicker">One familiar place</p><h2>Less to juggle.<br />More within reach.</h2></div><div className="polaris-tools"><article><h3>Clipboard & capture</h3><p>Find something you copied, grab a screenshot and carry on.</p></article><article><h3>Tasks & daily context</h3><p>Keep notes, tasks, calendar events and reminders close by.</p></article><article><h3>Windows & shortcuts</h3><p>Arrange your workspace and put useful actions on a hotkey.</p></article><article><h3>A little room to focus</h3><p>Choose Mac apps to hide during a Focus session. Start now or set a recurring routine.</p></article></div></div></section>
      <section className="polaris-section container polaris-principles"><div><p className="polaris-kicker">At home on your Mac</p><h2>Your tools.<br /><span>Your say.</span></h2></div><div><article><h3>Local at the core.</h3><p>Your notes, tasks and clipboard live on this Mac. There’s no Polaris cloud sync. Optional online features connect only as their actions require.</p></article><article><h3>Permissions with a purpose.</h3><p>Enable the features you want and grant the macOS access they need. You don’t have to enable everything to get started.</p></article><article><h3>Native, signed and notarised.</h3><p>Built for Apple Silicon with signed automatic updates. A Mac utility that belongs on your Mac.</p></article><a className="polaris-text-link" href="/legal/privacy#polaris">Read the privacy details <span aria-hidden="true">↗</span></a></div></section>
      <section className="polaris-section container" id="pricing"><div className="polaris-offer"><div><Image src="/demos/polaris/icon.svg" width={88} height={88} alt="Polaris compass icon" /><p className="polaris-kicker">Make yourself at home</p><h2>A calmer Mac.<br />No subscription.</h2><p>Try Polaris in your own routine for 14 days.<br />Buy when you’re ready.</p><a className="polaris-button polaris-button--quiet" href={DOWNLOAD}>Download free trial <span aria-hidden="true">↓</span></a><small>Version 0.2.4 · Apple Silicon · macOS 15+</small></div><div className="polaris-offer__purchase"><p className="polaris-kicker">Personal licence</p><p className="polaris-price">A$59<span>once</span></p><ul><li>Use on two Macs</li><li>Tax included</li><li>Licence delivered by email</li><li>No recurring payments</li></ul><a className="polaris-button" href={BUY}>Buy Polaris <span aria-hidden="true">↗</span></a><p className="polaris-fine">Your free trial never automatically charges you. Your statement shows this purchase as Link.com* Axio.sh, because Stripe handles payment and tax for Axio.</p><a className="polaris-text-link" href="/products/polaris/licence">Licence & refund details</a></div></div></section>
      <section className="polaris-section container polaris-questions" id="questions"><div><p className="polaris-kicker">A few useful answers</p><h2>Before you<br /><span>settle in.</span></h2><p>Something else on your mind?</p><a className="polaris-text-link" href="mailto:support@umbra.me">support@umbra.me ↗</a></div>
          <div className="polaris-faq">
            <details><summary>Can I download Polaris today?</summary><p>Yes. Download the signed and notarised Mac app above, open the disk image and drag Axio Polaris to Applications. The 14-day trial starts only when you choose Start Trial. You can buy a personal licence using the Buy once link above.</p></details>
            <details><summary>How do licensing and support work?</summary><p>The A$59 one-time personal licence covers two Macs. Initial activation needs internet; activated copies can work offline for up to 30 days after verification. Purchase and licence recovery use your checkout email. If you no longer have a Mac you activated, you can <a href="https://axio.sh/polaris-license/seats">release its slot</a> without contacting us. For product help, email <a href="mailto:support@umbra.me">support@umbra.me</a>.</p></details>
            <details><summary>Where are the licence and refund details?</summary><p>Read the <a href="/products/polaris/licence">personal licence, delivery and refund information</a> and <a href="/legal/privacy#polaris">Polaris privacy details</a>. Billing receipts and transaction support are provided through Stripe Managed Payments and Link.</p></details>
            <details><summary>Does Polaris block websites across my Mac?</summary><p>No. Focus works with Mac apps. Website blocking is not included in this release.</p></details>
            <details><summary>Can I get out of a locked Focus session?</summary><p>There is a one-minute correction window after starting. After that, optional recovery can allow one five-minute break per local day and one early exit every seven days. Locked controls prevent normal in-app exits, but they are not tamper-proof and cannot stop force quit, uninstall or administrative access.</p></details>
            <details><summary>Does Polaris upload my notes, tasks or clipboard?</summary><p>The core stores are local files. There is no Polaris cloud sync. Individual online features send only what their action requires; configured AI actions, for example, send the selected request to the provider you chose.</p></details>
            <details><summary>Will it work on an Intel Mac or older macOS?</summary><p>The Mac download requires Apple Silicon with macOS 15 or newer. Other Mac configurations are not currently offered.</p></details>
            <details><summary>Is Focus the same as Pomodoro?</summary><p>They are separate tools. Pomodoro alternates timed work and break phases and tracks daily minutes. Focus sessions apply selected app restrictions for a defined interval.</p></details>
          </div>
      </section>
    </div>
  );
}
