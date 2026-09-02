import type { CSSProperties } from "react";
import type { Metadata } from "next";
import AnalystMock from "@/components/AnalystMock";
import { IconArrowUpRight } from "@/components/Icons";
import ProductHero from "@/components/ProductHero";
import Term from "@/components/Term";
import { ANALYST_VERSION, PRODUCTS } from "@/lib/products";

const P = PRODUCTS.analyst;
const REPO = P.repo!;

export const metadata: Metadata = {
  title: "Axio Analyst",
  description: `${P.tagline}. ${P.description}`,
  alternates: { canonical: "/products/analyst" },
};

export default function AnalystPage() {
  return (
    <div style={{ "--pc": P.color } as CSSProperties}>
      <ProductHero
        product={P}
        headline={
          <>
            One bounded context,
            <br />
            <em>read more than one way.</em>
          </>
        }
        lede={P.description}
        actions={
          <>
            <a className="btn btn--product" href="#install">
              Install the plugin
            </a>
            <a className="btn btn--ghost" href={REPO} rel="noopener">
              Repository
              <IconArrowUpRight />
            </a>
          </>
        }
        visual={<AnalystMock />}
      />

      <div className="container">
        <hr className="rule" />
      </div>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What it does</p>
            <h2 className="display display--md">
              Ask about the function under the cursor.
            </h2>
            <p>
              Explain gives a structured summary of the current function; Ask
              takes your own question. Both go through the command-line
              harness you already have signed in, so there is no key to paste
              and nothing new to trust.
            </p>
          </div>
          <div className="features">
            <article className="feature">
              <span className="artifact">Build preview</span>
              <h3>See exactly what will be sent.</h3>
              <p>
                The current function is the default context. Selection, direct
                callers and callees, referenced strings and imports, and
                relevant types are opt-in packs under one deterministic
                character cap. Every request freezes the snapshot before
                dispatch, so moving the cursor later cannot change it.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">0040a1f2</span>
              <h3>Citations you can click.</h3>
              <p>
                Address citations in a response become validated internal
                navigation targets. An address the binary does not have stays
                inert and is labelled unresolved rather than sending you
                somewhere wrong.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">claude · codex · ollama</span>
              <h3>Provider-neutral, and comparable.</h3>
              <p>
                Claude Code, Codex and Ollama Cloud behind one interface, with
                editable model selection and per-provider reasoning effort.
                Compare the active provider with one other against the same
                frozen snapshot.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">read-only</span>
              <h3>Never writes to the database.</h3>
              <p>
                Version {ANALYST_VERSION} does not rename symbols, change types,
                add comments, or otherwise modify the BNDB. Its package split
                enforces the boundary: the core cannot import Binary Ninja, Qt,
                subprocess or network modules, and tests check that.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">stdin</span>
              <h3>Prompts never touch the command line.</h3>
              <p>
                The prompt is written to the harness through stdin, so it never
                appears in a process list. The plugin never reads a provider
                credential file; authentication stays with the CLI you chose.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">off by default</span>
              <h3>Transcripts stay in memory unless you say otherwise.</h3>
              <p>
                Restoring conversations for a binary is opt-in, keyed by a
                path-free content fingerprint, bounded, deletable, and
                exportable as Markdown to a path you choose.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal" id="sent">
        <div className="container">
          <div className="split">
            <div className="split__text">
              <p className="eyebrow">What is sent</p>
              <h2 className="display display--md">
                The binary’s name, never its path.
              </h2>
              <p className="lede">
                A request always contains the base filename, the architecture
                and platform, the primary function’s name, start address,
                rendered type and address-labelled HLIL, your question, and a
                fixed reverse-engineering instruction. Nothing else is sent
                until you enable it and see it in the preview.
              </p>
              <p className="note">
                Provider output is untrusted analysis. Confirm important claims
                against the cited IL addresses before relying on them, and
                consult the selected provider’s retention policy before
                sending proprietary material.
              </p>
            </div>
            <div className="ledger-card">
              <table className="ledger">
                <thead>
                  <tr>
                    <th scope="col" className="label">
                      Opt-in pack
                    </th>
                    <th scope="col" className="label">
                      Limit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Selection</th>
                    <td>The HLIL inside the current selection</td>
                  </tr>
                  <tr>
                    <th scope="row">Callers and callees</th>
                    <td>Up to three direct callers and five direct callees</td>
                  </tr>
                  <tr>
                    <th scope="row">Strings and imports</th>
                    <td>Up to twenty referenced strings and twenty imports</td>
                  </tr>
                  <tr>
                    <th scope="row">Types</th>
                    <td>Relevant function type declarations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="install">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Install</p>
            <h2 className="display display--md">Clone it into the plugins folder.</h2>
            <p>
              Binary Ninja loads manually installed Python plugins from a
              directory under its user plugin folder. The directory must be
              named <code>axio_analyst</code>. Restart Binary Ninja after
              installing or upgrading; loaded plugins are not hot-reloaded
              safely.
            </p>
          </div>
          <div className="install">
            <Term label="macOS" wrap copy="macOS plugin install">{`
git clone ${REPO}.git "$HOME/Library/Application Support/Binary Ninja/plugins/axio_analyst"
`}</Term>
            <Term label="Linux" wrap copy="Linux plugin install">{`
git clone ${REPO}.git "$HOME/.binaryninja/plugins/axio_analyst"
`}</Term>
            <Term label="Windows · PowerShell" wrap copy="Windows plugin install">{`
git clone ${REPO}.git "$env:APPDATA\\Binary Ninja\\plugins\\axio_analyst"
`}</Term>
          </div>
          <p className="note">
            Needs Binary Ninja 5.x with its Qt6 UI, its embedded Python, and at
            least one supported CLI installed, signed in and on your{" "}
            <code>PATH</code>: Claude Code, Codex, or Ollama with Ollama Cloud
            access. The plugin has no third-party Python dependencies.
          </p>
        </div>
      </section>
    </div>
  );
}
