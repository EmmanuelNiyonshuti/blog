import PostDetail from '@/app/components/blog/PostDetail';
import { getPostBySlug, getAllPosts } from '@/lib/mdx-utils';
import PostNotFound from '@/app/components/blog/PostNotFound';
import { TECH_POST_DIR } from '@/lib/utils';

export async function generateStaticParams() {
  const posts = await getAllPosts(TECH_POST_DIR);
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(TECH_POST_DIR, decodeURIComponent(slug));

  if (!post) return { title: 'Post Not Found' };

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com';
  const description = post.frontmatter.metaDescription || post.frontmatter.excerpt?.substring(0, 160) || '';

  return {
    title: post.frontmatter.title,
    description,
    openGraph: {
      title: post.frontmatter.title,
      description,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: 'NIYONSHUTI Emmanuel | Software developer',
      type: 'article',
      publishedTime: post.frontmatter.publishedAt,
      authors: ['NIYONSHUTI Emmanuel'],
      images: [{
        url: 'https://res.cloudinary.com/dx8m9dy9d/image/upload/v1766339600/blog-preview_h6mkod.jpg',
        width: 1200,
        height: 630,
        alt: post.frontmatter.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description,
      images: ['https://res.cloudinary.com/dx8m9dy9d/image/upload/v1766339600/blog-preview_h6mkod.jpg'],
      creator: '@emmanuelio',
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(TECH_POST_DIR, decodeURIComponent(slug));

  if (!post)
  return (
    <PostNotFound />
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <PostDetail post={post} />
      </div>
    </div>
  );
}