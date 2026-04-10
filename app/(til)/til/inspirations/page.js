import Link from 'next/link';

const inspiredBy = [
  {
    name: 'Simon Willison TIL',
    url: 'https://til.simonwillison.net/',
  },
  {
    name: 'Josh Branchaud TIL',
    url: 'https://github.com/jbranchaud/til',
  },
  {
    name: 'William Woodruff TIL',
    url: 'https://yossarian.net/til/',
  },
  {
    name: 'Hynek Schlawack TIL',
    url: 'https://hynek.me/til/',
  },
];

export default function TilInspirationsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/til"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors mb-10 group"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to TIL
      </Link>
      <ul className="space-y-6">
        {inspiredBy.map((item) => (
          <li key={item.url} className="flex flex-col gap-1">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline underline-offset-2"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}