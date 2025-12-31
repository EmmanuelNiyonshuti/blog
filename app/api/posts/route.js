import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';
import { generateSlug, generateUniqueSlug, extractExcerpt, parseTags } from '@/lib/utils';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: {
            select: { email: true }
          },
          category: {
            select: { id: true, name: true, slug: true }
          },
          _count: {
            select: { comments: true }
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              name: true,
              content: true,
              createdAt: true
            }
          }
        }
      }),
      prisma.post.count({
        where: { status: 'PUBLISHED' }
      })
    ]);
    const totalPages = Math.ceil(total / limit);
    const meta = {
      currentPage: page,
      totalPages: totalPages,
      totalPosts: total,
      next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
      previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
    }
    return NextResponse.json({
      success: true,
      data: { posts, meta },
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Failed to fetch posts, ${error.message}` },
      { status: 500 }
    );
  }
}

// POST - Create new post (admin only)
export async function POST(request) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    const {
      title,
      slug: providedSlug,
      content,
      excerpt,
      status,
      tags,
      coverImage,
      metaDescription,
      categoryId
    } = await request.json();

    const normalizedStatus = status?.toUpperCase();

    // Generate slug if not provided
    const baseSlug = providedSlug || generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug, async (slug) => {
      const existing = await prisma.post.findUnique({ where: { slug } });
      return !!existing;
    });

    // Generate excerpt if not provided
    const postExcerpt = excerpt || extractExcerpt(content);

    // Parse tags
    const parsedTags = parseTags(tags);

    // Set publishedAt if status is PUBLISHED
    const publishedAt = status === 'PUBLISHED' ? new Date() : null;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: postExcerpt,
        status: normalizedStatus,
        tags: parsedTags,
        coverImage,
        metaDescription,
        publishedAt,
        authorId: authResult.user.id,
        categoryId: categoryId ? parseInt(categoryId) : null
      },
      include: {
        author: {
          select: { email: true }
        },
        category: {
          select: { id: true, name: true, slug: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      data: { post }
    }, { status: 201 });
  } catch (error) {
    console.log("error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'Post with this slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}