/**
 * Client-side cache manager for blog posts and categories
 * Uses localStorage with TTL (Time To Live) support
 * 
 * Features:
 * - Persistent storage across sessions
 * - Automatic expiration
 * - Type-safe data handling
 * - Memory fallback for SSR
 */

const CACHE_KEYS = {
  POSTS: 'blog_posts_cache',
  CATEGORIES: 'blog_categories_cache',
  POSTS_TIMESTAMP: 'blog_posts_timestamp',
  CATEGORIES_TIMESTAMP: 'blog_categories_timestamp',
};

// Cache duration in milliseconds
const CACHE_TTL = {
  POSTS: 10 * 60 * 1000, // 10 minutes
  CATEGORIES: 30 * 60 * 1000, // 30 minutes
};

/**
 * Check if we're in browser environment
 */
const isBrowser = () => typeof window !== 'undefined';

/**
 * Get item from localStorage with TTL check
 * @param {string} key - Cache key
 * @param {string} timestampKey - Timestamp key
 * @param {number} ttl - Time to live in milliseconds
 * @returns {any|null} Cached data or null if expired/missing
 */
export function getCachedData(key, timestampKey, ttl) {
  if (!isBrowser()) return null;

  try {
    const cachedData = localStorage.getItem(key);
    const timestamp = localStorage.getItem(timestampKey);

    if (!cachedData || !timestamp) {
      return null;
    }

    const age = Date.now() - parseInt(timestamp, 10);
    
    // Check if cache is expired
    if (age > ttl) {
      // Clear expired cache
      localStorage.removeItem(key);
      localStorage.removeItem(timestampKey);
      return null;
    }

    return JSON.parse(cachedData);
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

/**
 * Set item in localStorage with timestamp
 * @param {string} key - Cache key
 * @param {string} timestampKey - Timestamp key
 * @param {any} data - Data to cache
 */
export function setCachedData(key, timestampKey, data) {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(timestampKey, Date.now().toString());
  } catch (error) {
    console.error('Error writing to cache:', error);
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, clearing old cache');
      clearAllCache();
    }
  }
}

/**
 * Get cached posts
 * @returns {Array|null} Cached posts or null
 */
export function getCachedPosts() {
  return getCachedData(
    CACHE_KEYS.POSTS,
    CACHE_KEYS.POSTS_TIMESTAMP,
    CACHE_TTL.POSTS
  );
}

/**
 * Set cached posts
 * @param {Array} posts - Posts to cache
 */
export function setCachedPosts(posts) {
  setCachedData(CACHE_KEYS.POSTS, CACHE_KEYS.POSTS_TIMESTAMP, posts);
}

/**
 * Get cached categories
 * @returns {Array|null} Cached categories or null
 */
export function getCachedCategories() {
  return getCachedData(
    CACHE_KEYS.CATEGORIES,
    CACHE_KEYS.CATEGORIES_TIMESTAMP,
    CACHE_TTL.CATEGORIES
  );
}

/**
 * Set cached categories
 * @param {Array} categories - Categories to cache
 */
export function setCachedCategories(categories) {
  setCachedData(CACHE_KEYS.CATEGORIES, CACHE_KEYS.CATEGORIES_TIMESTAMP, categories);
}

/**
 * Clear all blog cache
 */
export function clearAllCache() {
  if (!isBrowser()) return;

  Object.values(CACHE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

/**
 * Check if posts cache is valid
 * @returns {boolean}
 */
export function isPostsCacheValid() {
  if (!isBrowser()) return false;
  
  const timestamp = localStorage.getItem(CACHE_KEYS.POSTS_TIMESTAMP);
  if (!timestamp) return false;
  
  const age = Date.now() - parseInt(timestamp, 10);
  return age < CACHE_TTL.POSTS;
}

/**
 * Check if categories cache is valid
 * @returns {boolean}
 */
export function isCategoriesCacheValid() {
  if (!isBrowser()) return false;
  
  const timestamp = localStorage.getItem(CACHE_KEYS.CATEGORIES_TIMESTAMP);
  if (!timestamp) return false;
  
  const age = Date.now() - parseInt(timestamp, 10);
  return age < CACHE_TTL.CATEGORIES;
}