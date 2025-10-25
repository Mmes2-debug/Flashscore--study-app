/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = withNextIntl({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:5000',
        '*.replit.dev',
        '*.replit.app',
        'flashstudy-debug.vercel.app', // Add your Vercel domain if deploying there
      ],
    },
  },
});

module.exports = nextConfig;
