import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// globals.css is the Tessera imports and the backdrop; everything else the
// site still draws lives beside the component that draws it, so this file
// cannot quietly become a stylesheet again.
const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');

test('globals.css holds only the tessera imports and the backdrop', () => {
  const lines = css.split('\n').length;
  assert.ok(lines <= 60, `too long: ${lines} lines`);
  const code = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const selectors = [...code.matchAll(/^\s*([.#a-z][^{}]*?)\s*\{/gm)].map((m) => m[1].trim());
  for (const s of selectors) assert.match(s, /^\.bg(\b|::)/, `unexpected selector: ${s}`);
});
