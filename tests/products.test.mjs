import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { loadSource } from './load-source.mjs';
const { AGENT_INSTALL_REPO, PRODUCT_LIST, productHref, CAPTURE_DOWNLOADS, CAPTURE_VERSION } = loadSource(new URL('../src/lib/products.ts', import.meta.url));
test('the generated share card lists every registered product', () => {
  const file = new URL('../src/app/opengraph-image.tsx', import.meta.url);
  const source = ts.createSourceFile(file.pathname, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = source.statements.filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .find(item => item.name.getText() === 'PRODUCTS');
  const array = declaration.initializer.expression;
  const names = array.elements.map(item => item.elements[0].text);
  assert.equal(names.length, PRODUCT_LIST.length);
  assert.deepEqual(names.toSorted(), PRODUCT_LIST.map(product => product.short).toSorted());
});
test('product navigation uses unique named product paths', () => {
  assert.ok(PRODUCT_LIST.length > 0);
  assert.equal(new Set(PRODUCT_LIST.map(product => product.id)).size, PRODUCT_LIST.length);
  for (const product of PRODUCT_LIST) {
    assert.equal(productHref(product.id), `/products/${product.id}`);
    assert.ok(product.name && product.description && product.platforms.length);
    if (product.status === 'private') assert.equal(product.repo, null);
  }
});
test('public repositories stay linked and the private agent repository does not', () => {
  const byId = Object.fromEntries(PRODUCT_LIST.map(product => [product.id, product]));
  assert.equal(byId.agent.status, 'prerelease');
  assert.equal(byId.agent.repo, null);
  assert.equal(byId.capture.repo, 'https://github.com/umbra-me/axio-capture');
  assert.equal(byId.analyst.repo, 'https://github.com/umbra-me/axio-analyst');
  assert.equal(byId.local.repo, 'https://github.com/umbra-me/axio-local');
  assert.equal(byId.deck.repo, null);
  assert.equal(byId.polaris.repo, null);
  assert.equal(AGENT_INSTALL_REPO, 'https://github.com/umbra-me/axio');
});
test('Polaris customer release is listed while source remains private', () => {
  const polaris = PRODUCT_LIST.find(product => product.id === 'polaris');
  assert.ok(polaris);
  assert.equal(polaris.status, 'released');
  assert.equal(polaris.repo, null);
  assert.equal(polaris.license, 'Personal commercial licence');
  assert.match(polaris.platforms.join(' '), /macOS 15\+/);
});
test('Capture download links target named assets from the advertised release', () => {
  assert.ok(CAPTURE_DOWNLOADS.length > 0);
  for (const download of CAPTURE_DOWNLOADS) {
    const url = new URL(download.href);
    assert.equal(url.hostname, 'github.com');
    assert.equal(decodeURIComponent(url.pathname), `/umbra-me/axio-capture/releases/download/v${CAPTURE_VERSION}/${download.file}`);
  }
});
test('availability is derived from the registry, so the pages cannot go stale', () => {
  const { AVAILABLE, PRIVATE, listNames } = loadSource(new URL('../src/lib/products.ts', import.meta.url));
  assert.equal(AVAILABLE.length + PRIVATE.length, PRODUCT_LIST.length);
  assert.ok(AVAILABLE.some(product => product.id === 'polaris'), 'Polaris is on sale and must count as available');
  assert.deepEqual(PRIVATE.map(product => product.id), ['deck']);
  assert.equal(listNames(PRIVATE), 'Axio Deck');
  assert.equal(listNames(AVAILABLE.slice(0, 3)), 'Axio, Axio Capture and Axio Analyst');
  assert.equal(listNames([]), '');
});
