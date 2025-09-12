'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { createPost, updatePost } from '../../../lib/api';

export default function PostForm({ post = null, categories = [] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(post?.content || '');
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
      excerpt: post?.excerpt || '',
      categoryId: post?.categoryId || '',
      tags: post?.tags?.join(', ') || '',
      status: post?.status || 'draft',
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
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      };

      if (post) {
        await updatePost(post.id, postData);
      } else {
        await createPost(postData);
      }
      {
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter post title..."
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Slug *
        </label>
        <input
          type="text"
          id="slug"
          {...register('slug', { required: 'Slug is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="post-url-slug"
        />
        {errors.slug && (
          <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows={3}
          {...register('excerpt')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the post..."
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="categoryId"
          {...register('categoryId')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          {...register('tags')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="tag1, tag2, tag3"
        />
        <p className="text-xs text-gray-600 mt-1">Separate tags with commas</p>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content *
        </label>
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="Write your post content here..."
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        <div className="flex space-x-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center"
          >
            {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </div>
    </form>
  );
}
