import Card from '@/app/components/links/Card';

export const metadata = {
  title: 'Projects',
  description: 'Open source project(s) I maintain.',
};

const projects = [
  {
    title: 'anyquart',
    url: 'https://github.com/EmmanuelNiyonshuti/anyquart',
    secondary: { label: 'PyPI', url: 'https://pypi.org/project/anyquart/' },
    description: 'A port of the Quart ASGI framework that runs on AnyIO',
  },
  {
    title: 'sualw',
    url: 'https://github.com/EmmanuelNiyonshuti/sualw',
    secondary: { label: 'PyPI', url: 'https://pypi.org/project/sualw/' },
    description: "A CLI tool that silences a running process's logs and lets you bring them back on demand",
  },
  {
    title: 'whatdeps',
    url: 'https://github.com/EmmanuelNiyonshuti/whatdeps',
    secondary: { label: 'PyPI', url: 'https://pypi.org/project/whatdeps/' },
    description: "A CLI tool that inspects a Python project's dependencies — versions, size, last release, GitHub activity — pulled from PyPI and GitHub",
  },
  {
    title: 'More on GitHub',
    url: 'https://github.com/EmmanuelNiyonshuti',
    description: 'Browse my opensource projects, contributions and collaborations across other open source projects.',
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Projects</h1>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.title} {...project} />
        ))}
      </ul>
    </div>
  );
}