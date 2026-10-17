# Developing `axio/site` with Umbra

Use `umbra go --list` to find registered folders; `umbra go <component-id>` jumps
to a product after shell setup (`eval "$(umbra shell-init zsh)"` in an existing
zsh terminal). `umbra path <component-id>` prints the folder for scripts.
The same shell hook enables live Tab completion for `go`, `dev` and `stop`;
source suggestions follow the current repository scope or explicit `--root`.
Source shortcuts are `umbra dev` and `umbra stop` when a routed preview is declared;
use `umbra dev --list` to inspect availability. `--status`, `--logs`, `--doctor`,
`--plan`, `--restart` and `--open` are available on `umbra dev`. See the availability guidance
below for this repository's routed-preview support; native/backend workflows
retain their existing gates.


This independent repository owns its source, dependency locks and install roots.
Read [AGENTS.md](AGENTS.md) and [umbra.dev.yaml](umbra.dev.yaml) before running
actions. Nested subtree instructions still apply; Umbra does not replace them.

## Select and inspect

Use an Umbra CLI build exposing `products dev-list` and `products capabilities`.
From the company root, run `cargo build --manifest-path control-plane/cli/Cargo.toml --locked` and add its
`target/debug` directory to this shell's PATH. This does not install the operator
CLI. From this repository:

```sh
umbra products --root . list
umbra products --root . fingerprint axio/site
umbra --env dev products --root . dev-list
```

## Declared source actions

Inspect the recipe first, then execute only the action authorized for the task.

```sh
umbra products --root . check axio/site
umbra products --root . build axio/site
```

The recipe selects this repository's tools and working directories. Prepare
actions install dependencies and require the task's installation authorization.
Keep installations in the declared product install root; company, brand and
family references are catalogues. Keep secrets outside source. Native launch,
provider/database integration, publication and operational actions retain their
existing gates. A source check does not establish those acceptance results.

## Web source development

```sh
umbra dev axio/site --plan
umbra dev axio/site
umbra status axio/site
umbra dev axio/site --doctor
umbra logs axio/site
umbra stop axio/site
```

Use `http://axio.sh.localhost`. Browser URLs,
links and callbacks must not include backend/relay ports. The CLI adds 30000 to
the recipe's base port internally and uses standard port 80 for `.localhost`.
The same ID works from company and declaring brand/family roots; within this
product the ID is optional. Existing `.local` HTTPS uses standard port 443.
Bare package dev commands bypass Umbra's routing contract.

The company guide is `docs/local-development.md`; the detailed control-plane
guide is `docs/development/local-source.md`. Those repositories own orchestration
and the shared source profile. This document keeps the essential local commands
available when an agent opens only this independent repository.

## On-demand dependencies

Declared direct dependencies: none (empty dependency set).
`umbra dev --plan` expands transitive dependencies; `umbra dev --deps` shows shared
leases. `umbra stop` releases ownership and stops only unshared containers started
by this workflow. Existing independently running containers are borrowed. Missing
local container provisioning and product-local synthetic environment setup remain
explicit prerequisites; no migrations or provider authentication run automatically.
