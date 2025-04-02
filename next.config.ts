/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for image optimization in static export
  },
};

module.exports = nextConfig;
