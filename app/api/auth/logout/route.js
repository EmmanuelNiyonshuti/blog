import { NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api'.replace(/\/$/, '');

export async function POST() {
  try {
    // Inform backend to clear server-side session if applicable
    await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
  } catch {}

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', '', { path: '/', maxAge: 0 });
  return res;
}


