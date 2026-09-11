import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import SpotlightGrid from "@/components/SpotlightGrid";
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
        <div className="container">
          <h1 className="display display--lg">Everything Axio makes.</h1>
          <p>
            Six tools, each with its own repository and release path.{" "}
            {AVAILABLE.length} can be installed today;{" "}
            {listNames(PRIVATE)} stays private while it is built.
          </p>
        </div>
      </section>
      <section className="section--tight">
        <div className="container">
          <h2 className="visually-hidden">The six tools</h2>
          <SpotlightGrid className="grid grid--products">
            {PRODUCT_LIST.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </SpotlightGrid>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="display display--md">
              Where each one runs, and what it costs you.
            </h2>
            <p>
              Licence and platform support are per product, because they are
              separate tools rather than one program with modules. Everything
              open source is free; Polaris is a paid personal licence.
            </p>
          </div>
          <div className="ledger-card">
            <table className="ledger">
              <thead>
                <tr>
                  <th scope="col" className="label">
                    Product
                  </th>
                  <th scope="col" className="label">
                    Status
                  </th>
                  <th scope="col" className="label">
                    Licence
                  </th>
                  <th scope="col" className="label">
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
          <p className="note">
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
