# Axio website

## Commands

Run all package commands through `node scripts/private-registry.mjs -- pnpm <command>` from this owning install root.

Node >=24 and pnpm 11.24.0. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build` and `pnpm dev` from this repository. Read docs/development/README.md for authenticated private package setup. No parent install or sibling dist is needed. `pnpm release:check` rejects local fixture selections; hosted CI and production remain separate gates.

## Architecture

Preserve product behavior, package namespaces, analytics security headers and Polaris routes. All dependency resolution and production tracing stay inside this checkout. Tests are source acceptance; browser/native/production evidence is separate. Do not commit, push, publish, install native software or operate production without authorization. Use synthetic local fixtures; never copy .env or credentials.

## Private package access

First-party dependencies select authenticated immutable `0.1.2` packages from `https://localhost:4874/`. The recipe uses the owning install root's `scripts/private-registry.mjs` runner to load dedicated reader configuration outside source, including when the CLI clears ambient environment variables. Preserve synthetic-data and native/production gates. No public fallback, credentials in source, parent installation or sibling dist is allowed.

## Managed local source development

Run `umbra dev axio/site --plan` to inspect the resolved command,
then `umbra dev axio/site` to start the declared `web` preview.
These commands work from the Umbra company, owning reference/family or this
product; inside this product the component ID is optional. Use the printed
`http://...localhost` URL. `umbra status`, `umbra logs`, `umbra dev --doctor` and
`umbra stop` use the same component ID. The recipe owns the base port; the CLI
adds the source-development profile offset and passes it explicitly. Do not use bare `pnpm dev`
or `npm run dev` for Umbra routing: package-script defaults bypass that contract.
Installs/checks stay in this product's owning install root. No production
credentials are rendered; databases, providers and native app acceptance remain
separate. The control-plane guide is `docs/development/local-source.md`.

## Umbra CLI entry point

Read [DEVELOPMENT.md](DEVELOPMENT.md) for this repository's exact Umbra CLI
source actions and routed-preview availability. Use its stable component ID
`axio/site`; installs remain in the owned recipe's install root. Preserve
all existing native, provider, data, publication and production constraints.

Managed previews declare local dependencies in `umbra.dev.yaml`. Inspect them
with `umbra dev --plan` and `umbra dev --deps`; `umbra stop` releases shared
leases and stops only unshared containers started by that workflow. Do not use
broad Docker down/remove commands to stop a source preview.
