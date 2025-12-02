import { notFound } from 'next/navigation';
import PostDetail from '../../components/blog/PostDetail';
import CommentList from '../../components/blog/CommentList';
import CommentForm from '../../components/blog/CommentForm';
import { fetchPostBySlug } from '../../../lib/api';


export async function generateMetadata({ params }) {
  const paramObj = await params;
  const decodedSlug = decodeURIComponent(paramObj.slug);
  const post = await fetchPostBySlug(decodedSlug);
  
  console.log(post.comments);
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
  const paramObj = await params;
  const decodedSlug = decodeURIComponent(paramObj.slug);
  const post = await fetchPostBySlug(decodedSlug);
  if (!post) {
    notFound();
  }
  const isExternal = post.isExternal || post.source === 'medium';
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Post Content */}
        <PostDetail post={post} />

        {!isExternal && (
          <div id="comments" className="mt-16 space-y-8">
            {post.comments && post.comments.length > 0 && (
              <CommentList comments={post.comments} />
            )}
            {/* use post slug for the comments */}
            <CommentForm postSlug={post.slug} />
          </div>
        )}
        {/* For Medium posts, show a note about comments */}
        {isExternal && (
          <div className="mt-16 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Want to discuss this post?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              This post was originally published on{' '}
            <a
              href={post.slug.split('?')[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
            Medium.
            </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
