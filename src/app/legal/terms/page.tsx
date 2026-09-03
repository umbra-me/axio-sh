import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { COMPANY, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms for using axio.sh and the install scripts it serves, and how they relate to each product's software licence.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      summary="These terms cover this website and the scripts it serves. The software itself is licensed separately, under the open-source licence each product ships with."
      current="/legal/terms"
    >
      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>
            <a href="#agreement">Agreement</a>
          </li>
          <li>
            <a href="#software">The software is licensed separately</a>
          </li>
          <li>
            <a href="#scripts">Install scripts</a>
          </li>
          <li>
            <a href="#use">Acceptable use of the site</a>
          </li>
          <li>
            <a href="#ai">Software that acts on your behalf</a>
          </li>
          <li>
            <a href="#ip">Intellectual property and trademarks</a>
          </li>
          <li>
            <a href="#warranty">No warranty</a>
          </li>
          <li>
            <a href="#liability">Limitation of liability</a>
          </li>
          <li>
            <a href="#consumer">Australian Consumer Law</a>
          </li>
          <li>
            <a href="#law">Governing law</a>
          </li>
          <li>
            <a href="#changes">Changes</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ol>
      </div>

      <h2 id="agreement">1. Agreement</h2>
      <p>
        This website, axio.sh, is operated by {COMPANY.name},{" "}
        {COMPANY.description} based in {COMPANY.location}. By using the site you
        agree to these terms. If you do not agree, do not use the site. The
        terms apply to the website and to the install scripts it serves; they do
        not replace or override the licence of any software you obtain through
        it.
      </p>

      <h2 id="software">2. The software is licensed separately</h2>
      <p>
        Each Axio product is distributed under its own licence, included in its
        repository and its release artifacts:
      </p>
      <ul>
        <li>
          <strong>Axio, the coding agent:</strong>{" "}Apache License, Version 2.0.
        </li>
        <li>
          <strong>Axio Capture:</strong>{" "}Apache License, Version 2.0.
        </li>
        <li>
          <strong>Axio Analyst:</strong>{" "}MIT License.
        </li>
        <li>
          <strong>Axio Deck:</strong>{" "}not distributed; no licence is granted.
        </li>
      </ul>
      <p>
        Your rights and obligations in the software, including its disclaimer of
        warranty and limitation of liability, are set by that licence. Nothing
        on this site narrows what a licence grants you, and nothing here widens
        it. The <a href="/legal/licenses">licences page</a>{" "}reproduces the
        position and the third-party attributions.
      </p>

      <h2 id="scripts">3. Install scripts</h2>
      <p>
        <code>axio.sh/install</code>{" "}and <code>axio.sh/install.ps1</code>{" "}are
        served as plain text so that you can read them before running them, and
        you should. They check for a Rust toolchain, build the agent from its
        public source on your machine as your own user, and install it into
        your cargo binary directory. They use no elevated privileges and change
        no shell profile. They are provided under the same Apache-2.0 licence as
        the agent, and on the same as-is basis. You run them at your own
        discretion.
      </p>

      <h2 id="use">4. Acceptable use of the site</h2>
      <p>You agree not to:</p>
      <ul>
        <li>attempt to access systems behind the site without authorisation;</li>
        <li>
          interfere with the site’s operation, or place load on it that is
          disproportionate to reading it;
        </li>
        <li>
          misrepresent the site, its content or the software as your own, or
          as endorsed by anyone it is not;
        </li>
        <li>
          use the site to distribute anything unlawful, or in breach of the
          rights of others.
        </li>
      </ul>
      <p>
        Fetching the install scripts with a shell, mirroring the public
        repositories, and reading the site with any client you like are all
        fine.
      </p>

      <h2 id="ai">5. Software that acts on your behalf</h2>
      <p>
        The coding agent executes code and commands written by a language model
        against your files, with your approval. Axio Analyst sends analysis
        context to a model provider you chose and returns that provider’s
        output. Axio Deck makes changes to a Windows machine at your direction.
        In each case <strong>you decide what to approve and where to run it</strong>
        . Model output can be wrong. The products show you what they are about
        to do so that you can judge it; the judgement is yours, and so is the
        responsibility for what you approve.
      </p>
      <p>
        Your use of any model provider is governed by your agreement with that
        provider. {COMPANY.name} is not a party to it and does not relay,
        store or see the traffic.
      </p>

      <h2 id="ip">6. Intellectual property and trademarks</h2>
      <p>
        The text, design and generated imagery of this site are the property of{" "}
        {COMPANY.name}. The site’s source is published in a public repository
        so that it can be read, including the install scripts; it carries no
        open-source licence of its own, and rights in it are reserved except
        where a page says otherwise.
      </p>
      <p>
        <strong>Axio</strong>, <strong>Umbra</strong>, the Axio mark and the
        product names are trademarks of {COMPANY.name}, whether or not
        registered. The open-source licences grant rights in the code; they do
        not grant permission to use those names or marks to describe a modified
        version, a fork, or a product or service of your own as if it were ours.
        The Apache License says the same thing in its section 6. Nominative use,
        for example writing “a fork of Axio Capture”, is fine.
      </p>
      <p>
        Claude and Anthropic, Codex and OpenAI, Ollama, Binary Ninja and Vector
        35, komorebi, ShareX, GitHub, Windows, macOS and any other third-party
        name on this site belong to their respective owners. Their appearance
        here describes interoperability or inspiration and implies no
        affiliation, sponsorship or endorsement.
      </p>

      <h2 id="warranty">7. No warranty</h2>
      <p>
        The site and its content are provided “as is” and “as
        available”. To the extent permitted by law, {COMPANY.name} makes no
        warranty that the site will be uninterrupted or error-free, or that its
        content is complete or current. Product status on this site is written
        from what has been verified at the date shown and may lag the software.
        The software’s own warranty disclaimer is in its licence.
      </p>

      <h2 id="liability">8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {COMPANY.name} is not liable for
        any indirect, incidental, special, consequential or punitive loss, or
        for loss of data, profit or goodwill, arising out of your use of the
        site, the install scripts or the software, however caused. Where
        liability cannot be excluded, it is limited, at {COMPANY.name}’s
        option, to resupplying the relevant content or the cost of doing so.
      </p>

      <h2 id="consumer">9. Australian Consumer Law</h2>
      <p>
        Nothing in these terms excludes, restricts or modifies any guarantee,
        right or remedy that cannot lawfully be excluded, restricted or
        modified, including under the Australian Consumer Law in Schedule 2 of
        the Competition and Consumer Act 2010 (Cth). If such a guarantee
        applies and can be limited, {COMPANY.name}’s liability is limited
        as section 8 describes.
      </p>

      <h2 id="law">10. Governing law</h2>
      <p>
        These terms are governed by the laws of {COMPANY.jurisdiction}. Any
        dispute about them is subject to the non-exclusive jurisdiction of the
        courts of {COMPANY.courts}, without prejudice to any right you have to
        bring a claim where you live.
      </p>

      <h2 id="changes">11. Changes</h2>
      <p>
        When these terms change, the date at the top changes with it and the
        site’s public repository records the change. Continued use of the
        site after a change is acceptance of the changed terms. A change never
        alters the licence of software you have already obtained.
      </p>

      <h2 id="contact">12. Contact</h2>
      <p>
        <a href={`mailto:${CONTACT.legal}`}>{CONTACT.legal}</a>
      </p>
    </LegalPage>
  );
}
