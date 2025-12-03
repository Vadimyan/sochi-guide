/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for optimal performance
  basePath: '/sochi-guide', // GitHub Pages base path
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Strict mode for better error detection
  reactStrictMode: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
};

module.exports = nextConfig;
