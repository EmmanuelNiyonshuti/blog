import PostCard from './components/blog/PostCard';
import Sidebar from './components/layout/Sidebar';
import { fetchPosts, fetchCategories } from "../lib/api";

export const metadata = {
  title: 'Home',
  description: 'Latest blog posts by NIYONSHUTI Emmanuel on backend development, programming, and technology.',
};

export default async function HomePage() {
  // Fetch posts and categories in parallel
  const [posts, categories] = await Promise.all([
    fetchPosts(),
    fetchCategories()
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar - 25% width on desktop */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <Sidebar categories={categories} />
        </aside>
        
        {/* Main Content - 75% width on desktop */}
        <main className="lg:col-span-3 order-1 lg:order-2">

          
          {/* Blog Posts */}
          <div className="space-y-0">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg">
                  No posts published yet. Check back soon!
                </p>
              </div>
            )}
          </div>
          
          {/* Pagination (placeholder for now) */}
          {posts.length > 0 && (
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button 
                disabled 
                className="px-4 py-2 text-gray-400 cursor-not-allowed text-sm"
              >
                ← Newer posts
              </button>
              <button 
                disabled 
                className="px-4 py-2 text-gray-400 cursor-not-allowed text-sm"
              >
                Older posts →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
