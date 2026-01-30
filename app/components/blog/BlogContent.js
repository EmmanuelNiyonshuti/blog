// app/components/blog/BlogContent.jsx
'use client';

import { useBlogPosts } from '../providers/BlogPostsProvider';
import PostCard from './PostCard';
import Pagination from '../ui/Pagination';

/**
 * Client component that handles pagination without refetching
 */
export default function BlogContent() {
  const { currentPosts, pagination, goToPage } = useBlogPosts();

  // Filter out "Personal" category posts
  const filteredPosts = currentPosts.filter(
    post => post.category?.name !== "Personal"
  );

  const handlePageChange = (newPage) => {
    goToPage(newPage);
  };

  return (
    <>
      {filteredPosts.length > 0 ? (
        <>
          <div className="space-y-12">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.id || index} post={post} />
            ))}
          </div>
          
          {/* Client-side pagination - NO refetching! */}
          <Pagination 
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No posts yet.
          </p>
        </div>
      )}
    </>
  );
}