import CategoriesSection from '../components/blog/CategoriesSection';
import BlogContent from '../components/blog/BlogContent';
import { TECH_POST_DIR } from '@/lib/utils';
import { getAllPosts, getAllCategories } from '@/lib/mdx-utils';
import SearchBar from '../components/ui/SearchBar';
import Welcome from '../components/ui/Welcome';

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
  const POSTS_PER_PAGE = 10;

  const [allPosts, categories] = await Promise.all([
    getAllPosts(TECH_POST_DIR),
    getAllCategories(TECH_POST_DIR),
  ]);

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const pagination = {
    currentPage: page,
    totalPages,
    totalPosts: allPosts.length,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <aside className="hidden lg:block lg:col-span-1 self-stretch">
          <div className="lg:sticky lg:top-8 flex flex-col gap-16">
            <SearchBar />
            <CategoriesSection categories={categories} />
            <Welcome />
          </div>
        </aside>

        <main className="lg:col-span-3 order-1 lg:order-2 pl-5">
          <BlogContent posts={paginatedPosts} pagination={pagination} />
        </main>

      </div>
    </div>
  );
}


