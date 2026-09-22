import { ProductGrid, SectionHeader } from "@tessera/marketing";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { AVAILABLE, PRIVATE, PRODUCT_LIST, listNames } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The six Axio tools: a coding agent, Capture, Analyst, Deck, Local and the native Mac utility Axio Polaris.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-head">
        <div className="ts-container">
          <h1 className="ts-display" data-size="page">Everything Axio makes.</h1>
          <p>
            Six tools, each with its own repository and release path.{" "}
            {AVAILABLE.length} can be installed today;{" "}
            {listNames(PRIVATE)} stays private while it is built.
          </p>
        </div>
      </section>
      <section className="ts-section" data-tight="">
        <div className="ts-container">
          <h2 className="ts-sr-only">The six tools</h2>
          <ProductGrid columns={3}>
            {PRODUCT_LIST.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        </div>
      </section>
      <section className="ts-section">
        <div className="ts-container">
          <SectionHeader size="section" scramble={false} reveal={false} title={<>Where each one runs, and what it costs you.</>} description={<>Licence and platform support are per product, because they are separate tools rather than one program with modules. Everything open source is free; Polaris is a paid personal licence.</>} />
          <div className="ledger-card">
            <table className="ledger">
              <thead>
                <tr>
                  <th scope="col" className="ts-text" data-mono="" data-size="xs">
                    Product
                  </th>
                  <th scope="col" className="ts-text" data-mono="" data-size="xs">
                    Status
                  </th>
                  <th scope="col" className="ts-text" data-mono="" data-size="xs">
                    Licence
                  </th>
                  <th scope="col" className="ts-text" data-mono="" data-size="xs">
                    Runs on
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRODUCT_LIST.map((p) => (
                  <tr key={p.id}>
                    <th scope="row">
                      <a href={`/products/${p.id}`}>{p.name}</a>
                    </th>
                    <td
                      className={`state ${
                        p.status === "released"
                          ? "state--met"
                          : p.status === "prerelease"
                            ? "state--unmet"
                            : "state--none"
                      }`}
                    >
                      {p.statusLabel}
                    </td>
                    <td>{p.license ?? "Not distributed"}</td>
                    <td>{p.platforms.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ts-text ts-note" data-tone="muted">
            The agent is the only tool that compiles from source today: no
            binary is published yet, so{" "}
            <a href="/install">the install script</a> builds the current{" "}
            <code>main</code> and needs a Rust toolchain at 1.88 or newer.
          </p>
        </div>
      </section>
    </>
  );
}
