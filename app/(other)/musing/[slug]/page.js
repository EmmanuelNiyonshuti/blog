import Link from 'next/link';
import {getPostBySlug, getAllPosts} from '@/lib/mdx-utils';
import { RANDOM_POST_DIR } from '@/lib/utils';
import PostNotFound from '@/app/components/blog/PostNotFound';

export async function generateStaticParams() {
  const posts = await getAllPosts(RANDOM_POST_DIR);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(RANDOM_POST_DIR, slug);
  
  if (!post) {
    return (
      <PostNotFound />
    )
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function postPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(RANDOM_POST_DIR, slug);

  if (!post) {
    return (
      <PostNotFound />
    )
  }

  const { frontmatter, content } = post;

  return (
    <div className="min-h-screen bg-[#f4f1ea] dark:bg-zinc-950 text-paper-dark dark:text-zinc-100 font-serif selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <header className="border-b border-zinc-300 dark:border-zinc-700 py-6">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <Link 
            href="/musing"
            className="text-sm font-sans uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ←
          </Link>
          <Link 
            href="/"
            className="text-sm font-sans uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Main Blog
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-sans text-zinc-500 dark:text-zinc-500">
            {frontmatter.category || 'post'} • {frontmatter.date}
          </span>
          <h1 className="text-4xl md:text-3xl font-bold mt-4 mb-6 tracking-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.excerpt && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 italic">
              {frontmatter.excerpt}
            </p>
          )}
        </div>

        <div className="prose-content">
          {content}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12">
          <div className="flex justify-between items-center">
            <Link 
              href="/musing"
              className="text-sm font-sans uppercase text-blue-600 dark:text-blue-400 hover:underline"
            >
              ←
            </Link>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {frontmatter.date}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}