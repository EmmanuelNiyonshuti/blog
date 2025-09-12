import Link from 'next/link';

export default function Sidebar({ categories = [] }) {
  return (
    <aside className="space-y-6">
      {/* About Me Section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">About Me</h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Hi! my name is NIYONSHUTI Emmanuel, I am a developer. On this blog platform, I share insights about programming, web development, and technology.
          </p>
          <Link 
            href="/about" 
            className="inline-block text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
      
      {/* Categories Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Categories</h3>
        {categories.length > 0 ? (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id || category.slug}>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="flex justify-between items-center py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {category._count?.posts || category.postCount || 0}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">No categories yet.</p>
        )}
      </div>
    </aside>
  );
}
