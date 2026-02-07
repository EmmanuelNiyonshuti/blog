'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Folder } from 'lucide-react';
import { useCategories } from "../providers/CategoriesProvider";

export default function CategoriesSection() {
  const pathname = usePathname();
  const { categories, isLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Determine active category from URL
  const getActiveCategory = () => {
    if (pathname === '/') return null;
    if (pathname.startsWith('/categories/')) {
      return pathname.split('/categories/')[1];
    }
    return null;
  };
  
  const activeSlug = getActiveCategory();
  const activeCategory = categories.find(cat => cat.slug === activeSlug);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Compact trigger button */}
      <button
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200${
          isOpen
            ? 'bg-sky-50 dark:bg-sky-950 border-sky-300 dark:border-sky-700 shadow-md'
            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-sky-200 dark:hover:border-sky-800 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
        aria-expanded={isOpen}
        aria-label="Categories menu"
      >
        <div className="flex items-center gap-3">
          <Folder className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Categories
            </span>
            {activeCategory ? (
              <span className="text-xs text-sky-600 dark:text-sky-400">
                {activeCategory.name}
              </span>
            ) : (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {categories.length} total
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && (
            <span className="text-xs text-gray-400 dark:text-gray-600 animate-pulse">
              ●
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          {categories.length > 0 ? (
            <ul className="py-2 max-h-96 overflow-y-auto">
              {/* All Posts link */}
              <li>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                    !activeSlug
                      ? 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-sm font-medium">All Posts</span>
                  {!activeSlug && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400"></span>
                  )}
                </Link>
              </li>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>

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
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                        isActive
                          ? 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                {isLoading ? 'Loading categories...' : 'No categories yet.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}