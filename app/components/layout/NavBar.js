import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              NIYONSHUTI Emmanuel
            </Link>
          </div>
          
          {/* Navigation Links - Center */}
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
          
          {/* Social Links + Theme - Right */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <a 
              href="https://github.com/EmmanuelNiyonshuti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://x.com/emmanulio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Twitter/X"
            >
              <Twitter size={20} />
            </a>
          </div>
          
          {/* Mobile menu button (placeholder for now) */}
          <div className="md:hidden">
            <button className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300" title="Menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
