export const metadata = {
  title: 'About Me',
  description:
    'Learn more about NIYONSHUTI Emmanuel, a backend developer passionate about technology and programming.',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Software Developer
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {/* Introduction */}
          <div className="rounded-lg p-8 mb-8 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Hi👋 I'm Emmanuel! I'm a software developer. Through this blog, I share
              my learnings, experiences and insights about programming and emerging technologies.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-lg p-8 text-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            You can also find me on{' '}
            <a
              href="mailto:emmanuelniyonshuti13@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Email
            </a>
            ,{' '}
            <a
              href="https://github.com/EmmanuelNiyonshuti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>{' '}
            and{' '}
            <a
              href="https://x.com/emmanulio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              X
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
