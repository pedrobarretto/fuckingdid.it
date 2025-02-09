import { Goal } from '../../../../database.types';
import { GoalCard } from './GoalCard';

interface GoalsListProps {
  goals: Goal[];
}

export default function GoalsList({ goals }: GoalsListProps) {
  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard goal={goal} key={goal.id} />
      ))}
    </div>
  );
}
