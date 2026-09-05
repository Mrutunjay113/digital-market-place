/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "payload",
      "@payloadcms/db-mongodb",
      "@payloadcms/bundler-webpack",
      "@payloadcms/richtext-slate",
      "mongoose",
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /\.s[ac]ss$/,
          contextRegExp: /node_modules[\\/]payload/,
        })
      );
    }
    return config;
  },
  images: {
    domains: [
      "localhost",
      "hippomarketplace.shop",
      "digital-market-place-theta.vercel.app",
    ],
  },
};

export default nextConfig;
