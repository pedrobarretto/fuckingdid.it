'use server';

import { createClient } from '@/utils/supabase/server';

export async function createGoal(goal: {
  avatar: string;
  question: string;
  week_frequency: number;
  xp_by_answer: number;
}) {
  const db = await createClient();

  return await db.from('goals').insert({
    avatar: goal.avatar,
    question: goal.question,
    week_frequency: goal.week_frequency,
    xp_by_answer: goal.xp_by_answer,
  });
}
