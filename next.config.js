/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/menu",
      },
    ];
  },
};

module.exports = nextConfig;
