import { Goal } from '../../../../database.types';

interface GoalsListProps {
  goals: Goal[];
}

export default function GoalsList({ goals }: GoalsListProps) {
  return (
    <>
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="flex items-center flex-col text-center bg-white rounded-xl p-16 mt-5"
        >
          {goal.question}
          <span className="text-4xl">{goal.avatar}</span>
        </div>
      ))}
    </>
  );
}
