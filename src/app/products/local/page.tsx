import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ProductHero from "@/components/ProductHero";
import Term from "@/components/Term";
import { PRODUCTS } from "@/lib/products";
const P = PRODUCTS.local;
export const metadata: Metadata = { title: P.name, description: P.description, alternates: { canonical: "/products/local" } };
export default function LocalPage() {
  return <div style={{ "--pc": P.color } as CSSProperties}>
    <ProductHero product={P} headline={<>Your agent.<br /><em>Your local models.</em></>} lede={P.description}
      actions={<><a className="btn btn--product" href="#install">Install Axio Local</a><a className="btn btn--ghost" href={P.repo!}>Source and documentation</a></>}
      visual={<Term label="A local session" wrap>{`axio-local status
axio-local -o YOUR_MODEL -w YOUR_MODEL axio`}</Term>} />
    <section className="section" id="install"><div className="container">
      <div className="section__head"><p className="eyebrow">Get started</p><h2 className="display display--md">Keep the agent you know.</h2>
      <p>Install a supported agent and start your model server. Use the exact model IDs returned by the server.</p></div>
      <Term label="macOS · Linux · WSL · Rust 1.88+" wrap copy="Axio Local install">{`cargo install --git https://github.com/umbra-me/axio-local --locked
axio-local status
axio-local -o YOUR_MODEL -w YOUR_MODEL claude`}</Term>
      <div className="features"><article className="feature"><h3>Axio or Axio Local?</h3><p>Axio runs its own coding-agent loop and provides a terminal and desktop interface. Axio Local configures a launch of an agent you already have, including Axio, against your own model server.</p></article>
      <article className="feature"><h3>Separate configuration</h3><p>Local uses each agent’s configuration relocation mechanism. It snapshots protected real configuration files and verifies recovery when the agent exits. Overlapping protected launches are refused.</p></article>
      <article className="feature"><h3>Choose the endpoint</h3><p>Use <code>--url</code> for a server on your machine or VM host. The launcher uses HTTP. Agents keep their existing tool permissions and network behaviour; local inference does not restrict what their tools can access.</p></article></div>
      <p className="note">Source preview. Native Windows is not supported; use WSL. Model listing alone does not prove that a server supports the tool-calling protocol your chosen agent needs.</p>
    </div></section>
  </div>;
}
