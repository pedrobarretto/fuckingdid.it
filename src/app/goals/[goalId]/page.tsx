import { createClient } from '@/utils/supabase/server';
import { GoalConfig } from './_components/GoalConfig';

type Props = {
  params: Promise<{ goalId: string }>;
};

export default async function GoalConfigPage({ params }: Props) {
  const { goalId } = await params;
  const db = await createClient();
  const goal = await db.from('goals').select('*').eq('id', Number(goalId));

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12 w-full mt-14">
      <GoalConfig goals={goal.data || []} />
    </div>
  );
}
