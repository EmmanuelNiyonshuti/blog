import { NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api'.replace(/\/$/, '');

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Login failed' }, { status: res.status });
    }

    // Expect token in response body; set a frontend cookie for middleware.
    const token = data.token;
    const response = NextResponse.json({ success: true });
    if (token) {
      response.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return response;
  } catch (e) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}


