"use client"

import { useRouter } from 'next/navigation';

import PostForm from '@/app/components/admin/PostForm';
import { deleteComment } from '@/lib/api';
import CommentList from '@/app/components/blog/CommentList';

const PostFormEdit = ({post, categories}) => {
    const router = useRouter();
  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 cursor-pointer">
      <PostForm post={post} categories={categories} />
      <CommentList
                  comments={post.comments}
                  isAdmin={true}
                  onDelete={async (commentId) => {
                    try {
                      await deleteComment(post.id, commentId)
                      console.log("Deleted comment:", commentId);
                      router.refresh()
                    } catch (error) {
                      console.error("Failed to delete comment:", error);
                    }
                  }}
                  />
    </div>
  )
}

export default PostFormEdit