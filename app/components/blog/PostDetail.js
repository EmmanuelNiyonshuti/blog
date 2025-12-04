'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';
import hljs from 'highlight.js';
import { markdownToHtml } from '@/lib/markdownToHtml';

import PostNotFound from './PostNotFound';
import { formatDate } from "@/lib/utils";

export default function PostDetail({ post }) {
  const [copied, setCopied] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlExcerpt, setHtmlExcerpt] = useState('');

  // Convert markdown to HTML and highlight code
  useEffect(() => {
    // Convert markdown to HTML
    const html = markdownToHtml(post.content);
    setHtmlContent(html);
    
    // Convert excerpt markdown to HTML if it exists
    if (post.excerpt) {
      const excerptHtml = markdownToHtml(post.excerpt);
      setHtmlExcerpt(excerptHtml);
    }
    
    // Highlight code blocks after a brief delay
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }, 10);
  }, [post]);

  if (!post) {
    return <PostNotFound />
  }

  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const postTitle = encodeURIComponent(post.title);
  const postExcerpt = encodeURIComponent(post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160));
  
  // Social sharing URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${postTitle}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const categoryName = post.category?.name || post.tags?.[0] || 'General';
  const isExternal = post.isExternal || post.source === 'medium';

  return (
    <article className="max-w-4xl mx-auto px-4">
      {/* Back link */}
      <div className="mb-8">
        <Link 
          href="/"
          className="text-sky-600 dark:text-sky-400 hover:text-sky-700 text-sm font-medium transition-colors"
        >
          ← Back To blogs
        </Link>
      </div>

      {/* Post Header */}
      <header className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {post.title}
        </h1>
        
        {/* Meta Information */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
          <span>Posted by </span>
          <span className="font-medium bg-red-200 text-white">NIYONSHUTI Emmanuel</span>
          <span> on </span>
          <span className="font-medium">{formatDate(post.publishedAt || post.createdAt)}</span>
          
          {!isExternal && (
            <>
              <span> in </span>
              <Link 
                href={`/categories/${post.category?.slug || 'general'}`}
                className="font-medium text-red-200 dark:text-red-100 hover:text-red-100  transition-colors"
              >
                {categoryName}
              </Link>
            </>
          )}
        </div>

        {/* Excerpt - now properly rendered as HTML/markdown */}
        {post.excerpt && (
          <div 
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: htmlExcerpt }}
          />
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="mt-2"></div>
      </header>

      {/* Post Content - Your global.css prose-blog styles will handle all spacing */}
      <div 
        className="prose-blog max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Divider before footer */}
      <div className="mt-2"></div>

      {/* Post Footer with Share */}
      <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-12">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span>Published on {formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
        
        {/* Simple Share Links */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
          
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
            title="Share on Twitter"
          >
            <Twitter size={18} />
          </a>

          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
            title="Share on Facebook"
          >
            <Facebook size={18} />
          </a>

          <button
            onClick={copyToClipboard}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            title={copied ? "Copied!" : "Copy link"}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </footer>
    </article>
  );
}