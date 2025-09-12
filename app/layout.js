import './globals.css';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

export const metadata = {
  title: {
    default: 'NIYONSHUTI Emmanuel - Software Developer & Tech Writer',
    template: '%s | NIYONSHUTI Emmanuel'
  },
  description: 'Personal blog and portfolio of NIYONSHUTI Emmanuel, sharing insights on software development, technology, and programming.',
  keywords: ['software development', 'programming', 'technology', 'web development', 'NIYONSHUTI Emmanuel'],
  authors: [{ name: 'NIYONSHUTI Emmanuel' }],
  creator: 'NIYONSHUTI Emmanuel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'NIYONSHUTI Emmanuel - Software Developer & Tech Writer',
    description: 'Personal blog and portfolio of NIYONSHUTI Emmanuel, sharing insights on software development, technology, and programming.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans dark:bg-gray-950 dark:text-gray-100">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('theme') || 'system';
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === 'dark' || (stored === 'system' && prefersDark);
                  if (isDark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
