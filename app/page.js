// app/page.jsx - UPDATED WITH PERFORMANCE OPTIMIZATIONS
import CategoriesSection from './components/blog/CategoriesSection';
import BlogContent from './components/blog/BlogContent';
import { BlogPostsProvider } from './components/providers/BlogPostsProvider';
import { fetchAllPosts, fetchCategories } from "@/lib/api";

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

/**
 * Enable ISR (Incremental Static Regeneration)
 * Page will be statically generated and revalidated every 5 minutes
 */
export const revalidate = 300; // 5 minutes in production

/**
 * Home Page - Optimized with ISR and client-side pagination
 * 
 * PERFORMANCE IMPROVEMENTS:
 * - Server fetches ALL posts once (with cache)
 * - Client stores posts in React state
 * - Pagination happens client-side (instant!)
 * - No refetching when navigating between pages
 * - ISR keeps data fresh in background
 */
export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page || '1');
  const limit = 10;

  // Fetch ALL data once on server (cached!)
  const [{ posts, allPosts, pagination }, categories] = await Promise.all([
    fetchAllPosts(page, limit),
    fetchCategories()
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Categories */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="lg:sticky lg:top-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <CategoriesSection categories={categories} />
            </div>
          </div>
        </aside>

        {/* Main Content - Wrapped in Provider for client-side pagination */}
        <main className="lg:col-span-3 order-1 lg:order-2">
          {/* 
            BlogPostsProvider: Stores ALL posts in client state
            - initialPosts: All posts for instant client-side pagination
            - initialPagination: Server-calculated pagination info
            
            After hydration, pagination happens client-side with NO refetching!
          */}
          <BlogPostsProvider 
            initialPosts={allPosts} 
            initialPagination={pagination}
          >
            <BlogContent />
          </BlogPostsProvider>
        </main>
      </div>
    </div>
  );
}