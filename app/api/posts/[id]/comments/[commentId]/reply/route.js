import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';

// POST - Reply to a comment (admin only)
export async function POST(request, { params }) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    const { content } = await request.json();

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Reply content is required' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { success: false, message: 'Reply must be less than 1000 characters' },
        { status: 400 }
      );
    }

    const parentComment = await prisma.comment.findUnique({
      where: { id: parseInt(params.commentId) },
      include: {
        post: {
          select: { 
            id: true,
            authorId: true,
            status: true
          }
        }
      }
    });

    if (!parentComment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }

    if (parentComment.post.authorId !== authResult.user.id) {
      return NextResponse.json(
        { success: false, message: 'Only the post author can reply to comments' },
        { status: 403 }
      );
    }

    // Prevent replying to replies (only 1 level deep)
    if (parentComment.parentId !== null) {
      return NextResponse.json(
        { success: false, message: 'Cannot reply to a reply' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: authResult.user.id },
      select: { email: true }
    });

    // Create the reply
    const reply = await prisma.comment.create({
      data: {
        name: 'NIYONSHUTI Emmanuel',
        email: user.email,
        content: content.trim(),
        postId: parentComment.postId,
        parentId: parseInt(params.commentId),
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
      message: 'Reply posted successfully',
      reply
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Failed to post reply: ${error.message}` },
      { status: 500 }
    );
  }
}