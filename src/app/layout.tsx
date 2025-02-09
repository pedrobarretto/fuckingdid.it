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
      <meta
        name="description"
        content="Set goals, track your progress, and stay motivated. Earn XP and level up as you complete your goals. Stop procrastinating and just fucking do it!"
      />
      <meta
        name="keywords"
        content="goal tracker, habit tracker, stop procrastinating, productivity, self-improvement, motivation, achieve goals, fucking do it"
      />
      <body
        className={`${rubik.className} antialiased bg-[#efefef] text-[#333c4c]`}
      >
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
}
