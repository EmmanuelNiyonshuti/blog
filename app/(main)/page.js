import Link from 'next/link';

const Section = ({ label, href, children }) => (
 <div className="space-y-3">
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 font-mono hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {label}
      </a>
    ) : (
      <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-mono">
        {label}
      </p>
    )}
    <div>{children}</div>
  </div>
);

const SkillRow = ({ label, items }) => (
  <div className="flex gap-2 text-sm flex-wrap">
    <span className="text-gray-400 dark:text-gray-500 font-mono shrink-0">{label}</span>
    <span className="text-gray-700 dark:text-gray-300">{items.join(' · ')}</span>
  </div>
);

const skills = [
  { label: 'backend    :', items: ['Starlette', 'FastAPI', 'Flask'] },
  { label: 'databases  :', items: ['PostgreSQL', 'MySQL'] },
  { label: 'frontend   :', items: ['React', 'Next.js'] },
  { label: 'cloud & deployments:', items: ['Docker', 'DigitalOcean', 'Render', 'Railway', 'Vercel'] },
];

export default function HomePage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-15 space-y-10">

      <Section label=">">
        <h1 className="text-2xl font-semibold tracking-tight">NIYONSHUTI Emmanuel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Software developer · Kigali, Rwanda 🇷🇼
        </p>
      </Section>
      <Section label="skills">
        <div className="space-y-2">
          {skills.map(({ label, items }) => (
            <SkillRow key={label} label={label} items={items} />
          ))}
        </div>
      </Section>
      <Section label="This website">
        <p className="text-sm font-mono text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
          This site is{' '}
          <Link href="https://github.com/EmmanuelNiyonshuti/blog" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
          open source
          </Link> and is written in Javascript using Next.js(+15 App Router) web framework and Tailwind CSS for styling, blogs are served
          using next-mdx-remote to compile Markdown + JSX at runtime.
          <br />
          <br />
          This site exists primarily as a place for me to blog about software things.
        </p>
      </Section>
    </div>
  );
}
