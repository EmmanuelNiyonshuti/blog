// app/components/ui/Pagination.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Updated Pagination component
 * Supports BOTH server-side (fallback) and client-side navigation
 */
export default function Pagination({ 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrev,
  onPageChange // ← NEW: Optional client-side handler
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      // Client-side navigation (no refetch!)
      onPageChange(newPage);
    } else {
      // Fallback: Server-side navigation
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      router.push(`/?${params.toString()}`);
    }
  };

  // Don't render if only one page
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`
          px-4 py-2 rounded-lg border font-medium transition-all
          ${hasPrev 
            ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700' 
            : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }
        `}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers(currentPage, totalPages).map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span 
                key={`ellipsis-${idx}`} 
                className="px-3 py-2 text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`
                px-4 py-2 rounded-lg border font-medium transition-all
                ${pageNum === currentPage
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`
          px-4 py-2 rounded-lg border font-medium transition-all
          ${hasNext 
            ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700' 
            : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }
        `}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}

/**
 * Helper to calculate which page numbers to show
 * Shows: [1] ... [current-1] [current] [current+1] ... [total]
 */
function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const showEllipsis = totalPages > 7;

  if (!showEllipsis) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }

  return pages;
}