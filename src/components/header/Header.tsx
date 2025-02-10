'use server';

import Image from 'next/image';
import Icon from '../../assets/icon.svg';
import { HeaderButton } from './HeaderButton';
import { createClient } from '@/utils/supabase/server';

export async function Header() {
  const db = await createClient();
  const isLogedIn = await db.auth.getUser();
  console.log(isLogedIn);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-row justify-between items-center mt-2">
          <div className="flex flex-row items-center font-semibold gap-1">
            <div className="transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer">
              <Image
                src={Icon}
                alt="FuckingDid.it Icon"
                height={50}
                width={50}
                className="h-9 w-9 md:h-11 md:w-11 transform-gpu"
              />
            </div>
            <span className="text-base md:text-lg">FuckingDid.it</span>{' '}
          </div>
          <HeaderButton isLogedIn={isLogedIn.data.user} />
        </div>
      </div>
    </div>
  );
}
