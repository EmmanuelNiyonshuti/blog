import { NextResponse } from 'next/server';

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api';

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
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}


export const config = {
  matcher: ['/admin/:path*'],
};