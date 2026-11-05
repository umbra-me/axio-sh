/* global process, URL */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { environmentUrl, environmentText, environmentZone, productionHostname, publicUrl, stagingLabel } from './public-environment.mjs';

test('portfolio routing follows the host without rewriting external or relative destinations', () => {
  for (const suffix of ['', '.local', '.localhost', '.staging']) {
    const host = `account.umbra.me${suffix}`;
    for (const domain of ['umbra.me', 'umbra.nexus', 'umbra.ninja', 'axio.sh', 'vexel.sh', 'evade.fail', 'exploit.ac', 'kian.pw', 'zenco.cc']) {
      assert.equal(environmentUrl(`https://${domain}/path?q=1#anchor`, host), `https://${domain}${suffix}/path?q=1#anchor`);
      assert.equal(publicUrl(domain, host), `https://${domain}${suffix}`);
    }
    for (const value of ['/settings', '#section', 'mailto:hello@umbra.me', 'https://github.com/umbra-me', 'https://vexel.sh.evil.test/', 'javascript:alert(1)']) assert.equal(environmentUrl(value, host), value);
  }
});
test('suffixes are idempotent and encoded callback destinations remain local', () => {
  const local = 'vexel.sh.local';
  assert.equal(environmentUrl('https://vexel.sh.local', local), 'https://vexel.sh.local');
  const result = new URL(environmentUrl('https://id.umbra.me/login?redirect=https%3A%2F%2Faccount.umbra.me%2F', local));
  assert.equal(result.host, 'id.umbra.me.local');
  assert.equal(result.searchParams.get('redirect'), 'https://account.umbra.me.local/');
  assert.equal(environmentText("connect-src 'self' https://api.umbra.me https://admin-api.umbra.me", local), "connect-src 'self' https://api.umbra.me.local https://admin-api.umbra.me.local");
});
test('SSR uses explicit public configuration and production is the default', () => {
  const saved = {...process.env};
  try {
    delete process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX;
    delete process.env.UMBRA_PUBLIC_SUFFIX;
    process.env.NODE_ENV = 'production';
    assert.equal(environmentUrl('https://vexel.sh'), 'https://vexel.sh');
    process.env.UMBRA_PUBLIC_SUFFIX = '.local';
    assert.equal(environmentUrl('https://vexel.sh'), 'https://vexel.sh.local');
    assert.equal(environmentUrl('https://vexel.sh', 'umbra.me'), 'https://vexel.sh');
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX = '.staging';
    assert.equal(publicUrl('vexel.sh'), 'https://vexel.sh.staging');
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX = '.evil.test';
    assert.throws(() => publicUrl('vexel.sh'), /Unsupported/);
    delete process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX;
    delete process.env.UMBRA_PUBLIC_SUFFIX;
    process.env.NODE_ENV = 'development';
    assert.equal(publicUrl('vexel.sh'), 'https://vexel.sh.local');
  } finally { process.env = saved; }
});


test('managed source development preserves the localhost router origin across links and callbacks', () => {
  const saved = {...process.env};
  try {
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX = '.localhost';
    process.env.NEXT_PUBLIC_UMBRA_DEV_ROUTER_PORT = '18080';
    assert.equal(publicUrl('axio.sh'), 'http://axio.sh.localhost');
    assert.equal(environmentUrl('https://vexel.sh/path?q=1#anchor'), 'http://vexel.sh.localhost/path?q=1#anchor');
    const callback = new URL(environmentUrl('https://id.umbra.me/login?redirect=https%3A%2F%2Faccount.umbra.me%2F'));
    assert.equal(callback.origin, 'http://id.umbra.me.localhost');
    assert.equal(callback.searchParams.get('redirect'), 'http://account.umbra.me.localhost/');
    assert.equal(environmentUrl('https://github.com/umbra-me'), 'https://github.com/umbra-me');
    assert.equal(environmentUrl('https://vexel.sh', 'umbra.me'), 'https://vexel.sh');
    process.env.NODE_ENV = 'production';
    assert.equal(environmentUrl('https://vexel.sh'), 'https://vexel.sh.localhost');
    delete process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX;
    assert.equal(environmentUrl('https://vexel.sh'), 'https://vexel.sh');
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX = '.localhost';
    process.env.NEXT_PUBLIC_UMBRA_DEV_ROUTER_PORT = '0';
    assert.throws(() => publicUrl('vexel.sh'), /router port/);
  } finally { process.env = saved; }
});


