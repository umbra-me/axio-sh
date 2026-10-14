# Current private package workflow

## Current independent development

Run from this checkout using the toolchain in `umbra.dev.yaml` and pnpm@11.24.0. This install root owns its manifest and lockfile. First-party packages select exact private `0.1.2` versions; no parent install or sibling build is needed.

```sh
node scripts/private-registry.mjs -- pnpm install --frozen-lockfile
node scripts/private-registry.mjs -- pnpm check
node scripts/private-registry.mjs -- pnpm build
node scripts/private-registry.mjs -- pnpm release:check
```

The runner loads dedicated reader auth and per-process trust from `~/.local/share/umbra-next/npm-registry` for the loopback-only `https://localhost:4874` registry. Keep credentials outside source; global npm configuration and system trust are unchanged. See the [migration receipt](../../../../../../docs/private-registry-migration-2026-10-14.md) for verified local checks. Native, browser/provider, hosted CI and production acceptance remain separate gates.

## Historical packed-fixture transition: Independent development

Node >=24, pnpm 11.24.0. This source pilot uses reviewed Tessera 0.1.0 tarballs under ignored `.umbra/artifacts/`, selected explicitly in package.json and the product lockfile. Supply them from `pnpm pack` in the standalone Tessera checkout and verify recorded SHA-256 values. This is a deliberate local fixture pending authenticated immutable artifact distribution, not a publication claim. No ambient library checkout is needed after supply.

Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`. `pnpm dev` previews on 3311. No database fixture is needed. The build uses package-owned fonts and includes them in tracing. `pnpm release:check` must reject local file dependencies and overrides; only reviewed published artifact selections can enable release acceptance. Browser visual/accessibility and live Polaris/download/provider routes remain separate gates. Do not copy production environment values.
