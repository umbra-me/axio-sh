import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSource } from './load-source.mjs';

// The hero's argument is that the agent asks before it acts, made with the
// agent's own strings. These are the strings the TUI paints during an
// approval (crates/axio/src/tui/paint.rs: `title`, `prompt_row`,
// `status_row`), so a change there is a change here.
const { FRAME, TITLE, PROMPT, HINT } = loadSource(
  new URL('../src/components/ApprovalTranscript.tsx', import.meta.url),
);

test('the approval prompt is the one the agent prints', () => {
  assert.equal(TITLE, 'approve  edit:crates/axio-pty/src/session.rs');
  assert.equal(PROMPT, 'allow?  y once   a this session   n no, and say why   esc no');
  assert.equal(HINT, 'the change above is what runs');
});

test('the frame closes: every rule is the same width as the prompt row', () => {
  const rows = [FRAME.top, FRAME.mid, FRAME.bottom];
  const widths = rows.map((row) => [...row].length);
  assert.equal(new Set(widths).size, 1, `rows differ in width: ${widths.join(', ')}`);
  assert.ok(FRAME.top.startsWith('╭') && FRAME.top.endsWith('╮'));
  assert.ok(FRAME.bottom.startsWith('╰') && FRAME.bottom.endsWith('╯'));
  assert.ok(FRAME.mid.startsWith('│') && FRAME.mid.endsWith('│'));
  assert.ok(FRAME.top.includes(TITLE));
  assert.ok(FRAME.mid.includes(PROMPT));
});
