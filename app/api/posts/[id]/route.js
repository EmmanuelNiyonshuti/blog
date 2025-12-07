import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';
import { generateSlug, generateUniqueSlug, extractExcerpt, parseTags } from '@/lib/utils';

export async function GET(request, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        author: {
          select: { email: true }
        },
        category: {
          select: { id: true, name: true, slug: true }
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
    });

    if (!post) {
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
      { success: false, message: `Failed to fetch post: ${error.toString()}` },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    // Handle slug generation
    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      const baseSlug = providedSlug || generateSlug(title);
      slug = await generateUniqueSlug(baseSlug, async (slug) => {
        const existing = await prisma.post.findUnique({ where: { slug } });
        return existing && existing.id !== parseInt(params.id);
      });
    } else if (providedSlug && providedSlug !== existingPost.slug) {
      slug = await generateUniqueSlug(providedSlug, async (slug) => {
        const existing = await prisma.post.findUnique({ where: { slug } });
        return existing && existing.id !== parseInt(params.id);
      });
    }

    const normalizedStatus = status?.toUpperCase();

    // Handle publishedAt
    let publishedAt = existingPost.publishedAt;
    if (normalizedStatus === 'PUBLISHED' && existingPost.status !== 'PUBLISHED') {
      publishedAt = new Date();
    } else if (normalizedStatus !== 'PUBLISHED' && existingPost.status === 'PUBLISHED') {
      publishedAt = null;
    }

    // Generate excerpt if needed
    let postExcerpt = excerpt;
    if (content && content !== existingPost.content && !excerpt) {
      postExcerpt = extractExcerpt(content);
    }

    const parsedTags = tags ? parseTags(tags) : undefined;

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content && { content }),
        ...(postExcerpt !== undefined && { excerpt: postExcerpt }),
        ...(normalizedStatus && { status: normalizedStatus }),
        ...(parsedTags && { tags: parsedTags }),
        ...(coverImage !== undefined && { coverImage }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(publishedAt !== undefined && { publishedAt }),
        ...(categoryId !== undefined && { categoryId: categoryId ? parseInt(categoryId) : null })
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
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'Post with this slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: `Failed to update post: ${error.toString()}` },
      { status: 500 }
    );
  }
}

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
      where: { id: parseInt(params.id) }
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    await prisma.post.delete({
      where: { id: parseInt(params.id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete post' },
      { status: 500 }
    );
  }
}