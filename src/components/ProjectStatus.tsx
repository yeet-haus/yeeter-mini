import { useYeeter } from "../hooks/useYeeter";
import { ProjectUpdates } from "./ProjectUpdates";

export const ProjectStatus = ({
  chainid,
  daoid,
  yeeterid,
  onProjectTeam,
  isFunder,
}: {
  chainid?: string;
  daoid: string;
  yeeterid: string;
  onProjectTeam?: boolean;
  isFunder?: boolean;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  if (!yeeter || !chainid) return;

  const goalReached = Number(yeeter.balance) > Number(yeeter.goal);

  return (
    <div className="flex flex-col gap-3">
      {yeeter.isComingSoon && (
        <div className="font-bold text-xl bg-secondary text-base-100 px-3 py-2">
          Coming Soon
        </div>
      )}
      {yeeter.isActive && !goalReached && (
        <div className="font-bold text-xl bg-accent text-base-100 px-3 py-2">
          Funding Active
        </div>
      )}
      {yeeter.isEnded && !goalReached && (
        <div className="font-bold text-xl bg-secondary text-base-100 px-3 py-2">
          Funding Goal Not Reached
        </div>
      )}
      {(yeeter.isActive || yeeter.isEnded) && goalReached && (
        <div className="font-bold text-xl bg-primary text-base-100 px-3 py-2">
          Funding Goal Reached
        </div>
      )}

      <ProjectUpdates
        chainid={chainid}
        yeeterid={yeeterid}
        daoid={daoid}
        isFunder={isFunder}
        onProjectTeam={onProjectTeam}
      />
    </div>
  );
};
