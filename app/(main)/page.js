import Link from 'next/link';

const Section = ({ label, children }) => (
  <div className="space-y-3">
    <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-mono">
      {label}
    </p>
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

const projects = [
  {
    name: 'whatdeps',
    description: 'tiny cli tool for inspecting python projects package dependencies status on github and pypi.',
    url: 'https://github.com/EmmanuelNiyonshuti/whatdeps',
    mine: true,
  },
  {
    name: 'sualw',
    description: 'cli tool for suspending process logs and getting them back on demand (built purely in python3)',
    url: 'https://github.com/EmmanuelNiyonshuti/sualw',
    mine: true,
  },
  {
    name: 'AnyIO',
    description: 'Asynchronous networking and concurrency library that works on top of either Asyncio or Trio',
    url: 'https://github.com/agronholm/anyio',
    mine: false,
  },
  {
    name: 'OpenAgri-Irrigation-Management',
    description: 'OpenAgri IRM service that does Evapotranspiration (ETo) calculations and Soil Moisture Analysis, depending on the specific data input.',
    url: 'https://github.com/agstack/OpenAgri-IrrigationManagement',
    mine: false,
  },
  {
    name: 'OpenAgri-Weather-Service',
    description: 'OpenAgri Weather Service API that is designed to deliver weather forecasts alongside with critical agricultural indicators.',
    url: 'https://github.com/EmmanuelNiyonshuti/OpenAgri-WeatherService',
    mine: false,
  },
];

const ProjectItem = ({ name, description, url }) => (
  <div>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium underline underline-offset-4 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
    >
      {name}
    </a>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
  </div>
);

export default function HomePage() {
  const mine = projects.filter((p) => p.mine);
  const contributions = projects.filter((p) => !p.mine);

  return (
    <div className="max-w-xl mx-auto px-6 py-15 space-y-10">

      <Section label=">">
        <h1 className="text-2xl font-semibold tracking-tight">NIYONSHUTI Emmanuel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Software developer · Kigali, Rwanda 🇷🇼
        </p>
      </Section>

      <Section label="about this web blog">
        <p className="text-sm font-mono text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
          this web blog is for me to write(sometimes) about things I am learning/re-learning/etc in the{' '}
          <Link href="/blog" className="underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">blog</Link>
         {' '}and til in{' '}
          <Link href="/til" className="underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">til</Link> page.
        </p>
      </Section>

      <Section label="skills">
        <div className="space-y-2">
          {skills.map(({ label, items }) => (
            <SkillRow key={label} label={label} items={items} />
          ))}
        </div>
      </Section>

      <Section label="open source">
        <div className="space-y-6">
          <div className="space-y-2">
            {mine.map((p) => <ProjectItem key={p.name} {...p} />)}
            ...
          </div>
          <div className="space-y-4">
            <p className="text-xl text-gray-400 dark:text-gray-500">contributions</p>
            {contributions.map((p) => <ProjectItem key={p.name} {...p} />)}
            ...
          </div>
        </div>
      </Section>
    </div>
  );
}
