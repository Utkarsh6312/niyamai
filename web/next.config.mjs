/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sqlite3', 'sqlite'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
