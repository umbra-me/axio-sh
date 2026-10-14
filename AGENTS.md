# Axio website

## Commands

Node >=24 and pnpm 11.24.0. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build` and `pnpm dev` from this repository. Read docs/development/README.md for the deliberate local packed-artifact transition. No parent install or sibling dist is needed. `pnpm release:check` rejects the local fixture; publication/artifact access remains gated.

## Architecture

Preserve product behavior, package namespaces, analytics security headers and Polaris routes. All dependency resolution and production tracing stay inside this checkout. Tests are source acceptance; browser/native/production evidence is separate. Do not commit, push, publish, install native software or operate production without authorization. Use synthetic local fixtures; never copy .env or credentials.
