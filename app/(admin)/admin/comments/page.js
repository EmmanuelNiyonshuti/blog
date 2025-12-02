import AdminLayout from '../../../components/admin/AdminLayout';
import { fetchAdminPosts } from '../../../../lib/api';
import { cookies } from 'next/headers';
import AdminCommentSection from '../../../components/admin/AdminCommentSection';

export const metadata = {
  title: 'Manage Comments - Admin',
  description: 'View and reply to blog comments.',
};

export default async function AdminCommentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const posts = await fetchAdminPosts(token);
  
  // Filter posts that have comments
  const postsWithComments = posts.filter(
    post => post.comments && post.comments.length > 0
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            Comments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and reply to comments
          </p>
        </div>

        {postsWithComments.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {postsWithComments.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                  </p>
                </div>
                <div className="p-6">
                  <AdminCommentSection 
                    comments={post.comments}
                    postId = {post.id}
                    postSlug={post.slug}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}