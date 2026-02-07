import CategoriesSection from '../components/blog/CategoriesSection';
import BlogContent from '../components/blog/BlogContent';
import { BlogPostsProvider } from '../components/providers/BlogPostsProvider';
import { CategoriesProvider } from '../components/providers/CategoriesProvider';
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

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page || '1');
  const limit = 10;

  // Fetch data on server (will be cached by Next.js)
  // This runs ONLY on server - client uses localStorage cache
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
            {/* <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"> */}
              {/* 
                CategoriesProvider: Caches categories in localStorage
                - initialCategories: Server-fetched data (first load only)
                - After hydration, uses cached data
                - Refreshes in background if cache is stale
              */}
              <CategoriesProvider initialCategories={categories}>
                <CategoriesSection />
              </CategoriesProvider>
            {/* </div> */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 order-1 lg:order-2">
          {/* 
            BlogPostsProvider: Caches ALL posts in localStorage
            - initialPosts: Server-fetched posts (first load only)
            - initialPagination: Server-calculated pagination
            - After hydration, uses cached data
            - Pagination happens client-side with NO refetching
            - Refreshes in background if cache is stale
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