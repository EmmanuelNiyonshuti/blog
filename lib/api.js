// replace trailing slash / with ''
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api'.replace(/\/$/, '');

import { transformMediumPost } from "./utils";


export async function fetchPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`);
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchMediumPosts() {
  try {
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@NIYONSHUTIEmmanuel"
    );
    if (!response.ok) throw new Error('Failed to fetch Medium posts');
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

export async function fetchAllPosts() {
  try {
    const [backendPosts, mediumPosts] = await Promise.all([
      fetchPosts(),
      fetchMediumPosts()
    ]);
    const transformedMediumPosts = mediumPosts.map(transformMediumPost);
    const allPosts = [...backendPosts, ...transformedMediumPosts];

    // Sort by publication date (most recent first)
    return allPosts.sort((a, b) => 
      new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
    );
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

async function fetchMediumPostByUrl(mediumUrl) {
  try {
    // First get all Medium posts
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
    if (slug.startsWith('https://medium.com')){
      return await fetchMediumPostByUrl(slug);
    }
    const res = await fetch(`${API_BASE_URL}/posts/${slug}`, {
      next: { revalidate: 300 }
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

export async function fetchPostById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/id/${id}`, {
      // Avoid caching in admin editing flows
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    const data = await res.json();
    return data.post || null;
  } catch (error) {
    return null;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 600 } // Revalidate every 10 minutes
    });
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const resp = await res.json();
    return resp.data.categories || [];
  } catch (error) {
    return [];
  }
}

export async function fetchPostsByCategory(categorySlug) {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/${categorySlug}/posts`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch posts by category');
    }
    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function createPost(postData) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      throw new Error('Failed to create post');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id, postData) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      throw new Error('Failed to update post');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function deletePost(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to delete post');
    }
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function createCategory(categoryData) {
  console.log(categoryData);
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(categoryData),
    });
    console.log("response:", res);
    if (!res.ok) {
      throw new Error('Failed to create category');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

export async function updateCategory(id, categoryData) {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(categoryData),
    });
    if (!res.ok) {
      throw new Error('Failed to update category');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to delete category');
    }
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

export async function login(credentials) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      throw new Error('Failed to login');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
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

export async function verifySession() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.ok;
  } catch (error) {
    return false;
  }
}
