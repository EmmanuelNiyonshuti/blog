export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} NIYONSHUTI Emmanuel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
