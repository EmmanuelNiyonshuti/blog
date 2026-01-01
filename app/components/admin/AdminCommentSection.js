'use client';

import { useState } from 'react';
import { Trash2, Reply, X } from 'lucide-react';
import CommentReplies from '../blog/CommentReplies';
import { formatDateTime } from '@/lib/utils';

export default function AdminCommentSection({ comments = [], postId }) {
  const [localComments, setLocalComments] = useState(comments);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

  const handleReply = async (commentId) => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          content: replyContent
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reply');
      }
      
      const data = await response.json();
      
      setLocalComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId 
            ? { 
                ...comment, 
                replies: [...(comment.replies || []), data.reply] 
              }
            : comment
        )
      );
      
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error replying to comment:', error);
      alert(error.message || 'Failed to post reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (e, commentId) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple clicks
    if (isDeleting) return;
    
    if (!confirm('Are you sure you want to delete this comment? All replies will also be deleted.')) {
      return;
    }
    
    setIsDeleting(commentId);
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete');
      }
      
      setLocalComments(prevComments => 
        prevComments.filter(comment => comment.id !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert(error.message || 'Failed to delete comment. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleDeleteReply = async (e, commentId, replyId) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple clicks
    if (isDeleting) return;
    
    if (!confirm('Are you sure you want to delete this reply?')) {
      return;
    }
    
    setIsDeleting(replyId);
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${replyId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete');
      }
      
      setLocalComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId 
            ? {
                ...comment, 
                replies: (comment.replies || []).filter(reply => reply.id !== replyId) 
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert(error.message || 'Failed to delete reply. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      {localComments.map((comment) => (
        <div key={comment.id} className="space-y-3">
          {/* Main Comment */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {comment.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      {comment.name || 'Anonymous'}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {formatDateTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {comment.content}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-2">
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(replyingTo === comment.id ? null : comment.id);
                    setReplyContent('');
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm flex items-center gap-1 cursor-pointer"
                >
                  {replyingTo === comment.id ? <X size={16} /> : <Reply size={16} />}
                  {replyingTo === comment.id ? 'Cancel' : 'Reply'}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, comment.id)}
                  disabled={isDeleting !== null}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <div className="mt-4 ml-13 pl-4 border-l-2 border-blue-300 dark:border-blue-700">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  rows={3}
                  maxLength={1000}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {replyContent.length}/1000 characters
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleReply(comment.id)}
                    disabled={isSubmitting || !replyContent.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer text-sm font-medium"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent('');
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* replies goes here */}
          <CommentReplies
            comment={comment}
            canDelete={true}
            isDeleting={isDeleting}
            handleDeleteReply={(replyId) => handleDeleteReply(event, comment.id, replyId)}
          />
        </div>
      ))}
    </div>
  );
}