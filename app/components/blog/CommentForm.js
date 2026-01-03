'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddComment } from '../../../lib/api'
import { useRouter } from 'next/navigation';
import * as Sentry from "@sentry/nextjs";

export default function CommentForm({ postSlug, onCommentAdded }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    Sentry.logger.info(`Submitting comment ${JSON.stringify(data)} for post: ${postSlug}`);
    try {
      const res = await AddComment(data, postSlug);
      if (res.success) {
        const newComment = res.comment;
        reset();
        router.refresh();
        onCommentAdded?.(newComment);
        Sentry.captureMessage(`Successfully submitted comment for post: ${postSlug}`);
      } else {
        Sentry.captureMessage(`Failed to submit comment: ${res.message}`);
        throw new Error(res.message);
      }
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Leave a comment</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { 
              required: 'missing name',
              pattern: {
                value: /^[A-Za-z0-9_\s]+$/,
                message: 'Invalid name'
              }
            })}
            className="w-full px-2 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="emmanuel"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              // required: 'enter your email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your-email@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Comment Field */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Comment *
          </label>
          <textarea
            id="content"
            rows={4}
            {...register('content', { 
              required: "can't leave this empty!",
              maxLength: { value: 1000, message: 'Comment is too long, must be less than 1000 characters' }
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Share your thoughts..."
          />
          {errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>
          )}      
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-sky-600 text-white dark:text-gray-900 font-medium rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer transition-colors"
        >
          {isSubmitting ? '...' : 'comment'}
        </button>
      </form>
    </div>
  );
}
