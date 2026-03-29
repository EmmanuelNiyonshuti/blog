'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't hijack "/" while the user is typing in any input/textarea/contenteditable
      const tag = document.activeElement?.tagName;
      const isEditable = document.activeElement?.isContentEditable;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || isEditable) return;

      if (e.key === '/') {
        e.preventDefault(); // stop "/" appearing in the modal input
        setIsOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer"
        aria-label="Open search"
      >
        <Search size={14} />
        <span className="flex-1 text-left text-xs">Search posts...</span>
        <kbd className="text-xs font-mono text-gray-300 dark:text-gray-600">/</kbd>
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SearchBar;