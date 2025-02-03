'use server';

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import BrushLine from '../../assets/brush-line.svg';
import { GoalsContainer } from './_components/GoalsContainer';

export default async function HomePage() {
  const db = await createClient();
  const { data } = await db.auth.getUser();
  if (!data.user) redirect('/login');
  console.log(data.user);
  const goals = await db.from('goals').select('*').eq('user_id', data.user.id);
  console.log('goals: ', goals);

  const { name, full_name, picture, avatar_url } =
    data.user.user_metadata || {};
  const username: string = name || full_name;
  const imgUrl = picture || avatar_url;

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12 w-full">
      <div className="flex flex-row justify-between items-center mt-20 mb-10">
        <div className="flex flex-col">
          <span>Good afternoon, {username}!</span>
          <span className="font-bold text-orange-500">
            Let&apos;s fucking do it!
          </span>
          <Image src={BrushLine} alt="Underline" width={150} height={33} />
        </div>
        <div className="transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer">
          <Image
            src={imgUrl}
            alt={`${username} profile picture`}
            width={55}
            height={55}
            className="rounded-xl"
          />
        </div>
      </div>

      <GoalsContainer goals={goals.data || []} />
    </div>
  );
}
