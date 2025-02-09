'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as emoji from 'node-emoji';
import { useReward } from 'react-rewards';
import { useState } from 'react';
import { Loader2, Cog } from 'lucide-react';

export function DemoGoalCard() {
  const { reward } = useReward('rewardId-homepage', 'confetti');
  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleYes = async () => {
    setLoading(true);
    const newXp = xp + 33;
    setXp(newXp);
    if (newXp >= 96) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setXp(0);
    }

    setTimeout(() => {
      reward();
    }, 500);
    const sogra = new Audio('sounds/sogra.mp3');
    sogra.play().catch((error) => {
      console.error('Error when play sound: ', error);
    });
    setLoading(false);
  };

  return (
    <Card className="p-6 rounded-xl shadow-md relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-[#333c4c]"
      >
        <Cog className="size-5" />
      </Button>

      <div className="flex items-center gap-4">
        <span className="text-7xl duration-1000 hover:animate-wiggle hover:cursor-pointer">
          {emoji.get('fire')}
        </span>
        <div className="flex-1">
          <p className="font-bold text-lg text-orange-500">
            Did you fucking went to the gym?
          </p>
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
          Last update: {new Date().toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            id="rewardId-homepage"
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
          {/* <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600"
          >
            No
          </Button> */}
        </div>
      </div>
    </Card>
  );
}
