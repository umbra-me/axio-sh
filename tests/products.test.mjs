import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSource } from './load-source.mjs';
const { PRODUCT_LIST, productHref, CAPTURE_DOWNLOADS, CAPTURE_VERSION } = loadSource(new URL('../src/lib/products.ts', import.meta.url));
test('product navigation uses unique named product paths', () => {
  assert.ok(PRODUCT_LIST.length > 0);
  assert.equal(new Set(PRODUCT_LIST.map(product => product.id)).size, PRODUCT_LIST.length);
  for (const product of PRODUCT_LIST) {
    assert.equal(productHref(product.id), `/products/${product.id}`);
    assert.ok(product.name && product.description && product.platforms.length);
    if (product.status === 'private') assert.equal(product.repo, null);
  }
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
