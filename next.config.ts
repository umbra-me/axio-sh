import type { NextConfig } from "next";

// The collector the layout loads. Keeping the CSP origin and the script tag on
// the same value means a changed analytics host cannot silently end up blocked.
const analytics = new URL(
  process.env.NEXT_PUBLIC_UMBRA_ANALYTICS_URL ??
    "https://api.umbra.me/api/v1/analytics/script.js",
).origin;

// The collector posts events to the origin above but reads its per-site
// configuration, this site's kill switch included, from the admin API. Blocking
// that fetch does not stop collection: the script falls back to empty settings,
// in which nothing is disabled. Both origins belong in connect-src, and
// check-site-client-coverage.py in the control plane enforces it.
const collectorConfig = "https://admin-api.umbra.me";

// 'unsafe-inline' is load-bearing: the App Router emits inline bootstrap and
// hydration scripts, and Next injects inline <style>. Cloudflare fronts this
// host and rewrites mailto links into a call to a script it serves from
// /cdn-cgi/ on this origin, which 'self' already covers; a Cloudflare feature
// that injects a third-party origin, Web Analytics among them, needs its host
// added here or it will be blocked with no visible error.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${analytics}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' ${analytics} ${collectorConfig}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Subdomains included: the retired axio.sh hosts all answer on 443 already.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // The container runs `node server.js` rather than `next start`, so the build
  // has to emit its own dependency tree.
  output: "standalone",
  // The site sells a paid product and links to checkout, so it carries the
  // same header set as the other Umbra surfaces. Files nginx serves itself,
  // the Polaris downloads among them, never reach this handler and set their
  // own headers in infra/routing/polaris-locations.conf in the control plane.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
