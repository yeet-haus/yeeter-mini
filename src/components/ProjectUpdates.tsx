import { useDaoListRecords } from "../hooks/useDaoListRecords";
import { useDaoProposals } from "../hooks/useDaoProposals";
import { useYeeter } from "../hooks/useYeeter";
import { nowInSeconds } from "../utils/helpers";
import { StatusRecord } from "../utils/types";
import { ProposalUpdateCard } from "./ProposalUpdateCard";
import { StatusUpdateCard } from "./StatusUpdateCard";
import { StatusUpdateTx } from "./StatusUpdateTx";

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

  const { proposals: memberProposals } = useDaoProposals({
    daoid,
    chainid,
    filter: "member",
  });

  const { records } = useDaoListRecords({
    daoid,
    chainid,
    table: "yeetProjectUpdate",
  }) as { records: StatusRecord[] | undefined };

  const now = nowInSeconds();
  const passedOrActiveProps = proposals?.filter(
    (p) => p.passed || Number(p.graceEnds) > now
  );

  if (!yeeter || !chainid) return;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="text-base">
          Funders can find status updates and funding reuests from the project
          team here.
        </div>
        {onProjectTeam && (
          <StatusUpdateTx
            yeeterid={yeeterid}
            chainid={chainid}
            daoid={daoid}
            modalid="status-updates-form-modal"
          />
        )}

        <div className="font-bold text-xl mt-4">Status updates</div>
        {records &&
          records.map((r) => {
            return <StatusUpdateCard key={r.id} statusRecord={r} />;
          })}

        {!records || (records.length < 1 && <p>No updates</p>)}
        <div className="font-bold text-xl mt-3">Funding requests</div>
        {passedOrActiveProps &&
          passedOrActiveProps.map((p) => {
            return (
              <ProposalUpdateCard
                key={p.id}
                proposal={p}
                chainid={chainid}
                daoid={daoid}
                proposalType="funding"
              />
            );
          })}

        {!passedOrActiveProps ||
          (passedOrActiveProps.length < 1 && <p>No requests</p>)}

        <div className="font-bold text-xl mt-3">Project team additions</div>
        {memberProposals &&
          memberProposals.map((p) => {
            return (
              <ProposalUpdateCard
                key={p.id}
                proposal={p}
                chainid={chainid}
                daoid={daoid}
                proposalType="member"
              />
            );
          })}
        {!memberProposals ||
          (memberProposals.length < 1 && <p>No team member additions</p>)}
      </div>
    </div>
  );
};
