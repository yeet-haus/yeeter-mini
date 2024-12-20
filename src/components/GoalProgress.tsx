import { YeeterItem } from "../utils/types";
import { calcProgressPerc } from "../utils/yeetDataHelpers";

export const GoalProgress = ({ yeeter }: { yeeter: YeeterItem }) => {
  if (!yeeter) return;

  const perc = calcProgressPerc(yeeter.balance, yeeter.goal);
  return (
    <div
      className="radial-progress bg-accent text-primary-content text-2xl font-bold font-header border-accent border-4"
      // @ts-expect-error fix unknown
      style={{ "--value": perc, "--size": "9rem", "--thickness": ".75rem" }}
      role="progressbar"
    >
      {`${perc.toFixed()}%`}
    </div>
  );
};
