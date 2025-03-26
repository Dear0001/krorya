import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("krorya-refresh-token")?.value;
    const currentPath = request.nextUrl.pathname;

    // If no session and NOT on /login, redirect to login
    if (!session && currentPath !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user has a session and is on "/" or "/login", redirect to dashboard
    if (session && (currentPath === "/" || currentPath === "/login")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
}

// Apply middleware to relevant routes
export const config = {
    matcher: ["/", "/login", "/admin/dashboard", "/admin/:path*"],
};
