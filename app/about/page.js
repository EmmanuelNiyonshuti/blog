import Image from "next/image";

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
          {/* Profile Image - Circular */}

          <div className="rounded-lg p-3 mb-8 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-transparent shadow-lg">
              <Image
                src="https://res.cloudinary.com/dx8m9dy9d/image/upload/v1765717992/unnamed_zzj6hi.jpg"
                alt="NIYONSHUTI Emmanuel"
                fill
                className="object-cover"
                priority
              />
            </div>
            </div>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Hi 👋, I&apos;m Emmanuel Niyonshuti, a software engineer with a background in crop production.
                I made the transition to software engineering while pursuing my BSc with Honours in Crop Production, 
                completing a 12-month ALX Software Engineering program alongside my studies. 
                These days, my focus is primarily on backend engineering.
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
                I built this blog as a space to document software engineering concepts and share insights 
                from my journey in the field. Most of the content here is backend-related, which is where I spend 
                most of my time currently.
                If you find something helpful, feel free to leave a comment. Thanks!
              </p>

              <p className="mt-8 text-gray-700 dark:text-gray-300 font-medium">
                — Emmanuel
              </p>
            </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-lg p-8 text-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            You can also find me on{' '}
            <a
              href="mailto:emmanuelniyonshuti13@gmail.com"
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              Email
            </a>
            ,{' '}
            <a
              href="https://github.com/EmmanuelNiyonshuti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              GitHub
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              LinkedIn
            </a>{' '}
            and{' '}
            <a
              href="https://x.com/emmanulio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline"
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
