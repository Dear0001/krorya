import { handleAuthRequest } from "@/lib/auth-handler";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;
    return handleAuthRequest(req, "/auth/login", { email, password });
}