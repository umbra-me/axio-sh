import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The container runs `node server.js` rather than `next start`, so the build
  // has to emit its own dependency tree.
  output: "standalone",
};

export default nextConfig;
