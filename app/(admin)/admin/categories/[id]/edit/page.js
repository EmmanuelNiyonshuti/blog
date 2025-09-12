import AdminLayout from '../../../../components/admin/AdminLayout';
import CategoryForm from '../../../../components/admin/CategoryForm';
import { fetchCategories } from '../../../../../lib/api';

export const metadata = {
  title: 'Edit Category - Admin',
  description: 'Edit an existing category.',
};

export default async function EditCategoryPage({ params }) {
  const categories = await fetchCategories();
  const category = categories.find((c) => String(c.id) === String(params.id));

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-gray-600 mt-2">Update category details</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <CategoryForm category={category} />
        </div>
      </div>
    </AdminLayout>
  );
}


