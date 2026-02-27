import './other-global.css';
import ThemeProvider from '@/app/components/ui/theme-provider';
import 'highlight.js/styles/github-dark.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'NIYONSHUTI Emmanuel | Software Developer',
    template: '%s | NIYONSHUTI Emmanuel',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'NIYONSHUTI Emmanuel RSS Feed' }
      ],
    },
  },
  icons: {
    icon: 'https://res.cloudinary.com/dx8m9dy9d/image/upload/v1753975545/NIYONSHUTI_Emmanuel_pdaqpi.jpg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
            <footer className="flex text-left py-6 text-sm text-zinc-500 dark:text-zinc-500">
              <p>© {new Date().getFullYear()} Musing</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}