'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/app/components/ui/theme-toggle';
import RSSLink from '../RssLink';
import { X } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, XIcon, MastodonIcon } from '../ui/Icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name - Always Visible */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link 
              href="/thoughts" 
              className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              onClick={closeMenu}
            >
              NIYONSHUTI Emmanuel
            </Link>
          </div>
          
          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              About Me
            </Link>
          </div>
          
          {/* Desktop Social Links + Theme - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <a 
              href="https://github.com/EmmanuelNiyonshuti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <GitHubIcon className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
            </a>
            <a 
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 transition-colors"
              title="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5 hover:text-blue-700 dark:hover:text-blue" />
            </a>
            <a 
              href="https://x.com/emmanulio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 transition-colors"
              title="Twitter/X"
            >
              <XIcon className="w-5 h-5 hover:text-blue-700 dark:hover:text-blue" />
            </a>
            <a 
              href="https://mastodon.social/@emmanuelniyonshuti"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 transition-colors"
              title="Mastodon"
            >
              <MastodonIcon className="w-5 h-5 hover:text-blue-600 dark:hover:text-blue" />
            </a>
            <RSSLink />
          </div>
          
          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 p-2 cursor-pointer transition-colors" 
              title="Menu"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              <Link 
                href="/" 
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                href="/about"
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={closeMenu}
              >
                About Me
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>

              {/* Social Links */}
              <div className="flex items-center space-x-6 px-3">
                <a 
                  href="https://github.com/EmmanuelNiyonshuti" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="GitHub"
                >
                  <GitHubIcon className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5 hover:text-blue-700 dark:hover:text-blue" />
                </a>
                <a 
                  href="https://x.com/emmanulio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 transition-colors"
                  title="Twitter/X"
                >
                  <XIcon className="w-5 h-5 hover:text-blue-700 dark:hover:text-blue" />
                </a>
                <a 
                  href="https://mastodon.social/@emmanuelniyonshuti"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 transition-colors"
                  title="Mastodon"
                >
                  <MastodonIcon className="w-5 h-5 hover:text-blue-700 dark:hover:text-blue" />
                </a>
                <RSSLink />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}