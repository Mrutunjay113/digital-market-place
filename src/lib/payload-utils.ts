import { User } from "../payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!serverUrl) {
    console.error("NEXT_PUBLIC_SERVER_URL is not set in the environment.");
    return { user: null };
  }

  const token = cookies.get("payload-token")?.value;

  const meRes = await fetch(`${serverUrl}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  const { user } = (await meRes.json()) as {
    user: User | null;
  };

  return { user };
};
