import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const credential = cookieStore.get(cookieName);

    if (!credential) {
        return NextResponse.json(
            { message: "Token not found" },
            { status: 404 }
        );
    }

    const refreshToken = credential.value;

    // Call the backend API to refresh the token
    const response = await fetch(`${process.env.SPRING_API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        return NextResponse.json(
            { message: "Failed to refresh access token" },
            { status: response.status }
        );
    }

    const data = await response.json();
    const newAccessToken = data?.payload?.accessToken || null;
    const newRefreshToken = data?.payload?.refreshToken || null;

    if (!newAccessToken || !newRefreshToken) {
        return NextResponse.json(
            { message: "Invalid token response from server" },
            { status: 500 }
        );
    }

    // Set the new refresh token as an HTTP-only cookie
    const serialized = serialize(cookieName, newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Return the new access token
    return NextResponse.json(
        { accessToken: newAccessToken },
        { headers: { "Set-Cookie": serialized } }
    );
}