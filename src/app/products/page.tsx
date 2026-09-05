import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import SpotlightGrid from "@/components/SpotlightGrid";
import { PRODUCT_LIST } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The five Axio tools: a local-first coding agent, Axio Capture, Axio Analyst for Binary Ninja, Axio Deck for Windows workstations, and Axio Local for local models.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Products</p>
          <h1 className="display display--lg">Everything Axio makes.</h1>
          <p>
            Five tools, each with its own repository and release. Four are
            public and open source today; Deck is private while it is
            built.
          </p>
        </div>
      </section>
      <section className="section--tight">
        <div className="container">
          <SpotlightGrid className="grid grid--products">
            {PRODUCT_LIST.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </SpotlightGrid>
        </div>
      </section>
      <section className="section">
        <div className="container">
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
        </div>
      </section>
    </>
  );
}
