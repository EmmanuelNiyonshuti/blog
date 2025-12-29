import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function PostCard({ post }) {
  const getContentPreview = (htmlContent, maxWords = 60) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    const words = textContent.split(' ');
    
    if (words.length <= maxWords) return textContent;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const commentCount = post.comments?.length || 0;
  const isExternal = post.isExternal || post.source === 'medium';

  const getPostSlug = (post) => {
    if (isExternal) {
      return encodeURIComponent(post.slug);
    }
    return post.slug;
  };

  return (
    <article className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      {/* Cover Image - NEW */}
      {post.coverImage && (
        <div className="relative w-full h-64 mb-4 overflow-hidden rounded bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Post Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
        <Link 
          href={`/blog/${getPostSlug(post)}`}
          className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      {/* Meta Information */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span className="italic">Posted by </span>
        <span className="font-medium text-sky-400 dark:text-sky-200">NIYONSHUTI Emmanuel</span>
        <span className="italic"> on </span>
        <span className="font-medium text-sky-400 dark:text-sky-200">{formatDate(post.publishedAt || post.createdAt)}</span>
        {/* Category for backend posts */}
        {!isExternal && post.category && (
          <>
            <span className="italic"> under </span>
            <span className="font-medium text-sky-400 dark:text-sky-200">{post.category.name}</span>
          </>
        )}
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <>
            <span className="italic"> • </span>
            <span className="font-medium">
              {post.tags.slice(0, 2).join(', ')}
              {post.tags.length > 2 && ` +${post.tags.length - 2} more`}
            </span>
          </>
        )}
      </div>
      
      {/* Post Content Preview */}
      <div className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4 text-base">
        <p>{getContentPreview(post.excerpt) || ''}</p>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link 
          href={`/blog/${getPostSlug(post)}`}
          className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors font-medium"
        >
          Go to blog &rarr;
        </Link>
        
        {!isExternal && commentCount > 0 && (
          <Link 
            href={`/blog/${getPostSlug(post)}#comments`}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-sm"
          >
            [{commentCount} comment{commentCount !== 1 ? 's' : ''}]
          </Link>
        )}
      </div>
    </article>
  );
}