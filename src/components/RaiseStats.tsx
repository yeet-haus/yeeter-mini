import { toWholeUnits } from "../utils/helpers";
import { YeeterItem } from "../utils/types";

export const RaiseStats = ({ yeeter }: { yeeter: YeeterItem }) => {
  if (!yeeter) return;

  return (
    <div className="stats shadow">
      <div className="stat place-items-center">
        <div className="stat-title">Raised</div>
        <div className="stat-value font-header">
          {toWholeUnits(yeeter?.balance)}
        </div>
        <div className="stat-desc">ETH</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Goal</div>
        <div className="stat-value text-secondary font-header">
          {toWholeUnits(yeeter?.goal)}
        </div>
        <div className="stat-desc text-secondary">ETH</div>
      </div>
    </div>
  );
};
