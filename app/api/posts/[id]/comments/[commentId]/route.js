import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';

// DELETE - Delete comment or reply (admin only)
export async function DELETE(request, { params }) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
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
      where: { id: parseInt(params.commentId) }
    });
    
    if (!comment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }

    // Delete will cascade to replies automatically
    await prisma.comment.delete({
      where: { id: parseInt(params.commentId) }
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