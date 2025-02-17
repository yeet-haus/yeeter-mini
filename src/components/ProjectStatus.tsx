import { useDaoProposals } from "../hooks/useDaoProposals";
import { useYeeter } from "../hooks/useYeeter";
import { ExitForm } from "./ExitForm";
import { StatusUpdateForm } from "./StatusUpdateForm";

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

  const { proposals } = useDaoProposals({
    daoid,
    chainid,
    filter: "funding",
  });
  console.log("proposals", proposals);

  if (!yeeter || !chainid) return;

  const goalReached = Number(yeeter.balance) > Number(yeeter.goal);

  return (
    <div className="flex flex-col gap-4">
      {isFunder && (
        <div className="badge badge-accent text-base-100">You're a funder</div>
      )}

      {onProjectTeam && (
        <div className="badge badge-accent text-base-100">
          You're on the project team
        </div>
      )}
      {yeeter.isComingSoon && (
        <div className="font-bold text-xl">Coming Soon</div>
      )}
      {(yeeter.isActive || yeeter.isEnded) && goalReached && (
        <>
          <div className="font-bold text-xl">Funding Goal Reached</div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Project Team</div>
            <div className="text-base">
              Update funders by creating status updates.
            </div>
            <StatusUpdateForm
              yeeterid={yeeterid}
              chainid={chainid}
              daoid={daoid}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Funders</div>
            <div className="text-base">
              Look for status updates form the project team here.
            </div>
            <div className="text-base">
              If you disagree with how the funds are being spent, you can exit
              with yor funds (minus protocol fees)
            </div>
            <ExitForm yeeterid={yeeterid} chainid={chainid} daoid={daoid} />
          </div>
        </>
      )}
      {yeeter.isActive && !goalReached && (
        <div className="font-bold text-xl">Funding Active</div>
      )}

      {yeeter.isEnded && !goalReached && (
        <>
          <div className="font-bold text-xl">Funding Goal Not Reached</div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Funders</div>
            <div className="text-base">
              The project team might consider moving forward with the funds
              raised. Look for status updates here.
            </div>
            <div className="text-base">
              You can exit with yor funds (minus protocol fees).
            </div>
            <ExitForm yeeterid={yeeterid} chainid={chainid} daoid={daoid} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Project Team</div>
            <div className="text-base">
              Update funders by creating status updates here.
            </div>
          </div>
        </>
      )}
    </div>
  );
};
