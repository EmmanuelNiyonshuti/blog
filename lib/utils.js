import { format } from "date-fns";
import path from 'path';

export const RANDOM_POST_DIR = path.join(process.cwd(), 'random_posts');
export const TECH_POST_DIR = path.join(process.cwd(), 'posts');
export const TIL_POST_DIR = path.join(process.cwd(), 'til');

export const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

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

export function parseTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return [];
}