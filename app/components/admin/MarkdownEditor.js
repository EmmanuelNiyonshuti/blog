'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

// Import SimpleMDE dynamically
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export default function MarkdownEditor({ content, onChange, placeholder = '...' }) {
  
  const editorOptions = useMemo(() => ({
    // Use built-in toolbar
    toolbar: [
      'bold',
      'italic',
      'heading',
      '|',
      'code',
      'quote',
      '|',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
      'guide',
    ],
    
    spellChecker: false,
    placeholder: placeholder,
    status: false,
    autoDownloadFontAwesome: true,
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2,
    
  }), [placeholder]);

  return (
    <div className="markdown-editor-wrapper">
      <SimpleMDE
        value={content}
        onChange={onChange}
        options={editorOptions}
      />
      
      {/* Quick Reference */}
      <details className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          📝 Markdown Quick Reference
        </summary>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="space-y-2">
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">**bold**</code></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">*italic*</code></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">## Heading</code></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">`code`</code></div>
          </div>
          <div className="space-y-2">
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">[text](url)</code></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">![alt](url)</code></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">&gt; quote</code></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">- list item</code></div>
          </div>
        </div>
      </details>
      
      {/* Image Upload Instructions */}
      <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          💡 <strong>Image Tip:</strong> Click the image icon, then paste your image URL. 
          For drag & drop, upload images to a service like{' '}
          <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline">
            Cloudinary
          </a>
          {' '}or{' '}
          <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="underline">
            Imgur
          </a>
          , then use the URL.
        </p>
      </div>
    </div>
  );
}