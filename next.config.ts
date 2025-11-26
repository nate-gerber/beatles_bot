import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for Vercel deployment
  poweredByHeader: false,
  reactStrictMode: true,
  // SWC minification is enabled by default in Next.js 16+
};

export default nextConfig;
