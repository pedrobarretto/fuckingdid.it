'use server';

import { createClient } from '@/utils/supabase/server';

export async function createGoal(goal: { avatar: string; question: string }) {
  const db = await createClient();

  return await db.from('goals').insert({
    avatar: goal.avatar,
    question: goal.question,
  });
}
