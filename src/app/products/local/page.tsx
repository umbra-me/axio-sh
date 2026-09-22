import { FeatureGrid, Terminal } from "@tessera/marketing";
import { Button } from "@tessera/ui";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ProductHero from "@/components/ProductHero";
import { PRODUCTS } from "@/lib/products";
const P = PRODUCTS.local;
export const metadata: Metadata = { title: P.name, description: P.description, alternates: { canonical: "/products/local" } };
export default function LocalPage() {
  return <div style={{ "--pc": P.color } as CSSProperties}>
    <ProductHero product={P} headline={<>Your agent.<br /><em>Your local models.</em></>} lede={P.description}
      actions={<><Button asChild size="lg" variant="primary" tone="product">
<a href="#install">Install Axio Local</a>
</Button><Button asChild size="lg" variant="secondary">
<a href={P.repo!}>Source and documentation</a>
</Button></>}
      visual={<Terminal title="A local session" wrap>{`axio-local status
axio-local -o YOUR_MODEL -w YOUR_MODEL axio`}</Terminal>} />
    <section className="ts-section" id="install"><div className="ts-container">
      <div className="site-head"><p className="ts-eyebrow" data-mono="">Get started</p><h2 className="ts-display" data-size="section">Keep the agent you know.</h2>
      <p>Install a supported agent and start your model server. Use the exact model IDs returned by the server.</p></div>
      <Terminal title="macOS · Linux · WSL · Rust 1.88+" wrap copy="Axio Local install">{`cargo install --git https://github.com/umbra-me/axio-local --locked
axio-local status
axio-local -o YOUR_MODEL -w YOUR_MODEL claude`}</Terminal>
      <FeatureGrid variant="bordered" items={[{ title: <>Axio or Axio Local?</>, body: <>Axio runs its own coding-agent loop and provides a terminal and desktop interface. Axio Local configures a launch of an agent you already have, including Axio, against your own model server.</> }, { title: <>Separate configuration</>, body: <>Local uses each agent’s configuration relocation mechanism. It snapshots protected real configuration files and verifies recovery when the agent exits. Overlapping protected launches are refused.</> }, { title: <>Choose the endpoint</>, body: <>Use <code>--url</code> for a server on your machine or VM host. The launcher uses HTTP. Agents keep their existing tool permissions and network behaviour; local inference does not restrict what their tools can access.</> }]} />      <p className="ts-text ts-note" data-tone="muted">Source preview. Native Windows is not supported; use WSL. Model listing alone does not prove that a server supports the tool-calling protocol your chosen agent needs.</p>
    </div></section>
  </div>;
}
