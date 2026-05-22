import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (all logic is client-side)
  output: "export",
  images: {
    // Required when using output: 'export'
    unoptimized: true,
  },
};

export default nextConfig;
