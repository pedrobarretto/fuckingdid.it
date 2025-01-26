'use server';

import Image from 'next/image';
import Icon from '../../assets/icon.svg';
import { HeaderButton } from './HeaderButton';
import { createClient } from '@/utils/supabase/server';

export async function Header() {
  const db = await createClient();
  const isLogedIn = await db.auth.getUser();

  return (
    <div className="flex flex-row justify-between items-center pr-96 pl-96 mt-2">
      <div className="flex flex-row items-center font-semibold gap-1">
        <Image src={Icon} alt="FuckingDid.it Icon" height={50} width={50} />
        <span>FuckingDid.it</span>
      </div>
      <HeaderButton isLogedIn={isLogedIn.data.user} />
    </div>
  );
}
