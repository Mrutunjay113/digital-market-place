import dontenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload, { getPayload } from "payload";
import nodemailer from "nodemailer";

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

export const getPayloadClient = async ({ initOptions }: Args = {}) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET_KEY is not set");
  }
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    const baseOptions = {
      email: {
        transport: transporter,
        fromName: "DigitalHippo",
        fromAddress: "john@hippomarketplace.shop",
      },
      secret: process.env.PAYLOAD_SECRET!,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    };

    if (initOptions?.express) {
      // Local / Railway: let Payload load PAYLOAD_CONFIG_PATH itself.
      // Its loader stubs .scss before requiring webpackBundler.
      cached.promise = payload.init(baseOptions);
    } else {
      // Next.js / Vercel: pass a config with no webpack admin bundler.
      const nextConfig = await import("./payload.config.next");
      const resolved =
        (nextConfig as { default?: InitOptions["config"] }).default ?? nextConfig;
      cached.promise = getPayload({
        ...baseOptions,
        config: Promise.resolve(resolved as NonNullable<InitOptions["config"]>),
      });
    }
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
