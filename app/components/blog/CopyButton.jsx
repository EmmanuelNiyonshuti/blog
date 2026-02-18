'use client';

import { useState } from 'react';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
        throw new Error("an error occured");
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className={`absolute top-2 right-2 p-2 rounded transition-colors duration-200 cursor-pointer
        ${copied
          ? 'bg-green-600 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}