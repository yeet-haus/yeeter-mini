import { formatShortDateTimeFromSeconds } from "../utils/dates";
import { toWholeUnits } from "../utils/helpers";
import { getProposalStatus } from "../utils/proposalsStatus";
import { ProposalItem } from "../utils/types";
import { VoteTx } from "./VoteTx";

export const ProposalUpdateCard = ({
  proposal,
  chainid,
  daoid,
  proposalType,
  onProjectTeam,
}: {
  proposal: ProposalItem;
  chainid: string;
  daoid: string;
  proposalType: "funding" | "member";
  onProjectTeam?: boolean;
}) => {
  const bgColor = proposalType === "member" ? "bg-secondary" : "bg-primary";

  const status = getProposalStatus(proposal);
  return (
    <>
      <div className={`card ${bgColor} text-primary-content w-full`}>
        <div className="card-body px-4 py-3">
          <div className="flex flex-row justify-between w-full">
            <p className="text-xs text-black-100">
              {formatShortDateTimeFromSeconds(proposal.createdAt)}
            </p>
            <div>
              <p className="text-xs text-base-100 text-right">{status}</p>
              {status === "Voting" && (
                <div className="text-xs text-white font-bold">
                  {Number(toWholeUnits(proposal.yesBalance)).toFixed(0)} Yes
                  {" - "}
                  {Number(toWholeUnits(proposal.noBalance)).toFixed(0)} No
                </div>
              )}
            </div>
          </div>
          <h2 className="card-title">{proposal.title}</h2>
          <p className="break-all">{proposal.description}</p>
          <div className="flex flex-row justify-between items-center">
            <a
              className="link link-primary text-base-100 text-sm"
              href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}/proposal/${proposal.proposalId}`}
              target="_blank"
            >
              More Info
            </a>
            {status === "Voting" && onProjectTeam && (
              <VoteTx
                chainid={chainid}
                daoid={daoid}
                proposalid={proposal.proposalId}
                modalid="vote-modal"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