test('managed debugging headers are opt-in and preserve production security', async () => {
  const {developmentHeaders} = await import('./public-environment.mjs');
  const headers = [{key:'Content-Security-Policy', value:"default-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; upgrade-insecure-requests"}, {key:'Strict-Transport-Security',value:'max-age=31536000'}];
  const before = JSON.stringify(headers);
  const saved = {...process.env};
  try {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_PUBLIC_UMBRA_DEV_ROUTER_PORT = '18080';
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX = '.localhost';
    assert.equal(developmentHeaders(headers), headers);
    process.env.NODE_ENV = 'development';
    delete process.env.NEXT_PUBLIC_UMBRA_DEV_ROUTER_PORT;
    assert.equal(developmentHeaders(headers), headers);
    process.env.NEXT_PUBLIC_UMBRA_DEV_ROUTER_PORT = '18080';
    const result = developmentHeaders(headers);
    assert.equal(result.length, 1);
    assert.match(result[0].value, /script-src 'self' 'unsafe-eval'/);
    assert.match(result[0].value, /ws:\/\/\*.localhost/);
    assert.doesNotMatch(result[0].value, /upgrade-insecure-requests/);
    assert.match(result[0].value, /object-src 'none'/);
    assert.equal(JSON.stringify(headers), before);
  } finally {process.env = saved;}
});


test('local browser links never expose backend or relay ports', () => {
  for (const suffix of ['.local', '.localhost']) {
    const host = `umbra.me${suffix}`;
    assert.equal(environmentUrl(`https://axio.sh${suffix}:8443/path`, host), `https://axio.sh${suffix}/path`);
    const callback = new URL(environmentUrl('https://id.umbra.me:23008/login?redirect=https%3A%2F%2Faccount.umbra.me%3A23008%2F', host));
    assert.equal(callback.origin, `https://id.umbra.me${suffix}`);
    assert.equal(callback.searchParams.get('redirect'), `https://account.umbra.me${suffix}/`);
  }
  assert.equal(environmentUrl('https://github.com:8443/path', 'umbra.me.localhost'), 'https://github.com:8443/path');
});


