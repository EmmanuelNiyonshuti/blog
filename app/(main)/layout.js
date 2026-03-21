import './main-global.css';
import Navbar from '@/app/components/layout/NavBar';
import Footer from '@/app/components/layout/Footer';
import ThemeProvider from '@/app/components/ui/theme-provider';
import 'highlight.js/styles/github-dark.css';



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'NIYONSHUTI Emmanuel | software developer',
    template: '%s | NIYONSHUTI Emmanuel',
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'NIYONSHUTI Emmanuel RSS Feed' }
      ],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel='icon' href='https://res.cloudinary.com/dx8m9dy9d/image/upload/v1753975545/NIYONSHUTI_Emmanuel_pdaqpi.jpg'/>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
