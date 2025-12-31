import { notFound } from 'next/navigation';
import CategoriesSection from '@/app/components/blog/CategoriesSection';
import { fetchPostsByCategory, fetchCategories } from '../../../lib/api';
import PostCard from '@/app/components/blog/PostCard';

export async function generateMetadata({ params }) {
  try {
    const params = await params;
    const [posts, categories] = await Promise.all([
      fetchPostsByCategory(params.slug),
      fetchCategories()
    ]);
    const category = categories.find(cat => cat.slug === params.slug);
    
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
    const parms = await params;
    const [posts, categories] = await Promise.all([
      fetchPostsByCategory(parms.slug),
      fetchCategories()
    ]);
    const PostCategory = categories.find(cat => cat.slug === parms.slug);
    if (!PostCategory) {
      notFound();
    }
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <CategoriesSection />
              </div>
            </div>
          </aside>
          {/* Main Content - 75% width on desktop */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            {posts.length > 0 ? (
              <>
                <div className="space-y-12">
                  {posts.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No posts yet.
                </p>
              </div>
            )}
          </main>
            {/* <PostList 
              posts={posts}
              emptyMessage={`No posts found in the ${PostCategory.name} category yet.`}
            /> */}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    notFound();
  }
}
