'use client';

import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Goal } from '../../../../database.types';
import CreateGoalForm from './CreateGoalForm';
import GoalsList from './GoalsList';

interface GoalsContainerProps {
  goals: Goal[];
}

export function GoalsContainer({ goals }: GoalsContainerProps) {
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  return (
    <>
      {isAddingGoal ? (
        <CreateGoalForm onCancel={() => setIsAddingGoal(false)} />
      ) : (
        <div className="flex flex-col gap-5 mb-4">
          <GoalsList goals={goals} />
          <div
            onClick={() => setIsAddingGoal(true)}
            className="flex items-center flex-col text-center bg-white text-orange-500 rounded-xl p-10 gap-3 hover:cursor-pointer hover:bg-orange-500 hover:text-white transition-hover duration-200"
          >
            <CirclePlus />
            <span className="font-bold">Create new goal</span>
          </div>
        </div>
      )}
    </>
  );
}
