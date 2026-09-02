import type { Metadata } from "next";
import { IconArrowRight } from "@/components/Icons";
import { PRODUCT_LIST } from "@/lib/products";
import { COMPANY, ORG, UMBRA } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Axio is Umbra's developer-tools family. What it is, how it is built, and how it is run.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container container--narrow">
          <p className="eyebrow">About</p>
          <h1 className="display display--lg">What Axio is, and how it is run.</h1>
          <p>
            Axio is the developer-tools family of {COMPANY.name},{" "}
            {COMPANY.description} based in {COMPANY.location}. It holds{" "}
            {PRODUCT_LIST.length} products today, and this page says how they
            are built, licensed and operated.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container container--narrow prose">
          <h2>One brand, separate tools</h2>
          <p>
            Each product has its own repository, its own toolchain and its own
            release cadence. The coding agent is Rust across nine crates. Axio
            Capture and Axio Deck are Rust behind Tauri. Axio Analyst is Python
            inside Binary Ninja. Nothing is shared at runtime; what is shared is
            a set of rules about behaviour, and the name.
          </p>
          <p>
            The name came from the agent, which is why the agent’s binary is
            simply <code>axio</code>{" "}and this domain serves its install script.
            The other three arrived later and took the family name in front of
            their own.
          </p>

          <h2>The rules</h2>
          <ul>
            <li>
              <strong>Local-first.</strong>{" "}Every product runs on the machine it
              is installed on. There are no accounts, no hosted backend, and no
              server of Umbra’s in the path of your work.
            </li>
            <li>
              <strong>Ask before acting.</strong>{" "}Anything that changes state
              shows what it is about to do and waits. Where it cannot wait, it
              refuses and says so with an exit code.
            </li>
            <li>
              <strong>No telemetry.</strong>{" "}None of the products reports usage
              or crashes to anyone. What leaves the machine is what you pointed
              the tool at.
            </li>
            <li>
              <strong>Say what has been verified.</strong>{" "}Status on this site
              is written from what has actually been run, against a real
              endpoint or on a real machine, and says so when it has not.
            </li>
            <li>
              <strong>Open where it ships.</strong>{" "}A product that is offered for
              download is open source. One that is not yet ready to be judged
              stays private until it is.
            </li>
          </ul>

          <h2>How it is licensed</h2>
          <p>
            The agent and Axio Capture are Apache-2.0. Axio Analyst is MIT. Axio
            Deck is private and has no published licence yet. The{" "}
            <a href="/legal/licenses">licences page</a>{" "}lists each one with the
            third-party attributions the products carry, and the trademark
            position: the open-source licences cover the code, not the Axio and
            Umbra names.
          </p>

          <h2>How it is run</h2>
          <p>
            Umbra operates this website and the product record centrally
            through its own administration console. The site itself is a static
            Next.js build with no database and no user accounts; it exposes one
            authenticated, read-only endpoint that reports the site’s own
            status to that console. The tools never talk to it.
          </p>
          <p>
            The site counts page loads and presses on a few marked links as
            anonymous hourly totals through Umbra’s own collector, with no
            cookie and no visitor identifier. The{" "}
            <a href="/legal/privacy">privacy policy</a>{" "}describes exactly what
            that means.
          </p>

          <h2>Who builds it</h2>
          <p>
            Umbra is an independent product company built by Kian, working under
            the name Zenco, in {COMPANY.location}. Axio is one of its product
            families alongside the others listed at{" "}
            <a href={UMBRA} data-umbra-link="umbra-attribution">
              umbra.me
            </a>
            . The code is published under the{" "}
            <a href={ORG} rel="noopener">
              umbra-me
            </a>{" "}
            organisation on GitHub.
          </p>
          <p>
            A previous implementation of the agent, along with its hosted cloud
            and the website that served it, was retired in July 2026. The
            current agent is a from-scratch rewrite; the previous repositories
            are archived and read-only.
          </p>

          <h2>Names that are not ours</h2>
          <p>
            Claude and Anthropic, Codex and OpenAI, Ollama, Binary Ninja and
            Vector 35, komorebi, ShareX, GitHub, Windows and macOS are the names
            and marks of their respective owners. Axio products interoperate
            with some of them and are inspired by others. None of those
            companies sponsors, endorses or is affiliated with Axio or Umbra.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="cta">
            <h2 className="display display--md">See the tools.</h2>
            <div className="hero__actions">
              <a className="btn btn--primary" href="/products">
                Products
                <IconArrowRight />
              </a>
              <a className="btn btn--ghost" href="/download">
                Download
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
