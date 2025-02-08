'use server';

import { Err, Ok } from '@/utils/ErrorHandler';
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

export async function updateGoal(goal: {
  level: number;
  xp: number;
  id: number;
}) {
  const db = await createClient();

  const { data, error } = await db
    .from('goals')
    .update({ level: goal.level, xp: goal.xp })
    .eq('id', goal.id);

  if (error) {
    return Err('UNKNOWN_ERROR');
  }

  return Ok(data);
}
