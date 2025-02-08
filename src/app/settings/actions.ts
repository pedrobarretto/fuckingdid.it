'use server';

import { Err, Ok } from '@/utils/ErrorHandler';
import { createClient } from '@/utils/supabase/server';

export async function deleteAccount(userId: string) {
  const db = await createClient();

  const { error: userError, data: userData } = await db.rpc('delete_user');
  if (userError) return Err('UNKNOWN_ERROR', [userError]);

  const { error: goalsError, data: goalsData } = await db
    .from('goals')
    .delete()
    .eq('user_id', userId);

  if (goalsError) {
    if (!userError) return Ok({ userData, goalsData });

    return Err('UNKNOWN_ERROR', [userError]);
  }

  return Ok({ userData, goalsData });
}
