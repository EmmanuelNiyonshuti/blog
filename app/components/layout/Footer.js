import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          
          {/* Contact */}
          <div className="text-gray-600 text-sm flex items-center">
            <Mail size={16} className="mr-2" />
            <span>Questions? Contact me at: </span>
            <a 
              href="mailto:emmanuelniyonshuti13@gmail.com" 
              className="ml-1 text-gray-900 hover:text-gray-600 transition-colors"
            >
              emmanuelniyonshuti13@gmail.com
            </a>
          </div>
          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} NIYONSHUTI Emmanuel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}