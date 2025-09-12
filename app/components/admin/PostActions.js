'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Eye } from 'lucide-react';
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
      alert('Failed to delete post.');
    }
  };

  return (
    <div className="flex justify-end space-x-2">
      {post.status === 'published' && (
        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-900"
          title="View Post"
        >
          <Eye size={16} />
        </Link>
      )}
      <Link
        href={`/admin/posts/${post.id}/edit`}
        className="text-indigo-600 hover:text-indigo-900"
        title="Edit Post"
      >
        <Edit size={16} />
      </Link>
      <button
        className="text-red-600 hover:text-red-900"
        title="Delete Post"
        onClick={handleDelete}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}


