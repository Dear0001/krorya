import { handleAuthRequest } from "@/lib/auth-handler";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, fullName } = body;
    return handleAuthRequest(req, "/oauth2/facebook", { email, fullName });
}