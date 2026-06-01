/** @type {import('next').NextConfig} */

const nextConfig = {
  outputFileTracingIncludes: {
    // Include compiled Payload config + collections so Vercel bundles them
    // alongside the tRPC serverless function (needed for payload.init())
    "/api/trpc/**": ["./dist/**/*"],
    "/api/**": ["./dist/**/*"],
  },
  images: {
    domains: ["localhost", "hippomarketplace.shop"],
  },
};

export default nextConfig;
