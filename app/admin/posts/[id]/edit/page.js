import AdminLayout from '../../../../components/admin/AdminLayout';
import PostForm from '../../../../components/admin/PostForm';
import { fetchPostById, fetchCategories } from '../../../../../lib/api';

export const metadata = {
  title: 'Edit Post - Admin',
  description: 'Edit a blog post.',
};

export default async function EditPostPage({ params }) {
  const [post, categories] = await Promise.all([
    fetchPostById(params.id),
    fetchCategories(),
  ]);

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <p className="text-gray-600 mt-2">Update and republish your blog post</p>
        </div>

        {/* Post Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <PostForm post={post} categories={categories} />
        </div>
      </div>
    </AdminLayout>
  );
}


