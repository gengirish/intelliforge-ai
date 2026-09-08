import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["agentmail"],
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/icon" },
      // The App Router ignores dot-prefixed directories, so the agent manifest
      // is built at /api/ai-plugin and exposed at its conventional path.
      { source: "/.well-known/ai-plugin.json", destination: "/api/ai-plugin" },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // No remote images are used. Add specific hosts here rather than
    // reinstating a `hostname: "**"` wildcard, which lets the optimizer be
    // pointed at any origin.
    remotePatterns: [],
  },
};

export default nextConfig;
