export default function BlogPostLoading() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24" />
            </div>
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg my-8" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
        </div>
      </div>
    </article>
  );
}