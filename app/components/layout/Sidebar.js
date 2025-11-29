import Link from 'next/link';
import Image from 'next/image';
import CategoriesSection from '../blog/CategoriesSection';

export default function Sidebar({ categories = [] }) {
  // const categoriesLen = categories.length;

  return (
    <aside className="space-y-6">
      {/* About Me Section with Profile Image */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <h3 className="flex justify-center text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          About Me
        </h3>
        
        {/* Profile Image and Content Container */}
        <div className="space-y-2">
          {/* Profile Image - Circular */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-transparent border-blue-500 shadow-lg">
              <Image
                src="https://res.cloudinary.com/dx8m9dy9d/image/upload/v1753975545/NIYONSHUTI_Emmanuel_pdaqpi.jpg"
                alt="NIYONSHUTI Emmanuel"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Welcome Text */}
          <p className="text-xl text-gray-700 dark:text-gray-300 text-center font-medium">
            Welcome to my blog
          </p>
          
          {/* Bio */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            I&apos;m a software developer with a focus on backend development, living in Rwanda.
          </p>

          {/* Social Links */}
          <div className="text-sm text-center space-y-1">
            <a
              href="https://github.com/EmmanuelNiyonshuti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            {' · '}
            <a
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
            {' · '}
            <a
              href="https://x.com/emmanulio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              X
            </a>
            {' · '}
            <a
              href="mailto:emmanuelniyonshuti13@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Email
            </a>
          </div>

          {/* Read More Link */}
          <div className="text-center">
            <Link
              href="/about" 
              className="inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 
                       dark:hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
      <CategoriesSection />
    </aside>
  );
}