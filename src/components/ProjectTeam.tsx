import { useDaoMembers } from "../hooks/useDaoMembers";
import { useYeeter } from "../hooks/useYeeter";
import { AddMemberTx } from "./AddMemberTx";
import { ProjectAddressListItem } from "./ProjectAddressListItem";
import { RequestFundingTx } from "./RequestFundingTx";
import { StatusUpdateTx } from "./StatusUpdateTx";

export const ProjectTeam = ({
  chainid,
  daoid,
  yeeterid,
  onProjectTeam,
}: {
  chainid?: string;
  daoid: string;
  yeeterid: string;
  onProjectTeam?: boolean;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  const { members } = useDaoMembers({
    chainid,
    daoid,
  });
  if (!yeeter || !chainid) return;

  const goalReached = Number(yeeter.balance) > Number(yeeter.goal);
  const canMakeFundingProposal =
    goalReached || (!goalReached && yeeter.isEnded);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-bold">Project Team</div>
      {onProjectTeam && (
        <>
          <div className="badge badge-accent text-base-100">
            You're on the project team
          </div>
          <AddMemberTx
            yeeterid={yeeterid}
            chainid={chainid}
            daoid={daoid}
            modalid="team-add-member-modal"
          />
          <div>
            <div className="text-base">Create updates for your funders.</div>
            <StatusUpdateTx
              yeeterid={yeeterid}
              chainid={chainid}
              daoid={daoid}
              modalid="team-status-form-modal"
            />
          </div>
          {canMakeFundingProposal && (
            <>
              {onProjectTeam && (
                <div className="flex flex-col gap-1">
                  <div className="text-base">
                    Request funds by creating a proposal
                  </div>
                  <RequestFundingTx
                    yeeterid={yeeterid}
                    chainid={chainid}
                    daoid={daoid}
                    modalid="funding-form-modal"
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className="text-base font-bold mt-3">Team Members</div>
      <div>
        {members &&
          members.map((member) => {
            return (
              <ProjectAddressListItem
                memberAddress={member.memberAddress}
                key={member.id}
              />
            );
          })}
      </div>
    </div>
  );
};
