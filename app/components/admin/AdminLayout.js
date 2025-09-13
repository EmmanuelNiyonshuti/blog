'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Settings, FileText, FolderOpen, Plus, LogOut } from 'lucide-react';

import ThemeProvider from '../ui/theme-provider';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Settings },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'New Post', href: '/admin/posts/new', icon: Plus },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const [frontendRes, backendRes] = await Promise.allSettled([
        await fetch('/api/logout', {
          method: 'POST',
          credentials: 'include'
        }),
        fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        })
      ]);
      // Check if at least the frontend logout succeeded
      const frontendSuccess = frontendRes.status === 'fulfilled' && frontendRes.value.ok;
      const backendSuccess = backendRes.status === 'fulfilled' && backendRes.value.ok;

      if (frontendSuccess) {
        console.log('Logout successful');
        router.push('/');
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      } else {
        console.error('Frontend logout failed');
        throw new Error('Critical logout failure');
      }
      if (!backendSuccess) {
        console.warn('Backend logout failed, but frontend succeeded');
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
      alert('Logout failed. Please try again.');
      // stay on current path
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-semibold text-gray-900">
                Admin Panel
              </Link>
              <span className="ml-2 text-sm text-gray-500">NIYONSHUTI Emmanuel</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={16} className="mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
