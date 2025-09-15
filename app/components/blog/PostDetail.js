'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';

import PostNotFound from './PostNotFound';
import { formatDate } from "@/lib/utils";

export default function PostDetail({ post }) {
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <PostNotFound />
    )
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
    <article className="max-w-4xl mx-auto">
      {/* Back link */}
      <div className="mb-8">
        <Link 
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          ← Back to blog
        </Link>
      </div>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
          {post.title}
        </h1>
        
        {/* Meta Information */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
          <span>Posted by </span>
          <span className="font-medium">NIYONSHUTI Emmanuel</span>
          <span> on </span>
          <span className="font-medium">{formatDate(post.publishedAt || post.createdAt)}</span>
          
          {!isExternal && (
            <>
              <Link 
                href={`/categories/${post.category?.slug || 'general'}`}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
              >
                {categoryName}
              </Link>
            </>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div 
        className="prose prose-lg max-w-none mb-12 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {/* Post Footer with Share */}
        <div className="flex justify-between items-center ">
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
              className="text-gray-600 hover:text-blue-400 transition-colors"
              title="Share on Twitter"
            >
              <Twitter size={18} />
            </a>

            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Share on Facebook"
            >
              <Facebook size={18} />
            </a>

            <button
              onClick={copyToClipboard}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title={copied ? "Copied!" : "Copy link"}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
    </article>
  );
}