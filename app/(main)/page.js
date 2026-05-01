import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 space-y-8">
      <h2>Hi, welcome to my blog.</h2>
      <div>
        <p className="text-gray-500">Who are you?</p>
        <p className='text-sm'>My name is NIYONSHUTI Emmanuel. You can call me Emmanuel.
        </p>
      </div>
      <div>
        <p className="text-gray-500">What is this blog about?</p>
        <p className='text-sm'>I share things I am learning or have learned.
          Some posts may contain thoughts I am still processing or revisiting.
          I sometimes write technical posts in the <Link href="/blog" className="underline underline-offset-4">blog</Link>,
          other things in <Link href="/musings" className="underline underline-offset-4">musings</Link>,
          and TIL(Today I learned) in <Link href="/til" className="underline underline-offset-4">TIL</Link> page.
        </p>
      </div>
      <div>
        <p className="text-gray-500">Anything else?</p>
        <p className='text-sm'>I occasionally contribute to open source. you can find my work on <Link href="https://github.com/EmmanuelNiyonshuti" className="underline underline-offset-4">GitHub</Link>.
          The <Link href="https://github.com/EmmanuelNiyonshuti/blog" className="underline underline-offset-4">source</Link> of this blog is also there if you are curious.
        </p>
      </div>
      <p className="text-gray-500">Thank you for visiting!</p>
    </div>
  );
}
