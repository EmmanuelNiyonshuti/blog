import { Trash2 } from 'lucide-react';
const CommentReplies = ({ comment = {}, canDelete=false, isDeleting=null, handleDeleteReply=null}) => {
  return (
    <>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-12 space-y-3">
              {comment.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="border-l-3 border-blue-400 dark:border-blue-600 pl-4 py-3 bg-blue-50 dark:bg-gray-800 rounded-r-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">NE</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-green-700 dark:text-green-400">
                            NIYONSHUTI Emmanuel
                          </h4>
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-medium">
                            Author
                          </span>
                          {/* <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(reply.createdAt || new Date().toLocaleString('en-US'))}
                          </span> */}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          @{comment.name}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                          {reply?.content ?? "Not reply yet."}
                        </p>
                      </div>
                    </div>
                    
                    { canDelete && isDeleting && handleDeleteReply(
                    <button
                      onClick={() => handleDeleteReply(comment.id, reply.id)}
                      disabled={isDeleting === reply.id}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 ml-2 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
    </>
  )
}

export default CommentReplies