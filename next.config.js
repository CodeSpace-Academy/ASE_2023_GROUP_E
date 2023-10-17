/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: [ 'image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'img.sndimg.com',
        port: '',
      }
    ]
  },
}

module.exports = nextConfig
