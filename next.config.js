/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/inventory': { page: '/inventory' },
      '/auction': { page: '/auction' },
      '/create-nft': { page: '/create-nft' },
      '/listings': { page: '/listings' },
      '/trades': { page: '/trades' },
      '/404': { page: '/404' },
      '/[author]/[permlink]': {page: '/[author]/[permlink]'},
      '/settings': {page: '/settings'}
    };
  },
};
