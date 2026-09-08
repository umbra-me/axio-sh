export default function PolarisMock() {
  return (
    <div>
      <div className="mock polaris" aria-hidden="true">
        <div className="mock__bar">
          <i />
          Axio Polaris
          <span className="sep">/</span>
          Launcher
          <span className="right">09:41</span>
        </div>
        <div className="polaris__desktop">
          <div className="polaris__notch">
            <span>Now playing</span>
            <b>3:12</b>
            <i />
          </div>
          <div className="polaris__launcher">
            <div className="polaris__search">Start a focus session…</div>
            <div className="polaris__session">
              <div>
                <span className="artifact">DEEP WORK</span>
                <strong>Until 10:30</strong>
                <small>Social · Video · 3 apps</small>
              </div>
              <span className="polaris__clock">47:18</span>
            </div>
            <div className="polaris__actions">
              <span>Take a break</span>
              <span>Add note</span>
              <span>End</span>
            </div>
          </div>
          <div className="polaris__shelf">
            <span>♫</span>
            <span>◷</span>
            <span>✓</span>
            <span>▣</span>
            <span>＋</span>
          </div>
        </div>
      </div>
      <p className="mock-caption">Illustration of Polaris tools; interface may change.</p>
    </div>
  );
}
