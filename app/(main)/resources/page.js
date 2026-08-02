import Card from '@/app/components/links/Card';

export const metadata = {
  title: 'Resources',
};

const resourceGroups = [
 {
    category: 'Blogs',
    resources: [
      {
        title: 'Simon Willison',
        url: 'https://simonwillison.net/',
        description: 'Creator of Datasette; great for up to date agentic engineering trends, tips and python related contents.',
      },
      {
        title: 'Armin Ronacher',
        url: 'https://lucumr.pocoo.org/',
        description: 'Creator of Flask and more. Great for software engineering and up to date software engineering trends.',
      },
      {
        title: 'Hynek Schlawack',
        url: 'https://hynek.me/articles/',
        description: 'Creator of attrs and more; great blog for Python engineers.',
      },
      {
        title: 'Hugo van Kemenade',
        url: 'https://hugovk.dev/blog/',
        description: 'Python 3.14/3.15 release manager and core developer; advanced Python posts.',
      },
      {
        title: 'Nathaniel J. Smith',
        url: 'https://vorpus.org/',
        description: 'Creator of Trio; Trio design-thought-process posts, great for learning concurrency.',
      },
      {
        title: 'Philip Jones',
        url: 'https://pgjones.dev/blog/',
        description: 'Creator of Quart, core Flask maintainer. Great Flask, Quart and Python related posts.',
      },
      {
        title: 'Miguel Grinberg',
        url: 'https://blog.miguelgrinberg.com/index',
        description: 'Known for the Flask Mega-Tutorial — great for Flask/SQLAlchemy/backend beginners/intermediate developers.',
      },
      {
        title: 'William Woodruff',
        url: 'https://blog.yossarian.net/',
        description: 'Creator of zizmor; mostly in security, but also Rust and Python.',
      },
    ],
  },
  {
    category: 'YouTube Channels',
    resources: [
      {
        title: 'Anthony Writes Code',
        url: 'https://www.youtube.com/anthonywritescode',
        description: 'Creator of pre-commit and former core developer of pytest; Great channel with mostly intermediate/advanced Python contents.',
      },
      {
        title: 'Corey Schafer',
        url: 'https://www.youtube.com/channel/UCCezIgC97PvUuR4_gbFUs5g',
        description: 'Great channel for Python developers both beginners and intermediate.',
      },
    ],
  },
  {
    category: 'Software Engineering Books',
    resources: [
      {
        title: 'The Pragmatic Programmer',
        url: 'https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X',
        description: `Great Book to learn software engineering best practices and software development principles.`,
      },
      {
        title: 'Design of Web APIs by Arnaud Lauret',
        url: 'https://www.amazon.com/Design-Web-APIs-Arnaud-Lauret/dp/1617295108',
        description: 'Great Book for API design and development.',
      },
    ],
  },
  {
    category: 'Philosophy',
    resources: [
      {
        title: 'Think by Simon Blackburn',
        url: 'https://www.amazon.com/Think-Compelling-Introduction-Simon-Blackburn/dp/0192854259',
        description: 'Great introduction to philosophy and critical thinking.',
      },
      {
        title: 'Nicomachean Ethics by Aristotle',
        url: 'https://www.amazon.com/Nicomachean-Ethics-Penguin-Classics/dp/0140449493',
        description: 'Great book on ethics.',
      },
    ],
  },
  {
    category: 'Non-fiction',
    resources: [
      {
        title: 'Random Family by Adrian Nicole LeBlanc',
        url: 'https://www.amazon.com/Random-Family-Love-Drugs-Trouble/dp/0684863873',
        description: `Great book.`,
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Resources
        </h1>
      </div>
      {resourceGroups.map((group) => (
        <section key={group.category} className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            {group.category}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.resources.map((resource) => (
              <Card key={resource.title} {...resource} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}