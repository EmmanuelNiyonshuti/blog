import Link from 'next/link';

export default function PostCard({ post }) {
  // Function to truncate content and strip HTML tags
  const getContentPreview = (htmlContent, maxWords = 60) => {
    // Strip HTML tags
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    const words = textContent.split(' ');
    
    if (words.length <= maxWords) {
      return textContent;
    }
    
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get comment count (fallback to 0 if not available)
  const commentCount = post.comments?.length || 0;

  return (
    <article className="mb-12 pb-8 border-b border-gray-200 last:border-b-0">
      {/* Post Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
        <Link 
          href={`/blog/${post.slug}`}
          className="hover:text-gray-700 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      {/* Meta Information */}
      <div className="text-sm text-gray-600 mb-4">
        <span className="italic">Posted by </span>
        <span className="font-medium">NIYONSHUTI Emmanuel</span>
        <span className="italic"> on </span>
        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        {post.tags && post.tags.length > 0 && (
          <>
            <span className="italic"> under </span>
            <span className="font-medium">
              {post.tags.slice(0, 2).join(', ')}
              {post.tags.length > 2 && ` +${post.tags.length - 2} more`}
            </span>
          </>
        )}
      </div>
      
      {/* Post Content Preview */}
      <div className="text-gray-800 leading-relaxed mb-4 text-base">
        <p>{getContentPreview(post.content)}</p>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link 
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
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