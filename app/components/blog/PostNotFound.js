import Link from "next/link";

const PostNotFound = () => {
  return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-6">Hey👋! The post you&apos;re looking for does not exist.</p>
        <Link 
          href="/"
          className="text-3xl text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Head back
        </Link>
      </div>
    );
}

export default PostNotFound;
