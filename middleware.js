import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.API_URL?.replace(/\/$/, '') ||
  'https://blog-backend-2u9m.onrender.com/api';

export async function middleware(request) {
    console.log("running middleware");
    const path = request.nextUrl.pathname;
    if (path === '/admin/login') {
        return NextResponse.next();
    }
    console.log("cookie store:", cookieStore)
    const token = request.cookies.get('token')?.value;
    const cookieStore = await cookies();
    const theme_cookie = cookieStore.get('token');
    console.log("cookie from cookie store:", theme_cookie);
    console.log("token from cookies.get():", token);
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
        console.log(response);
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