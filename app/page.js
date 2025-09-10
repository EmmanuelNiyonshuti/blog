import PostCard from './components/blog/PostCard';
import { fetchPosts } from "../lib/api"

export const metadata = {
  title: 'Home',
  description: 'Latest blog posts by NIYONSHUTI Emmanuel on backend development, programming, and technology.',
};

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to my blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I'm a backend developer sharing insights about programming, 
            web development, and technology. Join me on this learning journey.
          </p>
        </div>
        
        {/* Blog Posts */}
        <div className="space-y-0">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No posts published yet. Check back soon!
              </p>
            </div>
          )}
        </div>
        
        {/* Pagination (placeholder for now) */}
        {posts.length > 0 && (
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <button 
              disabled 
              className="px-4 py-2 text-gray-400 cursor-not-allowed"
            >
              ← Newer posts
            </button>
            <button 
              disabled 
              className="px-4 py-2 text-gray-400 cursor-not-allowed"
            >
              Older posts →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/*
- navbar: - name logo left, links (Home, About Me  in middle,  -> Social links(github, linkedin, twitter)) on right
- body with blogs: - title
                   - posted by, date, under which category
                   - blog content
                   - read more button(Continue reading this post...), comments [num] if any!
 - << newer posts, older posts >>
 - footer: - copyright, Questions? Contact me at: email, social links(github, linkedin, twitter)
**/