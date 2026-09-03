import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { COMPANY, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What axio.sh and the Axio products collect, what leaves your machine, and who it goes to.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      summary="This site keeps no personal data about you. The tools run on your machine and send only what you point them at. This page says exactly what that means, product by product."
      current="/legal/privacy"
    >
      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>
            <a href="#who">Who we are</a>
          </li>
          <li>
            <a href="#scope">What this policy covers</a>
          </li>
          <li>
            <a href="#site">This website</a>
          </li>
          <li>
            <a href="#software">The software</a>
          </li>
          <li>
            <a href="#third">Third parties</a>
          </li>
          <li>
            <a href="#rights">Your rights</a>
          </li>
          <li>
            <a href="#children">Children</a>
          </li>
          <li>
            <a href="#changes">Changes</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ol>
      </div>

      <h2 id="who">1. Who we are</h2>
      <p>
        Axio is a product family of {COMPANY.name}, {COMPANY.description} based
        in {COMPANY.location}. {COMPANY.name} operates this website,{" "}
        <strong>axio.sh</strong>, and publishes the Axio software. For anything
        in this policy, write to{" "}
        <a href={`mailto:${CONTACT.privacy}`}>{CONTACT.privacy}</a>.
      </p>

      <h2 id="scope">2. What this policy covers</h2>
      <p>
        It covers two things: this website, and the Axio software products
        described on it. The products are installed on and run from your own
        machine. {COMPANY.name} runs no server that the products depend on, holds
        no account for you, and cannot see what you do with them. Where a
        product sends data somewhere, it is to a service you chose and
        configured, and this policy says so below.
      </p>

      <h2 id="site">3. This website</h2>
      <h3>Page counts</h3>
      <p>
        The site counts page loads, and presses on a small number of marked
        links, as <strong>hourly totals</strong>. The collector is{" "}
        {COMPANY.name}’s own rather than a third party’s. It stores no
        cookie, no visitor identifier, no IP address, no fingerprint, no query
        string and no full referring address, only the referring site’s
        domain. A count cannot be traced back to a person, a device or a
        session. If your browser sends <strong>Do Not Track</strong>, the
        collector does nothing at all.
      </p>
      <h3>Connection logs</h3>
      <p>
        The web server that delivers this site, like any web server, sees the
        network address a request comes from, the path requested, and the time.
        Those records are kept briefly for security and fault-finding, are not
        combined with the page counts, and are not used to build a profile of
        anyone.
      </p>
      <h3>Cookies</h3>
      <p>
        The site sets no cookies and uses no local storage. There is nothing to
        consent to and no banner asking you to.
      </p>
      <h3>Third-party content</h3>
      <p>
        The site loads no third-party scripts, fonts, embeds, pixels or
        advertising. Its typefaces are served from this domain. The only script
        it loads is the page counter described above, from{" "}
        {COMPANY.name}’s own API domain.
      </p>
      <h3>Install scripts</h3>
      <p>
        <code>axio.sh/install</code>{" "}and <code>axio.sh/install.ps1</code>{" "}are
        static files. Fetching one is a page load like any other. The scripts
        themselves build the agent from source on your machine using your own
        toolchain; they send nothing back to us.
      </p>
      <h3>Administration</h3>
      <p>
        {COMPANY.name} manages this static site from its central control plane.
        The site exposes no administrative endpoint and stores no operator or
        visitor records.
      </p>

      <h2 id="software">4. The software</h2>
      <p>
        None of the Axio products includes telemetry, crash reporting, usage
        analytics or an account system. Each product’s outbound behaviour is
        listed here. If this page and a product’s source ever disagree, the
        source is what runs; tell us and we will correct the page.
      </p>

      <h3>Axio, the coding agent</h3>
      <table>
        <tbody>
          <tr>
            <th scope="row">Model providers</th>
            <td>
              During a turn the agent sends your prompt, the parts of your
              workspace it reads, and its own tool results directly to the
              provider you configured: Anthropic, Ollama, an OpenAI Codex
              subscription, or any host you name that speaks the
              OpenAI-compatible dialect. That data is handled under that
              provider’s terms, not ours. There is no relay.
            </td>
          </tr>
          <tr>
            <th scope="row">Credentials</th>
            <td>
              Stored locally at <code>~/.axio/auth.json</code>, mode 0600 on
              Unix, or taken from an environment variable. Never printed, never
              sent anywhere except to the provider they belong to, and stripped
              from the environment of every child process.
            </td>
          </tr>
          <tr>
            <th scope="row">Sessions</th>
            <td>
              Transcripts are written to disk under <code>~/.axio</code>{" "}so a
              session can be resumed. <code>--ephemeral</code>{" "}records nothing.
              A built-in deny list keeps <code>.env</code>, private keys, and
              similar files out of both the answer and the transcript.
            </td>
          </tr>
          <tr>
            <th scope="row">Quota</th>
            <td>
              <code>axio quota</code>{" "}reads credentials that other tools already
              wrote to your machine and contacts each vendor’s usage
              endpoint with them. It never reads axio’s own credential
              store. In the desktop app, signing in to a vendor opens that
              vendor’s own page in a window; the credential goes only to the
              vendor.
            </td>
          </tr>
          <tr>
            <th scope="row">Cost</th>
            <td>
              <code>axio cost</code>{" "}reads the session transcripts that other
              coding agents keep on your machine. It makes no network request.
              Importing a price list is a manual step you run yourself.
            </td>
          </tr>
          <tr>
            <th scope="row">Installer</th>
            <td>
              The install scripts and <code>cargo install</code>{" "}fetch source
              from GitHub and dependencies from crates.io. Those services see
              the requests under their own policies.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Axio Capture</h3>
      <table>
        <tbody>
          <tr>
            <th scope="row">Captures</th>
            <td>
              Stay on your machine: the clipboard, or the folder you chose. The
              app has no uploader. Uploaders are a later milestone and will be
              off unless you turn one on.
            </td>
          </tr>
          <tr>
            <th scope="row">Updates</th>
            <td>
              Installed copies fetch a small manifest from GitHub Releases
              shortly after launch and every six hours, and download an update
              from there when you accept one. GitHub sees those requests under
              its own policy. Every artifact is signature-checked before
              installation. The automatic check can be turned off in settings.
            </td>
          </tr>
          <tr>
            <th scope="row">Settings</th>
            <td>
              One JSON file in your platform’s configuration directory; the
              settings panel shows the path. Launch-at-login registers a login
              item, a Run key or an autostart entry, and nothing else.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Axio Analyst</h3>
      <table>
        <tbody>
          <tr>
            <th scope="row">Requests</th>
            <td>
              When you choose Explain or Ask, the plugin sends a bounded
              snapshot to the command-line harness you selected, which sends it
              on to that provider: the binary’s base filename (never its
              path), architecture and platform, the current function’s
              name, address, type and HLIL, your question, and any context packs
              you enabled. The exact snapshot is shown before it is sent.
            </td>
          </tr>
          <tr>
            <th scope="row">Credentials</th>
            <td>
              The plugin never reads a provider’s credential files.
              Authentication, transport, retention and account policy belong to
              the CLI and the provider you chose.
            </td>
          </tr>
          <tr>
            <th scope="row">Catalogue</th>
            <td>
              Choosing Ollama Cloud queries ollama.com for the current model
              list, falling back to the local <code>ollama list</code>{" "}when
              offline.
            </td>
          </tr>
          <tr>
            <th scope="row">Transcripts</th>
            <td>
              Kept in memory by default. Restoring conversations for a binary is
              opt-in; when enabled, a bounded record is stored under Binary
              Ninja’s user directory, keyed by a content fingerprint rather
              than a path, and can be deleted from the sidebar.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Axio Deck</h3>
      <table>
        <tbody>
          <tr>
            <th scope="row">Network</th>
            <td>
              Deck makes no network requests of its own. Tools it drives, such
              as git for reference-repository updates, do what they normally do.
            </td>
          </tr>
          <tr>
            <th scope="row">State</th>
            <td>
              Settings, the undo snapshots and a plain-text audit log live in{" "}
              <code>%LOCALAPPDATA%\AxioDeck</code>. Starting with Windows is an
              ordinary <code>Run</code>{" "}registry value that appears in the
              system’s own Startup list.
            </td>
          </tr>
          <tr>
            <th scope="row">Distribution</th>
            <td>Deck is private and not offered for download at this time.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="third">5. Third parties</h2>
      <p>
        We do not sell, rent or trade any data, because we hold none about you.
        We do not run advertising. The third parties named above, model
        providers, GitHub, crates.io and ollama.com, receive requests from
        software running on your machine at your instruction, under their own
        privacy policies, and we are not a party to those requests.
      </p>
      <p>
        If you email us, we keep the correspondence for as long as it is needed
        to deal with it. We do not add addresses to any list.
      </p>

      <h2 id="rights">6. Your rights</h2>
      <p>
        Because the site holds no personal data about visitors and the products
        hold none on our behalf, there is ordinarily nothing for us to access,
        correct or delete. If you believe we hold something about you, for
        example an email you sent, you may ask what it is, ask for it to be
        corrected, or ask for it to be deleted, and we will do so unless the law
        requires otherwise.
      </p>
      <p>
        {COMPANY.name} is based in Australia and handles any personal
        information it does receive in line with the Australian Privacy
        Principles. If you are in the European Economic Area,
        the United Kingdom, or another jurisdiction with its own data-protection
        law, you keep every right that law gives you, and you may complain to
        your local supervisory authority as well as to us.
      </p>

      <h2 id="children">7. Children</h2>
      <p>
        The site and the products are developer tools and are not directed at
        children. We knowingly collect nothing from anyone, of any age.
      </p>

      <h2 id="changes">8. Changes</h2>
      <p>
        When this policy changes, the date at the top changes with it, and the
        site’s public repository records what changed and when. A change
        that made a product send more than it does today would be announced in
        that product’s changelog before it shipped.
      </p>

      <h2 id="contact">9. Contact</h2>
      <p>
        <a href={`mailto:${CONTACT.privacy}`}>{CONTACT.privacy}</a>
      </p>
    </LegalPage>
  );
}
