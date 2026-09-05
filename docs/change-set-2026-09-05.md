# September 5 change set

## Local product coverage — 2026-09-05

The registry now lists five products: agent, Capture, Analyst, Deck and Local.
Local has `/products/local`, a home icon, a mint accent, source-install instructions
on `/download`, and a page explaining its relationship to the agent. Landing,
products and download metadata/counts include it. Local supports macOS, Linux and
WSL, requires Rust 1.88+, and is labelled a source pre-release. It preserves agent
tool permissions and network behaviour; local inference is not a network sandbox.

From the brand workspace run `python3 tools/checks/site-coverage.py`. Its explicit
mapping checks every workspace component against registry entries and product
pages, excluding the site itself as a delivery surface. It also refuses duplicate
or unmapped products. This check requires component checkouts and is not yet wired
to hosted CI. The site has no new server workload or deployment configuration.

Build and coverage checks pass locally. Publishing source does not deploy axio.sh;
production rollout and a visible deployed-page check remain separate work.

Validation on September 5: Production build and workspace product-coverage check passed; the site test suite is recorded in the publication ledger.
