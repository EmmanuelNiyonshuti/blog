import { formatDateTime } from '@/lib/utils';
import CommentReplies from './CommentReplies';

export default function CommentList({ comments = [] }) {

  const parentComments = comments.filter(comment => !comment.parentId);

  if (parentComments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Comments ({parentComments.length})
      </h3>
      
      {parentComments.map((comment) => (
        <div key={comment.id} className="space-y-4">
          {/* Main Comment */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {comment.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="font-semibold text-sky-600 dark:text-blue-400">
                    {comment.name}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDateTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>

          {/* Replies - nested below the comment */}
        <CommentReplies
            comment={comment}
        />
        </div>
      ))}
    </div>
  );
}