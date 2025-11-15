import { marked } from 'marked';
import hljs from 'highlight.js';

/**
 * Configure marked to use highlight.js for code blocks
 */
marked.setOptions({
  // Syntax highlighting function
  highlight: function(code, lang) {
    // If language is specified and supported, highlight it
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error('Highlight error:', err);
      }
    }
    // Otherwise, auto-detect language
    return hljs.highlightAuto(code).value;
  },
  
  // Other options
  breaks: true,        // Convert \n to <br>
  gfm: true,          // GitHub Flavored Markdown
  headerIds: true,    // Add IDs to headings for anchor links
  mangle: false,      // Don't escape email addresses
});

/**
 * Convert markdown to HTML
 * @param {string} markdown - The markdown text
 * @returns {string} HTML string
 */
export function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  try {
    // Convert markdown to HTML
    const html = marked.parse(markdown);
    return html;
  } catch (error) {
    console.error('Markdown conversion error:', error);
    return `<p>Error rendering content</p>`;
  }
}

/**
 * Extract plain text excerpt from markdown (for previews)
 * @param {string} markdown - The markdown text
 * @param {number} length - Max length of excerpt
 * @returns {string} Plain text excerpt
 */
export function getExcerpt(markdown, length = 160) {
  if (!markdown) return '';
  
  // Remove markdown syntax
  const plainText = markdown
    .replace(/^#+\s+/gm, '')        // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1')     // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
    .replace(/`(.+?)`/g, '$1')       // Remove inline code
    .replace(/^>\s+/gm, '')          // Remove quotes
    .replace(/\n+/g, ' ')            // Replace newlines with spaces
    .trim();
  
  // Truncate to length
  if (plainText.length > length) {
    return plainText.substring(0, length) + '...';
  }
  
  return plainText;
}