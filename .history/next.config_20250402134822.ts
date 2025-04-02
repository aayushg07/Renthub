import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'store.storeimages.cdn-apple.com',
      'as-images.apple.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'as-images.apple.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Other Next.js config options can go here
};

export default nextConfig;