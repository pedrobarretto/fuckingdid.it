import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header/Header';
import { Toaster } from '@/components/ui/toaster';

const rubik = Rubik({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'You Fucking Did It',
  description: 'Did you fucking do what you needed to do?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased bg-[#efefef]`}>
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
}
