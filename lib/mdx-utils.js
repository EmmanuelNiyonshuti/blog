// lib/mdx-utils.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const THOUGHTS_DIR = path.join(process.cwd(), 'content/thoughts');

/**
 * Ensure directory exists
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Get all thought posts
 * @returns {Promise<Array>} Array of thought metadata
 */
export async function getAllThoughts() {
  ensureDirectoryExists(THOUGHTS_DIR);
  
  const files = fs.readdirSync(THOUGHTS_DIR).filter(file => 
    file.endsWith('.md') || file.endsWith('.mdx')
  );

  const thoughts = files.map(filename => {
    const filePath = path.join(THOUGHTS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.mdx?$/, '');

    return {
      slug,
      frontmatter: {
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
        category: data.category || 'thoughts',
        ...data,
      },
    };
  });

  // Sort by date, newest first
  return thoughts.sort((a, b) => 
    new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
}

/**
 * Get a single thought post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Thought post with compiled MDX
 */
export async function getThoughtBySlug(slug) {
  ensureDirectoryExists(THOUGHTS_DIR);
  
  const mdxPath = path.join(THOUGHTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(THOUGHTS_DIR, `${slug}.md`);
  
  let filePath;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  try {
    const { content, frontmatter } = await compileMDX({
      source: fileContents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      },
    });

    return {
      slug,
      frontmatter: {
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        excerpt: frontmatter.excerpt || '',
        category: frontmatter.category || 'thoughts',
        ...frontmatter,
      },
      content,
    };
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error);
    return null;
  }
}

/**
 * Get thoughts by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Filtered thoughts
 */
export async function getThoughtsByCategory(category) {
  const allThoughts = await getAllThoughts();
  return allThoughts.filter(
    thought => thought.frontmatter.category === category
  );
}