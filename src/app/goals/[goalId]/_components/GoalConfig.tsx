'use client';

import { redirect } from 'next/navigation';
import { Goal } from '../../../../../database.types';
import { Card } from '@/components/ui/card';
import * as emoji from 'node-emoji';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { GoalsPerWeek } from '../../_components/GoalsPerWeek';
import { Loader2, Undo2 } from 'lucide-react';
import { GenericModal } from '@/components/modal/GenericModal';
import { deleteGoal, updateGoal } from '../actions';
import { useToast } from '@/hooks/use-toast';

export function GoalConfig({ goals }: { goals: Goal[] }) {
  if (!goals.length) redirect('/error');
  const [goal] = goals;
  const { toast } = useToast();
  const [selected, setSelected] = useState(goal.week_frequency);
  const [action, setAction] = useState<'update' | 'delete'>('update');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const xpPerTask = Math.floor(100 / selected);

  const handleClick = (action: 'update' | 'delete') => {
    setAction(action);
    setIsOpen(true);
  };

  const handleDeleteOrUpdate = async () => {
    setIsLoading(true);
    if (action === 'update') {
      const res = await updateGoal({
        id: goal.id,
        xp_by_answer: xpPerTask,
        week_frequency: selected,
      });
      if (res.success) {
        setIsLoading(false);
        setIsOpen(false);
        redirect('/goals');
      }
    }
    if (action === 'delete') {
      const res = await deleteGoal(goal.id);
      if (res.success) {
        setIsLoading(false);
        setIsOpen(false);
        redirect('/goals');
      }
    }

    toast({
      title: 'Oops! An error has occurred!',
      description: `Sorry, there was an error ${
        action === 'update' ? 'updating' : 'deleting'
      } your goal.`,
      variant: 'destructive',
    });
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={() => redirect('/goals')}
        className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
      >
        {<Undo2 />} back
      </Button>

      <div className="mb-6">
        <Card className="p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <span className="text-7xl duration-1000 hover:animate-wiggle hover:cursor-pointer">
              {goal.avatar}
            </span>
            <div className="flex-1">
              <p className="font-bold text-lg text-orange-500">
                {goal.question || 'Your goal question will appear here'}
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.xp}%` }}
                  ></div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-white p-1 bg-[#169CF9] rounded-lg">
                    Level: {goal.level} {goal.level >= 1 && emoji.get('fire')}
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
                disabled
                className="bg-orange-500 hover:bg-orange-600"
              >
                Yes
              </Button>
              {/* <Button
                variant="ghost"
                size="sm"
                disabled
                className="text-red-500 hover:text-red-600"
              >
                No
              </Button> */}
            </div>
          </div>
        </Card>
      </div>

      <GoalsPerWeek selected={selected} setSelected={setSelected} />

      <div className="w-full gap-3 flex flex-col">
        <Button
          className="bg-orange-500 text-white hover:bg-orange-600"
          onClick={() => handleClick('update')}
        >
          Update Goal
        </Button>
        <Button
          variant={'ghost'}
          className="text-red-500 hover:text-red-600"
          onClick={() => handleClick('delete')}
        >
          Delete Goal
        </Button>
      </div>

      <GenericModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`${
          String(action).charAt(0).toUpperCase() + String(action).slice(1)
        } goal?`}
      >
        <div className="flex flex-col justify-center items-start">
          <span>
            Are you sure you want to{' '}
            {<strong className="text-orange-500">{action}</strong>} your goal?
          </span>
          <div className="flex justify-between items-center flex-row gap-3 mt-4">
            <Button
              onClick={handleDeleteOrUpdate}
              variant={'ghost'}
              className="text-red-500 hover:text-red-600"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              {action === 'update' ? 'Update' : 'Delete'}
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </GenericModal>
    </div>
  );
}
