'use client';

import { useRouter } from 'next/navigation';

import { deleteCategory } from '../../../lib/api';

function DeleteCategoryButton({ id }) {
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

export default DeleteCategoryButton;
