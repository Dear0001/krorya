// lib/auth-handler.ts
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type AuthResponse = {
    payload?: {
        access_token: string;
        refresh_token: string;
        [key: string]: any;
    };
    [key: string]: any;
};

export async function handleAuthRequest(
    req: NextRequest,
    backendEndpoint: string,
    requestBody: Record<string, any>
) {
    try {
        // Call the backend API
        const response = await fetch(`${process.env.SPRING_API_URL}${backendEndpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
            credentials: "include",
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Failed to login" }, { status: response.status });
        }

        // Parse the response
        const data: AuthResponse = await response.json();
        const user = data?.payload || null;
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
            maxAge: 60 * 60 * 24 * 30 // 30 days for all methods
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