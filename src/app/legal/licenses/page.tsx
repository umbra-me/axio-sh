import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PRODUCT_LIST } from "@/lib/products";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Licences and attributions",
  description:
    "The licence each Axio product ships under, the third-party work it acknowledges, and what the licences do not cover.",
  alternates: { canonical: "/legal/licenses" },
};

export default function LicensesPage() {
  return (
    <LegalPage
      title="Licences and attributions"
      summary="What each product is licensed under, whose work it acknowledges, and the one thing the open-source licences do not grant."
      current="/legal/licenses"
    >
      <h2>Product licences</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Licence</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCT_LIST.map((p) => (
            <tr key={p.id}>
              <th scope="row">{p.name}</th>
              <td>{p.license ?? "Not distributed; no licence granted"}</td>
              <td>
                {p.repo ? (
                  <a href={p.repo} rel="noopener">
                    {p.repo.replace("https://github.com/", "")}
                  </a>
                ) : (
                  "Private"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Copyright in the Axio products is held by {COMPANY.name}, 2026. The full
        text of each licence is in the product’s repository as{" "}
        <code>LICENSE</code>, and where a product carries attributions, as{" "}
        <code>NOTICE</code>.
      </p>

      <h2>Third-party acknowledgements</h2>
      <p>
        Two parts of the coding agent were written after reading someone
        else’s work, and say so. No source from either project is included;
        each crate is an independent Rust implementation that shares no lines
        with them. The attribution is recorded because the knowledge, not the
        code, was the expensive part.
      </p>
      <ul>
        <li>
          <strong>axio-quota</strong>{" "}derives its provider protocol knowledge,
          which file each vendor’s CLI writes its credentials to, which
          endpoint reports usage and how to parse it defensively, from{" "}
          <a href="https://github.com/steipete/codexbar" rel="noopener">
            CodexBar
          </a>{" "}
          by Peter Steinberger, MIT licensed.
        </li>
        <li>
          <strong>axio-cost</strong>{" "}derives which file each coding agent
          writes its transcripts to, and what they contain, from{" "}
          <a href="https://github.com/junhoyeo/tokscale" rel="noopener">
            tokscale
          </a>{" "}
          by Junho Yeo, MIT licensed. Every token-accounting rule was
          additionally verified against real transcripts, and several differ
          from what a reading of tokscale alone would give.
        </li>
      </ul>
      <p>
        Each product’s compiled dependencies carry their own licences,
        recorded in its lockfile and, for the agent, checked by{" "}
        <code>cargo-deny</code>{" "}in CI.
      </p>

      <h2>This website</h2>
      <p>
        The site’s own source is public so that it can be read, and carries
        no open-source licence; see the <a href="/legal/terms">terms</a>.
      </p>
      <ul>
        <li>
          Built with{" "}
          <a href="https://nextjs.org" rel="noopener">
            Next.js
          </a>{" "}
          and React, MIT licensed.
        </li>
        <li>
          Set in{" "}
          <a href="https://vercel.com/font" rel="noopener">
            Geist and Geist Mono
          </a>
          , copyright Vercel in collaboration with basement.studio, under the
          SIL Open Font License 1.1, and served from this domain.
        </li>
        <li>
          Every icon, illustration and generated image on the site is drawn in
          the site’s own source. No stock imagery and no icon library.
        </li>
      </ul>

      <h2>Trademarks</h2>
      <p>
        <strong>Axio</strong>, <strong>Umbra</strong>, the Axio mark and the
        product names are trademarks of {COMPANY.name}. The Apache and MIT
        licences grant rights in the code and, in Apache-2.0’s own words,
        do not grant permission to use the trade names, trademarks or product
        names of the licensor except as required to describe the origin of the
        work. Describing a fork as a fork is fine; presenting one as Axio is
        not.
      </p>
      <p>
        Anthropic and Claude, OpenAI and Codex, Ollama, Vector 35 and Binary
        Ninja, komorebi, ShareX, GitHub, Microsoft and Windows, Apple and macOS,
        and Linux are the names and marks of their respective owners. They
        appear on this site to describe what the products work with, and no
        affiliation or endorsement is implied.
      </p>
    </LegalPage>
  );
}
