import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx-utils';
import { RANDOM_POST_DIR } from '@/lib/utils';

export default async function postsPage() {
  const posts = await getAllPosts(RANDOM_POST_DIR);

  return (
    <div className="bg-[#f4f1ea] dark:bg-zinc-950 text-[#1a1a1a] dark:text-zinc-100 font-serif selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link 
          href="/"
          className="text-sm font-sans uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Main Blog
        </Link>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-2 md:p-10">
        {posts.length > 0 ? (
          <div className="space-y-10">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className='flex flex-col gap-1'
              >

                <div className='flex items-start gap-2'>
                <Link href={`/musing/${post.slug}`}>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                </Link>
                <span className="text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-500 italic">
                  • {post.frontmatter.date}
                </span>
                </div>
                <Link 
                  href={`/musing/${post.slug}`}
                  className="text-sm font-sans tracking-wider text-blue-600 dark:text-blue-400 hover:underline italic"
                >
                  read more →
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
      </main>
    </div>
  );
}