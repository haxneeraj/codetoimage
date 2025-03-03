import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
      // Disables all linting during the production build
      ignoreDuringBuilds: true,
  },
};

export default nextConfig;
