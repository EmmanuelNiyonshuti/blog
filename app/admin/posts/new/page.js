import AdminLayout from '../../../components/admin/AdminLayout';
import PostForm from '../../../components/admin/PostForm';

export const metadata = {
  title: 'New Post - Admin',
  description: 'Create a new blog post.',
};

// Mock categories - replace with actual API call
const mockCategories = [
  { id: 1, name: 'Backend Development' },
  { id: 2, name: 'Frontend Development' },
  { id: 3, name: 'Database' },
  { id: 4, name: 'DevOps' },
  { id: 5, name: 'General' },
];

export default function NewPostPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-2">Write and publish a new blog post</p>
        </div>

        {/* Post Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <PostForm categories={mockCategories} />
        </div>
      </div>
    </AdminLayout>
  );
}
