export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <main className="lg:col-span-2">
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        </main>
        <aside className="lg:col-span-1">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        </aside>
      </div>
    </div>
  );
}