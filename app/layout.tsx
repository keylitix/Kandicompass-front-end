import type { Metadata } from 'next';
import { Orbitron, Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kandi Compass',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.className} ${montserrat.variable} antialiased`}
        data-new-gr-c-s-check-loaded="14.1237.0"
        data-gr-ext-installed=""
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
