import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function PostCard({ post }) {
  const getContentPreview = (htmlContent, maxWords = 30, noImageMax = 60) => {
    const textContent = htmlContent?.replace(/<[^>]*>/g, '') || '';
    const words = textContent.split(' ');
    
    // If no image, we allow more words to fill the space
    const limit = post.coverImage ? maxWords : noImageMax;
    
    if (words.length <= limit) return textContent;
    return words.slice(0, limit).join(' ') + '...';
  };

  const commentCount = post.comments?.length || 0;
  const isExternal = post.isExternal || post.source === 'medium';
  const getPostSlug = (post) => isExternal ? encodeURIComponent(post.slug) : post.slug;

  return (
    <article className="group mb-10 pb-10 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <div className={`flex flex-col gap-6 md:items-start ${post.coverImage ? 'md:flex-row' : 'flex-col'}`}>
        
        {/* Only Render Image Side if coverImage exists */}
        {post.coverImage && (
          <div className="relative w-full md:w-1/3 aspect-video md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex-shrink-0">
            <Link href={`/blog/${getPostSlug(post)}`}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </Link>
          </div>
        )}

        {/* Content Side: Automatically fills space if image is missing */}
        <div className="flex flex-col flex-1 w-full">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-2">
            {post.category && <span>{post.category.name}</span>}
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span className="text-gray-500">{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>

          <h2 className={`${post.coverImage ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug`}>
            <Link 
              href={`/blog/${getPostSlug(post)}`}
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
            {/* If no image, we allow more lines of text to look better */}
            <p className={post.coverImage ? 'line-clamp-2 md:line-clamp-3' : 'line-clamp-4'}>
              {getContentPreview(post.excerpt || post.content)}
            </p>
          </div>
          
          <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-3">
                Posted By <span className="text-gray-900 dark:text-gray-100 font-semibold tracking-tight">NIYONSHUTI Emmanuel</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700 transition-colors hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {commentCount > 0 && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                💬 {commentCount} comments
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}