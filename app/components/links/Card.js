export default function Card({ title, url, description, secondary }) {
  return (
    <li className="flex flex-col justify-between rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-colors hover:border-blue-500/40 dark:hover:border-blue-400/40">
      <div>
        <div className="flex items-start justify-between gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {title}
          </a>
          {secondary && (
            <a
              href={secondary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {secondary.label}
            </a>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </li>
  );
}