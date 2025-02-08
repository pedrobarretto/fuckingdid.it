export function GoalsPerWeek({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (x: number) => void;
}) {
  const options = [1, 2, 3, 4, 5, 6, 7];
  const xpPerTask = Math.floor(100 / selected);

  return (
    <div>
      <div className="mb-3">
        <span className="text-gray-700">Goal per week</span>
      </div>
      <div className="flex mb-4 justify-between">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition 
              ${
                selected === option
                  ? 'border-orange-500 text-black'
                  : 'border-gray-300 text-gray-500 hover:border-gray-400'
              }`}
          >
            {option}x
          </button>
        ))}
      </div>

      <span className="text-gray-700 text-sm">
        <span className="font-semibold">{xpPerTask}</span> per yes. Up to 100 XP
        a week.
      </span>
    </div>
  );
}
