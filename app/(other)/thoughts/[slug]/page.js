import Link from 'next/link';
import { getThoughtBySlug, getAllThoughts } from '@/lib/mdx-utils';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const thoughts = await getAllThoughts();
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);
  
  if (!thought) {
    return {
      title: 'Thought Not Found',
    };
  }

  return {
    title: thought.frontmatter.title,
    description: thought.frontmatter.excerpt,
  };
}

export default async function ThoughtPage({ params }) {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  const { frontmatter, content } = thought;

  return (
    <div className="min-h-screen bg-[#f4f1ea] dark:bg-zinc-950 text-[#1a1a1a] dark:text-zinc-100 font-serif selection:bg-zinc-300 dark:selection:bg-zinc-700">
      {/* Simple Header */}
      <header className="border-b border-zinc-300 dark:border-zinc-700 py-6">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <Link 
            href="/thoughts"
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

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Metadata */}
        <div className="text-center mb-12">
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-500">
            {frontmatter.category || 'Thought'} • {frontmatter.date}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.excerpt && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 italic">
              {frontmatter.excerpt}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-24 h-px bg-zinc-800 dark:bg-zinc-200"></div>
        </div>

        {/* MDX Content - render directly */}
        <div className="prose-content">
          {content}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-zinc-300 dark:border-zinc-700">
          <div className="flex justify-between items-center">
            <Link 
              href="/thoughts"
              className="text-sm font-sans uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
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