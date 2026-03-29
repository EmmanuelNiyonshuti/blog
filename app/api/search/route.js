import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx-utils';
import { TECH_POST_DIR } from '@/lib/utils';

// do `O(n)` scan through posts
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const allPosts = await getAllPosts(TECH_POST_DIR);

  const results = allPosts
    .filter(({ frontmatter }) => {
      const { title, excerpt, category, tags } = frontmatter;
      return (
        title?.toLowerCase().includes(query) ||
        excerpt?.toLowerCase().includes(query) ||
        category?.toLowerCase().includes(query) ||
        tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    })
    .map(({ slug, frontmatter }) => ({
      slug,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      category: frontmatter.category,
      date: frontmatter.date,
    }));

  return NextResponse.json({ results });
}