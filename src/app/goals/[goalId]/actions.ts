'use server';

import { Err, Ok } from '@/utils/ErrorHandler';
import { createClient } from '@/utils/supabase/server';

export async function updateGoal(goal: {
  id: number;
  xp_by_answer: number;
  week_frequency: number;
}) {
  const db = await createClient();
  const { data, error } = await db
    .from('goals')
    .update({
      xp_by_answer: goal.xp_by_answer,
      week_frequency: goal.week_frequency,
    })
    .eq('id', goal.id);

  if (error) return Err('UNKNOWN_ERROR');
  return Ok(data);
}

export async function deleteGoal(goalId: number) {
  const db = await createClient();
  const { data, error } = await db.from('goals').delete().eq('id', goalId);
  if (error) return Err('UNKNOWN_ERROR');
  return Ok(data);
}
