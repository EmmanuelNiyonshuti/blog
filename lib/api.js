const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`);
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${slug}`);
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    const data = await res.json();
    return data.post; // ???
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
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