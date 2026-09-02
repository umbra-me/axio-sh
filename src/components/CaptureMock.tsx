// Axio Capture's editor, drawn. A capture on the canvas with an arrow, a
// numbered step, a text label and a pixelated block over the part that should
// not be shared; the tool rail on the left with the pen selected; the HUD the
// editor offers at the end of a capture. Every tool key shown is one the
// editor binds.
export default function CaptureMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__bar">
        <i />
        Axio Capture
        <span className="sep">/</span>
        <span>editor</span>
        <span className="right">1440 × 900 · png</span>
      </div>
      <div className="cap">
        <div className="cap__tools">
          <span>A</span>
          <span>L</span>
          <span>R</span>
          <span>E</span>
          <span className="on">P</span>
          <span>H</span>
          <span>T</span>
          <span>N</span>
          <span>B</span>
        </div>
        <div className="cap__canvas">
          <div className="cap__shot">
            <div className="win">
              <i />
              <i />
              <i />
            </div>
            <div className="line" style={{ top: "3.4rem", width: "42%" }} />
            <div className="line" style={{ top: "4.4rem", width: "63%" }} />
            <div className="line" style={{ top: "5.4rem", width: "55%" }} />
            <div className="line" style={{ top: "7.2rem", width: "30%" }} />
            <div className="line" style={{ top: "8.2rem", width: "48%" }} />
            <div className="line" style={{ top: "9.2rem", width: "38%" }} />
            <div className="line" style={{ top: "11rem", width: "58%" }} />
            <div className="line" style={{ top: "12rem", width: "44%" }} />

            <div
              className="cap__annot"
              style={{ left: "1.2rem", top: "6.9rem", width: "58%", height: "3.1rem" }}
            />
            <span className="cap__step" style={{ left: "0.4rem", top: "6.2rem" }}>
              1
            </span>
            <div
              className="cap__blur"
              style={{ left: "1.5rem", top: "11.05rem", width: "38%", height: "0.9rem" }}
            />
            <span className="cap__step" style={{ left: "0.4rem", top: "10.7rem" }}>
              2
            </span>
            <svg
              className="cap__arrow"
              style={{ left: "62%", top: "5.2rem" }}
              width="110"
              height="60"
              viewBox="0 0 110 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M104 6C80 10 44 22 8 52" />
              <path d="M22 52H8V38" />
            </svg>
            <span className="cap__text" style={{ left: "68%", top: "2.6rem" }}>
              this one
            </span>
          </div>
          <div className="cap__hud">
            <span>Save</span>
            <span className="primary">Copy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
