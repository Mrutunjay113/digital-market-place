import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/get-payload";

const jwt = require("jsonwebtoken") as {
  verify: (token: string, secret: string) => { id?: string };
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token =
    authHeader?.replace(/^JWT\s+/i, "") ||
    req.cookies.get("payload-token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const payload = await getPayloadClient();
    const decoded = jwt.verify(token, payload.secret) as { id?: string };

    if (!decoded?.id) {
      return NextResponse.json({ user: null });
    }

    const user = await payload.findByID({
      collection: "users",
      id: decoded.id,
      depth: 0,
    });

    return NextResponse.json({ user: user ?? null });
  } catch (error) {
    console.error("Failed to resolve /api/users/me", error);
    return NextResponse.json({ user: null });
  }
}
