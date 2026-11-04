import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LegalDocument } from '@tessera/patterns';

const source = (path) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');

test('legal dates use the owner’s day, full month and year format', () => {
  const updated = source('lib/site.ts').match(/LEGAL_UPDATED = "([^"]+)"/)[1];
  assert.equal(updated, '10 September 2026');
  const html = renderToStaticMarkup(createElement(LegalDocument, { title: 'Terms', updated }));
  assert.match(html, /Last updated 10 September 2026/);
  assert.doesNotMatch(html, /Last updated:/);
  assert.match(source('components/LegalPage.tsx'), /updated = LEGAL_UPDATED/);
  for (const page of ['legal/terms', 'legal/licenses', 'products/polaris/licence']) {
    const pageSource = source(`app/${page}/page.tsx`);
    assert.match(pageSource, /<LegalPage\b/);
    assert.doesNotMatch(pageSource, /updated=/, `${page} must use the shared date`);
  }
  for (const page of ['privacy', 'security']) {
    assert.match(source(`app/legal/${page}/page.tsx`), /updated="3 November 2026"/);
  }
});
