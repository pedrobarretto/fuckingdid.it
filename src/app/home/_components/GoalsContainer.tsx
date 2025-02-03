'use client';

import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Goal } from '../../../../database.types';
import * as emoji from 'node-emoji';
import emojilib from 'emojilib';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function GoalsContainer({ goals }: { goals: Goal[] }) {
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [search, setSearch] = useState('');
  const [question, setQuestion] = useState('');
  const [avatar, setAvatar] = useState('');

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

  return (
    <>
      {isAddingGoal ? (
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Add New Goal</h2>

            <Input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />

            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Search emoji"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border rounded w-full"
              />

              <div className="overflow-x-auto py-2">
                <div
                  className="grid grid-flow-col auto-cols-max gap-2"
                  style={{
                    gridTemplateRows: 'repeat(3, minmax(0, auto))',
                  }}
                >
                  {filteredEmojis.map((item) => (
                    <Button
                      key={`${item.code}-${Math.random()}`}
                      type="button"
                      onClick={() => setAvatar(item.emoji)}
                      className={`text-2xl p-2 border rounded 
                  ${avatar === item.emoji ? 'bg-blue-200' : 'bg-white'} 
                  hover:bg-blue-100 transition-colors`}
                    >
                      {item.emoji}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button type="submit">Add Goal</Button>
          </div>

          <div className="mt-6">
            <Card className="p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{avatar || '😀'}</span>
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
      ) : (
        <>
          <div
            onClick={() => setIsAddingGoal(true)}
            className="flex items-center flex-col text-center bg-white rounded-xl p-10 gap-3 hover:cursor-pointer hover:bg-orange-500 hover:text-white transition-hover duration-200"
          >
            <CirclePlus />
            <span className="font-bold">Create new goal</span>
          </div>

          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center flex-col text-center bg-white rounded-xl p-16 mt-5"
            >
              {goal.question}
              <span className="text-4xl">{emoji.get(goal.avatar)}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
}
