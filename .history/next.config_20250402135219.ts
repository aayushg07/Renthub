import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'as1.ftcdn.net',  // Add this line
      'store.storeimages.cdn-apple.com',
      'as-images.apple.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'as1.ftcdn.net',  // Add this pattern
        port: '',
        pathname: '/**',
      },
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
};

export default nextConfig;