import { NextResponse } from 'next/server';

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000';

const loginRoute = '/admin/login';

export async function middleware(request) {
  console.log("Running middleware for:", request.nextUrl.pathname);
  
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith('/admin');
  const isLoginPage = path === loginRoute;

  // If user is on login page and has valid token, redirect to dashboard
  if (isLoginPage) {
    const token = request.cookies.get('token')?.value;
    console.log("Login page - Token found:", !!token);
    
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          method: 'POST',
          headers: {
            'Cookie': `token=${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log("Token verification response:", response.status);
        
        if (response.ok) {
          console.log("Valid token found, redirecting to dashboard");
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (error) {
        console.log("Token verification failed:", error.message);
      }
    }
    
    // Allow access to login page
    return NextResponse.next();
  }

  // Protect admin routes (except login)
  if (isAdminRoute) {
    const token = request.cookies.get('token')?.value;
    console.log("Admin route - Token found:", !!token);

    if (!token) {
      console.log("No token, redirecting to login");
      return NextResponse.redirect(new URL(loginRoute, request.url));
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Cookie': `token=${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Admin route token verification:", response.status);

      if (!response.ok) {
        console.log("Invalid token, redirecting to login");
        return NextResponse.redirect(new URL(loginRoute, request.url));
      }

      console.log("Token verified, allowing access");
      return NextResponse.next();
    } catch (error) {
      console.log("Token verification error:", error.message);
      return NextResponse.redirect(new URL(loginRoute, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};