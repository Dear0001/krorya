import { serialize } from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { email, password } = body;

        // Call the backend API
        const response = await fetch(`${process.env.SPRING_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Failed to login" }, { status: response.status });
        }

        // Parse the response
        const data = await response.json();
        const user = data?.user || null;
        const accessToken = data?.payload?.access_token || null;
        const refreshToken = data?.payload?.refresh_token || null;

        if (!accessToken || !refreshToken) {
            return NextResponse.json({ message: "Invalid token response" }, { status: 400 });
        }

        // Set refresh token as HTTP-only cookie
        const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh_token";
        const serialized = serialize(cookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return NextResponse.json(
            { accessToken, user },
            { status: 200, headers: { "Set-Cookie": serialized } }
        );
    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
