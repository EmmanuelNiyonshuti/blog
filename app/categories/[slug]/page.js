import { notFound } from 'next/navigation';
import CategoriesSection from '@/app/components/blog/CategoriesSection';
import { fetchPostsByCategory, fetchCategories } from '../../../lib/api';
import PostCard from '@/app/components/blog/PostCard';
import * as Sentry from "@sentry/nextjs";

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const categories = await fetchCategories();
    const category = categories.find(cat => cat.slug === resolvedParams.slug);
    
    if (!category) {
      return {
        title: 'Category Not Found',
      };
    }

    return {
      title: `${category.name} - Category`,
      description: `Browse all posts in the ${category.name} category by NIYONSHUTI Emmanuel.`,
    };
  } catch (error) {
    return {
      title: 'Category Not Found',
    };
  }
}

export default async function CategoryPage({ params }) {
  try {
    const resolvedParams = await params;

    const [posts, categories] = await Promise.all([
      fetchPostsByCategory(resolvedParams.slug),
      fetchCategories()
    ]);
    
    const currentCategory = categories.find(cat => cat.slug === resolvedParams.slug);
    Sentry.logger.info(`Fetching category page for slug: ${resolvedParams.slug}`);    
    if (!currentCategory) {
      Sentry.logger.warn(`Category not found for slug: ${resolvedParams.slug}`);
      notFound();
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <CategoriesSection categories={categories} />
              </div>
            </div>
          </aside>
          <main className="lg:col-span-3 order-1 lg:order-2">
            {posts.length > 0 ? (
              <div className="space-y-12">
                {posts.map((post, index) => (
                  <PostCard key={post.id || index} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No posts in the {currentCategory.name} category yet.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    Sentry.captureException(error);
    notFound();
  }
}