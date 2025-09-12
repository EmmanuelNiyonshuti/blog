import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import { fetchCategories, deleteCategory } from '../../../../lib/api';

export const metadata = {
  title: 'Manage Categories - Admin',
  description: 'Manage blog categories.',
};

export default async function AdminCategoriesPage() {
  const categories = await fetchCategories();

  const formatCount = (num) => `${num ?? 0}`;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-2">Organize your posts</p>
          </div>
          <Link href="/admin/categories/new">
            <Button className="flex items-center">New Category</Button>
          </Link>
        </div>

        {/* Categories Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">/{cat.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCount(cat.postCount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/categories/${cat.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      {/* Delete is implemented in a client component for confirm + refresh */}
                      <DeleteCategoryButton id={cat.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories found.</p>
              <Link href="/admin/categories/new" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                Create your first category
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function DeleteCategoryButton({ id }) {
  'use client';
  const { useRouter } = require('next/navigation');
  const router = useRouter();

  const onDelete = async () => {
    const confirmed = confirm('Delete this category?');
    if (!confirmed) return;
    try {
      await deleteCategory(id);
      router.refresh();
    } catch (e) {
      alert('Failed to delete category.');
    }
  };

  return (
    <button onClick={onDelete} className="text-red-600 hover:text-red-900">Delete</button>
  );
}


