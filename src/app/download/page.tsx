import { environmentText } from "../../../public-environment.mjs";
import { Terminal } from "@tessera/marketing";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { IconDownload } from "@/components/Icons";
import StatusBadge from "@/components/StatusBadge";
import {
  AGENT_INSTALL_REPO,
  AVAILABLE,
  CAPTURE_DOWNLOADS,
  CAPTURE_RELEASE,
  CAPTURE_VERSION,
  POLARIS_DOWNLOAD,
  POLARIS_VERSION,
  PRIVATE,
  PRODUCTS,
  listNames,
} from "@/lib/products";
import { SOCIAL_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Install the Axio tools: the agent, Capture, Analyst, Local and Polaris, and where Deck stands.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download",
    description: "Install the Axio tools: the agent, Capture, Analyst, Local and Polaris, and where Deck stands.",
    url: "./",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download",
    description: "Install the Axio tools: the agent, Capture, Analyst, Local and Polaris, and where Deck stands.",
    images: [SOCIAL_IMAGE],
  },
};

export default function DownloadPage() {
  const agent = PRODUCTS.agent;
  const capture = PRODUCTS.capture;
  const analyst = PRODUCTS.analyst;
  const local = PRODUCTS.local;
  const deck = PRODUCTS.deck;
  const polaris = PRODUCTS.polaris;

  return (
    <>
      <section className="page-head">
        <div className="ts-container">
          <h1 className="ts-display" data-size="page">Every Axio tool, one page.</h1>
          <p>
            {AVAILABLE.length} of the six can be installed today;{" "}
            {listNames(PRIVATE)} has no installer while it is built. Read an
            install script before you pipe it into a shell; the ones served
            here are plain text so that you can.
          </p>
        </div>
      </section>

      <section
        className="ts-section" data-tight=""
        id="agent"
        style={{ "--ts-product-color": agent.color } as CSSProperties}
      >
        <div className="ts-container">
          <div className="site-head">
            <div className="site-head__meta">
              <h2 className="ts-display" data-size="section">{agent.name}, the agent</h2>
              <StatusBadge product={agent} />
            </div>
            <p>
              No published binary yet, so every route compiles the current{" "}
              <code>main</code>. Needs a Rust toolchain at 1.88 or newer.
            </p>
          </div>
          <div className="install">
            <Terminal title="macOS · Linux · WSL — download and inspect" wrap copy="download and inspect the shell installer">{environmentText(`
curl -fsSL https://axio.sh/install -o axio-install.sh
less ./axio-install.sh
`)}</Terminal>
            <p className="ts-text" data-tone="muted">After reviewing, run <code>sh ./axio-install.sh</code>.</p>
            <Terminal title="Windows · PowerShell — download and inspect" wrap copy="download and inspect the PowerShell installer">{environmentText(`
Invoke-WebRequest https://axio.sh/install.ps1 -OutFile axio-install.ps1
Get-Content .\\axio-install.ps1
`)}</Terminal>
            <p className="ts-text" data-tone="muted">After reviewing, run <code>&amp; .\axio-install.ps1</code>.</p>
            <details>
              <summary>One-line alternatives, after inspecting the script</summary>
              <div className="install">
                <Terminal title="macOS · Linux · WSL" wrap copy="one-line shell install">{environmentText(`
curl -fsSL https://axio.sh/install | sh
`)}</Terminal>
                <Terminal title="Windows · PowerShell" wrap copy="one-line PowerShell install">{environmentText(`
irm https://axio.sh/install.ps1 | iex
`)}</Terminal>
              </div>
            </details>
            <Terminal title="or drive cargo yourself" wrap copy="cargo install">{`
cargo install --git ${AGENT_INSTALL_REPO} --locked axio
`}</Terminal>
          </div>
          <p className="ts-text ts-note" data-tone="muted">
            <a href="/install">install.sh</a> · <a href="/install.ps1">install.ps1</a>{" "}
            · <a href="/products/agent">about the agent</a>
          </p>
        </div>
      </section>

      <section
        className="ts-section" data-tight=""
        id="capture"
        style={{ "--ts-product-color": capture.color } as CSSProperties}
      >
        <div className="ts-container">
          <div className="site-head">
            <div className="site-head__meta">
              <h2 className="ts-display" data-size="section">
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
          <p className="ts-text ts-note" data-tone="muted">
            <a href="/products/capture">about Axio Capture</a>
          </p>
        </div>
      </section>

      <section
        className="ts-section" data-tight=""
        id="analyst"
        style={{ "--ts-product-color": analyst.color } as CSSProperties}
      >
        <div className="ts-container">
          <div className="site-head">
            <div className="site-head__meta">
              <h2 className="ts-display" data-size="section">{analyst.name}</h2>
              <StatusBadge product={analyst} />
            </div>
            <p>
              Clone into Binary Ninja’s user plugin folder as{" "}
              <code>axio_analyst</code>, then restart Binary Ninja.
            </p>
          </div>
          <div className="install">
            <Terminal title="macOS" wrap copy="macOS plugin install">{`
git clone ${analyst.repo}.git "$HOME/Library/Application Support/Binary Ninja/plugins/axio_analyst"
`}</Terminal>
            <Terminal title="Linux" wrap copy="Linux plugin install">{`
git clone ${analyst.repo}.git "$HOME/.binaryninja/plugins/axio_analyst"
`}</Terminal>
            <Terminal title="Windows · PowerShell" wrap copy="Windows plugin install">{`
git clone ${analyst.repo}.git "$env:APPDATA\\Binary Ninja\\plugins\\axio_analyst"
`}</Terminal>
          </div>
          <p className="ts-text ts-note" data-tone="muted">
            <a href="/products/analyst">about Axio Analyst</a>
          </p>
        </div>
      </section>

      <section
        className="ts-section" data-tight=""
        id="local"
        style={{ "--ts-product-color": local.color } as CSSProperties}
      >
        <div className="ts-container">
          <div className="site-head">
            <div className="site-head__meta">
              <h2 className="ts-display" data-size="section">{local.name}</h2>
              <StatusBadge product={local} />
            </div>
            <p>
              Use your existing coding agent with a local model server. Source
              install for macOS, Linux and WSL; needs Rust 1.88 or newer.
            </p>
          </div>
          <Terminal title="macOS · Linux · WSL" wrap copy="Axio Local install">{`
cargo install --git ${local.repo} --locked
`}</Terminal>
          <p className="ts-text ts-note" data-tone="muted">
            <a href="/products/local">setup and model selection</a>
          </p>
        </div>
      </section>

      <section
        className="ts-section" data-tight=""
        id="polaris"
        style={{ "--ts-product-color": polaris.color } as CSSProperties}
      >
        <div className="ts-container">
          <div className="site-head">
            <div className="site-head__meta">
              <h2 className="ts-display" data-size="section">
                {polaris.name} {POLARIS_VERSION}
              </h2>
              <StatusBadge product={polaris} />
            </div>
            <p>
              A signed, notarised Mac app for Apple Silicon on macOS 15 or
              newer. The 14-day trial starts when you choose Start Trial and
              needs no card; a personal licence is A$59 once, for two Macs.
            </p>
          </div>
          <div className="dl">
            <a className="dl__row" href={POLARIS_DOWNLOAD}>
              <b>
                macOS
                <small>Apple Silicon</small>
              </b>
              <code>{POLARIS_DOWNLOAD.split("/").pop()}</code>
              <IconDownload />
            </a>
          </div>
          <p className="ts-text ts-note" data-tone="muted">
            <a href="/products/polaris">about Axio Polaris</a> ·{" "}
            <a href="/products/polaris#pricing">buy a licence</a> ·{" "}
            <a href="/products/polaris/licence">licence and refund details</a>
          </p>
        </div>
      </section>

      <section
        className="ts-section" data-tight=""
        id="deck"
        style={{ "--ts-product-color": deck.color } as CSSProperties}
      >
        <div className="ts-container">
          <div className="site-head">
            <div className="site-head__meta">
              <h2 className="ts-display" data-size="section">{deck.name}</h2>
              <StatusBadge product={deck} />
            </div>
            <p>
              Not offered for download while it is being built. There is no
              installer to link and no licence chosen yet.{" "}
              <a href="/products/deck#status">Read why</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
