// app/components/providers/CategoriesProvider.jsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getCachedCategories, setCachedCategories, isCategoriesCacheValid } from '@/lib/cache-manager';

const CategoriesContext = createContext(null);

/**
 * Categories cache provider
 * - Uses localStorage for persistent caching
 * - Fetches fresh data in background if cache is stale
 * - Provides instant UI updates
 */
export function CategoriesProvider({ children, initialCategories = [] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasInitialized = useRef(false);

  /**
   * Refresh categories from API
   * Used for background revalidation
   */
  const refreshCategories = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        const freshCategories = data.data?.categories || [];
        
        // Update state and cache
        setCategories(freshCategories);
        setCachedCategories(freshCategories);
      }
    } catch (error) {
      console.error('Error refreshing categories:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Hydration check
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    setIsHydrated(true);
    
    // PRIORITY: Check cache FIRST
    const cachedCategories = getCachedCategories();
    
    if (cachedCategories && cachedCategories.length > 0) {
      // Cache exists - use it immediately
      setCategories(cachedCategories);
      
      // If cache is stale, refresh in background
      if (!isCategoriesCacheValid()) {
        refreshCategories();
      }
    } else {
      // No cache - use server data and cache it
      if (initialCategories.length > 0) {
        setCategories(initialCategories);
        setCachedCategories(initialCategories);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategories]);

  // Save to cache when categories are updated (but not on initial hydration)
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return; // Skip first render
    }
    
    if (isHydrated && categories.length > 0) {
      setCachedCategories(categories);
    }
  }, [categories, isHydrated]);

  const value = {
    categories,
    isLoading,
    isHydrated,
    refreshCategories,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

/**
 * Hook to use categories context
 */
export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoriesProvider');
  }
  return context;
}