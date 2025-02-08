'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function handleLogOut() {
  const db = await createClient();
  const { error } = await db.auth.signOut();
  if (error) console.error(error);
  redirect('/login');
}
