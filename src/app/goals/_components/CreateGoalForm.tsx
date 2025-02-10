'use client';

import { useState } from 'react';
import * as emoji from 'node-emoji';
import emojilib from 'emojilib';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Undo2 } from 'lucide-react';
import { createGoal } from '../actions';
import ConfettiPortal from '@/components/effects/ConfettiPortal';
import { GenericModal } from '@/components/modal/GenericModal';
import { redirect } from 'next/navigation';
import { GoalsPerWeek } from './GoalsPerWeek';
import { useReward } from 'react-rewards';

interface CreateGoalFormProps {
  onCancel: () => void;
}

export default function CreateGoalForm({ onCancel }: CreateGoalFormProps) {
  const [search, setSearch] = useState('');
  const [question, setQuestion] = useState('');
  const [avatar, setAvatar] = useState({ code: '', emoji: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [releaseConfeti, setReleaseConfeti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<number>(3);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const { reward } = useReward('rewardId', 'confetti', {
    position: 'absolute',
    lifetime: 100,
    angle: 90,
    spread: 60,
    elementCount: 100,
  });
  const xpPerTask = Math.floor(100 / selected);

  const emojiArray = Object.entries(emojilib).map(([emojiKey, keywords]) => {
    const code = keywords[0];
    const emojiChar = emoji.get(`:${code}:`) || emojiKey;
    return { code, keywords, emoji: emojiChar };
  });

  const filteredEmojis = emojiArray.filter((item) =>
    item.keywords.some((keyword) =>
      keyword.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreateGoal = async () => {
    if (!question.length || !avatar.code || !avatar.emoji) return;
    setIsLoading(true);
    await createGoal({
      avatar: avatar.emoji,
      question,
      week_frequency: selected,
      xp_by_answer: xpPerTask,
    });
    setIsOpen(true);
    setReleaseConfeti(true);

    const yeah = new Audio('/sounds/yeah.mp3');
    yeah.volume = 0.2;
    yeah.play().catch((error) => {
      console.error('Error when play sound: ', error);
    });

    setIsLoading(false);
  };

  const handleDemoYes = () => {
    const newXp = xp + xpPerTask;
    if (newXp >= 96) {
      reward();
      const levelSound = new Audio('sounds/level-reward.mp3');
      levelSound.volume = 0.5;
      levelSound.play().catch((error) => {
        console.error('Error when play sound: ', error);
      });
      setLevel(level + 1);
      setXp(100);
      setTimeout(() => {
        setXp(0);
      }, 300);
    } else {
      reward();
      const xpSound = new Audio('sounds/reward-sound.mp3');
      xpSound.play().catch((error) => {
        console.error('Error when play sound: ', error);
      });
      setXp(newXp);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Button
              onClick={onCancel}
              className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              {<Undo2 />} back
            </Button>
            <h2 className="text-xl font-bold text-orange-500">
              Just fucking do it!
            </h2>
          </div>
          <Input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Did you fucking _____ today?"
            className="bg-white text-orange-500 font-semibold"
          />

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Search for your emoji!"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-orange-500 font-semibold"
            />

            <div className="overflow-x-auto py-2">
              <div
                className="grid grid-flow-col auto-cols-max gap-2"
                style={{
                  gridTemplateRows: 'repeat(3, minmax(0, auto))',
                }}
              >
                {!filteredEmojis.length && (
                  <span>No matches for that search!</span>
                )}
                {filteredEmojis.map((item) => (
                  <Button
                    key={`${item.code}-${item.emoji}`}
                    type="button"
                    onClick={() =>
                      setAvatar({ code: item.code, emoji: item.emoji })
                    }
                    className={`text-2xl p-2 border rounded 
                    ${avatar.emoji === item.emoji ? 'bg-blue-200' : 'bg-white'} 
                    hover:bg-blue-100 transition-colors`}
                  >
                    {item.emoji}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <GoalsPerWeek selected={selected} setSelected={setSelected} />

          <Button
            onClick={handleCreateGoal}
            className="bg-orange-500 text-white hover:bg-orange-600 font-semibold"
            disabled={
              isLoading || !question.length || !avatar.code || !avatar.emoji
            }
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />} Create
            Goal
          </Button>
        </div>

        <div className="mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              <span className="text-7xl duration-1000 hover:animate-wiggle hover:cursor-pointer">
                {avatar.emoji || emoji.get(':question:')}
              </span>
              <div className="flex-1">
                <p className="font-bold text-lg text-orange-500">
                  {question || 'Your goal question will appear here'}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${xp}%` }}
                    ></div>
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
                {new Date().toLocaleDateString()} - {xpPerTask} XP per yes
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleDemoYes}
                  id="rewardId"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Fuck Yeah
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <GenericModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`You fucking did it! ${emoji.get('rocket')}`}
      >
        <div className="flex flex-col justify-center items-start">
          <span>Goal created successfully! {emoji.get('fire')}</span>
          <span className="mb-2">
            Now, you can start to achieve it, just{' '}
            {<strong className="text-orange-500">fucking do it!</strong>}
          </span>
          <Button
            onClick={() => {
              setIsOpen(false);
              onCancel();
              redirect('/goals');
            }}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Check goals
          </Button>
        </div>
      </GenericModal>

      {releaseConfeti && <ConfettiPortal />}
    </>
  );
}
