import PostCard from './PostCard';

export default function PostList({ posts, title, emptyMessage }) {
  return (
    <div>
      {title && (
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
        </div>
      )}
      
      <div className="space-y-0">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">
              {emptyMessage || 'No posts found.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
