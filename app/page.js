// app/page.js
import PostCard from './components/blog/PostCard';
import Sidebar from './components/layout/Sidebar';
import { fetchAllPosts } from "@/lib/api";

export const metadata = {
  title: 'NIYONSHUTI Emmanuel | Backend Engineer',
  description: 'Thoughts on backend engineering, distributed systems, and building scalable software.'
};

export default async function HomePage() {
  const posts = await fetchAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <main className="lg:col-span-2">

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No posts yet. Building something...
              </p>
            </div>
          )}

          {/* Pagination (future) */}
          {posts.length > 10 && (
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-800">
              <button 
                disabled 
                className="px-6 py-2 text-gray-500 dark:text-gray-600 cursor-not-allowed font-mono text-sm"
              >
                ← newer
              </button>
              <button 
                disabled 
                className="px-6 py-2 text-gray-500 dark:text-gray-600 cursor-not-allowed font-mono text-sm"
              >
                older →
              </button>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}