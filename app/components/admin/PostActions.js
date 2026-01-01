'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deletePost } from '../../../lib/api';

export default function PostActions({ post }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;
    try {
      await deletePost(post.id);
      router.refresh();
    } catch (e) {
      throw new Error(`Failed to delete post: ${e.message}`);
    }
  };

  return (
    <div className="flex justify-end items-center gap-5">
      {post.status.toLowerCase() === 'published' && (
        <Link
          href={`/blog/${post.slug}`}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
          title="View Post"
        >
          View
        </Link>
      )}
      <Link
        href={`/admin/posts/${post.id}/edit`}
        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors"
        title="Edit Post"
      >
        Edit
      </Link>
      <button
        type="button"
        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors cursor-pointer"
        title="Delete Post"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}