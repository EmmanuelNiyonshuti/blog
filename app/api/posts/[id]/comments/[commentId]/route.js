import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';

export async function DELETE(request, { params }) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }
    const requestParams = await params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(requestParams.id) },
      select: { authorId: true }
    });
    
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    // Verify user is post author
    if (post.authorId !== authResult.user.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(requestParams.commentId) }
    });
    
    if (!comment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }

    // Delete will cascade to replies automatically
    await prisma.comment.delete({
      where: { id: parseInt(requestParams.commentId) }
    });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Failed to delete comment: ${error.message}` },
      { status: 500 }
    );
  }
}