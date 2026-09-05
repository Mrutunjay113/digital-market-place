"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayloadConfig = void 0;
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var config_1 = require("payload/config");
var path_1 = __importDefault(require("path"));
var Users_1 = require("./collections/Users");
var dotenv_1 = __importDefault(require("dotenv"));
var Products_1 = require("./collections/Products/Products");
var Media_1 = require("./collections/Media");
var ProductFile_1 = require("./collections/ProductFile");
var Order_1 = require("./collections/Order");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
var createPayloadConfig = function (bundler) {
    return (0, config_1.buildConfig)({
        serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
        collections: [Users_1.Users, Products_1.Products, Media_1.Media, ProductFile_1.ProductFiles, Order_1.Orders],
        routes: {
            admin: "/sell",
        },
        admin: __assign(__assign({ user: "users" }, (bundler ? { bundler: bundler } : {})), { meta: {
                titleSuffix: "- Digital Hippo",
                favicon: "/favicon.ico",
                ogImage: "/thumbnail.jpg",
            } }),
        rateLimit: {
            max: 2000,
        },
        editor: (0, richtext_slate_1.slateEditor)({}),
        db: (0, db_mongodb_1.mongooseAdapter)({
            url: process.env.MONGODB_URL || "",
        }),
        typescript: {
            outputFile: path_1.default.resolve(__dirname, "payload-types.ts"),
        },
    });
};
exports.createPayloadConfig = createPayloadConfig;
