import Link from 'next/link';
import AdminLayout from '@/app/components/admin/AdminLayout';
import { fetchPostById, fetchCategories} from '@/lib/api';
import PostFormEdit from '@/app/components/admin/PostFormEdit';


export const metadata = {
  title: 'Edit Post - Admin',
  description: 'Edit a blog post.',
};

export default async function EditPostPage({ params }) {
  const p = await params;
  const [post, categories] = await Promise.all([
    fetchPostById(p.id),
    fetchCategories(),
  ]);
  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Edit Post</h1>
          <p className="text-gray-600 dark:text-gray-200 mt-2">Update and republish your blog post</p>
        </div>
        {/* left button for preview */}
        <div className="mb-4">
          <Link
            href={`/admin/posts/${p.id}/preview`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {/* <Eye size={16} /> */}
            Preview Post
          </Link>
        </div>
        {/* Post Form */}
        <PostFormEdit post={post} categories={categories} />
      </div>
    </AdminLayout>
  );
}


