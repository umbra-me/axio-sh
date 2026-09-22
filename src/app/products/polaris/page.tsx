import { Faq, FeatureGrid, Plan, PricingGrid, SectionHeader } from "@tessera/marketing";
import { Button } from "@tessera/ui";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { IconArrowUpRight, IconDownload, PRODUCT_ICONS } from "@/components/Icons";
import PolarisVideo from "@/components/PolarisVideo";
import StatusBadge from "@/components/StatusBadge";
import {
  POLARIS_BUY,
  POLARIS_DOWNLOAD,
  POLARIS_PRICE,
  POLARIS_VERSION,
  PRODUCTS,
} from "@/lib/products";

const P = PRODUCTS.polaris;
const Icon = PRODUCT_ICONS.polaris;

const description = `Timers, notes, a launcher and room to focus. Everyday Mac tools, together in one native app. Try Polaris free for 14 days. ${POLARIS_PRICE} once, for two Macs.`;

export const metadata: Metadata = {
  title: "Polaris — Your Mac, a little calmer",
  description,
  alternates: { canonical: "/products/polaris" },
  openGraph: {
    title: "Polaris — Your Mac, a little calmer",
    description,
    url: "https://axio.sh/products/polaris",
    images: [{ url: "/demos/polaris/social.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polaris — Your Mac, a little calmer",
    description,
    images: ["/demos/polaris/social.png"],
  },
};

// The three films, each beside the words for what it shows. The label is the
// name of the tool in the app; the detail is the one fact a visitor asks next.
const STORIES = [
  {
    name: "timer",
    label: "Timers",
    title: "Make room for 25 minutes.",
    body: "Open the notch, pick a timer and begin. Pause when you need a moment. Resume when you’re ready.",
    detail: "Timers and Pomodoro, close at hand.",
    film: "A notch timer starts, pauses and resumes",
    duration: "12 seconds",
  },
  {
    name: "notes",
    label: "Notes",
    title: "Catch it. Keep going.",
    body: "The thought that arrives halfway through something else? Give it a home in your Markdown inbox, then get back to what you were doing.",
    detail: "Your notes stay on your Mac.",
    film: "Save a short note from the notch, then return to the timer",
    duration: "11 seconds",
  },
  {
    name: "launcher",
    label: "Launcher",
    title: "A few keystrokes. One less detour.",
    body: "Open apps, calculate, find a command or start a timer. One launcher for the actions you reach for throughout the day.",
    detail: "Make frequent actions your own with hotkeys.",
    film: "Start a timer directly from the Polaris launcher",
    duration: "13 seconds",
  },
];

const TOOLS = [
  {
    title: "Clipboard and capture",
    body: "Find something you copied, grab a screenshot and carry on.",
  },
  {
    title: "Tasks and daily context",
    body: "Keep notes, tasks, calendar events and reminders close by.",
  },
  {
    title: "Windows and shortcuts",
    body: "Arrange your workspace and put useful actions on a hotkey.",
  },
  {
    title: "A little room to focus",
    body: "Choose Mac apps to hide during a Focus session. Start now or set a recurring routine.",
  },
];

const PRINCIPLES = [
  {
    title: "Local at the core.",
    body: "Your notes, tasks and clipboard live on this Mac. There’s no Polaris cloud sync. Optional online features connect only as their actions require.",
  },
  {
    title: "Permissions with a purpose.",
    body: "Enable the features you want and grant the macOS access they need. You don’t have to enable everything to get started.",
  },
  {
    title: "Native, signed and notarised.",
    body: "Built for Apple Silicon with signed automatic updates. A Mac utility that belongs on your Mac.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Can I download Polaris today?",
    a: (
      <p>
        Yes. Download the signed and notarised Mac app above, open the disk
        image and drag Axio Polaris to Applications. The 14-day trial starts
        only when you choose Start Trial. You can buy a personal licence using
        the Buy once link above.
      </p>
    ),
  },
  {
    q: "How do licensing and support work?",
    a: (
      <p>
        The {POLARIS_PRICE} one-time personal licence covers two Macs. Initial
        activation needs internet; activated copies can work offline for up to
        30 days after verification. Purchase and licence recovery use your
        checkout email. If you no longer have a Mac you activated, you can{" "}
        <a href="/polaris-license/seats">release its slot</a> without
        contacting us. For product help, email{" "}
        <a href="mailto:support@umbra.me">support@umbra.me</a>.
      </p>
    ),
  },
  {
    q: "Where are the licence and refund details?",
    a: (
      <p>
        Read the{" "}
        <a href="/products/polaris/licence">
          personal licence, delivery and refund information
        </a>{" "}
        and <a href="/legal/privacy#polaris">Polaris privacy details</a>.
        Billing receipts and transaction support are provided through Stripe
        Managed Payments and Link.
      </p>
    ),
  },
  {
    q: "Does Polaris block websites across my Mac?",
    a: (
      <p>
        No. Focus works with Mac apps. Website blocking is not included in this
        release.
      </p>
    ),
  },
  {
    q: "Can I get out of a locked Focus session?",
    a: (
      <p>
        There is a one-minute correction window after starting. After that,
        optional recovery can allow one five-minute break per local day and one
        early exit every seven days. Locked controls prevent normal in-app
        exits, but they are not tamper-proof and cannot stop force quit,
        uninstall or administrative access.
      </p>
    ),
  },
  {
    q: "Does Polaris upload my notes, tasks or clipboard?",
    a: (
      <p>
        The core stores are local files. There is no Polaris cloud sync.
        Individual online features send only what their action requires;
        configured AI actions, for example, send the selected request to the
        provider you chose.
      </p>
    ),
  },
  {
    q: "Will it work on an Intel Mac or older macOS?",
    a: (
      <p>
        The Mac download requires Apple Silicon with macOS 15 or newer. Other
        Mac configurations are not currently offered.
      </p>
    ),
  },
  {
    q: "Is Focus the same as Pomodoro?",
    a: (
      <p>
        They are separate tools. Pomodoro alternates timed work and break phases
        and tracks daily minutes. Focus sessions apply selected app restrictions
        for a defined interval.
      </p>
    ),
  },
];

export default function PolarisPage() {
  return (
    <div style={{ "--ts-product-color": P.color } as CSSProperties}>
      {/* Film-led and centred, unlike the other product pages: this is the one
          paid product, its page is a sales page, and the footage of the real
          app is the argument. It is still the site's type, tokens and buttons. */}
      <section className="ts-split-hero" data-center="" id="polaris">
        <div className="ts-container">
          <ol className="ts-crumbs">
            <li>
              <a href="/products">Products</a>
            </li>
            <li aria-current="page">{P.name}</li>
          </ol>
          <div className="ts-split-hero__meta">
            <span className="ts-product-card__mark">
              <Icon />
            </span>
            <StatusBadge product={P} />
          </div>
          <h1 className="ts-split-hero__title">
            Your Mac, <em>a little calmer.</em>
          </h1>
          <p className="ts-split-hero__lede">
            Start a timer. Catch a thought. Get back to it. Your everyday tools,
            together in one native Mac app.
          </p>
          <div className="ts-split-hero__actions">
            <Button asChild size="lg" variant="primary" tone="product">
<a href={POLARIS_DOWNLOAD}>
              Download free trial
              <IconDownload />
            </a>
</Button>
            <Button asChild size="lg" variant="secondary">
<a href={POLARIS_BUY} rel="noopener">
              Buy once · {POLARIS_PRICE}
              <IconArrowUpRight />
            </a>
</Button>
          </div>
          <ul className="ts-split-hero__facts">
            <li>14 days free</li>
            <li>No card needed</li>
            <li>Apple Silicon</li>
            <li>macOS 15+</li>
          </ul>
          <div className="ts-media-frame-hero">
            <PolarisVideo
              name="introduction"
              label="Polaris introduction: start a timer, pause, save a note and return to it"
              duration="20 seconds"
            />
            <p className="ts-media-frame-note">
              The real app. Short, silent demos with sample data.
            </p>
          </div>
        </div>
      </section>

      <section className="ts-section" data-ruled="" id="in-action">
        <div className="ts-container">
          <SectionHeader size="page" scramble={false} reveal={false} title={<>Small moments. Less switching.</>} description={<>Keep the task in front of you. Let Polaris take care of the little things around it.</>} />
          <div className="stories">
            {STORIES.map((story, i) => (
              <article
                className={`split${i % 2 === 1 ? " split--reverse" : ""}`}
                key={story.name}
              >
                <div className="split__text">
                  <p className="ts-eyebrow" data-mono="">{story.label}</p>
                  <h3 className="ts-display" data-size="section">{story.title}</h3>
                  <p className="ts-lede">{story.body}</p>
                  <p className="ts-text ts-note" data-tone="muted">{story.detail}</p>
                </div>
                <PolarisVideo name={story.name} label={story.film} duration={story.duration} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ts-section" data-ruled="">
        <div className="ts-container">
          <SectionHeader size="page" scramble={false} reveal={false} title={<>Less to juggle. More within reach.</>} />
          <FeatureGrid variant="bordered" minWidth="14rem" items={TOOLS} />
        </div>
      </section>

      <section className="ts-section" data-ruled="">
        <div className="ts-container">
          <SectionHeader size="page" scramble={false} reveal={false} title={<>Your tools. Your say.</>} description={<><a href="/legal/privacy#polaris">Read the privacy details</a>: what Polaris stores, what it sends, and for which action.</>} />
          <FeatureGrid variant="bordered" items={PRINCIPLES} />
        </div>
      </section>

      <section className="ts-section" data-ruled="" id="pricing">
        <div className="ts-container">
          <div className="ts-split" data-offer="">
            <div className="ts-split__text">
              <span className="ts-product-card__mark" aria-hidden="true">
                <Icon />
              </span>
              <h2 className="ts-display" data-size="section">A calmer Mac. No subscription.</h2>
              <p className="ts-lede">
                Try Polaris in your own routine for 14 days. Buy when you’re
                ready.
              </p>
              <div className="ts-split-hero__actions">
                <Button asChild size="lg" variant="secondary">
<a href={POLARIS_DOWNLOAD}>
                  Download free trial
                  <IconDownload />
                </a>
</Button>
              </div>
              <p className="ts-text" data-mono="" data-size="xs" data-tone="muted">
                Version {POLARIS_VERSION} · Apple Silicon · macOS 15+
              </p>
            </div>
            <PricingGrid>
              <Plan
                name="Personal licence"
                amount={POLARIS_PRICE}
                period="once"
                highlighted
                features={["Use on two Macs", "Tax included", "Licence delivered by email", "No recurring payments"]}
                cta={
                  <>
                    <Button asChild size="lg" variant="primary" tone="product">
                      <a href={POLARIS_BUY} rel="noopener">
                        Buy Polaris
                        <IconArrowUpRight />
                      </a>
                    </Button>
                    <p className="ts-text ts-note" data-tone="muted">
                      Your free trial never automatically charges you. Your statement
                      shows this purchase as Link.com* Axio.sh, because Stripe handles
                      payment and tax for Axio.{" "}
                      <a href="/products/polaris/licence">Licence and refund details</a>.
                    </p>
                  </>
                }
              />
            </PricingGrid>
          </div>
        </div>
      </section>

      <section className="ts-section" data-ruled="" id="questions">
        <div className="ts-container">
          <div className="ts-split" data-align="start">
            <SectionHeader size="page" scramble={false} reveal={false} title={<>Before you settle in.</>} description={<>Something else on your mind?{" "} <a href="mailto:support@umbra.me">support@umbra.me</a></>} />
            <Faq items={FAQ.map((item) => ({ question: item.q, answer: item.a }))} />
          </div>
        </div>
      </section>
    </div>
  );
}
