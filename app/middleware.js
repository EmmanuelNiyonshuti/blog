import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api'.replace(/\/$/, '');

const protectedRoutes = ['/admin'];
const loginRoute = '/admin/login';

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    console.log("Path:", path);
    const isAdminRoute = path.startsWith('/admin');
    const isLoginPage = path === loginRoute;

    // If it's an admin route but not the login page
    if (isAdminRoute && !isLoginPage) {
      // Check for auth token
      const token = await request.cookies.get('token')?.value;

      if (!token) {
        // No token, redirect to login
        return NextResponse.redirect(new URL(loginRoute, request.url));
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
          method: 'POST',
          headers: {
            'Cookie': `token=${token}`,
          }
        });
        if (!response.ok) {
          return NextResponse.redirect(new URL(loginRoute, request.url));
        }
        return NextResponse.next();
      } catch (error) {
        // Invalid token, redirect to login
        return NextResponse.redirect(new URL(loginRoute, request.url));
      }
  }
  
  // If user is logged in and tries to access login page, redirect to dashboard
  if (isLoginPage) {
    const token = await cookies().get('token')?.value;
    if (token) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'POST',
            headers: { 'Cookie': `token=${token}` }
        })
        if (!res.ok){
            return NextResponse.redirect(new URL(loginRoute, request.url));
        }
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (error) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }
  return NextResponse.next();
}
// Configure which routes middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
  ]
};