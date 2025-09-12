const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
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

export async function fetchPostBySlug(slug) {
  try {
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

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 600 } // Revalidate every 10 minutes
    });
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
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
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
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

export async function login(credentials) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  //
}
