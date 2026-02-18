import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {slugify} from './utils';
import CodeBlock from '@/app/components/blog/CodeBlock';

const dirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Get all posts
 * @returns {Promise<Array>} Array of Post
 */
export const getAllPosts = async (postDir) => {
  dirExists(postDir);

  const files = fs.readdirSync(postDir).filter(f =>
    f.endsWith('.md') || f.endsWith('.mdx')
  );

  const posts = files.map(filename => {
    const filePath = path.join(postDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.mdx?$/, '');

    return {
      slug,
      frontmatter: {
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        publishedAt: data.publishedAt || data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
        category: data.category || 'Uncategorized',
        categorySlug: slugify(data.category || 'uncategorized'),
        tags: data.tags || [],
        coverImage: data.coverImage || '',
        metaDescription: data.metaDescription || '',
        ...data,
      },
    };
  });

  return posts.sort((a, b) =>
    new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
};

export const getPostBySlug = async (postDir, slug) => {
  dirExists(postDir);

  const mdxPath = path.join(postDir, `${slug}.mdx`);
  const mdPath = path.join(postDir, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath
    : fs.existsSync(mdPath) ? mdPath
    : null;

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');

  try {
    const { content, frontmatter } = await compileMDX({
      source: fileContents,
      components: {
        pre: CodeBlock,
      },
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
        publishedAt: frontmatter.publishedAt || frontmatter.date || new Date().toISOString().split('T')[0],
        excerpt: frontmatter.excerpt || '',
        category: frontmatter.category || 'Uncategorized',
        categorySlug: slugify(frontmatter.category || 'uncategorized'),
        tags: frontmatter.tags || [],
        coverImage: frontmatter.coverImage || '',
        metaDescription: frontmatter.metaDescription || '',
        ...frontmatter,
      },
      content,
    };
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error);
    return null;
  }
};

export const getPostsByCategory = async (postDir, categorySlug) => {
  const allPosts = await getAllPosts(postDir);
  return allPosts.filter(post => post.frontmatter.categorySlug === categorySlug);
};

// Returns [{ name: 'Python', slug: 'python' }, ...]
export const getAllCategories = async (postDir) => {
  const allPosts = await getAllPosts(postDir);
  const seen = new Map();

  for (const post of allPosts) {
    const { category, categorySlug } = post.frontmatter;
    if (!seen.has(categorySlug)) {
      seen.set(categorySlug, { name: category, slug: categorySlug });
    }
  }

  return Array.from(seen.values());
};


