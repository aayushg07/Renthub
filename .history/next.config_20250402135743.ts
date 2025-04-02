import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // For Sony Shop images
      {
        protocol: 'https',
        hostname: 'www.thesonyshop.ca',
        port: '',
        pathname: '/cdn/shop/products/**', // Specific to product images
      },
      // For ftcdn.net images
      {
        protocol: 'https',
        hostname: 'as1.ftcdn.net',
        port: '',
        pathname: '/v2/jpg/**',
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
        pathname: '/is/**',
      }
    ],
  },
};

export default nextConfig;