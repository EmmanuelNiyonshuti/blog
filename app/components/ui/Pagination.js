'use client';

import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, hasNext, hasPrev }) {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show max 5 page numbers
    
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-center items-center gap-2">
        {/* Previous */}
        {hasPrev ? (
          <Link
            href={`/?page=${currentPage - 1}`}
            className="px-4 py-2 text-sky-600 dark:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
          >
            ←
          </Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 dark:text-gray-600 cursor-not-allowed">
            ←
          </span>
        )}

        {/* First page if not visible */}
        {pageNumbers[0] > 1 && (
          <>
            <Link
              href="/?page=1"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
            >
              1
            </Link>
            {pageNumbers[0] > 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNum) => (
          <Link
            key={pageNum}
            href={`/?page=${pageNum}`}
            className={`px-4 py-2 rounded transition-colors ${
              pageNum === currentPage
                ? 'bg-sky-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
            }`}
          >
            {pageNum}
          </Link>
        ))}

        {/* Last page if not visible */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <Link
              href={`/?page=${totalPages}`}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
            >
              {totalPages}
            </Link>
          </>
        )}

        {/* Next */}
        {hasNext ? (
          <Link
            href={`/?page=${currentPage + 1}`}
            className="px-4 py-2 text-sky-600 dark:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
          >
            →
          </Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 dark:text-gray-600 cursor-not-allowed">
            →
          </span>
        )}
      </div>
    </div>
  );
}