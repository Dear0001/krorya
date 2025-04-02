import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("krorya-refresh-token")?.value;
    const currentPath = request.nextUrl.pathname;

    // Public routes that don't require authentication
    const publicRoutes = [
        '/home',
        '/favorite',
        '/setting',
        new RegExp('^/recipe/'),
        '/login'
    ];

    // Admin-only routes
    const adminRoutes = [
        '/dashboard',
        '/food',
        '/user',
    ];

    // Check if current path is public
    const isPublicRoute = publicRoutes.some(route => {
        if (typeof route === 'string') {
            return currentPath === route;
        } else if (route instanceof RegExp) {
            return route.test(currentPath);
        }
        return false;
    });

    // Check if current path is admin-only
    const isAdminRoute = adminRoutes.includes(currentPath);

    // 1. Redirect root path to /home
    if (currentPath === "/") {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // 2. If no session and trying to access protected admin route, redirect to login
    if (!session && isAdminRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. If has session and is on login page, redirect to home
    if (session && currentPath === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 4. Allow access to public routes regardless of session
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // 5. For all other cases (protected non-admin routes), continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/home",
        "/dashboard",
        "/food",
        "/recipe/:path*",
        "/favorite",
        "/user",
        "/setting",
    ],
};