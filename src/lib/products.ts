// The product registry. Every page that names a product reads it from here, so
// a status change, a version bump or a renamed repository is one edit.
//
// Content rule, inherited from the old single page: every claim here is in the
// product's own README, SECURITY.md or code. Where the two disagreed, the code
// won.

export type ProductStatus = "released" | "prerelease" | "private";

export type ProductId = "agent" | "capture" | "analyst" | "deck" | "local";

export interface Product {
  id: ProductId;
  /** The name as it is written on the page. */
  name: string;
  /** The short form used in navigation and cards. */
  short: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  /** The status as a badge reads it. */
  statusLabel: string;
  /** Repository on GitHub, or null while the product is private. */
  repo: string | null;
  /** The licence the software ships under, or null while it is not distributed. */
  license: string | null;
  /** Where it runs. */
  platforms: string[];
  /** What it is written in. Stated because it is part of what people ask. */
  stack: string;
  /** Four things it does, each true today. */
  features: string[];
  /** The product colour. A CSS custom property so the stylesheet owns the value. */
  color: string;
  /** What leaves the machine, for the privacy policy and the product page. */
  network: string;
}

export const CAPTURE_VERSION = "0.1.0";
export const ANALYST_VERSION = "0.9.0";

export const PRODUCTS: Record<ProductId, Product> = {
  agent: {
    id: "agent",
    name: "Axio",
    short: "Agent",
    tagline: "A local-first coding agent in Rust",
    description:
      "Run many supervised coding sessions at once, each in its own git worktree, and answer every approval they raise from one queue. A one-shot CLI, an inline terminal interface and a desktop window drive the same supervisor.",
    status: "prerelease",
    statusLabel: "Pre-release",
    repo: "https://github.com/umbra-me/axio",
    license: "Apache-2.0",
    platforms: ["macOS", "Linux", "WSL", "Windows"],
    stack: "Rust, nine crates",
    features: [
      "A worktree and branch per session",
      "Reads never ask. Writes and commands do.",
      "Four providers over three wire dialects",
      "Quota and cost across the agents you already run",
    ],
    color: "var(--p-agent)",
    network:
      "Talks directly to the model provider you configure, and to nothing else during a turn.",
  },
  capture: {
    id: "capture",
    name: "Axio Capture",
    short: "Capture",
    tagline: "Region screenshots with a real editor",
    description:
      "Press the hotkey, drag a rectangle, annotate it, copy or save. Arrows, shapes, text, numbered steps and blur, on macOS, Windows and Linux, in a menu-bar app that keeps itself updated from signed releases.",
    status: "released",
    statusLabel: `${CAPTURE_VERSION} released`,
    repo: "https://github.com/umbra-me/axio-capture",
    license: "Apache-2.0",
    platforms: ["macOS", "Windows", "Linux"],
    stack: "Rust and Tauri 2",
    features: [
      "One hotkey, one drag, done",
      "Nine annotation tools with undo",
      "File-name patterns that sort by day",
      "Signature-checked updates from GitHub Releases",
    ],
    color: "var(--p-capture)",
    network:
      "Captures stay on your machine. Its only outbound request is the update check against GitHub Releases.",
  },
  analyst: {
    id: "analyst",
    name: "Axio Analyst",
    short: "Analyst",
    tagline: "A provider-neutral analyst for Binary Ninja",
    description:
      "Builds a bounded, inspectable context snapshot around the function under the cursor, sends it to the Claude Code, Codex or Ollama command-line harness you already use, and renders the answer in a native sidebar. Read-only by design.",
    status: "prerelease",
    statusLabel: `${ANALYST_VERSION} pre-release`,
    repo: "https://github.com/umbra-me/axio-analyst",
    license: "MIT",
    platforms: ["Binary Ninja 5.x on macOS, Windows and Linux"],
    stack: "Python and PySide6",
    features: [
      "See the exact context before anything is sent",
      "Address citations become navigation",
      "Never reads a provider credential file",
      "Never writes to the database",
    ],
    color: "var(--p-analyst)",
    network:
      "Sends the snapshot you previewed through the provider CLI you selected. Never reads that CLI's credentials.",
  },
  local: {
    id: "local", name: "Axio Local", short: "Local",
    tagline: "Your coding agent, your local models",
    description: "Launch Claude Code, Codex, OpenCode, Pi or Axio against a model server on your machine or its host, with an isolated configuration home and verified recovery of protected configuration files.",
    status: "prerelease", statusLabel: "Pre-release",
    repo: "https://github.com/umbra-me/axio-local", license: "Apache-2.0",
    platforms: ["macOS", "Linux", "WSL"], stack: "Rust",
    features: ["Five supported coding agents", "Separate orchestrator and worker models", "Isolated agent configuration", "Configuration snapshots and verified recovery"],
    color: "var(--p-local)",
    network: "Connects to the model server you configure. Launched agents retain their own network behaviour and tool permissions; configuration isolation is not a network sandbox.",
  },
  deck: {
    id: "deck",
    name: "Axio Deck",
    short: "Deck",
    tagline: "A control surface for a Windows workstation",
    description:
      "Draws its own status bar on every monitor, owns its own global keybinds, drives komorebi tiling, manages packages across seven managers, and ships a debloat catalogue with an undo that restores the exact previous state. Private while it is being built.",
    status: "private",
    statusLabel: "Private, in development",
    repo: null,
    license: null,
    platforms: ["Windows 11"],
    stack: "Rust and Tauri 2",
    features: [
      "A real appbar on every monitor",
      "Every chord configurable, saved live",
      "Snapshot-first undo for system changes",
      "Refuses to touch Defender, Edge or Windows Update",
    ],
    color: "var(--p-deck)",
    network: "Makes no network requests of its own.",
  },
};

