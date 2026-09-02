import type { CSSProperties } from "react";
import ProductCard from "@/components/ProductCard";
import SpotlightGrid from "@/components/SpotlightGrid";
import Surface from "@/components/Surface";
import {
  IconArrowRight,
  IconBranch,
  IconCheck,
  IconEye,
  IconHome,
  IconOpen,
  IconShield,
} from "@/components/Icons";
import { PRODUCT_LIST, PRODUCTS } from "@/lib/products";
import { UMBRA } from "@/lib/site";

const PRINCIPLES = [
  {
    icon: IconHome,
    title: "Local-first, by construction",
    body: "Every product runs on your machine. There is no hosted backend to sign in to, no account to create, and no server of ours holding your work.",
  },
  {
    icon: IconShield,
    title: "Ask before acting",
    body: "The agent shows the diff or the command, then asks. Deck records the exact previous state before its first change. Analyst previews the context before a byte is sent.",
  },
  {
    icon: IconEye,
    title: "No telemetry, anywhere",
    body: "None of the four products reports usage. What leaves your machine is what you pointed it at: a model provider you configured, or a signed update check.",
  },
  {
    icon: IconOpen,
    title: "Open where it ships",
    body: "The agent and Capture are Apache-2.0, Analyst is MIT, and every claim on this site is in a README you can read. Deck stays private until it is ready to be judged.",
  },
  {
    icon: IconCheck,
    title: "Honest about status",
    body: "A version is cut when real use stops turning things up. Until then the page says pre-release, and the verification table says what has actually been run.",
  },
  {
    icon: IconBranch,
    title: "One family, separate tools",
    body: "Each product has its own repository, release cadence and toolchain. What they share is a set of rules, not a runtime.",
  },
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">
            <i aria-hidden="true" />
            Developer tools by Umbra
          </p>
          <h1 className="display display--xl">
            Developer tools that
            <br />
            <span className="grad">stay on your machine.</span>
          </h1>
          <p className="lede">
            Axio is a family of four: a coding agent that runs many sessions at
            once, a screenshot tool with a real editor, an analyst for Binary
            Ninja, and a control surface for Windows. No accounts. No hosted
            backend. No telemetry.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="/download">
              Get the tools
              <IconArrowRight />
            </a>
            <a className="btn btn--ghost" href="/products">
              See what each one does
            </a>
          </div>
          <p className="hero__cmd">
            <span className="dim">$</span>
            curl -fsSL https://axio.sh/install | sh
          </p>

          <dl className="stats">
            <div>
              <dt>4</dt>
              <dd>products</dd>
            </div>
            <div>
              <dt>3</dt>
              <dd>platforms</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>accounts required</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>telemetry</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section reveal" id="products">
        <div className="container">
          <div className="section__head section__head--center">
            <p className="eyebrow">Products</p>
            <h2 className="display display--lg">Four tools. One set of rules.</h2>
            <p>
              Each one has its own repository, its own release, and its own
              colour. What they share is how they behave.
            </p>
          </div>
          <SpotlightGrid className="grid grid--products">
            {PRODUCT_LIST.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </SpotlightGrid>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div
            className="split"
            style={{ "--pc": PRODUCTS.agent.color } as CSSProperties}
          >
            <div className="split__text">
              <p className="eyebrow">The agent</p>
              <h2 className="display display--md">
                Many agents. One queue.
              </h2>
              <p className="lede">
                Every supervised session gets its own git worktree and branch,
                so an agent edits an isolated checkout rather than the one you
                are working in. Every approval they need arrives in one place.
              </p>
              <ul>
                <li>
                  <IconCheck />
                  Reads never ask. Writes and shell commands do, with the diff
                  or the exact command shown first.
                </li>
                <li>
                  <IconCheck />
                  Claude, Codex or Pi can run inside it, each in a terminal the
                  supervisor owns, each wearing its own colour.
                </li>
                <li>
                  <IconCheck />
                  A refused action exits 5 in a one-shot run, so a pipeline sees
                  it.
                </li>
              </ul>
              <div className="phero__actions">
                <a className="btn btn--product" href="/products/agent">
                  About the agent
                  <IconArrowRight />
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

      <section className="section reveal" id="principles">
        <div className="container">
          <div className="section__head section__head--center">
            <p className="eyebrow">How they behave</p>
            <h2 className="display display--lg">The rules every product keeps.</h2>
            <p>
              These are not aspirations. Each one is checkable from the outside,
              and the product pages say how.
            </p>
          </div>
          <SpotlightGrid className="grid grid--3">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <article className="card" key={p.title}>
                  <span className="card__icon">
                    <Icon />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              );
            })}
          </SpotlightGrid>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="cta">
            <p className="eyebrow">Part of Umbra</p>
            <h2 className="display display--md">
              Built independently, operated carefully.
            </h2>
            <p className="lede">
              Axio is one of Umbra’s product families. Umbra runs the
              website and the product record centrally; the tools themselves
              never phone home to it.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="/about">
                About Axio
                <IconArrowRight />
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
