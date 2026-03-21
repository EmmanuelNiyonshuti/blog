import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import TableOfContents from './TableOfContents';

export default function PostDetail({ post }) {
  if (!post) return null;

  const { slug, frontmatter, content } = post;
  const { title, category, categorySlug, tags, publishedAt, date, excerpt } = frontmatter;

  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com'}/blog/${slug}`;
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All posts
      </Link>

      {/* sidebar left + article right */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        <aside className="hidden lg:block w-56 shrink-0 self-stretch">
          <div className="sticky top-8">
            <TableOfContents />
          </div>
        </aside>

        <article className="w-full min-w-0">
          <div className="bg-white dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-xl shadow-gray-200/50 dark:shadow-gray-950/40 overflow-hidden">

            <header className="px-7 pt-9 pb-8 sm:px-10 sm:pt-11">
              {/* Category chip at the top left */}
              {category && (
                <div className="mb-5">
                  <Link
                    href={`/categories/${categorySlug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800 px-3 py-1 rounded-full hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors"
                  >
                    {category}
                  </Link>
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 leading-tight tracking-tight mb-5">
                {title}
              </h1>
              {excerpt && (
                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed border-l-[3px] border-sky-300 dark:border-sky-600 pl-4 italic mb-6">
                  {excerpt}
                </p>
              )}
              {/* a short intro of who wrote the blog and when*/}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="leading-tight">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">NIYONSHUTI Emmanuel</p>
                    <time className="text-xs text-gray-400 dark:text-gray-500">{formatDate(publishedAt || date)}</time>
                  </div>
                </div>
              </div>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-gray-500 dark:text-gray-400 italic px-2.5 py-1 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800"
                      style={{ borderRadius: '3px 8px 4px 7px', transform: 'rotate(-0.5deg)' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* a divider */}
            <div className="mx-7 sm:mx-10 border-t border-dashed border-gray-200 dark:border-gray-700/60" />

            {/* body of the post */}
            <div className="px-7 py-9 sm:px-10 sm:py-11">
              {/* Mobile ToC that are shown inside card, hidden on desktop */}
              <div className="lg:hidden">
                <TableOfContents />
              </div>

              <div className="prose-blog max-w-none" data-toc-content="true">
                {content}
              </div>
            </div>


            <footer className="px-7 pb-9 sm:px-10">
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Enjoyed this post? Share it.
                </p>
                <div className="flex items-center gap-2.5">
                  <a
                    href={shareUrls.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zM17.083 19.77h1.833L6.984 4.126H5.054L17.083 19.77z" />
                    </svg>
                    Share on X
                  </a>
                  <a
                    href={shareUrls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-xl hover:bg-sky-700 transition-colors shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </article>

      </div>
    </div>
  );
}