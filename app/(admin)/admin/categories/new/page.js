import AdminLayout from '../../../../components/admin/AdminLayout';
import CategoryForm from '../../../../components/admin/CategoryForm';

export const metadata = {
  title: 'New Category - Admin',
  description: 'Create a new category.',
};

export default function NewCategoryPage() {
  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Category</h1>
          <p className="text-gray-600 mt-2">Add a new category</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <CategoryForm />
        </div>
      </div>
    </AdminLayout>
  );
}


