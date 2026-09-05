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
    outputFileTracingIncludes: {
      "/api/**/*": ["./dist/**/*"],
      "/api/trpc/[trpc]": ["./dist/**/*"],
    },
  },
  outputFileTracingIncludes: {
    "/api/**/*": ["./dist/**/*"],
    "/api/trpc/[trpc]": ["./dist/**/*"],
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
