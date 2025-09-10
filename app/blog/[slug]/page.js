import { notFound } from 'next/navigation';
import PostDetail from '../../components/blog/PostDetail';
import CommentList from '../../components/blog/CommentList';
import CommentForm from '../../components/blog/CommentForm';
import { fetchPostBySlug } from '../../../lib/api';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await fetchPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `${post.content.substring(0, 160)}...`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.content.substring(0, 160)}...`,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      authors: ['NIYONSHUTI Emmanuel'],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Post Content */}
        <PostDetail post={post} />
        
        {/* Comments Section */}
        <div id="comments" className="mt-16 space-y-8">
          {/* Existing Comments */}
          {post.comments && post.comments.length > 0 && (
            <CommentList comments={post.comments} />
          )}
          
          {/* Comment Form */}
          <CommentForm postId={post.id} />
        </div>
      </div>
    </div>
  );
}
