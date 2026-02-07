// mdx-components.jsx (in root of project)
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components) {
  return {
    // Custom heading with anchor links
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-zinc-900 dark:text-zinc-100 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-5 text-zinc-900 dark:text-zinc-100 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
        {children}
      </h3>
    ),
    
    // Paragraphs
    p: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    ),
    
    // Links - use Next.js Link for internal, regular anchor for external
    a: ({ href, children }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline decoration-1 underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link 
          href={href || '#'}
          className="text-blue-600 dark:text-blue-400 underline decoration-1 underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          {children}
        </Link>
      );
    },
    
    // Blockquotes - ancient style
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-900 dark:border-zinc-100 pl-6 py-2 my-8 italic text-zinc-600 dark:text-zinc-400">
        {children}
      </blockquote>
    ),
    
    // Code blocks
    pre: ({ children }) => (
      <div className="code-block-wrapper my-8">
        <pre className="p-6 bg-zinc-50 dark:bg-[#0d1117] rounded-lg overflow-x-auto border border-zinc-200 dark:border-zinc-800">
          {children}
        </pre>
      </div>
    ),
    
    // Inline code
    code: ({ children, className }) => {
      // If it has a className, it's inside a pre (code block)
      if (className) {
        return <code className={className}>{children}</code>;
      }
      // Otherwise it's inline code
      return (
        <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 px-1.5 py-0.5 rounded text-[0.9em] font-mono">
          {children}
        </code>
      );
    },
    
    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-zinc-700 dark:text-zinc-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-zinc-700 dark:text-zinc-300">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    
    // Images - optimized with Next.js Image
    img: ({ src, alt }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg my-8 w-full h-auto"
      />
    ),
    
    // Horizontal rule
    hr: () => (
      <div className="my-12 flex justify-center">
        <div className="w-24 h-px bg-zinc-800 dark:bg-zinc-200"></div>
      </div>
    ),
    
    // Tables
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
        {children}
      </td>
    ),
    
    ...components,
  };
}