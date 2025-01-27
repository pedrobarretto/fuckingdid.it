'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const db = await createClient();
  const { data } = await db.auth.getUser();
  if (!data.user) redirect('/login');

  return (
    <div>
      <span>home</span>
    </div>
  );
}
