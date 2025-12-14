import Link from "next/link";
import { fetchAllPosts } from "@/lib/api";

const CategoriesSection = async () => {
  const { posts, pagination} = await fetchAllPosts();
  const categoryMap = posts.reduce((acc, post) => {
    const cat = post.category;
    if (!cat) return acc;
    if (!acc[cat.id]) {
      acc[cat.id] = { 
        ...cat, 
        postCount: 1 
      };
    } else {
      acc[cat.id].postCount++;
    }
    return acc;
  }, {});
  const categories = Object.values(categoryMap);
  return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Categories
        </h3>
        {categories.length > 0 ? (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id || category.slug}>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="flex justify-between items-center py-2 px-3 text-gray-700 
                           dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 
                           dark:hover:bg-gray-800 rounded transition-colors"
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 
                               dark:bg-gray-700 px-2 py-1 rounded-full">
                    {category._count?.posts || category.postCount || 0}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            No categories yet.
          </p>
        )}
      </div>
  )
}

export default CategoriesSection