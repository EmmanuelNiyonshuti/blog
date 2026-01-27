'use client';

import { useRouter } from 'next/navigation';

function DeleteCategoryButton({ id }) {
  const router = useRouter();

  const onDelete = async () => {
    const confirmed = confirm('Delete this category?');
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
      if (!res.ok) {
        alert('Failed to delete category.');
        return;
      }
      router.refresh();
    } catch (e) {
      alert('Failed to delete category.');
    }
  };

  return (
    <button onClick={onDelete} className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">Delete</button>
  );
}

export default DeleteCategoryButton;
