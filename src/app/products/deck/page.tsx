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
    <div style={{ "--pc": P.color } as CSSProperties}>
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
            <a className="btn btn--ghost" href="#status">
              Why it is private
            </a>
          </>
        }
        visual={<DeckMock />}
      />

      <div className="container">
        <hr className="rule" />
      </div>

      <section className="section reveal">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What it does</p>
            <h2 className="display display--md">Not a Linux port.</h2>
            <p>
              Hyprland, Waybar and sway are Linux-only and always will be. The
              Windows counterparts are real, and they are what Deck targets:
              komorebi for tiling, winget and Scoop for packages, and a bar and
              keybind daemon it draws and owns itself.
            </p>
          </div>
          <div className="features">
            <article className="feature">
              <span className="artifact">SHAppBarMessage</span>
              <h3>A bar that is one, not one that looks like one.</h3>
              <p>
                One borderless, always-on-top window per monitor, registered
                with the shell so the strip comes out of the desktop work area
                and maximised windows stop underneath it. Verified across three
                monitors including a portrait panel at a negative origin.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">WH_KEYBOARD_LL</span>
              <h3>Chords the shell cannot keep.</h3>
              <p>
                A low-level hook, because the ordinary API cannot take
                Super-plus-anything off the shell. Every chord is configurable
                in the Keys section, saved and swapped live. Super+1 to 9 are
                claimed only while komorebi is running.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">state.json</span>
              <h3>Undo that restores, not guesses.</h3>
              <p>
                Before the first change to an item, the exact current state is
                recorded, including a registry value that did not exist. Revert
                replays it. With no snapshot it falls back to a declared inverse
                and says so in the result.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">guard.rs</span>
              <h3>Refuses the things that break machines.</h3>
              <p>
                Edge, Defender, the Windows Update stack and WinSxS are not in
                the catalogue and are refused at apply time. Codecs are not
                bloat. It also ships no memory booster, because every one of
                them is a placebo.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">--</span>
              <h3>Measured, never invented.</h3>
              <p>
                CPU reads <code>--</code>{" "}until two samples exist rather than
                printing a confident zero. Values cross into amber at 70 percent
                and rose at 90. A bar that renders 96 percent like 4 percent is
                displaying a number, not reporting status.
              </p>
            </article>
            <article className="feature">
              <span className="artifact">one UAC prompt</span>
              <h3>The dashboard never elevates.</h3>
              <p>
                A short-lived elevated helper runs one batch and exits, so the
                dashboard’s browser engine never runs as admin. An opt-in
                background service can skip the prompt for low and medium risk
                only, and nothing can lift that cap.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="split">
            <div className="split__text">
              <p className="eyebrow">Keys</p>
              <h2 className="display display--md">
                Everything is Super plus something.
              </h2>
              <p className="lede">
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

      <section className="section reveal" id="status">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Status</p>
            <h2 className="display display--md">Private, on purpose.</h2>
          </div>
          <div className="grid grid--2">
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
        </div>
      </section>
    </div>
  );
}
