'use server';

import Link from 'next/link';
import * as emoji from 'node-emoji';

export default async function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-orange-500 mb-4">
        Oops! Something went wrong {emoji.get('cry')}
      </h1>
      <p className="text-lg sm:text-xl text-[#333c4c] mb-8">
        We&apos;re sorry for the inconvenience. Please try again later.
      </p>
      <div className="flex flex-col space-y-4">
        <Link
          href="/"
          passHref
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Home
        </Link>
        <Link
          href="/login"
          passHref
          className="bg-[#333c4c] text-white px-4 py-2 rounded-lg hover:bg-[#2b2f3a]"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
