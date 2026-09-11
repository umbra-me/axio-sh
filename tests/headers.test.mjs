import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadSource } from './load-source.mjs';
const config = loadSource(new URL('../next.config.ts', import.meta.url)).default;
const layout = readFileSync(new URL('../src/app/layout.tsx', import.meta.url), 'utf8');
async function headerMap() {
  const [rule] = await config.headers();
  assert.equal(rule.source, '/:path*');
  return new Map(rule.headers.map(header => [header.key, header.value]));
}
function directives(csp) {
  return new Map(csp.split(';').map(part => part.trim()).filter(Boolean)
    .map(part => [part.split(/\s+/)[0], part.split(/\s+/).slice(1)]));
}
test('every page carries the estate security header set', async () => {
  const headers = await headerMap();
  for (const key of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options',
    'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy']) {
    assert.ok(headers.get(key), `missing ${key}`);
  }
  assert.equal(headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(headers.get('X-Frame-Options'), 'DENY');
  assert.match(headers.get('Strict-Transport-Security'), /^max-age=31536000\b/);
});
test('the policy allows the collector the layout actually loads', async () => {
  // The script tag and the policy are written apart, so drift between them
  // would take the collector off every page with no visible error.
  const fallback = layout.match(/"(https:\/\/[^"]+analytics[^"]*)"/);
  assert.ok(fallback, 'layout no longer names a default collector URL');
  const origin = new URL(fallback[1]).origin;
  const csp = directives(await headerMap().then(headers => headers.get('Content-Security-Policy')));
  assert.ok(csp.get('script-src').includes(origin));
  assert.ok(csp.get('connect-src').includes(origin));
  // The collector reads this site's settings, the kill switch included, from
  // the admin API. Blocked, it falls back to settings that disable nothing.
  assert.ok(csp.get('connect-src').includes('https://admin-api.umbra.me'));
});
test('the policy keeps the defaults that make it worth setting', async () => {
  const csp = directives(await headerMap().then(headers => headers.get('Content-Security-Policy')));
  assert.deepEqual(csp.get('default-src'), ["'self'"]);
  assert.deepEqual(csp.get('object-src'), ["'none'"]);
  assert.deepEqual(csp.get('frame-ancestors'), ["'none'"]);
  assert.deepEqual(csp.get('base-uri'), ["'self'"]);
  assert.deepEqual(csp.get('form-action'), ["'self'"]);
  // Cloudflare rewrites mailto links into a script it serves from /cdn-cgi/ on
  // this origin; 'self' is what keeps the support address readable.
  assert.ok(csp.get('script-src').includes("'self'"));
  // The mark is an inline SVG data URL and the launch demos are same-origin.
  assert.ok(csp.get('img-src').includes('data:'));
  assert.ok(csp.get('media-src').includes("'self'"));
});
