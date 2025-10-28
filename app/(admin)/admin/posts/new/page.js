import AdminLayout from '../../../../components/admin/AdminLayout';
import PostForm from '../../../../components/admin/PostForm';
import { fetchCategories } from '../../../../../lib/api';

export const metadata = {
  title: 'New Post - Admin',
  description: 'Create a new blog post.',
};

export default async function NewPostPage() {
  const categories = await fetchCategories();
  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Create New Post</h1>
          <p className="text-gray-600 dark:text-gray-200 mt-2">Write and publish a new blog post</p>
        </div>

        {/* Post Form */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <PostForm categories={categories} />
        </div>
      </div>
    </AdminLayout>
  );
}
