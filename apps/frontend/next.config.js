/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = withNextIntl({
  reactStrictMode: true,
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
        'beee13418-fla.vercel.app', // Add your Vercel domain if deploying there
      ],
    },
  },
});

module.exports = nextConfig;
