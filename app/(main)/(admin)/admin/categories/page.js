import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { fetchCategories } from '@/lib/api';
import DeleteCategoryButton from '@/app/components/admin/DeleteCategoryButton';

export const metadata = {
  title: 'Manage Categories - Admin',
  description: 'Manage blog categories.',
};

export default async function AdminCategoriesPage() {
  const categories = await fetchCategories();

  const formatCount = (num) => `${num ?? 0}`;
  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Categories</h1>
            <p className="text-gray-600 dark:text-gray-200 mt-2">Organize your posts</p>
          </div>
          <Link href="/admin/categories/new">
            <Button className="flex items-center cursor-pointer">New Category</Button>
          </Link>
        </div>

        {/* Categories Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">/{cat.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{formatCount(cat._count.posts)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-10 cursor-pointer">
                      <Link href={`/admin/categories/${cat.id}/edit`} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md cursor-pointer">Edit</Link>
                      <DeleteCategoryButton id={cat.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-200">No categories found.</p>
              <Link href="/admin/categories/new" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                Add new category
              </Link>
            </div>
          )}
        </div>
      </div>
  );
}
