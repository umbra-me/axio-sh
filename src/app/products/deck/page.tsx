import { FeatureGrid } from "@tessera/marketing";
import { Button } from "@tessera/ui";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import DeckMock from "@/components/DeckMock";
import ProductHero from "@/components/ProductHero";
import { PRODUCTS } from "@/lib/products";

const P = PRODUCTS.deck;

export const metadata: Metadata = {
  title: "Axio Deck",
  description: `${P.tagline}. ${P.description}`,
  alternates: { canonical: "/products/deck" },
};

const CHORDS: [string, string][] = [
  ["Super+S", "Open the dashboard"],
  ["Super+Space", "Open the mark's menu"],
  ["Super+Q", "Close the focused window"],
  ["Super+Alt+B", "Toggle the bar"],
  ["Super+Left / Right", "Previous or next workspace"],
  ["Super+1 … 9", "Focus that komorebi workspace"],
  ["Super+drag", "Move a window from anywhere inside it"],
  ["Super+right-drag", "Resize it from the nearest corner"],
];

export default function DeckPage() {
  return (
    <div style={{ "--ts-product-color": P.color } as CSSProperties}>
      <ProductHero
        product={P}
        headline={
          <>
            A bar it draws.
            <br />
            <em>Keys it owns.</em>
          </>
        }
        lede={P.description}
        actions={
          <>
            <Button asChild size="lg" variant="secondary">
<a href="#status">
              Why it is private
            </a>
</Button>
          </>
        }
        visual={<DeckMock />}
      />

      <div className="ts-container">
        <hr className="ts-separator" />
      </div>

      <section className="ts-section">
        <div className="ts-container">
          <div className="site-head">
            <p className="ts-eyebrow" data-mono="">What it does</p>
            <h2 className="ts-display" data-size="section">Not a Linux port.</h2>
            <p>
              Hyprland, Waybar and sway are Linux-only and always will be. The
              Windows counterparts are real, and they are what Deck targets:
              komorebi for tiling, winget and Scoop for packages, and a bar and
              keybind daemon it draws and owns itself.
            </p>
          </div>
          <FeatureGrid variant="bordered" items={[{ kicker: "SHAppBarMessage", title: <>A bar that is one, not one that looks like one.</>, body: <>One borderless, always-on-top window per monitor, registered with the shell so the strip comes out of the desktop work area and maximised windows stop underneath it. Verified across three monitors including a portrait panel at a negative origin.</> }, { kicker: "WH_KEYBOARD_LL", title: <>Chords the shell cannot keep.</>, body: <>A low-level hook, because the ordinary API cannot take Super-plus-anything off the shell. Every chord is configurable in the Keys section, saved and swapped live. Super+1 to 9 are claimed only while komorebi is running.</> }, { kicker: "state.json", title: <>Undo that restores, not guesses.</>, body: <>Before the first change to an item, the exact current state is recorded, including a registry value that did not exist. Revert replays it. With no snapshot it falls back to a declared inverse and says so in the result.</> }, { kicker: "guard.rs", title: <>Refuses the things that break machines.</>, body: <>Edge, Defender, the Windows Update stack and WinSxS are not in the catalogue and are refused at apply time. Codecs are not bloat. It also ships no memory booster, because every one of them is a placebo.</> }, { kicker: "--", title: <>Measured, never invented.</>, body: <>CPU reads <code>--</code>{" "}until two samples exist rather than printing a confident zero. Values cross into amber at 70 percent and rose at 90. A bar that renders 96 percent like 4 percent is displaying a number, not reporting status.</> }, { kicker: "one UAC prompt", title: <>The dashboard never elevates.</>, body: <>A short-lived elevated helper runs one batch and exits, so the dashboard’s browser engine never runs as admin. An opt-in background service can skip the prompt for low and medium risk only, and nothing can lift that cap.</> }]} />        </div>
      </section>

      <section className="ts-section">
        <div className="ts-container">
          <div className="split">
            <div className="split__text">
              <p className="ts-eyebrow" data-mono="">Keys</p>
              <h2 className="ts-display" data-size="section">
                Everything is Super plus something.
              </h2>
              <p className="ts-lede">
                Anything else belongs to the application with focus. A launch
                binding names a launcher rather than a path, so changing which
                terminal a chord opens is one edit rather than a hunt through
                the list.
              </p>
            </div>
            <div className="ledger-card">
              <table className="ledger">
                <tbody>
                  {CHORDS.map(([chord, does]) => (
                    <tr key={chord}>
                      <th scope="row">{chord}</th>
                      <td>{does}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="ts-section" id="status">
        <div className="ts-container">
          <div className="site-head">
            <p className="ts-eyebrow" data-mono="">Status</p>
            <h2 className="ts-display" data-size="section">Private, on purpose.</h2>
          </div>
          <div className="ts-grid-2">
            <div className="card card--static">
              <h3>Not yet distributed</h3>
              <p>
                Deck installs onto a workstation and makes privileged changes to
                it. Until its scaffolded sections are real and its verification
                has been run by more than one person, it is not offered for
                download, and no licence has been chosen for it. A change to
                public is a separate decision.
              </p>
            </div>
            <div className="card card--static">
              <h3>What is live today</h3>
              <p>
                Seven of the eight sections: Overview, Packages, Tiling, Bar,
                System, Drives and Keys. Theme is a scaffold, and opens with a
                banner saying so and naming what would make it real. A mock
                that reads as shipped is worse than no mock.
              </p>
            </div>
          </div>
          <p className="ts-text ts-note" data-tone="muted">
            App removal has no automatic undo: it requires confirmation, cannot
            run through the unattended service, and needs manual reinstall.
            Stored package inventories do not restore the original payload or
            data.
          </p>
        </div>
      </section>
    </div>
  );
}
