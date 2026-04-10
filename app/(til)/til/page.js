import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx-utils';
import { TIL_POST_DIR, formatDate } from '@/lib/utils';

export default async function TilPage() {
  const posts = await getAllPosts(TIL_POST_DIR);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <div className="flex items-baseline gap-3 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            TIL
          </h1>
          <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">
            Today I Learned
          </span>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-3">
          TIL stands for <span className='font-bold text-md text-gray-900 dark:text-gray-100 tracking-tight'>Today I Learned</span> and its a running log of small things I learn that I think are too small to be a full blog post.
        </p>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          It was inspired by.. well, {' '}
          <Link
            href="/til/inspirations"
            className="text-sky-600 dark:text-sky-400 hover:underline underline-offset-2"
          >
            more than one person, actually.
          </Link>
        </p>
      </div>
      {posts.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic">Nothing here yet.</p>
      ) : (
        <ul className="space-y-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/til/${post.slug}`}
                className="group flex items-baseline justify-between gap-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:border-sky-200 dark:hover:border-sky-900 transition-colors"
              >
                <div className="flex items-baseline gap-2 min-w-0">
                  {post.frontmatter.category && (
                    <span className="shrink-0 text-[10px] font-mono font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {post.frontmatter.category}
                    </span>
                  )}
                  <span className="text-sm text-gray-800 dark:text-gray-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                    {post.frontmatter.title}
                  </span>
                </div>
                <time className="shrink-0 text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                  {formatDate(post.frontmatter.publishedAt || post.frontmatter.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}