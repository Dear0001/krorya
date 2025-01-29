import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookies = request.cookies;
    const session = cookies.get("krorya-refresh-token")?.value;
    const currentPath = request.nextUrl.pathname;

    // If the user has a session and is on "/", redirect to dashboard
    if (session && currentPath === "/") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // If the user has no session and is not already on "/login", redirect to login
    if (!session && currentPath !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// Apply middleware to all routes
export const config = {
    matcher: ["/", "/admin/dashboard", "/admin/:path*"],
};