test('staging zone hosts map both ways and keep ports/paths/queries', () => {
  assert.equal(publicUrl('evade.fail', 'account-umbra-me.umbr.dev'), 'https://evade-fail.umbr.dev');
  assert.equal(environmentUrl('https://id.umbra.me/login?redirect=https%3A%2F%2Faccount.umbra.me%2F', 'x-kian-pw.umbr.dev'),
               'https://id-umbra-me.umbr.dev/login?redirect=https%3A%2F%2Faccount-umbra-me.umbr.dev%2F');
  assert.equal(productionHostname('admin-api-umbra-me.umbr.dev'), 'admin-api.umbra.me');
  assert.equal(productionHostname('os-kian-pw.umbr.dev'), 'os.kian.pw');
});
test('zone hosts leave external links, foreign zones and look-alikes alone', () => {
  for (const v of ['https://github.com/umbra-me', 'https://vexel.sh.evil.test/', 'mailto:a@umbra.me', '/settings'])
    assert.equal(environmentUrl(v, 'umbra-me.umbr.dev'), v);
  assert.equal(environmentZone('umbr.dev.evil.test'), ''); assert.equal(environmentZone('a.b.umbr.dev'), '');
});
test('the zone setting is an allow-list and production stays the default', () => {
  const saved = { ...process.env };
  try { delete process.env.NEXT_PUBLIC_UMBRA_PUBLIC_ZONE; process.env.NODE_ENV = 'production';
    assert.equal(publicUrl('vexel.sh'), 'https://vexel.sh');
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_ZONE = 'umbr.dev'; assert.equal(publicUrl('vexel.sh'), 'https://vexel-sh.umbr.dev');
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_ZONE = 'evil.test'; assert.throws(() => publicUrl('vexel.sh'), /Unsupported Umbra public zone/);
  } finally { process.env = saved; }
});
test('zone detection is an allow-list of one label under umbr.dev', () => {
  assert.equal(environmentZone('account-umbra-me.umbr.dev'), 'umbr.dev');
  assert.equal(environmentZone('ACCOUNT-umbra-me.UMBR.dev'), 'umbr.dev');
  assert.equal(environmentZone('mail.umbr.dev'), 'umbr.dev');
  for (const host of ['umbr.dev', 'umbr.dev.', 'x.umbr.dev.evil.test', 'xumbr.dev', 'x.umbr.devx', 'a.b.umbr.dev', '.umbr.dev', 'x.umbra.me', 'x.staging', '']) assert.equal(environmentZone(host), '', host);
  assert.equal(stagingLabel('account-umbra-me.umbr.dev'), 'account-umbra-me');
  assert.equal(stagingLabel('account.umbra.me'), '');
  assert.equal(stagingLabel('a.b.umbr.dev'), '');
});
test('reverse mapping uses the longest dashed portfolio zone and leaves everything else alone', () => {
  const cases = {
    'umbra-me.umbr.dev': 'umbra.me', 'umbra-nexus.umbr.dev': 'umbra.nexus', 'account-evade-fail.umbr.dev': 'account.evade.fail',
    'tracker-evade-fail.umbr.dev': 'tracker.evade.fail', 'auth-api-umbra-me.umbr.dev': 'auth-api.umbra.me', 'id-umbra-me.umbr.dev': 'id.umbra.me',
    'zenco-cc.umbr.dev': 'zenco.cc', 'axio-sh.umbr.dev': 'axio.sh', 'exploit-ac.umbr.dev': 'exploit.ac',
    'mail.umbr.dev': 'mail.umbr.dev', 'unknown-zone.umbr.dev': 'unknown-zone.umbr.dev', 'xumbra-me.umbr.dev': 'xumbra-me.umbr.dev',
    'a.b.umbr.dev': 'a.b.umbr.dev', 'umbra-me.umbr.dev.evil.test': 'umbra-me.umbr.dev.evil.test',
  };
  for (const [host, expected] of Object.entries(cases)) assert.equal(productionHostname(host), expected, host);
});
test('every portfolio host round-trips through the zone and mail.umbr.dev is unchanged', () => {
  for (const host of ['umbra.me', 'account.umbra.me', 'auth-api.umbra.me', 'os.kian.pw', 'tracker.evade.fail', 'axio.sh', 'exploit.ac', 'zenco.cc', 'umbra.nexus', 'umbra.ninja', 'vexel.sh']) {
    const mapped = publicUrl(host, 'umbra-me.umbr.dev');
    assert.equal(mapped, `https://${host.replaceAll('.', '-')}.umbr.dev`);
    assert.equal(environmentUrl(mapped, 'umbra-me.umbr.dev'), mapped);
    assert.equal(productionHostname(new URL(mapped).hostname), host);
  }
  assert.equal(environmentUrl('https://mail.umbr.dev/inbox', 'umbra-me.umbr.dev'), 'https://mail.umbr.dev/inbox');
  assert.equal(publicUrl('umbra.me', 'umbra-me.umbr.dev'), 'https://umbra-me.umbr.dev');
});
test('zone hosts keep ports and fragments, and the zone wins over a configured suffix', () => {
  assert.equal(environmentUrl('https://id.umbra.me:8443/a?b=1#c', 'x-kian-pw.umbr.dev'), 'https://id-umbra-me.umbr.dev:8443/a?b=1#c');
  assert.equal(environmentUrl('https://userinfo@id.umbra.me/', 'x-kian-pw.umbr.dev'), 'https://userinfo@id.umbra.me/');
  const saved = { ...process.env };
  try {
    process.env.NODE_ENV = 'production';
    process.env.UMBRA_PUBLIC_SUFFIX = '.staging'; process.env.UMBRA_PUBLIC_ZONE = 'umbr.dev';
    assert.equal(publicUrl('vexel.sh'), 'https://vexel-sh.umbr.dev');
    assert.equal(environmentUrl('https://vexel.sh.staging'), 'https://vexel-sh.umbr.dev');
    assert.equal(publicUrl('vexel.sh', 'umbra.me.staging'), 'https://vexel.sh.staging');
  } finally { process.env = saved; }
});
