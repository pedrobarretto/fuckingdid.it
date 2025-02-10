'use server';

import { DemoGoalCard } from './goals/_components/DemoGoalCard';
import { Linkedin, Github } from 'lucide-react';
import * as emoji from 'node-emoji';

export default async function Home() {
  return (
    <main className="min-h-screen text-[#333c4c] flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-4xl text-center mt-14 mb-20">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
          Stop procrastinating. <br />
          Just {<span className="text-orange-500">fucking do it.</span>}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600">
          The ultimate productivity tool to transform your goals into
          achievements
        </p>
      </section>

      <section className="w-full max-w-4xl mb-20">
        <h2 className="font-semibold text-2xl sm:text-3xl text-center mb-8">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-orange-50">
            <h3 className="font-semibold text-xl mb-2">
              1. Create your account
            </h3>
            <p className="text-gray-600">
              Join our community of achievers and start your journey
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-orange-50">
            <h3 className="font-semibold text-xl mb-2">2. Set a goal</h3>
            <p className="text-gray-600">
              Define clear, actionable objectives that matter to you
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-orange-50">
            <h3 className="font-semibold text-xl mb-2">
              3. Earn XP & Level Up
            </h3>
            <p className="text-gray-600">
              Track progress and stay motivated with gamified achievements
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-2xl mb-20">
        <h2 className="font-semibold text-2xl sm:text-3xl text-center mb-8">
          See How It Works
        </h2>
        <div className="space-y-4">
          <DemoGoalCard />
        </div>
      </section>

      <section className="w-full max-w-4xl mb-20">
        <h2 className="font-semibold text-2xl sm:text-3xl text-center mb-8">
          Why Choose FuckingDid.it?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-xl mb-2">
              {emoji.get(':video_game:')} Gamified Experience
            </h3>
            <p className="text-gray-600">
              Turn your goals into an engaging game with XP and levels
            </p>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-xl mb-2">
              {emoji.get(':bar_chart:')} Progress Tracking
            </h3>
            <p className="text-gray-600">
              Visual insights to keep you motivated and on track
            </p>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-xl mb-2">
              {emoji.get(':dart:')} Goal Setting
            </h3>
            <p className="text-gray-600">
              Simple yet powerful goal management system
            </p>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-xl mb-2">
              {emoji.get(':rocket:')} Stay Motivated
            </h3>
            <p className="text-gray-600">
              Built-in features to keep you focused and committed
            </p>
          </div>
        </div>
      </section>

      <footer className="w-full text-center py-8 text-gray-600">
        <p>
          Made with {emoji.get(':heart:')} by{' '}
          <a
            href="https://www.linkedin.com/in/pedrobarretto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Pedro Barretto
          </a>
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="https://www.linkedin.com/in/pedrobarretto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/pedrobarretto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black"
          >
            <Github size={24} />
          </a>
        </div>
        <p className="text-sm mt-2">
          © 2025 FuckingDid.it - Your Goal Achievement Platform
        </p>
      </footer>
    </main>
  );
}
