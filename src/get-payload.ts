import dontenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload, { getPayload } from "payload";
import nodemailer from "nodemailer";
import rawPayloadConfig from "./payload.config";

dontenv.config({ path: path.resolve(__dirname, "../.env") });

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

let cached = (global as any).payloadClient;
if (!cached) {
  cached = (global as any).payloadClient = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

const payloadConfig =
  (rawPayloadConfig as { default?: typeof rawPayloadConfig }).default ??
  rawPayloadConfig;

export const getPayloadClient = async ({ initOptions }: Args = {}) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET_KEY is not set");
  }
  if (!payloadConfig) {
    throw new Error("Payload config failed to load");
  }
  if (cached.client) {
    return cached.client;
  }

  // Payload still calls findConfig() even when `config` is passed.
  // A set env var makes it skip the filesystem search. The file does
  // not need to exist if we also pass `config` into getPayload/init.
  if (!process.env.PAYLOAD_CONFIG_PATH) {
    process.env.PAYLOAD_CONFIG_PATH = path.resolve(
      process.cwd(),
      "dist/payload.config.js"
    );
  }

  if (!cached.promise) {
    const options = {
      config: payloadConfig,
      email: {
        transport: transporter,
        fromName: "DigitalHippo",
        fromAddress: "john@hippomarketplace.shop",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    };

    // Express (local / Railway): full HTTP init. Vercel: local API only.
    cached.promise = initOptions?.express
      ? payload.init(options)
      : getPayload(options);
  }
  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    console.error("Error initializing Payload client", error);
    throw error;
  }
  return cached.client;
};
