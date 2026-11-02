import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PRIVATE_REPO = 'https://github.com/umbra-me/axio';
// Public product repositories share this prefix and continue with a hyphen.
const PRIVATE_REPO_PATTERN = /https:\/\/github\.com\/umbra-me\/axio(?![-A-Za-z0-9])/;
const INSTALL_CONSTANT = `export const AGENT_INSTALL_REPO = "${PRIVATE_REPO}";`;

function sourceFiles(directory) {
  const found = [];
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) found.push(...sourceFiles(path));
    else if (/\.(tsx?|mjs)$/.test(name)) found.push(path);
  }
  return found;
}

test('pages do not link the private agent repository', () => {
  const root = fileURL(new URL('../src', import.meta.url));
  for (const file of sourceFiles(root)) {
    let text = readFileSync(file, 'utf8');
    if (file.endsWith('/products.ts') || file.endsWith('\\products.ts')) {
      assert.ok(text.includes(INSTALL_CONSTANT), 'the install remote stays one named constant');
      text = text.replace(INSTALL_CONSTANT, '');
    }
    assert.doesNotMatch(text, PRIVATE_REPO_PATTERN, file);
    assert.doesNotMatch(text, /href=\{[^}\n]*AGENT_INSTALL_REPO/);
    assert.doesNotMatch(text, /href=\{`[^`]*AGENT_INSTALL_REPO/);
  }
  const footer = readFileSync(join(root, 'lib/site.ts'), 'utf8');
  assert.match(footer, /label: "Install script", href: "\/install"/);
  assert.doesNotMatch(footer, PRIVATE_REPO_PATTERN);
});

function fileURL(url) {
  return decodeURIComponent(url.pathname);
}
