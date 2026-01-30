// app/components/providers/BlogPostsProvider.jsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BlogPostsContext = createContext(null);

/**
 * Client-side posts cache provider
 * Stores ALL posts in memory to avoid refetching on pagination
 */
export function BlogPostsProvider({ children, initialPosts, initialPagination }) {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(initialPagination.currentPage);
  const [isHydrated, setIsHydrated] = useState(false);

  const POSTS_PER_PAGE = 10;

  // Hydration check
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Calculate current page posts
  const getCurrentPagePosts = useCallback((page) => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return allPosts.slice(startIndex, endIndex);
  }, [allPosts]);

  // Calculate pagination info
  const getPagination = useCallback((page) => {
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    return {
      currentPage: page,
      totalPages,
      totalPosts: allPosts.length,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }, [allPosts]);

  // Navigate to page (client-side only)
  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    // Smooth scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const value = {
    allPosts,
    currentPosts: isHydrated ? getCurrentPagePosts(currentPage) : getCurrentPagePosts(initialPagination.currentPage),
    pagination: isHydrated ? getPagination(currentPage) : initialPagination,
    goToPage,
    isHydrated
  };

  return (
    <BlogPostsContext.Provider value={value}>
      {children}
    </BlogPostsContext.Provider>
  );
}

/**
 * Hook to use blog posts context
 */
export function useBlogPosts() {
  const context = useContext(BlogPostsContext);
  if (!context) {
    throw new Error('useBlogPosts must be used within BlogPostsProvider');
  }
  return context;
}