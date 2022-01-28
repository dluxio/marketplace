/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@spknetwork/auth-react",
  "@spknetwork/hive-keychain-ceramic",
  "@spknetwork/idx-data-utils",
]);

const config = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/inventory": { page: "/inventory" },
      "/auction": { page: "/auction" },
      "/create-nft": { page: "/create-nft" },
      "/listings": { page: "/listings" },
      "/trades": { page: "/trades" },
      "/404": { page: "/404" },
      "/[author]/[permlink]": { page: "/[author]/[permlink]" },
      "/settings": { page: "/settings" },
      "/[author]": { page: "/[author]" },
      "/set/[setName]": { page: "/set/[setName]" },
    };
  },
};

module.exports = withTM(config);
