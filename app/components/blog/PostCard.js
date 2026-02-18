import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function PostCard({ post }) {
  const { slug, frontmatter } = post;
  const { title, excerpt, category, categorySlug, tags, coverImage, publishedAt, date } = frontmatter;

  return (
    <article className="group mb-10 pb-10 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <div className={`flex flex-col gap-6 md:items-start ${coverImage ? 'md:flex-row' : 'flex-col'}`}>

        {coverImage && (
          <div className="relative w-full md:w-1/3 aspect-video md:aspect-square lg:aspect-4/3 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shrink-0">
            <Link href={`/blog/${slug}`}>
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </Link>
          </div>
        )}

        <div className="flex flex-col flex-1 w-full">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-2">
            {category && (
              <Link href={`/categories/${categorySlug}`} className="hover:underline">
                {category}
              </Link>
            )}
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span className="text-gray-500">{formatDate(publishedAt || date)}</span>
          </div>

          <h2 className={`${coverImage ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug`}>
            <Link
              href={`/blog/${slug}`}
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {title}
            </Link>
          </h2>

          {excerpt && (
            <p className={`text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm md:text-base ${coverImage ? 'line-clamp-2 md:line-clamp-3' : 'line-clamp-4'}`}>
              {excerpt}
            </p>
          )}

          <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-3">
                Posted by <span className="text-gray-900 dark:text-gray-100 font-semibold">NIYONSHUTI Emmanuel</span>
              </div>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}