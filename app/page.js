// app/page.js
import PostCard from './components/blog/PostCard';
import Sidebar from './components/layout/Sidebar';
import Pagination from './components/ui/Pagination';
import { fetchAllPosts } from "@/lib/api";

export const metadata = {
  title: 'NIYONSHUTI Emmanuel | Software Engineer',
  description: 'Notes on software engineering.',
  
  openGraph: {
    title: 'NIYONSHUTI Emmanuel | Software Engineer',
    description: 'Notes on software engineering.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com',
    siteName: 'NIYONSHUTI Emmanuel',
    images: [
      {
        url: 'https://res.cloudinary.com/dx8m9dy9d/image/upload/v1765822012/preview-blog_qs9axk.avif',
        width: 1200, 
        height: 630, 
        alt: 'NIYONSHUTI Emmanuel Blog Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIYONSHUTI Emmanuel | Software Engineer',
    description: 'Notes on software engineering.',
    images: ['https://res.cloudinary.com/dx8m9dy9d/image/upload/v1765822012/preview-blog_qs9axk.avif'],
    creator: '@emmanuelio',
  },
};

export default async function HomePage({ searchParams }) {
  const page = parseInt(searchParams?.page || '1');
  const limit = 10;
  
  const { posts, pagination } = await fetchAllPosts(page, limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <main className="lg:col-span-2">
          {posts.length > 0 ? (
            <>
              <div className="space-y-12">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              <Pagination 
                currentPage={pagination.currentPage || 1}
                totalPages={pagination.totalPages || 1}
                hasNext={pagination.hasNext || false}
                hasPrev={pagination.hasPrev || false}
              />
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No posts yet.
              </p>
            </div>
          )}
        </main>
        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}