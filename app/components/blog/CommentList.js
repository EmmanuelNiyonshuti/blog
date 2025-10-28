import { format } from 'date-fns';

export default function CommentList({ comments = [] }) {
  // Format date using date-fns
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM d, yyyy \'at\' h:mm a');
    } catch (error) {
      return 'Unknown date';
    }
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-200">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
        Comments ({comments.length})
      </h3>
      
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg p-6">
          {/* Comment Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white dark:text-gray text-sm font-medium">
                  {comment.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200 ">{comment.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-200">{formatDate(comment.createdAt)}</p>
              </div>
            </div>
            
            {/* Admin actions placeholder, isAdmin will define it later! */}
            {/* {isAdmin && (
              <button className="text-red-600 hover:text-red-700 text-sm">
                Delete
              </button>
            )} */}
          </div>
          
          {/* Comment Content */}
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
