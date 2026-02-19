import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'About Me',
  description:
    'Emmanuel Niyonshuti, a backend software developer passionate about technology and programming.',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="rounded-lg p-6 mb-8 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow-lg">
                <Image
                  src="https://res.cloudinary.com/dx8m9dy9d/image/upload/v1765717992/unnamed_zzj6hi.jpg"
                  alt="Emmanuel Niyonshuti"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Hi 👋, I&apos;m Emmanuel Niyonshuti, you can call me Emmanuel. I am a software developer based in Rwanda with a strong interest in backend engineering.
                I discovered software engineering while studying a B.Sc. Hons in Crop Production in 2023 and did a year-long Software Engineering program alongside it.
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                After university, I worked at two early stage startups where I worked on building and maintaining web applications.
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                I learn a lot from other developers&apos; work on the internet, so I decided to put together my own blog to do some writing.
                All projects are on <a className="text-blue-600" href="https://github.com/EmmanuelNiyonshuti" target="_blank" rel="noopener noreferrer">GitHub</a>.
                If something here helps you, that&apos;s awesome.
              </p>
              <p className="mt-6 text-gray-700 dark:text-gray-300 font-medium">
                — Emmanuel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}