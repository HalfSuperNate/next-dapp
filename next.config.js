/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required:
    appDir: true,
  },
  exportTrailingSlash: true,
  output: 'standalone',
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
