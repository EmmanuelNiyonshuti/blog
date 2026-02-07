import { transformMediumPost } from "./utils";
import * as Sentry from "@sentry/nextjs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const CACHE_DURATION = process.env.NODE_ENV === 'production' ? {
  POSTS: 600,
  MEDIUM: 3600 * 168, // 1 week
  CATEGORIES: 1800
} : {
  POSTS: 0,
  MEDIUM: 0,
  CATEGORIES: 0,
};

export async function fetchPosts(page = 1, limit = 10) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/posts?page=${page}&limit=${limit}`,
      {
        next: { 
          revalidate: CACHE_DURATION.POSTS,
          tags: ['posts']
        }
      }
    );
    if (!response.ok) {
      Sentry.captureMessage(`Failed to fetch posts: ${response.statusText}`);
      throw new Error('Failed to fetch posts');
    }

    const { data } = await response.json();
    return {
      posts: data.posts || [],
      meta: data.meta || {}
    };
  } catch (error) {
    Sentry.captureException(error);
    return { posts: [], meta: {} };
  }
}

export async function fetchAdminPosts(token = null) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Cookie'] = `token=${token}`;
    }
    const res = await fetch(`${API_BASE_URL}/api/posts/admin`, {
      headers,
      credentials: 'include',
      cache: 'no-store', // Admin data should not be cached
    });
    const data = await res.json();
    return data.data?.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchMediumPosts() {
  try {
    if (process.env.APP_ENV !== "production" ){
      return []
    }
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@NIYONSHUTIEmmanuel",
      {
        next: { 
          revalidate: CACHE_DURATION.MEDIUM,
          tags: ['medium-posts']
        }
      }
    );
    if (!response.ok){
      Sentry.captureMessage(`Failed to fetch Medium posts: ${response.statusText}`);
      throw new Error('Failed to fetch Medium posts');
    } 
    const { status, items } = await response.json();
    if (status !== 'ok') throw new Error('Invalid Medium feed response');
    return items;
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}

// ============ UPDATED FUNCTION ============
// Now returns ALL posts for client-side caching
export async function fetchAllPosts(page, limit) {
  try {
    const items = await fetchMediumPosts();
    const transformedMediumPosts = items.map(transformMediumPost);
    const { posts: backendPosts } = await fetchPosts(1, 1000);
    const allPosts = [...backendPosts, ...transformedMediumPosts].sort((a, b) => 
      new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
    );
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    
    return {
      posts: paginatedPosts,
      allPosts: allPosts, // ← NEW: Return ALL posts for client-side caching
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalPosts: totalPosts,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    Sentry.captureException(error);
    return { 
      posts: [],
      allPosts: [], // ← NEW
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        hasNext: false,
        hasPrev: false
      }
    };
  }
}

async function fetchMediumPostByUrl(mediumUrl) {
  try {
    const mediumPosts = await fetchMediumPosts();
  
    const mediumPost = mediumPosts.find(post => post.link === mediumUrl);
    
    if (!mediumPost) return null;
    
    return transformMediumPost(mediumPost);
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}

export async function fetchPostBySlug(slug) {
  try {
    if (slug.startsWith('https://medium.com')) {
      return await fetchMediumPostByUrl(slug);
    }
    
    const res = await fetch(`${API_BASE_URL}/api/posts/by-slug/${slug}`, {
      next: { 
        revalidate: CACHE_DURATION.POSTS,
        tags: ['posts', `post-${slug}`]
      }
    });
    
    if (!res.ok) {
      Sentry.captureMessage(`Failed to fetch post by slug: ${res.statusText}`);
      throw new Error('Failed to fetch post');
    }
    const data = await res.json();
    return data.post || data.data?.post || null;
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}

export async function fetchPostById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      next: { 
        revalidate: CACHE_DURATION.POSTS,
        tags: ['posts', `post-${id}`]
      }
    });
    
    if (!res.ok) {
      Sentry.captureMessage(`Failed to fetch post by ID: ${res.statusText}`);
      throw new Error('Failed to fetch post');
    }
    const data = await res.json();
    return data.post || null;
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`, {
      next: { 
        revalidate: CACHE_DURATION.CATEGORIES,
        tags: ['categories']
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const resp = await res.json();
    return resp.data?.categories || [];
  } catch (error) {
    return [];
  }
}

export async function fetchPostsByCategory(categorySlug) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/categories/by-slug/${categorySlug}`,
      {
        next: { 
          revalidate: CACHE_DURATION.POSTS,
          tags: ['posts', 'categories', `category-${categorySlug}`]
        }
      }
    );
   const items = await fetchMediumPosts();
    const mediumPosts = items.map(transformMediumPost).filter(post => 
      post.category?.slug === categorySlug
    );
    
    if (!response.ok) {
      Sentry.captureMessage(`Failed to fetch posts by category: ${response.statusText}`);
      throw new Error('Failed to fetch posts by category');
    }
    const data = await response.json();
    const posts = data.data?.posts.concat(mediumPosts);
    return posts || [];
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}

export async function updatePost(id, postData, token = null) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Cookie'] = `token=${token}`;
    }
    const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(postData),
      cache: 'no-store',
    });
    
    if (!res.ok) {
      Sentry.captureMessage(`Failed to update post: ${res.statusText}`);
      throw new Error('Failed to update post');
    }
    const data = await res.json();
    
    // Revalidate cache after update
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('posts');
      revalidateTag(`post-${id}`);
    }
    
    return data.post;
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}

export async function deletePost(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to delete post');
    }
    
    // Revalidate cache after delete
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('posts');
      revalidateTag(`post-${id}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function createCategory(categoryData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(categoryData),
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to create category');
    }
    const data = await res.json();
    
    // Revalidate cache after create
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('categories');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

export async function updateCategory(id, categoryData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(categoryData),
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to update category');
    }
    const data = await res.json();
    
    // Revalidate cache after update
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('categories');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error updating category:', error);
  }
}

export async function deleteCategory(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error(`Failed to delete category, ${res.message}`);
    }
    
    // Revalidate cache after delete
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('categories');
    }
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to logout');
    }
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

export async function AddComment(data, postSlug) {
  try {
    console.log("Sent data:", data)
    const res = await fetch(`${API_BASE_URL}/api/posts/by-slug/${postSlug}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message || 'Failed to add comment');
    }
    
    // Revalidate cache after comment
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('posts');
      revalidateTag(`post-${postSlug}`);
    }
    
    return {
      success: true,
      comment: resData.data?.comment,
      message: resData.message
    };
    
  } catch (error) {
    console.error('Error adding comment:', error);
    return {
      success: false,
      error: error.message || 'Failed to add comment'
    };
  }
}

export async function deleteComment(postId, commentId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to delete comment');
    }
    
    // Revalidate cache after delete
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('posts');
      revalidateTag(`post-${postId}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}