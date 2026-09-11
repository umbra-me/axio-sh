import type { CSSProperties } from "react";
import ApprovalTranscript from "@/components/ApprovalTranscript";
import NetworkTable from "@/components/NetworkTable";
import PolarisVideo from "@/components/PolarisVideo";
import ProductRail from "@/components/ProductRail";
import Surface from "@/components/Surface";
import { PRODUCTS } from "@/lib/products";
import { UMBRA } from "@/lib/site";

// The rules every product keeps, each keyed by something a product actually
// prints or writes. The string is the marker: a rule you can check from the
// outside has evidence, and the evidence is what identifies it here. The
// product pages carry the same strings beside the behaviour they name.
const RULES = [
  {
    key: "allow?  y once",
    title: "Ask before acting",
    body: "The agent lands the diff or the exact command in scrollback, then asks. Deck records the previous state before its first change. Analyst shows the snapshot before a byte is sent.",
  },
  {
    key: "~/.axio",
    title: "Local-first, by construction",
    body: "Every product runs on your machine and keeps its state in a directory you can list. Each product page says when a requested feature, a provider or an update uses the network.",
  },
  {
    key: "GET /releases/latest",
    title: "No telemetry, anywhere",
    body: "None of the products reports usage. What leaves the machine is what you pointed the tool at: a model provider, an online feature, licensing, or an update check.",
  },
  {
    key: "exit 5",
    title: "Refusals are visible",
    body: "A one-shot agent run that had to refuse something exits 5, so a pipeline sees it. Deck refuses the changes that break machines at apply time and says which.",
  },
  {
    key: "not met",
    title: "Honest about status",
    body: "A version is cut when real use stops turning things up. Until then the page says pre-release, and each verification table records what has actually been run, including what has not.",
  },
  {
    key: "LICENSE",
    title: "Open where it ships",
    body: "A product offered for download states its licence: Apache-2.0 for the agent and Capture, MIT for Analyst, a personal licence for Polaris. Deck has none because it is not distributed.",
  },
];

export default function Page() {
  return (
    <>
      {/* The hero is the agent's approval prompt: the promise every product
          keeps ("ask before acting"), shown as the product's own interface
          rather than described. The text beside it says what the family is. */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">
              <i aria-hidden="true" />
              Developer tools by Umbra
            </p>
            <h1 className="display">
              Developer tools that{" "}
              <span className="grad">stay on your machine.</span>
            </h1>
            <p className="lede">
              Axio is a family of six: coding agents, capture and analysis tools,
              a Windows control surface, and Polaris, a native Mac utility for
              the rest of your day. Local work stays local, and there is no
              product telemetry.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="/download">
                Download
              </a>
              <a className="btn btn--ghost" href="/products">
                See all six products
              </a>
            </div>
            <p className="hero__cmd">
              <span className="dim">$</span>
              curl -fsSL https://axio.sh/install | sh
            </p>
          </div>
          <ApprovalTranscript />
        </div>
      </section>

      {/* The proof of the headline comes first: what each tool sends, from the
          same registry field the privacy policy is written from. */}
      <section className="section" id="network">
        <div className="container">
          <div className="section__head">
            <h2 className="display display--lg">What leaves your machine.</h2>
            <p>
              Nothing reports usage, so it is worth stating exactly what each
              tool does talk to. The{" "}
              <a href="/legal/privacy#software">privacy policy</a> has the same
              list with the endpoints named.
            </p>
          </div>
          <NetworkTable />
        </div>
      </section>

      <section className="section section--ruled" id="products">
        <div className="container">
          <div className="section__head">
            <h2 className="display display--lg">Six tools. One set of rules.</h2>
            <p>
              Each one has its own repository, its own release and its own
              colour. What they share is how they behave.
            </p>
          </div>
          <ProductRail />
        </div>
      </section>

      <section
        className="section section--ruled"
        id="agent"
        style={{ "--pc": PRODUCTS.agent.color } as CSSProperties}
      >
        <div className="container">
          <div className="split">
            <div className="split__text">
              <h2 className="display display--md">Many agents. One queue.</h2>
              <p className="lede">
                Every supervised session gets its own git worktree and branch,
                so an agent edits an isolated checkout rather than the one you
                are working in. Every approval they need arrives in one place.
              </p>
              <ul>
                <li>
                  Reads never ask. Writes and shell commands do, with the diff
                  or the exact command shown first.
                </li>
                <li>
                  Claude, Codex or Pi can run inside it, each in a terminal the
                  supervisor owns, each wearing its own colour.
                </li>
                <li>
                  A refused action exits 5 in a one-shot run, so a pipeline sees
                  it.
                </li>
              </ul>
              <div className="phero__actions">
                <a className="btn btn--product" href="/products/agent">
                  About the agent
                </a>
                <a className="btn btn--ghost" href="/products/agent#install">
                  Install
                </a>
              </div>
            </div>
            <Surface />
          </div>
        </div>
      </section>

      <section
        className="section section--ruled"
        id="polaris"
        style={{ "--pc": PRODUCTS.polaris.color } as CSSProperties}
      >
        <div className="container">
          <div className="split split--reverse">
            <div className="split__text">
              <h2 className="display display--md">
                A native Mac utility for the rest of your day.
              </h2>
              <p className="lede">
                Polaris puts a launcher, timers, notes and a place to focus at
                the notch, in one native app. Your notes, tasks and clipboard
                stay on the Mac; there is no Polaris cloud.
              </p>
              <ul>
                <li>Signed and notarised for Apple Silicon, macOS 15 or newer.</li>
                <li>A 14-day trial that starts when you ask it to. No card.</li>
                <li>A$59 once, for two Macs. No subscription.</li>
              </ul>
              <div className="phero__actions">
                <a className="btn btn--product" href="/products/polaris">
                  About Polaris
                </a>
                <a className="btn btn--ghost" href="/products/polaris#pricing">
                  Pricing
                </a>
              </div>
            </div>
            <PolarisVideo
              name="introduction"
              label="Polaris introduction: start a timer, pause, save a note and return to it"
              duration="20 seconds"
            />
          </div>
        </div>
      </section>

      <section className="section section--ruled" id="rules">
        <div className="container">
          <div className="section__head">
            <h2 className="display display--lg">The rules every product keeps.</h2>
            <p>
              These are not aspirations. Each one is checkable from the outside,
              and the string beside it is where to look.
            </p>
          </div>
          <ul className="rules">
            {RULES.map((rule) => (
              <li key={rule.title}>
                <span className="artifact">{rule.key}</span>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container">
          <div className="cta">
            <div className="cta__text">
              <h2 className="display display--md">
                Built independently, operated carefully.
              </h2>
              <p className="lede">
                Axio is one of Umbra’s product families. Umbra runs the website
                and the product record centrally; the tools themselves never
                phone home to it.
              </p>
            </div>
            <div className="cta__actions">
              <a className="btn btn--primary" href="/about">
                About Axio
              </a>
              <a
                className="btn btn--ghost"
                href={UMBRA}
                data-umbra-link="umbra-attribution"
              >
                Visit umbra.me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
