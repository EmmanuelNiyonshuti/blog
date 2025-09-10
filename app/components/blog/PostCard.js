import Link from 'next/link';
import { format } from 'date-fns';

export default function PostCard({ post }) {
  // Function to truncate content and strip HTML tags
  const getContentPreview = (htmlContent, maxWords = 60) => {
    if (!htmlContent) return '';
    
    // Strip HTML tags
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    const words = textContent.split(' ').filter(word => word.length > 0);
    
    if (words.length <= maxWords) {
      return textContent;
    }
    
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Format date using date-fns
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Get comment count (fallback to 0 if not available)
  const commentCount = post.comments?.length || 0;

  // Get category name
  const categoryName = post.category?.name || post.tags?.[0] || 'General';

  return (
    <article className="mb-12 pb-8 border-b border-gray-200 last:border-b-0">
      {/* Post Title */}
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
        <Link 
          href={`/blog/${post.slug}`}
          className="hover:text-gray-700 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      {/* Meta Information - Miguel style */}
      <div className="text-sm text-gray-600 mb-6 italic">
        <span>Posted by </span>
        <span className="font-medium">NIYONSHUTI Emmanuel</span>
        <span> on </span>
        <span className="font-medium">{formatDate(post.publishedAt || post.createdAt)}</span>
        <span> under </span>
        <Link 
          href={`/categories/${post.category?.slug || 'general'}`}
          className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          {categoryName}
        </Link>
      </div>
      
      {/* Post Content Preview */}
      <div className="text-gray-800 leading-relaxed mb-6 text-base">
        <p>{getContentPreview(post.content)}</p>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link 
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm"
        >
          Continue reading this post...
        </Link>
        
        {commentCount > 0 && (
          <Link 
            href={`/blog/${post.slug}#comments`}
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            [{commentCount} comment{commentCount !== 1 ? 's' : ''}]
          </Link>
        )}
      </div>
    </article>
  );
}
