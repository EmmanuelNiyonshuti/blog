import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 space-y-8">
      <h2>Hi, welcome to my blog.</h2>

      <div>
        <p className="text-gray-500">Who are you?</p>
        <p className='text-sm'>My name is NIYONSHUTI Emmanuel, you can call me Emmanuel.
           I am a backend software developer who works mainly with Python — web services, APIs, databases, that kind of thing. I am based in Kigali, Rwanda.
        </p>
      </div>
      <div>
        <p className="text-gray-500">What is this blog about?</p>
        <p className='text-sm'>I sometimes share things I am learning, have learned, or am revisiting.
          I write technical posts in the <Link href="/blog" className="underline underline-offset-4">blog</Link>,
          share my bad opinions in <Link href="/musings" className="underline underline-offset-4">musings</Link>,
          and small things I picked up in <Link href="/til" className="underline underline-offset-4">TIL</Link> page.
        </p>
      </div>
      <div>
        <p className="text-gray-500">Anything else?</p>
        <p className='text-sm'>I have a growing interest in async programming.
          I occasionally work on and contribute to open source — you can find my work on <Link href="https://github.com/EmmanuelNiyonshuti" className="underline underline-offset-4">GitHub</Link>.
        </p>
      </div>

      <p className="text-gray-500">Thank you for visiting!</p>
    </div>
  );
}