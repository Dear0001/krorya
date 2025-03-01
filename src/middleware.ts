import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookies = request.cookies;
    const session = cookies.get("krorya-refresh-token")?.value || null;
    const currentPath = request.nextUrl.pathname;

    // If session is "null" (as a string) or undefined, redirect to log in
    if (!session || session === "null") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If the user has a session and is on "/", redirect to dashboard
    if (session && currentPath === "/") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
}

// Apply middleware to relevant routes
export const config = {
    matcher: ["/", "/admin/dashboard", "/admin/:path*"],
};
