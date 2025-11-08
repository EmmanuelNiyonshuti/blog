import './globals.css';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ThemeProvider from '@/app/components/ui/theme-provider';
import 'highlight.js/styles/github-dark.css';

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
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
