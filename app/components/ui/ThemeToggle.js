'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('theme') || 'system';
    setTheme(stored);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="flex items-center space-x-2">
      <button
        className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title="Toggle dark mode"
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
      <button
        className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setTheme('system')}
        title="Use system theme"
      >
        System
      </button>
    </div>
  );
}


