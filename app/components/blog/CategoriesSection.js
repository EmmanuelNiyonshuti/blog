'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FolderIcon, ChevronIcon } from '../ui/Icons';

export default function CategoriesSection({ categories = [] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeSlug = pathname?.startsWith('/categories/')
    ? pathname.split('/categories/')[1]
    : null;

  const activeCategory = categories.find(cat => cat.slug === activeSlug);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <FolderIcon open={open} />
          <div className="flex flex-col items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Categories
            </span>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
              {activeCategory ? activeCategory.name : 'All'}
            </span>
          </div>
        </div>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul className="px-3 pb-3 space-y-0.5 border-t border-gray-100 dark:border-gray-800 pt-2">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors
                ${!activeSlug
                  ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-sky-600 dark:hover:text-sky-400'
                }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${!activeSlug ? 'bg-sky-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
              All
            </Link>
          </li>

          {categories.length === 0 ? (
            <li className="text-xs text-gray-400 px-3 py-1">No categories yet.</li>
          ) : (
            categories.map((cat) => {
              const isActive = cat.slug === activeSlug;
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors
                      ${isActive
                        ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-sky-600 dark:hover:text-sky-400'
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-sky-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    {cat.name}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}