import { format } from "date-fns";


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


export const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM d, yyyy \'at\' h:mm a');
    } catch (error) {
      return 'Unknown date';
    }
  };



export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export async function generateUniqueSlug(baseSlug, checkExists) {
  let slug = baseSlug;
  let counter = 1;
  
  while (await checkExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

export function extractExcerpt(content, maxLength = 160) {
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function parseTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return [];
}