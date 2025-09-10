import { notFound } from 'next/navigation';
import PostList from '../../components/blog/PostList';
import Sidebar from '../../components/layout/Sidebar';
import { fetchPostsByCategory, fetchCategories } from '../../../lib/api';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
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
    const [posts, categories] = await Promise.all([
      fetchPostsByCategory(params.slug),
      fetchCategories()
    ]);
    
    const category = categories.find(cat => cat.slug === params.slug);
    
    if (!category) {
      notFound();
    }

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - 25% width on desktop */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <Sidebar categories={categories} />
          </aside>
          
          {/* Main Content - 75% width on desktop */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600">
                {posts.length} post{posts.length !== 1 ? 's' : ''} in this category
              </p>
            </div>
            
            {/* Posts */}
            <PostList 
              posts={posts}
              emptyMessage={`No posts found in the ${category.name} category yet.`}
            />
            
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    notFound();
  }
}
