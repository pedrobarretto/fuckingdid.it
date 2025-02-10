import { Card } from '@/components/ui/card';
import { Goal } from '../../../../database.types';
import { Button } from '@/components/ui/button';
import * as emoji from 'node-emoji';
import { useReward } from 'react-rewards';
import { useState } from 'react';
import { updateGoal } from '../actions';
import { Loader2, Cog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';

export function GoalCard({ goal }: { goal: Goal }) {
  const { reward } = useReward(`rewardId-${goal.id}`, 'confetti', {
    position: 'absolute',
    lifetime: 100,
    angle: 90,
    // startVelocity: 10,
    // decay: 0.9,
    spread: 60,
    elementCount: 100,
  });
  const [level, setLevel] = useState(goal.level);
  const [xp, setXp] = useState(goal.xp);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleYes = async () => {
    setLoading(true);
    const newXp = xp + goal.xp_by_answer;
    if (newXp >= 96) {
      const newLevel = goal.level + 1;
      const res = await updateGoal({ level: newLevel, xp: 0, id: goal.id });
      if (res.success) {
        setLevel(goal.level + 1);
        setXp(0);
        reward();
        const levelSound = new Audio('sounds/level-reward.mp3');
        levelSound.volume = 0.5;
        levelSound.play().catch((error) => {
          console.error('Error when play sound: ', error);
        });
      } else {
        toast({
          title: `Oops! An error occurred ${emoji.get('cry')}`,
          description:
            "Sorry, we couldn't update your goal. Please try again later.",
          variant: 'destructive',
        });
      }
    } else {
      const res = await updateGoal({
        level: goal.level,
        xp: newXp,
        id: goal.id,
      });
      if (res.success) {
        setXp(newXp);
        reward();
        const xpSound = new Audio('sounds/reward-sound.mp3');
        xpSound.play().catch((error) => {
          console.error('Error when play sound: ', error);
        });
      } else {
        toast({
          title: `Oops! An error occurred ${emoji.get('cry')}`,
          description:
            "Sorry, we couldn't update your goal. Please try again later.",
          variant: 'destructive',
        });
      }
    }

    setLoading(false);
  };

  return (
    <Card className="p-6 rounded-xl shadow-md relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-[#333c4c]"
        onClick={() => redirect(`/goals/${goal.id}`)}
      >
        <Cog className="size-5" />
      </Button>

      <div className="flex items-center gap-4">
        <span className="text-7xl duration-1000 hover:animate-wiggle hover:cursor-pointer">
          {goal.avatar}
        </span>
        <div className="flex-1">
          <p className="font-bold text-lg text-orange-500">{goal.question}</p>
          <div className="mt-2">
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${xp}%` }}
              />
            </div>
            <div className="mt-2">
              <span className="text-sm text-white p-1 bg-[#169CF9] rounded-lg">
                Level: {level} {level >= 1 && emoji.get('fire')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Last update: {new Date(goal.updated_at).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            id={`rewardId-${goal.id}`}
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleYes}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Fuck Yeah'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
