'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
// Import BOTH the CSS and the icon font
import 'easymde/dist/easymde.min.css';

// Import SimpleMDE dynamically to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export default function MarkdownEditor({ content, onChange, placeholder = 'Start writing...' }) {
  
  // Editor configuration
  const editorOptions = useMemo(() => ({
    // TOOLBAR - Simple text labels (no icons needed!)
    toolbar: [
      {
        name: 'bold',
        action: SimpleMDE.toggleBold,
        className: 'fa fa-bold',
        title: 'Bold (Ctrl+B)',
      },
      {
        name: 'italic',
        action: SimpleMDE.toggleItalic,
        className: 'fa fa-italic',
        title: 'Italic (Ctrl+I)',
      },
      '|', // Separator
      {
        name: 'heading-2',
        action: SimpleMDE.toggleHeadingSmaller,
        className: 'fa fa-header',
        title: 'Heading',
      },
      '|',
      {
        name: 'code',
        action: SimpleMDE.toggleCodeBlock,
        className: 'fa fa-code',
        title: 'Code Block',
      },
      {
        name: 'quote',
        action: SimpleMDE.toggleBlockquote,
        className: 'fa fa-quote-left',
        title: 'Quote',
      },
      '|',
      {
        name: 'unordered-list',
        action: SimpleMDE.toggleUnorderedList,
        className: 'fa fa-list-ul',
        title: 'Bullet List',
      },
      {
        name: 'ordered-list',
        action: SimpleMDE.toggleOrderedList,
        className: 'fa fa-list-ol',
        title: 'Numbered List',
      },
      '|',
      {
        name: 'link',
        action: SimpleMDE.drawLink,
        className: 'fa fa-link',
        title: 'Insert Link',
      },
      {
        name: 'image',
        action: SimpleMDE.drawImage,
        className: 'fa fa-image',
        title: 'Insert Image',
      },
      '|',
      {
        name: 'preview',
        action: SimpleMDE.togglePreview,
        className: 'fa fa-eye no-disable',
        title: 'Toggle Preview',
      },
      {
        name: 'side-by-side',
        action: SimpleMDE.toggleSideBySide,
        className: 'fa fa-columns no-disable no-mobile',
        title: 'Side by Side',
      },
      {
        name: 'fullscreen',
        action: SimpleMDE.toggleFullScreen,
        className: 'fa fa-arrows-alt no-disable no-mobile',
        title: 'Fullscreen',
      },
      '|',
      {
        name: 'guide',
        action: 'https://simplemde.com/markdown-guide',
        className: 'fa fa-question-circle',
        title: 'Markdown Guide',
      },
    ],
    
    // EDITOR BEHAVIOR
    autofocus: false,
    spellChecker: false,
    placeholder: placeholder,
    status: false,
    
    // SHORTCUTS
    shortcuts: {
      toggleBold: 'Cmd-B',
      toggleItalic: 'Cmd-I',
      toggleCodeBlock: 'Cmd-Alt-C',
      togglePreview: 'Cmd-P',
    },
    
    // AUTO-FEATURES
    autoDownloadFontAwesome: true, // This downloads icons automatically!
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
      
      {/* Markdown Cheat Sheet */}
      <details className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          📝 Markdown Quick Reference (click to expand)
        </summary>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="space-y-2">
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">**bold**</code> → <strong>bold</strong></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">*italic*</code> → <em>italic</em></div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">## Heading</code> → Heading</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">`code`</code> → inline code</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">- item</code> → bullet list</div>
          </div>
          <div className="space-y-2">
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">```javascript</code> → code block</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">[text](url)</code> → link</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">![alt](url)</code> → image</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">&gt; quote</code> → blockquote</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">1. item</code> → numbered list</div>
          </div>
        </div>
      </details>
    </div>
  );
}