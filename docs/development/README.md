# Independent development

Node >=24, pnpm 11.24.0. This source pilot uses reviewed Tessera 0.1.0 tarballs under ignored `.umbra/artifacts/`, selected explicitly in package.json and the product lockfile. Supply them from `pnpm pack` in the standalone Tessera checkout and verify recorded SHA-256 values. This is a deliberate local fixture pending authenticated immutable artifact distribution, not a publication claim. No ambient library checkout is needed after supply.

Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`. `pnpm dev` previews on 3311. No database fixture is needed. The build uses package-owned fonts and includes them in tracing. `pnpm release:check` must reject local file dependencies and overrides; only reviewed published artifact selections can enable release acceptance. Browser visual/accessibility and live Polaris/download/provider routes remain separate gates. Do not copy production environment values.
