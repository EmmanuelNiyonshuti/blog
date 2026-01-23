'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import { createCategory, updateCategory } from '../../../lib/api';
import { generateSlug } from '@/lib/utils';

export default function CategoryForm({ category = null }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
      description: category?.description || '',
    }
  });

  const name = watch('name');

  useEffect(() => {
    if (name && !category) {
      const slug = generateSlug(name);
      setValue('slug', slug);
    }
  }, [name, setValue, category]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (category) {
        const res = await fetch(`/api/posts/categories/${category.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        if (res.status === 200) {
          router.refresh()
          router.push('/admin/categories');
        } else {
          throw new Error('Failed to update post');
        }
      } else {
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
            });
        if (res.status === 200) {
          router.refresh()
          router.push('/admin/categories');
        } else {
          throw new Error('Failed to update post');
        }
      }
    } catch (e){
      throw new Error(`Failed to submit category form, ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Category name"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
        <input
          id="slug"
          type="text"
          {...register('slug', { required: 'Slug is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="category-slug"
        />
        {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Optional description"
        />
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {category ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}


