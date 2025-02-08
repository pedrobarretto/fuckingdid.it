'use server';

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import BrushLine from '../../assets/brush-line.svg';
import { GoalsContainer } from './_components/GoalsContainer';
import { redirect } from 'next/navigation';
import { ProfilePicture } from './_components/ProfilePicture';

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

export default async function HomePage() {
  const db = await createClient();
  const { data } = await db.auth.getUser();
  if (!data.user) redirect('/login');
  const goals = await db.from('goals').select('*').eq('user_id', data.user.id);
  const greeting = getGreeting();

  const { name, full_name, picture, avatar_url } =
    data.user.user_metadata || {};
  const username: string = name || full_name;
  const imgUrl = picture || avatar_url;

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12 w-full">
      <div className="flex flex-row justify-between items-center mt-14 mb-10">
        <div className="flex flex-col">
          <span>
            {greeting}, {username}!
          </span>
          <span className="font-bold text-orange-500">
            Let&apos;s fucking do it!
          </span>
          <Image src={BrushLine} alt="Underline" width={150} height={33} />
        </div>
        <ProfilePicture imgUrl={imgUrl} />
      </div>

      <GoalsContainer goals={goals.data || []} />
    </div>
  );
}
