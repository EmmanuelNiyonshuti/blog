import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params}) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        author: {
          select: {
            id: true,
            email: true
          }
        },
        comments: {
          where: {
            parentId: null
          },
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            name: true,
            content: true,
            createdAt: true,
            parentId: true,
            replies: {
              orderBy: {
                createdAt: 'asc'
              },
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
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    if (post.status !== 'PUBLISHED') {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Failed to fetch post: ${error.message}` },
      { status: 500 }
    );
  }
}