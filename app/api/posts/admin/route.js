import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';

export async function GET(request) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const status = searchParams.get('status');

    const where = status ? { status } : {};

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
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
            select: { 
              comments: {
                where: { parentId: null }
              }
            }
          },
          comments: {
            where: {
              parentId: null
            },
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              name: true,
              content: true,
              createdAt: true,
              parentId: true,
              replies: {
                orderBy: { createdAt: 'asc' },
                select: {
                  id: true,
                  name: true,
                  content: true,
                  createdAt: true,
                  parentId: true
                }
              }
            }
          }
        }
      }),
      prisma.post.count({ where })
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
      data: { posts, pagination }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}