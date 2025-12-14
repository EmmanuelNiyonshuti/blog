import { transformMediumPost } from "./utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const CACHE_DURATION = {
  POSTS: 600,
  MEDIUM: 3600,
  CATEGORIES: 1800,
};
export async function fetchPosts(page = 1, limit = 6) {
 try {
    // Fetch with a very high limit to get all posts
    const res = await fetch(`${API_BASE_URL}/api/posts?limit=1000`, {
      next: { 
        revalidate: CACHE_DURATION.POSTS,
        tags: ['posts']
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await res.json();
    return data.data?.posts || [];
  } catch (error) {
    console.error('Error fetching backend posts:', error);
    return [];
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
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@NIYONSHUTIEmmanuel",
      {
        next: { 
          revalidate: CACHE_DURATION.MEDIUM,
          tags: ['medium-posts']
        }
      }
    );
    if (!response.ok) throw new Error('Failed to fetch Medium posts');
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

// Fetch all posts (backend + Medium) with parallel execution
export async function fetchAllPosts(page = 1, limit = 6) {
  try {
    const [backendPosts, mediumPosts] = await Promise.all([
      fetchPosts(),
      fetchMediumPosts()
    ]);

    // Transform Medium posts
    const transformedMediumPosts = mediumPosts.map(transformMediumPost);
    
    // Combine and sort ALL posts by date
    const allPosts = [...backendPosts, ...transformedMediumPosts].sort((a, b) => 
      new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
    );

    // Now paginate the combined sorted arrays
    const total = allPosts.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const paginatedPosts = allPosts.slice(skip, skip + limit);

    return {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return { posts: [], pagination: {} };
  }
}

async function fetchMediumPostByUrl(mediumUrl) {
  try {
    // First get all Medium posts (will use cache)
    const mediumPosts = await fetchMediumPosts();
    
    // Find the specific post by URL
    const mediumPost = mediumPosts.find(post => post.link === mediumUrl);
    
    if (!mediumPost) return null;
    
    return transformMediumPost(mediumPost);
  } catch (error) {
    console.error('Error fetching Medium post:', error);
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
      throw new Error('Failed to fetch post');
    }
    const data = await res.json();
    return data.post || data.data?.post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
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
      throw new Error('Failed to fetch post');
    }
    const data = await res.json();
    return data.post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
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
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts by category');
    }
    const data = await response.json();
    return data.data?.posts || [];
  } catch (error) {
    console.error('Error fetching posts by category');
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
    console.error('Error updating post:', error);
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
    const res = await fetch(`${API_BASE_URL}/api/posts/categories`, {
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
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to delete category');
    }
    
    // Revalidate cache after delete
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag('categories');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
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
    const res = await fetch(`${API_BASE_URL}/api/posts/by-slug/${postSlug}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
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