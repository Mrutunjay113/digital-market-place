"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var payload_config_shared_1 = require("./payload.config.shared");
exports.default = (0, payload_config_shared_1.createPayloadConfig)((0, bundler_webpack_1.webpackBundler)());
