import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx-utils';
import { RANDOM_POST_DIR } from '@/lib/utils';

export default async function postsPage() {
  const posts = await getAllPosts(RANDOM_POST_DIR);

  return (
    <div className="min-h-screen bg-[#f4f1ea] dark:bg-zinc-950 text-[#1a1a1a] dark:text-zinc-100 font-serif selection:bg-zinc-300 dark:selection:bg-zinc-700">
      {/* Header */}
      <header className="py-12 border-b-4 border-double border-[#1a1a1a] dark:border-zinc-100 mx-4 md:mx-12 text-center">
        <div className="flex justify-center gap-6 text-[10px] uppercase tracking-[0.4em] font-sans font-bold">
          <span>•</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xl font-sans uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          ←
        </Link>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-12">
        {posts.length > 0 ? (
          <div className="space-y-10">
            {posts.map((post, index) => (
              <article 
                key={post.slug}
                className="border-b border-zinc-300 dark:border-zinc-700 pb-8 last:border-0"
              >
                <div className="mb-2">
                  <span className="text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-500">
                    {post.frontmatter.category || 'post'} • {post.frontmatter.date}
                  </span>
                </div>
                
                <Link href={`/musing/${post.slug}`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                </Link>
                
                <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-2">
                  {post.frontmatter.excerpt}
                </p>
                
                <Link 
                  href={`/musing/${post.slug}`}
                  className="inline-block text-sm font-sans uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
                >
                  →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl italic text-zinc-500 dark:text-zinc-500">
              ...
            </p>
          </div>
        )}

        <div className="mt-24 pt-12 border-t border-zinc-300 dark:border-zinc-700">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-xs">
              <p className="text-4xl font-bold leading-none uppercase tracking-tighter opacity-10">
                E
              </p>
              <p className="text-xs mt-2 italic text-zinc-500 dark:text-zinc-500">
                ...
              </p>
            </div>
            
            <div className="border-l-4 border-black dark:border-white pl-6 py-2 max-w-md">
              <p className="text-lg leading-snug">
                ...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}