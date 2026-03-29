'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);

  // Wait for the DOM to be available before portaling
  useEffect(() => setMounted(true), []);

  // Focus input and reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Debounced search — fires 300ms after the user stops typing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!mounted || !isOpen) return null;

  // Portal renders the modal at document.body — fully outside the grid stacking context
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-700">
          {isLoading
            ? <Loader2 size={16} className="text-gray-400 dark:text-gray-500 shrink-0 animate-spin" />
            : <Search size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
          }
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 py-4 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {!query.trim() && (
            <p className="text-xs text-gray-400 dark:text-gray-500 px-4 py-8 text-center">
              Type to search through posts...
            </p>
          )}

          {!isLoading && query.trim() && results.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500 px-4 py-8 text-center">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={onClose}
              className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors group"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {post.title}
                </p>
                {post.excerpt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {post.excerpt}
                  </p>
                )}
                <span className="text-xs text-blue-500 dark:text-blue-400 mt-1 inline-block">
                  {post.category}
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 shrink-0 mt-1 transition-colors"
              />
            </Link>
          ))}
        </div>

        {/* Search model Footer */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-300 dark:text-gray-600">
            <kbd className="font-mono">↵</kbd> to visit &nbsp;·&nbsp; <kbd className="font-mono">esc</kbd> to close
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;