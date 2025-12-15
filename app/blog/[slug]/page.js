import { notFound } from 'next/navigation';
import PostDetail from '../../components/blog/PostDetail';
import CommentList from '../../components/blog/CommentList';
import CommentForm from '../../components/blog/CommentForm';
import { fetchPostBySlug } from '../../../lib/api';


export async function generateMetadata({ params }) {
  const paramObj = await params;
  const decodedSlug = decodeURIComponent(paramObj.slug);
  const post = await fetchPostBySlug(decodedSlug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  const relativeImageUrl = 'https://res.cloudinary.com/dx8m9dy9d/image/upload/v1765820670/default-preview_vi9608.png';

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com';

  const postUrl = `${BASE_URL}/blog/${decodedSlug}`;
  const postDescription = `${post.excerpt.substring(0, 160)}...` || `${post.content.substring(0, 160)}...`;

  return {
    title: post.title,
    description: postDescription,
    openGraph: {
      title: post.title,
      description: postDescription,
      url: postUrl,
      siteName: 'NIYONSHUTI Emmanuel | Software Engineer',
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      authors: ['NIYONSHUTI Emmanuel'],
      images: [
        {
          url: relativeImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: postDescription,
      images: [relativeImageUrl],
      creator: '@emmanuelio',
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
