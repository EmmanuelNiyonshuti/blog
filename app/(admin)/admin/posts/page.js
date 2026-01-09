import Link from 'next/link';
import { Plus } from 'lucide-react';
import Button from '../../../components/ui/Button';
import PostActions from '../../../components/admin/PostActions';
import { fetchAdminPosts} from '../../../../lib/api'
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Manage Posts - Admin',
  description: 'Manage blog posts.',
};

export default async function AdminPostsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const posts = await fetchAdminPosts(token)
  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    if (status === 'published') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-yellow-100 text-yellow-800`;
  };

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Posts</h1>
            <p className="text-gray-600 dark:text-gray-200 mt-2">Manage your blog posts</p>
          </div>
          <Link href="/admin/posts/new">
            <Button className="flex items-center">
              <Plus size={16} className="mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
              {posts.map((post, index) => (
                <tr key={post.id || index} className="hover:bg-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-200">
                        /{post.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(post.status)}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {post.category?.name || post.category || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <PostActions post={post} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-200">No posts found.</p>
              <Link href="/admin/posts/new" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </div>
  );
}
