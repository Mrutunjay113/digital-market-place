"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var payload_config_shared_1 = require("./payload.config.shared");
// Used by Next.js / Vercel. Do not import webpackBundler here —
// it pulls Payload admin SCSS into `next build` and crashes page data collection.
exports.default = (0, payload_config_shared_1.createPayloadConfig)();
