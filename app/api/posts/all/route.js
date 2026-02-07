// app/api/posts/all/route.js
import { NextResponse } from 'next/server';
import { fetchAllPosts } from '@/lib/api';

/**
 * GET /api/posts/all
 * Returns ALL posts for client-side caching
 * Used by BlogPostsProvider for background refresh
 */
export async function GET() {
  try {
    // Fetch all posts without pagination
    const { allPosts } = await fetchAllPosts(1, 1000);
    
    return NextResponse.json({
      success: true,
      posts: allPosts,
      total: allPosts.length,
    });
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch posts',
        posts: [] 
      },
      { status: 500 }
    );
  }
}