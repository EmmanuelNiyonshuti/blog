'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Settings, FileText, MessageSquareText, 
  FolderOpen, Plus, LogOut, ChevronLeft, Menu 
} from 'lucide-react';

export default function AdminRootLayout({ children }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Settings },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Comments', href: '/admin/comments', icon: MessageSquareText },
    { name: 'New Post', href: '/admin/posts/new', icon: Plus },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) window.location.href = '/';
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Navigation */}
      <nav className="h-16 sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
          <Link href="/admin" className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            Admin
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-sky-500">
            View Site
          </Link>
          <button onClick={handleLogout} className="text-sm font-medium text-red-500 flex items-center gap-1">
            <LogOut size={16} /> {isLoggingOut ? '...' : 'Logout'}
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Container */}
        <aside 
          className={`
            relative z-30 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-16' : 'w-64'}
          `}
        >
          <nav className="p-3 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center h-11 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 ml-1">
                    <Icon size={20} />
                  </div>
                  <span className={`
                    ml-2 font-medium text-sm whitespace-nowrap transition-opacity duration-200
                    ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                  `}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom toggle arrow */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute bottom-4 left-0 w-full hidden lg:flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <ChevronLeft className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}