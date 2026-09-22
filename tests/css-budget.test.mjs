import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

// globals.css is the Tessera imports and the backdrop; home.css is the little
// the site still draws itself, on Tessera's tokens. Neither can quietly become
// a stylesheet again, and the drawings' stylesheets stay gone.
const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const code = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const selectors = (css) => [...code(css).matchAll(/^\s*([.#a-z:*][^{}]*?)\s*\{/gm)].map((m) => m[1].trim());

test('globals.css holds only the tessera imports and the backdrop', () => {
  const css = read('../src/app/globals.css');
  assert.ok(css.split('\n').length <= 60, `too long: ${css.split('\n').length} lines`);
  for (const s of selectors(css)) assert.match(s, /^\.bg(\b|::)/, `unexpected selector: ${s}`);
});

test('home.css is small and reads no alias', () => {
  const css = read('../src/app/home.css');
  const lines = css.split('\n').length;
  assert.ok(lines <= 700, `too long: ${lines} lines`);
  const aliases = code(css).match(/var\(--(ground|slate|text|text-2|muted|faint|accent|line|line-soft|line-strong|lit|pc|p-[a-z]+|r-\d|mono|sans|fast|base|slow|ease|shadow-\d|cyan|violet|mint|amber|rose|ok|warn|danger)\b/g);
  assert.equal(aliases, null, `alias layer names still read: ${aliases}`);
});

test('the drawings’ stylesheets are gone', () => {
  for (const f of ['../src/app/site.css', '../src/components/Surface.css', '../src/components/ProductMocks.css', '../src/components/PolarisVideo.css', '../src/components/PolarisPage.css']) {
    assert.ok(!existsSync(new URL(f, import.meta.url)), `${f} still exists`);
  }
});
