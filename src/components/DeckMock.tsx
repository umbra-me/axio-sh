// Axio Deck, drawn: the bar it draws along the top of a monitor, and the
// dashboard's System section under it with the debloat catalogue and the
// snapshot-first undo. The eight sections and their states are the README's.
const SECTIONS: [string, string][] = [
  ["Overview", "live"],
  ["Packages", "live"],
  ["Tiling", "live"],
  ["Bar", "live"],
  ["Theme", "scaffold"],
  ["System", "live"],
  ["Drives", "live"],
  ["Keys", "live"],
];

export default function DeckMock() {
  return (
    <div className="mock deck" aria-hidden="true">
      <div className="deck__bar">
        <span className="mark" />
        <span className="ws on">1</span>
        <span className="ws">2</span>
        <span className="ws">3</span>
        <span className="ws">4</span>
        <span className="title">wezterm — ~/src/deck</span>
        <span className="mods">
          <span>
            cpu <b>23%</b>
          </span>
          <span>
            mem <b className="hot">71%</b>
          </span>
          <span>
            net <b>1.2 MB/s</b>
          </span>
          <span>
            drift <b>0</b>
          </span>
          <span>
            <b>21:47</b>
          </span>
        </span>
      </div>
      <div className="deck__body">
        <div className="deck__sections">
          {SECTIONS.map(([name, state], i) => (
            <div key={name} className={name === "System" ? "on" : undefined}>
              {name}
              <small>{state === "live" ? `alt+${i + 1}` : state}</small>
            </div>
          ))}
        </div>
        <div className="deck__pane">
          <h4>System · debloat catalogue</h4>
          <div className="deck__items">
            <div className="deck__item">
              <i className="on" />
              Advertising ID and tailored experiences
              <span className="risk">low</span>
            </div>
            <div className="deck__item">
              <i className="on" />
              Consumer features and suggested apps
              <span className="risk">low</span>
            </div>
            <div className="deck__item">
              <i />
              Widgets service
              <span className="risk med">medium</span>
            </div>
            <div className="deck__item">
              <i />
              Xbox Game Bar
              <span className="risk">low</span>
            </div>
          </div>
          <div className="deck__undo">
            snapshot recorded before first change · revert replays it exactly{" "}
            <span>· 2 items, 1 UAC prompt</span>
          </div>
        </div>
      </div>
    </div>
  );
}
