import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 403 }
      );
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 403 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'valid token'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Token verification failed' },
      { status: 500 }
    );
  }
}