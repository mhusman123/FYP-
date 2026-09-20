import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disables ESLint blocking production builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensures type check still runs or doesn't fail on minor lints
    ignoreBuildErrors: false,
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
};

export default nextConfig;
