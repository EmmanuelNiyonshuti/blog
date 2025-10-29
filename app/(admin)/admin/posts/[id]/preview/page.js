import { notFound } from 'next/navigation';
import PostDetail from '@/app/components/blog/PostDetail';
import CommentList from '@/app/components/blog/CommentList';
import CommentForm from '@/app/components/blog/CommentForm';
import { fetchPostById } from '../../../../../../lib/api';


export default async function BlogPostPreviewPage({ params }) {
  const postId = await params.id;
//   const decodedSlug = decodeURIComponent(postId);
  const post = await fetchPostById(postId);
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
      </div>
    </div>
  );
}
