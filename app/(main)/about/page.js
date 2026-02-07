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
                I completed a 12-month online Software Engineering program alongside that degree. 
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                After university, I worked at two startups before choosing to focus on deepening my skills and exploring freelance work.
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                I&apos;ve learned a lot from other developers&apos; blogs and their work on the internet, so I decided to build my own space to document concepts I encounter in software development. 
                If something here helps you, that&apos;s awesome.
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                If you&apos;re working on something involving backend development, APIs, integrations, databases or deployment and think I could help, feel free to reach out on my {' '}
                <a
                  href="mailto:emmanuelniyonshuti13@gmail.com"
                  className="text-sky-600 dark:text-sky-400 hover:underline"
                >
                  email
                </a> or use other social links above.
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