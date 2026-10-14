import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, copyFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const run = (manifest, lock, workspace = 'packages: [.]\n') => {
  const root = mkdtempSync(path.join(tmpdir(), 'private-release-inputs-'));
  try {
    writeFileSync(path.join(root, 'package.json'), JSON.stringify(manifest));
    writeFileSync(path.join(root, 'pnpm-lock.yaml'), lock);
    writeFileSync(path.join(root, 'pnpm-workspace.yaml'), workspace);
    const script = path.join(root, 'scripts');
    mkdirSync(script);
    copyFileSync(new URL('./check-release-inputs.mjs', import.meta.url), path.join(script, 'check-release-inputs.mjs'));
    return spawnSync(process.execPath, [path.join(script, 'check-release-inputs.mjs')], { encoding: 'utf8' }).status;
  } finally { rmSync(root, { recursive: true, force: true }); }
};

test('accepts registry inputs with ordinary lockfile fields and vfile package names', () => {
  assert.equal(run({ dependencies: { '@tessera/ui': '0.1.1' } }, 'settings:\n  excludeLinksFromLockfile: false\npackages:\n  vfile: 6.0.3\n'), 0);
});

test('rejects all local dependency protocols in manifests, locks and overrides', () => {
  for (const protocol of ['file:', 'link:', 'workspace:']) {
    assert.notEqual(run({ dependencies: { '@tessera/ui': protocol + './fixture' } }, 'packages: {}\n'), 0);
    assert.notEqual(run({ dependencies: {} }, 'packages:\n  "@tessera/ui@' + protocol + './fixture": {}\n'), 0);
    assert.notEqual(run({ dependencies: {} }, 'packages: {}\n', 'overrides:\n  "@tessera/ui": ' + protocol + './fixture\n'), 0);
  }
});
