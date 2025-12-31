import Link from "next/link";
import { fetchCategories } from "@/lib/api";

const CategoriesSection = async () => {
  const categories = await fetchCategories();
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
        Categories
      </h3>
      {categories.length > 0 ? (
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li key={category.id || category.slug || index}>
              <Link 
                href={`/categories/${category.slug}`}
                className="flex justify-between items-center py-3 px-4 text-gray-700 
                         dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 
                         hover:bg-gray-50 dark:hover:bg-gray-800 
                         rounded-lg transition-colors border border-transparent 
                         hover:border-gray-200 dark:hover:border-gray-700"
              >
                <span className="font-medium">{category.name}</span>
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