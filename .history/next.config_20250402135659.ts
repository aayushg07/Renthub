import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // For as1.ftcdn.net images
      {
        protocol: 'https',
        hostname: 'as1.ftcdn.net',
        port: '',
        pathname: '/v2/jpg/**', // More specific than /** for better security
      },
      // For Apple Store images
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
        port: '',
        pathname: '/**',
      },
      // For Apple product images
      {
        protocol: 'https',
        hostname: 'as-images.apple.com',
        port: '',
        pathname: '/is/**', // Apple uses /is/ paths for images
      },
      // Optional: Wildcard pattern for all ftcdn subdomains
      {
        protocol: 'https',
        hostname: 'as*.ftcdn.net', // * wildcard covers all subdomains
        port: '',
        pathname: '/**',
      }
    ],
    // Remove the 'domains' array completely - it's deprecated
  },
  // Other Next.js config options can go here
};

export default nextConfig;