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

interface CreateGoalFormProps {
  onCancel: () => void;
}

export default function CreateGoalForm({ onCancel }: CreateGoalFormProps) {
  const [search, setSearch] = useState('');
  const [question, setQuestion] = useState('');
  const [avatar, setAvatar] = useState({ code: '', emoji: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [releaseConfeti, setReleaseConfeti] = useState(false);

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
    await createGoal({ avatar: avatar.code, question });
    setReleaseConfeti(true);

    const yeah = new Audio('/sounds/yeah.mp3');
    const caprio = new Audio('/sounds/dicaprio-line.mp3');
    caprio.volume = 1;
    yeah.volume = 0.2;
    caprio.play().catch((error) => {
      console.error('Erro ao tocar o som:', error);
    });
    yeah.play().catch((error) => {
      console.error('Erro ao tocar o som:', error);
    });

    setIsLoading(false);
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

          <Button
            onClick={handleCreateGoal}
            className="bg-orange-500 text-white hover:bg-orange-600 font-semibold"
            // disabled={
            //   isLoading || !question.length || !avatar.code || !avatar.emoji
            // }
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />} Create
            Goal
          </Button>
        </div>

        <div className="mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              <span className="text-4xl">
                {avatar.emoji || emoji.get(':question:')}
              </span>
              <div className="flex-1">
                <p className="font-bold text-lg">
                  {question || 'Your goal question will appear here'}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Yes
                </Button>
                <Button variant="outline" size="sm">
                  No
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {releaseConfeti && <ConfettiPortal />}
    </>
  );
}
