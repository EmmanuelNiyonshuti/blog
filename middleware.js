import { NextResponse } from 'next/server';
import { API_BASE_URL } from './lib/api';

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    if (path === '/admin/login') {
        return NextResponse.next();
    }
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'POST',
            headers: {
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!response.ok) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};