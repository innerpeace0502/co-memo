import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Required for Cloudflare Pages – Next.js image optimisation is not available
    unoptimized: true,
  },
};

export default nextConfig;
