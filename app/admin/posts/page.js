import AdminLayout from '../../components/admin/AdminLayout';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Button from '../../components/ui/Button';

export const metadata = {
  title: 'Manage Posts - Admin',
  description: 'Manage blog posts.',
};

// Mock data for now - replace with actual API call
const mockPosts = [
  {
    id: 1,
    title: 'Getting Started with Node.js',
    slug: 'getting-started-nodejs',
    status: 'published',
    category: 'Backend',
    createdAt: '2025-01-15T10:00:00Z',
    publishedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'JavaScript Best Practices',
    slug: 'javascript-best-practices',
    status: 'draft',
    category: 'Frontend',
    createdAt: '2025-01-14T15:30:00Z',
    publishedAt: null,
  },
];

export default function AdminPostsPage() {
  const posts = mockPosts;

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
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
            <p className="text-gray-600 mt-2">Manage your blog posts</p>
          </div>
          <Link href="/admin/posts/new">
            <Button className="flex items-center">
              <Plus size={16} className="mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        /{post.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(post.status)}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {post.status === 'published' && (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Post"
                        >
                          <Eye size={16} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit Post"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete Post"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this post?')) {
                            // TODO: Implement delete functionality
                            console.log('Delete post:', post.id);
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts found.</p>
              <Link href="/admin/posts/new" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
