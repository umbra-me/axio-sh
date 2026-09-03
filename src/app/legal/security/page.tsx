import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PRODUCTS } from "@/lib/products";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How to report a vulnerability in an Axio product, what each product does to protect you, and what it does not.",
  alternates: { canonical: "/legal/security" },
};

export default function SecurityPage() {
  const agent = PRODUCTS.agent.repo!;
  return (
    <LegalPage
      title="Security"
      summary="How to report a vulnerability, what each product does to protect you, and what it deliberately does not do. The second half matters as much as the first."
      current="/legal/security"
    >
      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>
            <a href="#report">Reporting a vulnerability</a>
          </li>
          <li>
            <a href="#supported">Supported versions</a>
          </li>
          <li>
            <a href="#agent">The coding agent</a>
          </li>
          <li>
            <a href="#capture">Axio Capture</a>
          </li>
          <li>
            <a href="#analyst">Axio Analyst</a>
          </li>
          <li>
            <a href="#deck">Axio Deck</a>
          </li>
          <li>
            <a href="#site">This website</a>
          </li>
        </ol>
      </div>

      <h2 id="report">1. Reporting a vulnerability</h2>
      <p>
        Please report privately rather than in a public issue. Either route
        reaches the same person:
      </p>
      <ul>
        <li>
          Email <a href={`mailto:${CONTACT.security}`}>{CONTACT.security}</a>.
        </li>
        <li>
          For the coding agent, open a{" "}
          <a href={`${agent}/security/advisories/new`} rel="noopener">
            GitHub security advisory
          </a>{" "}
          on its repository.
        </li>
      </ul>
      <p>
        Include the product and version, your platform, and a reproduction if
        you have one. Expect an acknowledgement within a few days. Do not
        include proprietary binaries, credentials, provider transcripts or
        personal data in a report; a minimal sanitised reproduction is enough.
      </p>
      <p>
        We do not run a bug bounty. We do credit reporters in the changelog if
        they want to be credited.
      </p>

      <h2 id="supported">2. Supported versions</h2>
      <table>
        <tbody>
          <tr>
            <th scope="row">Coding agent</th>
            <td>
              Nothing is tagged; the current <code>main</code>{" "}is the only
              supported version.
            </td>
          </tr>
          <tr>
            <th scope="row">Axio Capture</th>
            <td>
              The latest release. Installed copies update themselves from
              signed artifacts.
            </td>
          </tr>
          <tr>
            <th scope="row">Axio Analyst</th>
            <td>
              Pre-release; the latest development version on <code>main</code>.
            </td>
          </tr>
          <tr>
            <th scope="row">Axio Deck</th>
            <td>Private and not distributed.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="agent">3. The coding agent</h2>
      <p>
        <strong>
          The agent executes code written by a language model against your
          working directory.
        </strong>{" "}
        Read that sentence again before running it anywhere that matters. The
        full policy is{" "}
        <a href={`${agent}/blob/main/SECURITY.md`} rel="noopener">
          SECURITY.md
        </a>{" "}
        in the repository; this is the shape of it.
      </p>
      <h3>What it does</h3>
      <ul>
        <li>
          File reads and writes are confined to the workspace root. Every path
          goes through one constructor that rejects <code>..</code>, absolute
          paths and drive-relative spellings, then canonicalises to close the
          symlink escape.
        </li>
        <li>
          Writes, edits and shell commands require approval. Reads, globs and
          greps do not.
        </li>
        <li>
          A built-in deny list is evaluated before read-only auto-approval, so
          a rule cannot expose <code>.env</code>, private keys,{" "}
          <code>~/.ssh</code>, <code>~/.aws</code>{" "}or the credential store. It
          cannot be overridden by an allow rule or by <code>--yes</code>, and
          it is tested against a shell command’s arguments as well as
          against file paths.
        </li>
        <li>
          Every provider’s credential variable, and everything named{" "}
          <code>AXIO_*</code>, is stripped from the environment of any child
          process.
        </li>
        <li>
          On Linux, <code>--sandbox</code>{" "}applies a Landlock allow-list to the
          agent before its runtime starts and every command inherits it: the
          workspace is writable, the system is readable, and <code>$HOME</code>{" "}
          is not there at all.
        </li>
      </ul>
      <h3>What it does not do</h3>
      <ul>
        <li>
          <strong>There is no sandbox by default.</strong>{" "}Without{" "}
          <code>--sandbox</code>, a command you approve can do anything your
          user account can do.
        </li>
        <li>
          The deny list guards against accident, not against a determined agent
          with a shell. A path a shell computes rather than states plainly is
          not seen by it.
        </li>
        <li>
          <code>--yes</code>{" "}disables the approval prompt. With the shell tool
          it gives a model unattended access to your account. It exists because
          automation needs it; it is not a mode to leave on.
        </li>
        <li>
          The sandbox says nothing about the network, does nothing on macOS or
          Windows (it warns, never silently), and does not protect the
          credential store, which the deny list covers instead.
        </li>
      </ul>

      <h2 id="capture">4. Axio Capture</h2>
      <ul>
        <li>
          Every update artifact is signature-checked against the minisign
          public key compiled into the app before it is installed. The private
          key is held outside every repository.
        </li>
        <li>
          Releases are built in CI from a tag and published as a draft first,
          so an artifact is reviewed before an installed copy can see it.
        </li>
        <li>
          macOS bundles are code-signed but not notarised, so Gatekeeper asks on
          first launch. Screen Recording permission is requested through the
          system prompt and cannot be granted by the app itself.
        </li>
        <li>
          The app has no uploader and no network path other than the updater.
        </li>
      </ul>

      <h2 id="analyst">5. Axio Analyst</h2>
      <ul>
        <li>
          No request is sent until you choose Ask or Explain, and the exact
          snapshot is shown before dispatch under a deterministic size cap.
        </li>
        <li>
          Prompts go to the harness on stdin rather than in a process command
          line, and only the binary’s base filename is included.
        </li>
        <li>
          The plugin never reads a provider credential file. Claude Code runs
          without tools, browser integration, slash commands or session
          persistence; Codex runs ephemerally in a read-only sandbox.
        </li>
        <li>
          Provider output is imported as Markdown with HTML disabled at the
          parser, so a tag in a response renders as inert text. Generic links
          are not opened; only validated address citations navigate.
        </li>
        <li>
          Version {PRODUCTS.analyst.statusLabel.split(" ")[0]} never writes to
          the BNDB, and the package split that enforces it is covered by
          contract tests.
        </li>
      </ul>

      <h2 id="deck">6. Axio Deck</h2>
      <ul>
        <li>
          The dashboard never elevates. Privileged changes run in a short-lived
          elevated helper, one UAC prompt per batch, by default.
        </li>
        <li>
          The opt-in background service is a standing escalation surface and is
          therefore capped at low and medium risk; <code>force</code>{" "}cannot
          lift the cap.
        </li>
        <li>
          A protected list of services and packages is refused at apply time:
          Defender, Edge, the Windows Update stack, WSL2 networking and the
          media codecs.
        </li>
        <li>
          Undo is snapshot-first and the snapshot is written once, so applying
          twice cannot record the modified state as the original.
        </li>
      </ul>

      <h2 id="site">7. This website</h2>
      <ul>
        <li>
          Static build, no database, no accounts, no cookies, no third-party
          scripts. The only script is the first-party page counter.
        </li>
        <li>
          Install scripts are served as <code>text/plain</code>{" "}with{" "}
          <code>nosniff</code>, so a browser shows the source instead of
          running or downloading it. Read them before piping them to a shell.
        </li>
        <li>The site exposes no product-owned administrative endpoint.</li>
        <li>
          The container image is labelled with the exact commit it was built
          from, and the control plane compares that label with the recorded
          pin after every deploy.
        </li>
      </ul>
    </LegalPage>
  );
}
