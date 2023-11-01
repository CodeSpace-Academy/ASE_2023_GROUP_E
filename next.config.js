/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['img.sndimg.com', 'images.pexels.com'], // Updated from remotePatterns to domains
  },
  eslint: {
    dirs: [
      'pages/favourites',
      'component/Favourites',
      'component/FavouritesContainer',
      'component/ui/loadingSpinner',
    ],
  },
};

module.exports = nextConfig;
