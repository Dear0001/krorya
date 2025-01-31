import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Create a POST request handler
export async function POST() {
    // Get the refresh token from the client-side cookies
    const cookieStore = await cookies();
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const credential = cookieStore.get(cookieName);

    console.log("Retrieved Cookie:", credential);

    // If the refresh token is not found, return an error message to the client-side
    if (!credential) {
        return NextResponse.json(
            {
                message: "Token not found",
            },
            {
                status: 404,
            }
        );
    }

    // get the refresh token value
    const refreshToken = credential.value;
    console.log("Refresh Token: ", refreshToken);

    // if the refresh token is found, make a POST request to the Our API
    const response = await fetch(
        `${process.env.SPRING_API_URL}/auth/refresh-token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: refreshToken }),
        }
    );
    // const dataUsers = await response.json();

    // If the request fails, return an error message to the client-side
    if (!response.ok) {
        return NextResponse.json(
            {
                message: "Failed to refresh access token",
            },
            {
                status: response.status,
            }
        );
    }

    // Parse the response body to get the data
    const data = await response.json();
    console.log("aaa: ", data);
    const refresh = data?.payload?.refresh_token || null;
    const access = data?.payload?.access_token || null;

    console.log("RR: ", refresh);
    console.log("TT: ", access);

    // If the tokens are missing in the response, return an error
    if (!refresh || !access) {
        return NextResponse.json(
            {
                message: "Invalid token response from server",
            },
            {
                status: 500,
            }
        );
    }

    // Serialize the refresh token and set it as a cookie with
    // (httpOnly, secure, path, and sameSite options) in the response headers to the client-side
    const serialized = serialize(cookieName, refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });

    // Return the access token to the client-side with the serialized refresh token as a cookie
    return NextResponse.json(
        {
            accessToken: access,
        },
        {
            headers: {
                "Set-Cookie": serialized,
            },
        }
    );
}
