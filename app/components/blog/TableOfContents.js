'use client';

import { useState, useEffect } from 'react';

function TocList({ headings, activeId, onHeadingClick }) {
    // table of content lists
  return (
    <ul className="space-y-0.5">
      {headings.map((heading) => {
        const isActive = activeId === heading.id;
        const isH3 = heading.level === 3;

        return (
          <li key={heading.id} style={{ paddingLeft: isH3 ? '0.875rem' : '0' }}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                onHeadingClick(heading.id);
              }}
              className={[
                'flex items-start gap-2 py-1.5 text-sm leading-snug rounded-lg px-2 transition-all duration-200',
                isH3 ? 'text-xs' : '',
                isActive
                  ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/40',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-1.25 shrink-0 rounded-full transition-all duration-200',
                  isActive
                    ? 'w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400'
                    : 'w-1 h-1 bg-gray-300 dark:bg-gray-600',
                ].join(' ')}
              />
              <span className="line-clamp-2">{heading.text}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector('[data-toc-content]');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2, h3'));

    const headingData = elements.map((el, i) => {
      if (!el.id) {
        const slug = el.textContent
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 50);
        el.id = `toc-${i}-${slug}`;
      }
      return {
        id: el.id,
        text: el.textContent.trim(),
        level: parseInt(el.tagName[1]),
      };
    });

    setHeadings(headingData);
    if (headingData.length > 0) setActiveId(headingData[0].id);

    // Track active heading with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const topmost = intersecting.reduce((a, b) =>
            a.target.getBoundingClientRect().top < b.target.getBoundingClientRect().top ? a : b
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: '-10% 0% -75% 0%', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    // Track reading progress
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleHeadingClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setMobileOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <>
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7" />
            </svg>
            Table of Contents
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-125 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl">
            <TocList headings={headings} activeId={activeId} onHeadingClick={handleHeadingClick} />
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        {/* Read progress */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            On this page
          </p>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 tabular-nums">
            {readProgress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-sky-400 dark:bg-sky-500 rounded-full transition-all duration-200"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        <div className="p-4 bg-gray-50/80 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/60">
          <TocList headings={headings} activeId={activeId} onHeadingClick={handleHeadingClick} />
        </div>

        {/* Back to top */}
        {readProgress > 10 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 text-xs text-gray-400 dark:text-gray-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7 7 7M5 19l7-7 7 7" />
            </svg>
            Back to top
          </button>
        )}
      </div>
    </>
  );
}