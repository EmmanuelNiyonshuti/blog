import AdminLayout from '@/app/components/admin/AdminLayout';
import PostForm from '@/app/components/admin/PostForm';
import { fetchPostById, fetchCategories } from '@/lib/api';

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

        {/* Post Form */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <PostForm post={post} categories={categories} />
        </div>
      </div>
    </AdminLayout>
  );
}


