// app/layout.js
import './globals.css';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

export const metadata = {
  title: {
    default: 'NIYONSHUTI Emmanuel - Backend Developer & Tech Writer',
    template: '%s | NIYONSHUTI Emmanuel'
  },
  description: 'Personal blog and portfolio of NIYONSHUTI Emmanuel, sharing insights on backend development, technology, and programming.',
  keywords: ['backend development', 'programming', 'technology', 'web development', 'NIYONSHUTI Emmanuel'],
  authors: [{ name: 'NIYONSHUTI Emmanuel' }],
  creator: 'NIYONSHUTI Emmanuel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'NIYONSHUTI Emmanuel - Backend Developer & Tech Writer',
    description: 'Personal blog and portfolio of NIYONSHUTI Emmanuel, sharing insights on backend development, technology, and programming.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans">
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
