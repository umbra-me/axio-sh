# Polaris trial download — September 10, 2026

The product page now links the signed and notarised Apple Silicon 0.2.0 (100)
installer at `/downloads/polaris/Axio-Polaris-0.2.0.dmg`. Downloading requires no
account. The 14-day trial starts only when explicitly selected in the app.

The source remains private. The approved future paid offer is A$59 once for two
personal Macs, with no subscription. Sales remain closed pending final release
acceptance; this change does not add a live purchase button. Product support is
support@umbra.me. Existing media still identifies its actual development build84.

The installer is hosted by nginx independently of the site container. Its public
bytes matched the signed artifact; its notarization ticket and Gatekeeper check
passed. The Stripe test purchase delivered its licence and recovery emails to
Proton Mail and passed the public API and native Swift adapter checks. A test
key is intentionally invalid in the live-configured customer download.

Site validation: product tests, TypeScript and production Next.js build passed.
The pre-existing README and September 9 documentation edits were preserved.
