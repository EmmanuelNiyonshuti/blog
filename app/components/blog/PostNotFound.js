import Link from "next/link";

const PostNotFound = () => {
  return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to blog
        </Link>
      </div>
    );
}

export default PostNotFound;
