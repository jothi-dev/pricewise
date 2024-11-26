/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // Change to an object or remove if not required
  },
  serverExternalPackages: ['mongoose'], // Move here as per the updated naming
  images: {
    domains: ['m.media-amazon.com'], // Keep this as it is
  },
};

module.exports = nextConfig;
