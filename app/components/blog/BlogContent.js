import Link from 'next/link';
import PostCard from './PostCard';

export default function BlogContent({ posts = [], pagination }) {
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          {pagination.hasPrev
            ? <Link href={`/blog?page=${pagination.currentPage - 1}`}>← Previous</Link>
            : <span />}
          <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
          {pagination.hasNext
            ? <Link href={`/blog?page=${pagination.currentPage + 1}`}>Next →</Link>
            : <span />}
        </div>
      )}
    </div>
  );
}