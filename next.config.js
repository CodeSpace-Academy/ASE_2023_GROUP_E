/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['img.sndimg.com', 'images.pexels.com', 'www.pexels.com'], // Updated from remotePatterns to domains
  },
  eslint: {
    dirs: [],
  },
};

module.exports = nextConfig;
