import dontenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
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
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromName: "DigitalHippo",
        fromAddress: "john@hippomarketplace.shop",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
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
