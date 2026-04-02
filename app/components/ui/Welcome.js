import CopyButton from "../blog/CopyButton";

const Welcome = () => {
  const email = 'niyonshutiemmanuel13@gmail.com';

  return (
    <div className="border-l-2 border-sky-200 dark:border-sky-800 pl-3">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Hi, welcome!</p>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        If you want to ask about something on this blog, point out errors in any of my articles, or something else,
        feel free to reach out on my email 👇
      </p>

      <div className="mt-2 flex items-center justify-between gap-2 px-2.5 py-1.5">
        <p className="text-xs">{ email }</p>
        <CopyButton code={email} variant="inline" />
      </div>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">or ping me on my socials above.</p>
      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">Thank you for visiting!</p>
    </div>
  );
};

export default Welcome;