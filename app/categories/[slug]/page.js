import { notFound } from 'next/navigation';
import PostList from '../../components/blog/PostList';
import Sidebar from '../../components/layout/Sidebar';
import CategoriesSection from '@/app/components/blog/CategoriesSection';
import { fetchPostsByCategory, fetchCategories } from '../../../lib/api';

export async function generateMetadata({ params }) {
  try {
    const slug = await params.slug;
    const [posts, categories] = await Promise.all([
      fetchPostsByCategory(slug),
      fetchCategories()
    ]);
    
    const category = categories.find(cat => cat.slug === slug);
    
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
    const slug = await params.slug;
    const [posts, categories] = await Promise.all([
      fetchPostsByCategory(slug),
      fetchCategories()
    ]);
    const PostCategory = categories.find(cat => cat.slug === slug);
    if (!PostCategory) {
      notFound();
    }

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - 75% width on desktop */}
          <main className="lg:col-span-3 order-1">
            
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {PostCategory.name}
              </h1>
            </div>
            
            {/* Posts */}
            <PostList 
              posts={posts}
              emptyMessage={`No posts found in the ${PostCategory.name} category yet.`}
            />
          </main>

        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="lg:sticky lg:top-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <CategoriesSection />
            </div>
          </div>
        </aside>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    notFound();
  }
}
