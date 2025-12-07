import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET posts in a category
export async function GET(request, { params }) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Find category by slug
    const category = await prisma.category.findUnique({
      where: { slug: params.slug }
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          categoryId: category.id,
          status: 'PUBLISHED'
        },
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
          }
        }
      }),
      prisma.post.count({
        where: {
          categoryId: category.id,
          status: 'PUBLISHED'
        }
      })
    ]);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    };

    return NextResponse.json({
      success: true,
      data: { 
        category,
        posts, 
        pagination 
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch category posts' },
      { status: 500 }
    );
  }
}