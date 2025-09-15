

// strip HTML tags for excerpts for medium posts HTML content
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function transformMediumPost(mediumPost) {
  // transform medium posts to be like backend posts
  return {
    id: `medium_${mediumPost.guid.split('/').pop()}`,
    title: mediumPost.title,
    slug: mediumPost.link,
    content: mediumPost.description,
    excerpt: stripHtml(mediumPost.description).substring(0, 200) + '...',
    status: 'PUBLISHED',
    tags: mediumPost.categories || [],
    coverImage: mediumPost.thumbnail || null,
    createdAt: mediumPost.pubDate,
    publishedAt: mediumPost.pubDate,
    author: { email: mediumPost.author },
    category: null,
    comments: [],
    source: 'medium',
    isExternal: true
  };
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
