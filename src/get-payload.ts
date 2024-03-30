import dontenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload from "payload";

dontenv.config({ path: path.resolve(__dirname, "../.env") });

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
  if (!process.env.PAYLOAD_SECRET_KEY) {
    throw new Error("PAYLOAD_SECRET_KEY is not set");
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET_KEY,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }
  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    throw error;
  }
};
