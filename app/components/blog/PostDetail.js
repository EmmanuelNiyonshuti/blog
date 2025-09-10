import Link from 'next/link';
import { format } from 'date-fns';

export default function PostDetail({ post }) {
  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to blog
        </Link>
      </div>
    );
  }

  // Format date using date-fns
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Get category name
  const categoryName = post.category?.name || post.tags?.[0] || 'General';

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back link */}
      <div className="mb-8">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          ← Back to blog
        </Link>
      </div>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        {/* Meta Information */}
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

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div 
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Post Footer */}
      <footer className="border-t border-gray-200 pt-8">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span>Published on {formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          
          {/* Share buttons placeholder */}
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-gray-900 text-sm">
              Share
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
}
