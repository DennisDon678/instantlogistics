import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession, COOKIE_NAME } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isDashboardRoute = path.startsWith('/dashboard');
    const isDeliveriesApi = path.startsWith('/api/deliveries');

    // If it's not a protected route, continue
    if (!isDashboardRoute && !isDeliveriesApi) {
        return NextResponse.next();
    }

    // Check for admin session coookie
    const cookie = request.cookies.get(COOKIE_NAME);
    const session = cookie ? await verifySession(cookie.value) : null;

    // If session is valid, continue
    if (session) {
        return NextResponse.next();
    }

    // If unauthorized:

    // For API routes, return 401
    // Ideally we only protect modification routes (POST, PUT, DELETE) and maybe GET if sensitive.
    // The requirement "protect the admin pages" implies dashboard. API protection is good to have.
    // Tracking page uses GET /api/deliveries/[id], which should be public!
    // We should ONLY protect endpoints that are strictly admin.
    // GET /api/deliveries/[id] is used by tracking page -> PUBLIC
    // GET /api/deliveries is used by dashboard -> PROTECTED (implied, or check if public needs it)
    // POST/PUT/DELETE -> PROTECTED

    if (isDeliveriesApi) {
        // Allow GET request to /api/deliveries/[id] (Tracking)
        // But /api/deliveries (list) should probably be protected?
        // Let's refine the check.

        // If it is a GET request
        if (request.method === 'GET') {
            // If it is /api/deliveries/[id] -> Public (Tracking ID lookup)
            // But if it is /api/deliveries (List all) -> Protected (Dashboard)
            // How to distinguish?
            // path === '/api/deliveries' -> List -> Protected
            // path.startsWith('/api/deliveries/') -> Single Item -> Public? 
            // Wait, /api/deliveries/[id] returns full history. Is that sensitive? 
            // Tracking page needs it. So it must be public for the tracking page to work.

            // Check if it's the list endpoint
            if (path === '/api/deliveries') {
                // List all deliveries -> Protected
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            // If it's a specific delivery, allow it (Tracking)
            return NextResponse.next();
        }

        // For POST, PUT, DELETE -> Protected
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For Dashboard pages, redirect to login
    if (isDashboardRoute) {
        const loginUrl = new URL('/admin/login', request.url);
        // loginUrl.searchParams.set('from', path); // Optional: redirect back after login
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth routes must be public)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api/auth|_next/static|_next/image|favicon.ico|hero.png).*)',
    ],
};
