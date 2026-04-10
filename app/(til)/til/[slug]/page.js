import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/mdx-utils';
import { TIL_POST_DIR, formatDate } from '@/lib/utils';
import PostNotFound from '@/app/components/blog/PostNotFound';

export async function generateStaticParams() {
  const posts = await getAllPosts(TIL_POST_DIR);
  return posts.map((post) => ({ slug: post.slug }));
}
export default async function TilPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(TIL_POST_DIR, decodeURIComponent(slug));

  if (!post) return <PostNotFound />;

  const { frontmatter, content } = post;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

      <Link
        href="/til"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors mb-10 group"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All TILs
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          {frontmatter.category && (
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {frontmatter.category}
            </span>
          )}
          {frontmatter.category && (
            <span className="text-gray-300 dark:text-gray-700">·</span>
          )}
          <time className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
            {formatDate(frontmatter.publishedAt || frontmatter.date)}
          </time>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug tracking-tight">
          {frontmatter.title}
        </h1>

        {frontmatter.excerpt && (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-2 border-sky-200 dark:border-sky-800 pl-3">
            {frontmatter.excerpt}
          </p>
        )}
      </header>

      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 mb-8" />

  
      <div className="prose-blog max-w-none">
        {content}
      </div>

      <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <Link
          href="/til"
          className="text-sm text-sky-600 dark:text-sky-400 hover:underline underline-offset-2"
        >
          ← All TILs
        </Link>
        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
          {formatDate(frontmatter.publishedAt || frontmatter.date)}
        </span>
      </div>
    </div>
  );
}