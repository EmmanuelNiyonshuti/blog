'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoriesSection({ categories = [] }) {
  const pathname = usePathname();
  
  // Determine active category from URL
  const getActiveCategory = () => {
    if (pathname === '/') return '';
    if (pathname.startsWith('/categories/')) {
      return pathname.split('/categories/')[1];
    }
    return null;
  };
  
  const activeSlug = getActiveCategory();

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
        Categories
      </h3>
      
      {categories.length > 0 ? (
        <ul className="space-y-3">
          {/* <li>
            <Link
              href="/"
              className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors border ${
                activeSlug === 'all'
                  ? 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
              }`}
            >
              <span className="font-medium">Al</span>
            </Link>
          </li> */}
          
          {/* Category Links */}
          {categories.map((category, index) => {
            const isActive = activeSlug === category.slug;
            const categoryHref = category.name === "Personal" 
              ? '/categories/personal' 
              : `/categories/${category.slug}`;
            
            return (
              <li key={category.id || category.slug || index}>
                <Link
                  href={categoryHref}
                  className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors border ${
                    isActive
                      ? 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800'
                      : 'text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-500 italic text-center py-4">
          No categories yet.
        </p>
      )}
    </div>
  );
}