# Axio website

## Commands

Run all package commands through `node scripts/private-registry.mjs -- pnpm <command>` from this owning install root.

Node >=24 and pnpm 11.24.0. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build` and `pnpm dev` from this repository. Read docs/development/README.md for authenticated private package setup. No parent install or sibling dist is needed. `pnpm release:check` rejects local fixture selections; hosted CI and production remain separate gates.

## Architecture

Preserve product behavior, package namespaces, analytics security headers and Polaris routes. All dependency resolution and production tracing stay inside this checkout. Tests are source acceptance; browser/native/production evidence is separate. Do not commit, push, publish, install native software or operate production without authorization. Use synthetic local fixtures; never copy .env or credentials.

## Private package access

First-party dependencies select authenticated immutable `0.1.2` packages from `https://localhost:4874/`. The recipe uses the owning install root's `scripts/private-registry.mjs` runner to load dedicated reader configuration outside source, including when the CLI clears ambient environment variables. Preserve synthetic-data and native/production gates. No public fallback, credentials in source, parent installation or sibling dist is allowed.
