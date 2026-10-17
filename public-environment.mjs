/* global window, process, URL */
/** Public portfolio routing. This source is owned by this independent app.
 * Build local release bundles with NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX=.local and
 * UMBRA_PUBLIC_SUFFIX=.local. Production builds default to the real domains.
 * Browser/request hostnames take precedence over the build/server setting.
 */
const suffixes = ['.localhost', '.staging', '.local'];
const zones = ['umbra.me', 'umbra.nexus', 'umbra.ninja', 'axio.sh', 'vexel.sh', 'evade.fail', 'exploit.ac', 'kian.pw', 'zenco.cc'];

/** @param {string} hostname */
export function environmentSuffix(hostname) {
  const name = hostname.toLowerCase();
  return suffixes.find((suffix) => name.length > suffix.length && name.endsWith(suffix)) ?? '';
}

/** @param {string} hostname */
export function productionHostname(hostname) {
  const name = hostname.toLowerCase();
  const suffix = environmentSuffix(name);
  return suffix ? name.slice(0, -suffix.length) : name;
}

/** @param {string | undefined} from */
function activeSuffix(from) {
  if (from !== undefined) return environmentSuffix(from);
  if (typeof window !== 'undefined') return environmentSuffix(window.location.hostname);
  const configured = process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX ?? process.env.UMBRA_PUBLIC_SUFFIX;
  if (configured !== undefined) {
    if (configured !== '' && !suffixes.includes(configured)) throw new Error('Unsupported Umbra public suffix');
    return configured;
  }
  return process.env.NODE_ENV === 'development' ? '.local' : '';
}

/** @param {string} hostname @param {string | undefined} [from] */
export function publicHost(hostname, from) {
  return `${productionHostname(hostname)}${activeSuffix(from)}`;
}

/** @param {string} hostname @param {string | undefined} [from] */
function developmentOrigin(hostname, from) {
  const configured = process.env.NEXT_PUBLIC_UMBRA_DEV_ROUTER_PORT;
  if (process.env.NODE_ENV !== 'development' || configured === undefined || activeSuffix(from) !== '.localhost') return null;
  const port = Number(configured);
  if (!/^\d+$/.test(configured) || !Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Unsupported Umbra development router port');
  return `http://${publicHost(hostname, from)}`;
}

export function publicUrl(hostname, from) {
  return developmentOrigin(hostname, from) ?? `https://${publicHost(hostname, from)}`;
}

/** Resolve only Umbra portfolio URLs; external, relative and non-web links stay intact.
 * @param {string} value @param {string | undefined} [from]
 */
export function environmentUrl(value, from) {
  const suffix = activeSuffix(from);
  if (!/^(https?:)?\/\//i.test(value)) return value;
  let url;
  try { url = new URL(value, 'https://environment.invalid'); } catch { return value; }
  const host = productionHostname(url.hostname);
  if (!zones.some((zone) => host === zone || host.endsWith(`.${zone}`))) return value;
  if (url.username || url.password) return value;
  // Keep stable identity issuers separate from navigable public origins.
  url.hostname = `${host}${suffix}`;
  if (suffix === ".local" || suffix === ".localhost") url.port = "";
  const development = developmentOrigin(host, from);
  if (development !== null) {
    const origin = new URL(development);
    url.protocol = origin.protocol;
    url.port = origin.port;
  }
  for (const [key, nested] of url.searchParams) {
    if (/^https?:\/\//i.test(nested)) {
      const resolved = environmentUrl(nested, from);
      if (resolved !== nested) url.searchParams.set(key, resolved);
    }
  }
  let result = url.href;
  if (value.startsWith('//')) result = result.slice(url.protocol.length);
  // Origins are often concatenated with /paths; do not introduce a double slash.
  if (!/[/?#]/.test(value.replace(/^(https?:)?\/\//i, ''))) result = result.replace(/\/$/, '');
  return result;
}

/** Resolve portfolio origins in a CSP or comma-separated origin list.
 * @param {string} value @param {string | undefined} [from]
 */
export function environmentText(value, from) {
  return value.replace(/https?:\/\/[^\s,;'"<>]+/g, (url) => environmentUrl(url, from));
}


/** Adjust browser debugging headers only for the explicitly managed source runner.
 * Production, staging and legacy local releases retain their original headers.
 * @param {Array<{key: string, value: string}>} headers
 */
export function developmentHeaders(headers) {
  if (process.env.NODE_ENV !== 'development' || process.env.NEXT_PUBLIC_UMBRA_DEV_ROUTER_PORT === undefined) return headers;
  const origin = developmentOrigin('umbra.me');
  if (origin === null) return headers;
  return headers.filter((header) => header.key.toLowerCase() !== 'strict-transport-security').map((header) => {
    if (header.key.toLowerCase() !== 'content-security-policy') return header;
    const directives = header.value.split(';').map((part) => part.trim()).filter((part) => part && part !== 'upgrade-insecure-requests');
    const value = directives.map((part) => {
      if (part.startsWith('script-src ') && !part.includes("'unsafe-eval'")) return `${part} 'unsafe-eval'`;
      if (part.startsWith('connect-src ')) return `${part} ws://*.localhost`;
      return part;
    }).join('; ');
    return {...header, value};
  });
}
