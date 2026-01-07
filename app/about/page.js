import Image from "next/image";

export const metadata = {
  title: 'About Me',
  description:
    'Learn more about Emmanuel Niyonshuti, a backend developer passionate about technology and programming.',
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
          <div className="rounded-lg p-6 mb-8 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            {/* Profile Image */}
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
                Hi 👋, I&apos;m Emmanuel Niyonshuti, a software developer based in Rwanda.
                I got into software development while studying a BSc with Honours in Crop Production.
                Alongside different learning materials and resources, I completed a 12-month online Software Engineering program and that degree. 
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                After university, I worked at two startups before deciding to step back and focus on 
                upskilling and exploring freelance opportunities. These days, I&apos;m deepening my skills 
                and working on personal projects.
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                I learn and have learned a lot from other developers' blogs and their work on the internet, so I decided to build my own space to document concepts I encounter in software development. 
                If something here helps you, that&apos;s awesome.
                Thanks!
              </p>
              
              <p className="mt-6 text-gray-700 dark:text-gray-300 font-medium">
                — Emmanuel
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-lg p-8 text-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            You can also find me on{' '}
            <a
              href="mailto:emmanuelniyonshuti13@gmail.com"
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              Email
            </a>
            ,{' '}
            <a
              href="https://github.com/EmmanuelNiyonshuti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              GitHub
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              LinkedIn
            </a>
            , and{' '}
            <a
              href="https://x.com/emmanulio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
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