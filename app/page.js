// app/page.js
import PostCard from './components/blog/PostCard';
import Pagination from './components/ui/Pagination';
import { fetchAllPosts } from "@/lib/api";
import CategoriesSection from './components/blog/CategoriesSection';

export const metadata = {
  title: 'NIYONSHUTI Emmanuel | Software developer',
  description: 'Notes on software development.',
  
  openGraph: {
    title: 'NIYONSHUTI Emmanuel | Software developer',
    description: 'Notes on software development.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com',
    siteName: 'NIYONSHUTI Emmanuel',
    images: [
      {
        url: 'https://res.cloudinary.com/dx8m9dy9d/image/upload/v1766339600/blog-preview_h6mkod.jpg',
        width: 1200, 
        height: 630, 
        alt: 'NIYONSHUTI Emmanuel Blog Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIYONSHUTI Emmanuel | Software developer',
    description: 'Notes on software development.',
    images: ['https://res.cloudinary.com/dx8m9dy9d/image/upload/v1766339600/blog-preview_h6mkod.jpg'],
    creator: '@emmanuelio',
  },
};

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page || '1');
  const limit = 10;

  const { posts, pagination } = await fetchAllPosts(page, limit);
  const filteredPosts = posts.filter(post => post.category?.name !== "Personal");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar - Left on Desktop, Top on Mobile */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="lg:sticky lg:top-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <CategoriesSection />
            </div>
          </div>
        </aside>

        {/* Main Content - Right on Desktop */}
        <main className="lg:col-span-3 order-1 lg:order-2">
          {filteredPosts.length > 0 ? (
            <>
              <div className="space-y-12">
                {filteredPosts.map((post, index) => (
                  <PostCard key={index} post={post} />
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
      </div>
    </div>
  );
}