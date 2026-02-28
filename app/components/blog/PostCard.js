import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function PostCard({ post }) {
  const { slug, frontmatter } = post;
  const { title, excerpt, category, tags, publishedAt, date } = frontmatter;

  return (
    <article className="mb-3">
      <div className="group relative w-full md:w-3/4 mx-auto md:mx-0 bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[60px] p-6 transition-all duration-300 hover:shadow-lg shadow-md hover:scale-[1.02] flex flex-col min-h-50 border border-gray-200 dark:border-gray-700" style={{
        backgroundClip: 'padding-box',
        clipPath: 'polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)'
      }}>
          
          <div className="flex flex-col gap-3 flex-1">
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {title}
            </h2>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            )}
          </div>

          <div className="flex items-end justify-between gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Posted on <span className="text-gray-700 dark:text-gray-300">{formatDate(publishedAt || date)}</span> by <span className="text-gray-900 dark:text-gray-100 font-semibold">NIYONSHUTI Emmanuel</span>
            </div>
            
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-end">
                {tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-gray-600 dark:text-gray-400 italic px-2 py-1 border-2 border-gray-300 dark:border-gray-600 rounded-md" style={{
                    borderRadius: '3px 8px 4px 7px',
                    transform: 'rotate(-1deg)'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        <Link href={`/blog/${slug}`} className="absolute inset-0 z-10" aria-label={`Read ${title}`}>
          <span className="sr-only">Read {title}</span>
        </Link>
      </div>
    </article>
  );
}