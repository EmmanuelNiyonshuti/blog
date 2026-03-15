import Link from 'next/link';
import PostCard from './PostCard';

export default function BlogContent({ posts = [], pagination }) {
  return (
    <div>
      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No posts yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      {/* Pagination */}
    {pagination && pagination.totalPages > 1 && (
      <div className="flex items-center justify-between mt-12 pt-8">
      {pagination.hasPrev ? (
        <Link
        href={`/?page=${pagination.currentPage - 1}`}
        className="px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-sky-700 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
        >
        ← Previous
        </Link>
        ) : <div />}
        
        <span className="text-sm text-gray-500 dark:text-gray-400">
        Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        
        {pagination.hasNext ? (
          <Link
          href={`/?page=${pagination.currentPage + 1}`}
          className="px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-sky-700 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
          >
          Next →
          </Link>
          ) : <div />}
          </div>
          )}
      </div>
    );
}