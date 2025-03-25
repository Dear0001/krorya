import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookies = request.cookies;
    const session = cookies.get("krorya-refresh-token")?.value || null;
    const currentPath = request.nextUrl.pathname;

    // If session is "null" (as a string) or undefined, redirect to login
    if (!session || session === "null") {
        // Only redirect to login if the user is not already on the login page
        if (currentPath !== "/login") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        // If the user has a session and is on "/" or "/login", redirect to dashboard
        if (currentPath === "/" || currentPath === "/login") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }
}

// Apply middleware to relevant routes
export const config = {
    matcher: ["/", "/login", "/admin/dashboard", "/admin/:path*"],
};