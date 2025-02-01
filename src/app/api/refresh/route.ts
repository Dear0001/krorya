import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Create a POST request handler
export async function POST() {
    const cookieStore = await cookies();
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const credential = cookieStore.get(cookieName);

    if (!credential) {
        console.error("Refresh Token Missing in Cookies");
        return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }

    const refreshToken = credential.value;
    console.log("Using Refresh Token:", refreshToken);

    const response = await fetch(`${process.env.SPRING_API_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Refresh Token API Error:", errorText);
        return NextResponse.json({ message: "Failed to refresh access token" }, { status: response.status });
    }

    const data = await response.json();
    console.log("Refresh API Response:", data);

    const newRefreshToken = data?.payload?.refreshToken || null;
    const newAccessToken = data?.payload?.accessToken || null;

    if (!newRefreshToken || !newAccessToken) {
        console.error("Invalid Token Response from API");
        return NextResponse.json({ message: "Invalid token response from server" }, { status: 500 });
    }

    const serialized = serialize(cookieName, newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });

    return NextResponse.json(
        { accessToken: newAccessToken },
        { headers: { "Set-Cookie": serialized } }
    );
}
