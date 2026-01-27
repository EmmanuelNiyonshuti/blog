'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import MarkdownEditor from './MarkdownEditor';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function PostForm({ post = null, categories = [] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      coverImage: post?.coverImage || '',
      excerpt: post?.excerpt || '',
      categoryId: post?.categoryId || '',
      tags: post?.tags?.join(', ') || '',
      status: post?.status.toUpperCase() || 'DRAFT', //  its enum in db
    }
  });

  const title = watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !post) { // Only auto-generate for new posts
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      setValue('slug', slug);
    }
  }, [title, setValue, post]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const postData = {
        ...data,
        content,
        excerpt,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      };
      if (post) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
          credentials: 'include'
        })
        if (res.status === 200) {
          router.refresh()
          router.push('/admin/posts');
        } else {
          throw new Error('Failed to update post');
        }
      } else {
        const res = await fetch(`/api/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
          credentials: 'include'
        })
        if (res.status === 201) {
          router.refresh()
          router.push('/admin/posts');
        } else {
          throw new Error('Failed to update post');
        }
      }
    } catch (error) {
      console.error('Error saving post:', error.toString());
      alert('Failed to save post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter post title..."
        />
        {errors.title && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
          Slug *
        </label>
        <input
          type="text"
          id="slug"
          {...register('slug', { required: 'Slug is required' })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="post-url-slug"
        />
        {errors.slug && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Cover Image *
        </label>
        <input
          type="text"
          id="coverImage"
          {...register('coverImage')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter cover image URL..."
        />
        {errors.coverImage && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.coverImage.message}</p>
        )}
      </div>
      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
          Excerpt
        </label>
        <MarkdownEditor
          content={excerpt}
          onChange={setExcerpt}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
          Category
        </label>
        <select
          id="categoryId"
          {...register('categoryId')}
          className="w-full bg-white dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">which category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          {...register('tags')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="tag1, tag2, tag3"
        />
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Separate tags with commas</p>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content *
        </label>
        <MarkdownEditor
          content={content}
          onChange={setContent}
          placeholder="Writting my post content in this area..."
        />
      </div>

      {/* status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          status
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full bg-white dark:bg-gray-800 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-50">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="hover:cursor-pointer"
        >
          Cancel
        </Button>
        
        <div className="flex space-x-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center hover:cursor-pointer"
          >
            {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </div>
    </form>
  );
}
