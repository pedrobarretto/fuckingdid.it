'use server';

import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div className="text-[#333c4c] pr-96 pl-96 p-24 flex justify-center items-center flex-col">
      <section className="text-left flex justify-center items-center">
        <span className="font-semibold text-5xl">
          Stop procrastinating. <br />
          {/* Gamify your routine. <br /> */}
          Just {<span className="text-orange-500">fucking do it.</span>}
        </span>
      </section>

      <section className="text-left flex justify-center items-center mt-28">
        <span className="font-semibold text-2xl">
          1. Create your account. <br />
          2. Choose an avatar. <br />
          3. Earn/loose xp answering:
        </span>
      </section>

      <section className="flex justify-center items-center flex-col gap-4 bg-white p-10 w-2/5 rounded-xl mt-5">
        <span className="font-semibold">
          Did you {<span className="text-orange-500">fucking did</span>} what
          you planned on doing?
        </span>
        <div className="flex gap-2">
          <Button>Yes</Button>
          <Button>No</Button>
        </div>
      </section>
    </div>
  );
}
