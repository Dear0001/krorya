import { NextResponse } from "next/server";

export default function middleware(request: { cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }; nextUrl: { pathname: any; }; url: string | URL | undefined; }) {
    const token = request.cookies.get("next-auth.session-token")?.value;
    const path = request.nextUrl.pathname;

    if (!token && path !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && (path === "/" || path === "/")) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/admin/dashboard",
        "/admin/:path*"
    ],
};