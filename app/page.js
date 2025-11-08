import PostCard from './components/blog/PostCard';
import Sidebar from './components/layout/Sidebar';
import { fetchAllPosts, fetchCategories } from "../lib/api";

export const metadata = {
  title: 'Home',
  description: 'Latest blog posts by NIYONSHUTI Emmanuel on backend development, programming, and technology.'
};

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    fetchAllPosts(),
    fetchCategories()
  ]);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
        <main className="lg:col-span-3 order-1">
          {/* Blog Posts */}
          <div className="space-y-0">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No posts published yet. Check back soon!</p>
              </div>
            )}
          </div>
          {posts.length > 3 && (
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <button disabled className="px-4 py-2 text-gray-400 dark:text-gray-200 cursor-not-allowed text-sm">← Newer posts</button>
              <button disabled className="px-4 py-2 text-gray-400 dark:text-gray-200 cursor-not-allowed text-sm">Older posts →</button>
            </div>
          )}
        </main>

        {/* Sidebar - right side on desktop */}
        <aside className="lg:col-span-1 order-2">
          <Sidebar categories={categories} />
        </aside>
      </div>
    </div>
  );
}
