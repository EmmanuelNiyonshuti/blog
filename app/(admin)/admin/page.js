import AdminLayout from '../../components/admin/AdminLayout';
import { FileText, FolderOpen, MessageSquare, Eye } from 'lucide-react';
import {fetchPosts, fetchCategories } from '../../../lib/api';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing blog content.',
};

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const [posts, categories] = await Promise.all([
    fetchPosts(token),
    fetchCategories(),
  ]);
  const stats = [
    { name: 'Total Posts', value: String(posts.length), icon: FileText, color: 'text-blue-600' },
    { name: 'Categories', value: String(categories.length), icon: FolderOpen, color: 'text-green-600' },
    { name: 'Comments', value: posts.reduce((acc, p) => acc + (p.comments?.length || 0), 0).toString(), icon: MessageSquare, color: 'text-yellow-600' },
    { name: 'Views', value: posts.reduce((acc, p) => acc + (p.views || 0), 0).toString(), icon: Eye, color: 'text-purple-600' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-opacity-10 ${stat.color}`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Published post', title: 'Getting Started with Node.js', time: '2 hours ago' },
                { action: 'Updated post', title: 'JavaScript Best Practices', time: '1 day ago' },
                { action: 'New comment on', title: 'React Hooks Guide', time: '2 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div>
                    <span className="text-sm text-gray-600">{activity.action} </span>
                    <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/posts/new"
              className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText size={16} className="mr-2" />
              New Post
            </a>
            <a
              href="/admin/posts"
              className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Eye size={16} className="mr-2" />
              Manage Posts
            </a>
            <a
              href="/admin/categories"
              className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FolderOpen size={16} className="mr-2" />
              Categories
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
