import { notFound } from 'next/navigation';
import CategoriesSection from '@/app/components/blog/CategoriesSection';
import PostCard from '@/app/components/blog/PostCard';
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

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [posts, categories] = await Promise.all([
    getPostsByCategory(TECH_POST_DIR, slug),
    getAllCategories(TECH_POST_DIR),
  ]);

  const currentCategory = categories.find(c => c.slug === slug);
  if (!currentCategory) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="lg:sticky lg:top-8">
            <CategoriesSection categories={categories} />
          </div>
        </aside>

        <main className="lg:col-span-3 order-1 lg:order-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {currentCategory.name}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No posts in {currentCategory.name} yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}