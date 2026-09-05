import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import type { Config } from "payload/config";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Order";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

type AdminBundler = NonNullable<Config["admin"]>["bundler"];

export const createPayloadConfig = (bundler?: AdminBundler) =>
  buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    collections: [Users, Products, Media, ProductFiles, Orders],
    routes: {
      admin: "/sell",
    },
    admin: {
      user: "users",
      ...(bundler ? { bundler } : {}),
      meta: {
        titleSuffix: "- Digital Hippo",
        favicon: "/favicon.ico",
        ogImage: "/thumbnail.jpg",
      },
    },
    rateLimit: {
      max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
      url: process.env.MONGODB_URL! || "",
    }),
    typescript: {
      outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
  });
