import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth/middleware';
import { generateSlug, generateUniqueSlug } from '@/lib/utils';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            posts: {
              where: { status: 'PUBLISHED' }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    const { name, slug: providedSlug } = await request.json();

    // Generate slug if not provided
    const baseSlug = providedSlug || generateSlug(name);
    const slug = await generateUniqueSlug(baseSlug, async (slug) => {
      const existing = await prisma.category.findUnique({ where: { slug } });
      return !!existing;
    });

    const category = await prisma.category.create({
      data: {
        name,
        slug
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    }, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to create category' },
      { status: 500 }
    );
  }
}