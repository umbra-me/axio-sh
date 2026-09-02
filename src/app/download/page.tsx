import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { IconArrowUpRight, IconDownload } from "@/components/Icons";
import StatusBadge from "@/components/StatusBadge";
import Term from "@/components/Term";
import {
  CAPTURE_DOWNLOADS,
  CAPTURE_RELEASE,
  CAPTURE_VERSION,
  PRODUCTS,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Install the Axio coding agent, download Axio Capture, and add Axio Analyst to Binary Ninja.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  const agent = PRODUCTS.agent;
  const capture = PRODUCTS.capture;
  const analyst = PRODUCTS.analyst;
  const deck = PRODUCTS.deck;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Download</p>
          <h1 className="display display--lg">Every Axio tool, one page.</h1>
          <p>
            Three are available today. Read an install script before you pipe
            it into a shell; the ones served here are plain text so that you
            can.
          </p>
        </div>
      </section>

      <section
        className="section--tight reveal"
        id="agent"
        style={{ "--pc": agent.color } as CSSProperties}
      >
        <div className="container">
          <div className="section__head">
            <div className="phero__meta">
              <h2 className="display display--md">{agent.name}, the agent</h2>
              <StatusBadge product={agent} />
            </div>
            <p>
              No published binary yet, so every route compiles the current{" "}
              <code>main</code>. Needs a Rust toolchain at 1.88 or newer.
            </p>
          </div>
          <div className="install">
            <Term label="macOS · Linux · WSL" wrap copy="macOS, Linux and WSL install">{`
curl -fsSL https://axio.sh/install | sh
`}</Term>
            <Term label="Windows · PowerShell" wrap copy="Windows PowerShell install">{`
irm https://axio.sh/install.ps1 | iex
`}</Term>
            <Term label="or drive cargo yourself" wrap copy="cargo install">{`
cargo install --git ${agent.repo} --locked axio
`}</Term>
          </div>
          <p className="note">
            <a href="/install">install.sh</a> · <a href="/install.ps1">install.ps1</a>{" "}
            · <a href="/products/agent">about the agent</a>
          </p>
        </div>
      </section>

      <section
        className="section--tight reveal"
        id="capture"
        style={{ "--pc": capture.color } as CSSProperties}
      >
        <div className="container">
          <div className="section__head">
            <div className="phero__meta">
              <h2 className="display display--md">
                {capture.name} {CAPTURE_VERSION}
              </h2>
              <StatusBadge product={capture} />
            </div>
            <p>
              Installers for macOS, Windows and Linux from{" "}
              <a href={CAPTURE_RELEASE} rel="noopener">
                the GitHub release
              </a>
              . macOS bundles are signed but not notarised, so the first launch
              on a new Mac is right-click, Open.
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
            <a href="/products/capture">about Axio Capture</a>
          </p>
        </div>
      </section>

      <section
        className="section--tight reveal"
        id="analyst"
        style={{ "--pc": analyst.color } as CSSProperties}
      >
        <div className="container">
          <div className="section__head">
            <div className="phero__meta">
              <h2 className="display display--md">{analyst.name}</h2>
              <StatusBadge product={analyst} />
            </div>
            <p>
              Clone into Binary Ninja’s user plugin folder as{" "}
              <code>axio_analyst</code>, then restart Binary Ninja.
            </p>
          </div>
          <div className="install">
            <Term label="macOS" wrap copy="macOS plugin install">{`
git clone ${analyst.repo}.git "$HOME/Library/Application Support/Binary Ninja/plugins/axio_analyst"
`}</Term>
            <Term label="Linux" wrap copy="Linux plugin install">{`
git clone ${analyst.repo}.git "$HOME/.binaryninja/plugins/axio_analyst"
`}</Term>
            <Term label="Windows · PowerShell" wrap copy="Windows plugin install">{`
git clone ${analyst.repo}.git "$env:APPDATA\\Binary Ninja\\plugins\\axio_analyst"
`}</Term>
          </div>
          <p className="note">
            <a href="/products/analyst">about Axio Analyst</a>
          </p>
        </div>
      </section>

      <section
        className="section--tight reveal"
        id="deck"
        style={{ "--pc": deck.color } as CSSProperties}
      >
        <div className="container">
          <div className="section__head">
            <div className="phero__meta">
              <h2 className="display display--md">{deck.name}</h2>
              <StatusBadge product={deck} />
            </div>
            <p>
              Not offered for download while it is being built. There is no
              installer to link and no licence chosen yet.{" "}
              <a href="/products/deck">
                Read why
                <IconArrowUpRight />
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
