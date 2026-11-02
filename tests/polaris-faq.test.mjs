import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

// Tessera's Faq renders each answer inside <p class="ts-faq__answer">. A
// paragraph answer is invalid there: the browser closes the outer paragraph
// before the inner one, and hydration then reports a text mismatch.
const pageUrl = new URL('../src/app/products/polaris/page.tsx', import.meta.url);
const source = readFileSync(pageUrl, 'utf8');
const start = source.indexOf('const FAQ:');
const end = source.indexOf('export default function PolarisPage');
const faqSource = source.slice(start, end).replaceAll('POLARIS_PRICE', '"A$59"');
const { outputText } = ts.transpileModule(`${faqSource}\nmodule.exports = { FAQ };`, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  },
});
const module = { exports: {} };
new Function('require', 'module', 'exports', '__dirname', outputText)(
  createRequire(pageUrl),
  module,
  module.exports,
  dirname(fileURLToPath(pageUrl)),
);

function nestedParagraphs(html) {
  const voids = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
  const stack = [];
  let nested = 0;
  for (const match of html.matchAll(/<\/?([a-zA-Z][\w:-]*)[^>]*>/g)) {
    const token = match[0];
    const name = match[1].toLowerCase();
    if (token.startsWith('</')) {
      const index = stack.lastIndexOf(name);
      if (index >= 0) stack.length = index;
      continue;
    }
    if (token.endsWith('/>') || voids.has(name)) continue;
    if (name === 'p' && stack.includes('p')) nested += 1;
    stack.push(name);
  }
  return nested;
}

test('Polaris FAQ answers remain valid inside the paragraph Tessera renders', () => {
  const { FAQ } = module.exports;
  assert.equal(FAQ.length, 8);
  for (const item of FAQ) {
    const answer = renderToStaticMarkup(item.a);
    const wrapped = `<p class="ts-faq__answer">${answer}</p>`;
    assert.equal(nestedParagraphs(wrapped), 0, item.q);
    assert.match(answer, /\S/);
    assert.doesNotMatch(answer, /<(div|p|ul|ol|table|h[1-6]|section|article)\b/);
  }
});
