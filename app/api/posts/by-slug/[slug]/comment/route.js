import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request, { params }) {
  try {
    const requestParams = await params;
    const { name, email, content } = await request.json();
    console.log("name:", name);
    console.log("email:", email);
    console.log("content:", content);
    const post = await prisma.post.findUnique({
      where: { slug: requestParams.slug },
      select: { id: true, status: true }
    });

    if (!post || post.status !== 'PUBLISHED') {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        name,
        email,
        content,
        postId: post.id
      },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
        parentId: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Comment created successfully',
      comment
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Failed to create comment: ${error.toString()}` },
      { status: 500 }
    );
  }
}