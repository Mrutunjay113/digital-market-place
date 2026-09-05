import { createPayloadConfig } from "./payload.config.shared";

// Used by Next.js / Vercel. Do not import webpackBundler here —
// it pulls Payload admin SCSS into `next build` and crashes page data collection.
export default createPayloadConfig();
