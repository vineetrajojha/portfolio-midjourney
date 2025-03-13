import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'terminal/portfolio@cres',
  description: 'Interactive terminal portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <main style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
