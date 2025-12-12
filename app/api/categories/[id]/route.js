import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';
import { generateSlug, generateUniqueSlug } from '@/lib/utils';

// PUT - Update category (admin only)
export async function PUT(request, { params }) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    const { name, slug: providedSlug } = await request.json();

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    // Handle slug generation if name or slug changed
    let slug = existingCategory.slug;
    if (name && name !== existingCategory.name) {
      const baseSlug = providedSlug || generateSlug(name);
      slug = await generateUniqueSlug(baseSlug, async (slug) => {
        const existing = await prisma.category.findUnique({ where: { slug } });
        return existing && existing.id !== parseInt(params.id);
      });
    } else if (providedSlug && providedSlug !== existingCategory.slug) {
      slug = await generateUniqueSlug(providedSlug, async (slug) => {
        const existing = await prisma.category.findUnique({ where: { slug } });
        return existing && existing.id !== parseInt(params.id);
      });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(name && { name }),
        ...(slug && { slug })
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      data: { category: updatedCategory }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category (admin only)
export async function DELETE(request, { params }) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category has posts
    if (category._count.posts > 0) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete category that has posts. Please move or delete the posts first.' },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: parseInt(params.id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete category' },
      { status: 500 }
    );
  }
}