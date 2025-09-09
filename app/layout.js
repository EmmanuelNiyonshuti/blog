import "./globals.css";

export const metadata = {
  title: "NIYONSHUTI Emmanuel",
  description: "NIYONSHUTI Emmanuel | Blog | Developer | Software developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
