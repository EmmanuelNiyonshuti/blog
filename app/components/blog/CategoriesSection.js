// app/components/blog/CategoriesSection.js
import Link from "next/link";
import { fetchAllPosts } from "@/lib/api";

const CategoriesSection = async () => {
  const { posts } = await fetchAllPosts();
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
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
        Categories
      </h3>
      {categories.length > 0 ? (
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.id || category.slug}>
              <Link 
                href={`/categories/${category.slug}`}
                className="flex justify-between items-center py-3 px-4 text-gray-700 
                         dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 
                         hover:bg-gray-50 dark:hover:bg-gray-800 
                         rounded-lg transition-colors border border-transparent 
                         hover:border-gray-200 dark:hover:border-gray-700"
              >
                <span className="font-medium">{category.name}</span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 
                             bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full 
                             min-w-[28px] text-center">
                  {category._count?.posts || category.postCount || 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-500 italic text-center py-4">
          No categories yet.
        </p>
      )}
    </div>
  );
}

export default CategoriesSection;