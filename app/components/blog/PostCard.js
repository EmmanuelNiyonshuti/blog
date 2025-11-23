
import Link from 'next/link';
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
    <article className="mb-12 pb-8 border-b border-gray-200 last:border-b-0">
      {/* Post Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
        <Link 
          href={`/blog/${getPostSlug(post)}`}
          className="hover:text-gray-700 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      {/* Meta Information */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span className="italic">Posted by </span>
        <span className="font-medium">NIYONSHUTI Emmanuel</span>
        <span className="italic"> on </span>
        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        {/* Category for backend posts */}
        {!isExternal && post.category && (
          <>
            <span className="italic"> under </span>
            <span className="font-medium">{post.category.name}</span>
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
        <p>{getContentPreview(post.excerpt) || getContentPreview(post.content)}</p>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link 
          href={`/blog/${getPostSlug(post)}`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors font-medium"
        >
          Continue reading this post...
        </Link>
        
        {!isExternal && commentCount > 0 && (
          <Link 
            href={`/blog/${getPostSlug(post)}#comments`}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 transition-colors text-sm"
          >
            [{commentCount} comment{commentCount !== 1 ? 's' : ''}]
          </Link>
        )}
      </div>
    </article>
  );
}