// app/components/providers/BlogPostsProvider.jsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getCachedPosts, setCachedPosts, isPostsCacheValid } from '@/lib/cache-manager';

const BlogPostsContext = createContext(null);

/**
 * Client-side posts cache provider
 * - Uses localStorage for persistent caching across sessions
 * - Fetches fresh data in background if cache is stale
 * - Client-side pagination with NO refetching
 */
export function BlogPostsProvider({ children, initialPosts, initialPagination }) {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(initialPagination.currentPage);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasInitialized = useRef(false);

  const POSTS_PER_PAGE = 10;

  /**
   * Refresh posts from API in background
   * Silent update - doesn't show loading state
   */
  const refreshPostsInBackground = useCallback(async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      // Fetch fresh data from your API
      const response = await fetch('/api/posts/all');
      if (response.ok) {
        const data = await response.json();
        const freshPosts = data.data?.posts || data.posts || [];
        
        if (freshPosts.length > 0) {
          // Update state and cache silently
          setAllPosts(freshPosts);
          setCachedPosts(freshPosts);
        }
      }
    } catch (error) {
      console.error('Background refresh failed:', error);
      // Fail silently - user still has cached data
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  // Hydration and cache initialization
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    setIsHydrated(true);
    
    // PRIORITY: Check cache FIRST
    const cachedPosts = getCachedPosts();
    
    if (cachedPosts && cachedPosts.length > 0) {
      // Cache exists - use it immediately
      setAllPosts(cachedPosts);
      
      // If cache is stale, refresh in background
      if (!isPostsCacheValid()) {
        refreshPostsInBackground();
      }
    } else {
      // No cache - use server data and cache it
      if (initialPosts.length > 0) {
        setAllPosts(initialPosts);
        setCachedPosts(initialPosts);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosts]);

  // Save to cache when posts are updated (but not on initial hydration)
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return; // Skip first render
    }
    
    if (isHydrated && allPosts.length > 0) {
      setCachedPosts(allPosts);
    }
  }, [allPosts, isHydrated]);

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
    isHydrated,
    isRefreshing,
    refreshPosts: refreshPostsInBackground,
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