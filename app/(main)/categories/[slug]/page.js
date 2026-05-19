import { notFound } from 'next/navigation';
import Sidebar from '@/app/components/ui/Sidebar';
import BlogContent from '@/app/components/blog/BlogContent';
import { getAllCategories, getPostsByCategory } from '@/lib/mdx-utils';
import { TECH_POST_DIR } from '@/lib/utils';

export async function generateStaticParams() {
  const categories = await getAllCategories(TECH_POST_DIR);
  return categories.map(cat => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getAllCategories(TECH_POST_DIR);
  const category = categories.find(c => c.slug === slug);

  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} - NIYONSHUTI Emmanuel`,
    description: `Browse all posts in the ${category.name} category by NIYONSHUTI Emmanuel.`,
  };
}

export default async function CategoryPage({ searchParams, params }) {
  const { slug } = await params;
  const pathParams = await searchParams;
  const page = parseInt(pathParams?.page || '1');
  const POSTS_PER_PAGE = 10;

  const [posts, categories] = await Promise.all([
    getPostsByCategory(TECH_POST_DIR, slug),
    getAllCategories(TECH_POST_DIR),
  ]);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const currentCategory = categories.find(c => c.slug === slug);
  if (!currentCategory) notFound();

  const pagination = {
    currentPage: page,
    totalPages,
    totalPosts: posts.length,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };

  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <Sidebar categories={categories} />
      <main className="lg:col-span-3 order-1 lg:order-2 pl-5">
        <BlogContent posts={paginatedPosts} pagination={pagination} />
      </main>
    </div>
  </div>
  );
}