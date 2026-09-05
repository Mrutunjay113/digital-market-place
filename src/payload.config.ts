import { webpackBundler } from "@payloadcms/bundler-webpack";
import { createPayloadConfig } from "./payload.config.shared";

export default createPayloadConfig(webpackBundler());
