# Frontend lint verification — 2026-09-05

The standalone package now exposes `lint` (ESLint over all `src` TypeScript/TSX)
and `typecheck` (`tsc --noEmit`) as separate gates. Generated output is excluded;
source files and rules are not suppressed to make the gate pass.

Run `npm ci`, then
`npm run lint`, `run typecheck`, `test`, and `run build` with the same package manager.
All four commands passed on macOS on September 5: 2 existing frontend tests,
zero lint errors or warnings, successful TypeScript and production frontend build.
A temporary `src/audit-invalid-lint.ts` containing an invalid declaration was
rejected with exit 1 and a parsing error, then removed in a finally block.
The aggregate rejection receipt is `/tmp/axio-lint-rejection-20260905.json` on the
audit workstation.

Next core-web-vitals and TypeScript recommended rules are enabled. ESLint 9.39.5
is required by the current Next React plugin: ESLint 10 was tested and fails at
`react/display-name` because the plugin uses the removed `context.getFilename`.
The 9.x release is deprecated upstream; upgrading the plugin/config and ESLint
together remains a tooling maintenance task, not a hidden passing 10.x gate.

Home links use Next Link. Generated icon image elements have decorative alt text.
Clipboard availability and reduced-motion preference use hydration-safe external
store snapshots rather than synchronous state updates inside effects. The animated
transcript remains timed normally and renders its complete content immediately
when reduced motion is enabled; changing that preference also updates the view.

Actual headless Chromium against the locally built site verified a complete
reduced-motion transcript without a caret, a synthetic clipboard write, the copied
label and its reset after two seconds, and zero browser exceptions. The fixture
replaced only the browser clipboard boundary and made no external writes.
Runtime command/fixture: `node /tmp/axio-lint-browser.cjs` on the audit workstation.
This proves the local frontend, not production deployment.
