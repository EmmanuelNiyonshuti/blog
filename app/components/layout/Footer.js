import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          
          {/* Contact */}
          <div className="text-gray-600 text-sm flex items-center flex-wrap justify-center">
            <Mail size={16} className="mr-2" />
            <span>Questions? Contact me at: </span>
            <a 
              href="mailto:emmanuelniyonshuti13@gmail.com" 
              className="ml-1 text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              emmanuelniyonshuti13@gmail.com
            </a>
          </div>

          {/* Social Links with Labels */}
          <div className="flex flex-wrap items-center justify-center space-x-6">
            <a 
              href="https://github.com/EmmanuelNiyonshuti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <Github size={16} className="mr-2" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <Linkedin size={16} className="mr-2" />
              LinkedIn
            </a>
            <a 
              href="https://x.com/emmanulio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <Twitter size={16} className="mr-2" />
              Twitter
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} NIYONSHUTI Emmanuel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
