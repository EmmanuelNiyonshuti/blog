// app/api/revalidate/route.js
// OPTIONAL: Call this endpoint when you publish a new post to clear cache

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * POST /api/revalidate
 * Clears cache when new posts are published
 * 
 * Usage from your admin panel after publishing:
 * 
 * await fetch('/api/revalidate', { 
 *   method: 'POST',
 *   headers: { 
 *     'Content-Type': 'application/json',
 *     'x-revalidate-token': process.env.REVALIDATE_TOKEN 
 *   }
 * })
 */
export async function POST(request) {
  // Security: Verify token
  const token = request.headers.get('x-revalidate-token');
  
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  try {
    // Revalidate cache tags
    revalidateTag('posts');
    revalidateTag('medium-posts');
    revalidateTag('categories');
    
    // Revalidate home page
    revalidatePath('/');
    
    return NextResponse.json({
      success: true,
      message: 'Cache revalidated successfully',
      revalidated: true,
      now: Date.now()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Error revalidating cache', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revalidate (for testing in development)
 * Don't use this in production - use POST with token
 */
export async function GET() {
  if (process.env.NODE_ENV === 'development') {
    revalidateTag('posts');
    revalidateTag('medium-posts');
    revalidateTag('categories');
    revalidatePath('/');
    
    return NextResponse.json({
      success: true,
      message: 'Cache revalidated (dev mode)',
      revalidated: true
    });
  }

  return NextResponse.json(
    { error: 'Use POST method with token' },
    { status: 405 }
  );
}