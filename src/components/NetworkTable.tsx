import type { CSSProperties } from "react";
import { PRODUCT_LIST, productHref } from "@/lib/products";

/**
 * What each tool talks to, one row per product.
 *
 * The sentence is `Product.network` from the registry, the same field the
 * privacy policy is written from, so this table cannot drift from the policy
 * without the registry changing first. The licence sits beside it because
 * "open where it ships" is the other half of the same argument: what the tool
 * does with the network, and what you are allowed to do with it.
 *
 * The colour dot is the only product colour here. Six rows wearing six
 * colours would read as a chart; the row already names the product.
 */
export default function NetworkTable() {
  return (
    <table className="net">
      <caption className="visually-hidden">
        What each Axio tool sends over the network, and its licence
      </caption>
      <thead>
        <tr>
          <th scope="col">Tool</th>
          <th scope="col">What leaves your machine</th>
          <th scope="col">Licence</th>
        </tr>
      </thead>
      <tbody>
        {PRODUCT_LIST.map((p) => (
          <tr key={p.id} style={{ "--pc": p.color } as CSSProperties}>
            <th scope="row">
              <a href={productHref(p.id)}>
                <i aria-hidden="true" />
                {p.name}
              </a>
            </th>
            <td>{p.network}</td>
            <td>{p.license ?? "Not distributed"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
