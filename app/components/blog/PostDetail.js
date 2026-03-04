import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function PostDetail({ post }) {
  if (!post) return null;

  const { slug, frontmatter, content } = post;
  const { title, category, categorySlug, tags, publishedAt, date, excerpt } = frontmatter;

  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com'}/blog/${slug}`;
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  };

  return (
    <article className="max-w-4xl mx-auto px-4">
      <header className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {title}
        </h1>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
          <span>Posted by </span>
          <span className="font-medium text-sky-400 dark:text-sky-200">NIYONSHUTI Emmanuel</span>
          <span> on </span>
          <span className="font-medium text-sky-400 dark:text-sky-200">{formatDate(publishedAt || date)}</span>
          {category && (
            <>
              <span> in </span>
              <Link
                href={`/categories/${categorySlug}`}
                className="font-medium text-sky-400 dark:text-sky-200 transition-colors hover:underline"
              >
                {category}
              </Link>
            </>
          )}
        </div>

        {excerpt && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed italic">
            {excerpt}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sky-400 dark:text-sky-200 text-xs font-medium rounded-full italic">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose-blog max-w-none">
        {content}
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex gap-4 text-sm">
        <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Share on X</a>
        <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Share on LinkedIn</a>
      </div>
    </article>
  );
}