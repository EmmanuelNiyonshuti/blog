import { format } from "date-fns";


// strip HTML tags for excerpts for medium posts HTML content
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function transformMediumPost(item) {
  return {
    id: item.guid.split('/').pop() || item.guid,
    title: item.title,
    slug: item.link,
    content: item.description,
    excerpt: stripHtml(item.description).substring(0, 200) + '...',
    status: 'PUBLISHED',
    tags: item.categories || [],
    coverImage: item.content.match(/<img[^>]+src="([^">]+)"/)?.[1] || null,
    createdAt: item.pubDate,
    publishedAt: item.pubDate,
    author: { email: item.author },
    category: item.categories || 'web development',
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