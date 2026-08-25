import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["agentmail"],
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
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
