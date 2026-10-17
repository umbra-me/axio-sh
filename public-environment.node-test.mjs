/* global process, URL */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { environmentUrl, environmentText, publicUrl } from './public-environment.mjs';

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