export const PRODUCT_LIST: Product[] = [
  PRODUCTS.agent,
  PRODUCTS.capture,
  PRODUCTS.analyst,
  PRODUCTS.deck,
  PRODUCTS.local,
];

export const productHref = (id: ProductId) => `/products/${id}`;

/** Download assets for the current Capture release, by platform. */
export const CAPTURE_RELEASE = `https://github.com/umbra-me/axio-capture/releases/tag/v${CAPTURE_VERSION}`;
const captureAsset = (name: string) =>
  `https://github.com/umbra-me/axio-capture/releases/download/v${CAPTURE_VERSION}/${name}`;

export const CAPTURE_DOWNLOADS = [
  {
    platform: "macOS",
    note: "Apple Silicon",
    file: `Axio.Capture_${CAPTURE_VERSION}_aarch64.dmg`,
    href: captureAsset(`Axio.Capture_${CAPTURE_VERSION}_aarch64.dmg`),
  },
  {
    platform: "macOS",
    note: "Intel",
    file: `Axio.Capture_${CAPTURE_VERSION}_x64.dmg`,
    href: captureAsset(`Axio.Capture_${CAPTURE_VERSION}_x64.dmg`),
  },
  {
    platform: "Windows",
    note: "installer",
    file: `Axio.Capture_${CAPTURE_VERSION}_x64-setup.exe`,
    href: captureAsset(`Axio.Capture_${CAPTURE_VERSION}_x64-setup.exe`),
  },
  {
    platform: "Windows",
    note: "MSI",
    file: `Axio.Capture_${CAPTURE_VERSION}_x64_en-US.msi`,
    href: captureAsset(`Axio.Capture_${CAPTURE_VERSION}_x64_en-US.msi`),
  },
  {
    platform: "Linux",
    note: "Debian, Ubuntu",
    file: `Axio.Capture_${CAPTURE_VERSION}_amd64.deb`,
    href: captureAsset(`Axio.Capture_${CAPTURE_VERSION}_amd64.deb`),
  },
  {
    platform: "Linux",
    note: "Fedora, RHEL",
    file: `Axio.Capture-${CAPTURE_VERSION}-1.x86_64.rpm`,
    href: captureAsset(`Axio.Capture-${CAPTURE_VERSION}-1.x86_64.rpm`),
  },
  {
    platform: "Linux",
    note: "AppImage",
    file: `Axio.Capture_${CAPTURE_VERSION}_amd64.AppImage`,
    href: captureAsset(`Axio.Capture_${CAPTURE_VERSION}_amd64.AppImage`),
  },
];
