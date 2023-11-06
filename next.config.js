/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['img.sndimg.com', 'images.pexels.com'], // Updated from remotePatterns to domains
  },
  eslint: {
    dirs: [
      // components
      'component/Favourites',
      'component/FavouritesContainer',
      'component/ui/loadingSpinner',
      'components/Recipes/SingleRecipeTags',
      // pages
      'pages/recipes',
      'pages/favourites',
    ],
  },
};

module.exports = nextConfig;
