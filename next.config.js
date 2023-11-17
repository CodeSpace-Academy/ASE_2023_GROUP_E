/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['img.sndimg.com', 'images.pexels.com','www.pexels.com'], // Updated from remotePatterns to domains
  },
  eslint: {
    dirs: [
      // components
      'component/Favourites',
      'component/FavouritesContainer',
      'component/ui/loadingSpinner',
      'component/Recipes/SingleRecipeTags',
      'component/Recipes/Allergens',
      'component/Recipes/Details/Info',
      'component/handlerTime',
      // pages
      'pages/recipes',
      'pages/favourites',
    ],
  },
};

module.exports = nextConfig;
