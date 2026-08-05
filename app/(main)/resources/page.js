export const metadata = {
  title: 'Resources',
};

const resourceGroups = [
 {
    category: 'Blogs',
    resources: [
      {
        title: 'Simon Willison blog',
        url: 'https://simonwillison.net/',

      },
      {
        title: 'Armin Ronacher blog',
        url: 'https://lucumr.pocoo.org/',

      },
      {
        title: 'Hynek Schlawack blog',
        url: 'https://hynek.me/articles/',

      },
      {
        title: 'Hugo van Kemenade blog',
        url: 'https://hugovk.dev/blog/',

      },
      {
        title: 'Nathaniel J. Smith blog',
        url: 'https://vorpus.org/',

      },
      {
        title: 'Philip Jones blog',
        url: 'https://pgjones.dev/blog/',

      },
      {
        title: 'Miguel Grinberg blog',
        url: 'https://blog.miguelgrinberg.com/index',

      },
      {
        title: 'William Woodruff blog',
        url: 'https://blog.yossarian.net/',

      },
    ],
  },
  {
    category: 'YouTube Channels',
    resources: [
      {
        title: 'Anthony Writes Code YT Channel',
        url: 'https://www.youtube.com/anthonywritescode',
      },
      {
        title: 'Corey Schafer YT Channel',
        url: 'https://www.youtube.com/channel/UCCezIgC97PvUuR4_gbFUs5g',

      },
    ],
  },
  {
    category: 'Software Engineering Books',
    resources: [
      {
        title: 'The Pragmatic Programmer by Andy Hunt and Dave Thomas',
      },
      {
        title: 'Design of Web APIs by Arnaud Lauret',
      },
    ],
  },
  {
    category: 'Philosophy Books',
    resources: [
      {
        title: 'Think: a compelling introduction to philosophy by Simon Blackburn',
      },
      {
        title: 'Nicomachean Ethics by Aristotle',
      },
    ],
  },
  {
    category: 'Non-fiction Book(s)',
    resources: [
      {
        title: 'Random Family by Adrian Nicole LeBlanc',
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-3 lg:px-4 py-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Resources
        </h1>
        <p>List of resources that I have found helpful.</p>
      </div>
      {resourceGroups.map((group) => (
        <section
          key={group.category}
          id={group.category.toLowerCase().replace(/\s+/g, '-')}
          className="mb-3 scroll-mt-20"
        >
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            {group.category}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {group.resources.map((resource) => (
              <li
                key={resource.title}
                className="rounded-sm bg-white dark:bg-gray-900 p-1"
              >
                {resource.url ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {resource.title}
                  </a>
                ) : (
                  <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {resource.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
