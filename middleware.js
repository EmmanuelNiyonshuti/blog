// middleware.js
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
        const response = await fetch(`${BASE_URL}/api/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': `token=${token}`
            }
        });
        
        if (!response.ok) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware auth error:', error);
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
}
export const config = {
    matcher: ['/admin/:path*'],
};