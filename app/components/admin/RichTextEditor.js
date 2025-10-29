'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { common, createLowlight } from 'lowlight';
import { 
  Bold, Italic, List, ListOrdered, Quote, 
  Undo, Redo, Code, Heading2, Heading3, CodeSquare, 
  ImagePlus, LinkIcon, ImageIcon
} from 'lucide-react';
import { useCallback, useState } from 'react';

// Create lowlight instance for syntax highlighting
const lowlight = createLowlight(common);

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }) {
  // State for modal
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidth, setImageWidth] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default, use lowlight version
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Placeholder.configure({
        placeholder,
      }),
      // Image with custom size support
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'blog-image', // Custom class for styling
        },
      }),
      // Link extension - makes links clickable
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // === LINK FUNCTIONS ===
  
  // Open link modal with existing link data if editing
  const openLinkModal = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href || '';
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, '');
    
    setLinkUrl(previousUrl);
    setLinkText(selectedText);
    setShowLinkModal(true);
  }, [editor]);

  // Insert or update link
  const insertLink = () => {
    if (!linkUrl) return;

    // If text is selected, just add link to it
    if (editor.state.selection.empty) {
      // No selection - insert text with link
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${linkUrl}">${linkText || linkUrl}</a>`)
        .run();
    } else {
      // Has selection - add link to selected text
      editor
        .chain()
        .focus()
        .setLink({ href: linkUrl })
        .run();
    }

    // Reset and close
    setLinkUrl('');
    setLinkText('');
    setShowLinkModal(false);
  };

  // === IMAGE FUNCTIONS ===

  // Upload image from file
  const uploadImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Convert to base64 and open size modal
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result;
        if (url) {
          setImageUrl(url);
          setShowImageModal(true);
        }
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }, []);

  // Insert image with optional width
  const insertImage = () => {
    if (!imageUrl) return;

    const attrs = { src: imageUrl };
    
    // Add width if specified (in pixels or percentage)
    if (imageWidth) {
      attrs.style = `width: ${imageWidth}${imageWidth.includes('%') ? '' : 'px'}`;
    }

    editor.chain().focus().setImage(attrs).run();

    // Reset and close
    setImageUrl('');
    setImageWidth('');
    setShowImageModal(false);
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, isActive, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
        isActive ? 'bg-gray-200 dark:bg-gray-600 text-blue-600' : 'text-gray-600 dark:text-gray-300'
      }`}
    >
      {children}
    </button>
  );

  return (
    <>
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 dark:bg-gray-800 p-2 flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Inline Code"
          >
            <Code size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <CodeSquare size={16} />
          </ToolbarButton>
          
          <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={16} />
          </ToolbarButton>
          
          <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote size={16} />
          </ToolbarButton>
          
          <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
          
          <ToolbarButton
            onClick={openLinkModal}
            isActive={editor.isActive('link')}
            title="Insert Link"
          >
            <LinkIcon size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={uploadImage}
            isActive={false}
            title="Insert Image"
          >
            <ImagePlus size={16} />
          </ToolbarButton>
          
          <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
          
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo size={16} />
          </ToolbarButton>
        </div>
        
        {/* Editor */}
        <EditorContent 
          editor={editor} 
          className="prose dark:prose-invert max-w-none p-4 min-h-[300px] focus:outline-none"
        />
      </div>

      {/* LINK MODAL - Simple popup for adding links */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Insert Link
            </h3>
            
            <div className="space-y-4">
              {/* Link Text Input */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  name
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('');
                  setLinkText('');
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                         dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                         transition-colors"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE MODAL - Simple popup for image sizing */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Insert Image
            </h3>
            
            {/* Image Preview */}
            <div className="mb-4">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="max-h-48 mx-auto rounded"
                style={imageWidth ? { width: `${imageWidth}${imageWidth.includes('%') ? '' : 'px'}` } : {}}
              />
            </div>

            {/* Width Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Width (optional - e.g., "400" for 400px or "50%" for half width)
              </label>
              <input
                type="text"
                value={imageWidth}
                onChange={(e) => setImageWidth(e.target.value)}
                placeholder="Leave empty for full width"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl('');
                  setImageWidth('');
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                         dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                         transition-colors"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}