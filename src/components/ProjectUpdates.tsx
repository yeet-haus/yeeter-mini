import { useDaoProposals } from "../hooks/useDaoProposals";
import { useYeeter } from "../hooks/useYeeter";
import { StatusUpdateForm } from "./StatusUpdateForm";

export const ProjectUpdates = ({
  chainid,
  daoid,
  yeeterid,
  onProjectTeam,
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="text-base">
          Funders can find status updates and funding reuests from the project
          team here.
        </div>
        {onProjectTeam && (
          <StatusUpdateForm
            yeeterid={yeeterid}
            chainid={chainid}
            daoid={daoid}
          />
        )}

        <div className="font-bold text-xl">Status updates</div>
        <div className="font-bold text-xl">Funfing requests</div>
      </div>
    </div>
  );
};
