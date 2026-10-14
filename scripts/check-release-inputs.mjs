import { readFileSync } from 'node:fs';
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
for (const [name, value] of Object.entries(manifest.dependencies)) {
  if (/^(file:|link:|workspace:)/.test(value)) throw new Error(`release rejects local artifact fixture: ${name}; select published immutable artifacts first`);
}
const lock = readFileSync(new URL('../pnpm-lock.yaml', import.meta.url), 'utf8');
if (/\b(?:file|link|workspace):/.test(lock)) throw new Error('release rejects local dependency lock selections');
const workspace = readFileSync(new URL('../pnpm-workspace.yaml', import.meta.url), 'utf8');
if (/\b(?:file|link|workspace):/.test(workspace)) throw new Error('release rejects local dependency overrides');
console.log('release dependency selection accepted');
