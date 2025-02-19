import { formatShortDateTimeFromSeconds } from "../utils/dates";
import { getProposalStatus } from "../utils/proposalsStatus";
import { ProposalItem } from "../utils/types";

export const ProposalUpdateCard = ({
  proposal,
  chainid,
  daoid,
  proposalType,
}: {
  proposal: ProposalItem;
  chainid: string;
  daoid: string;
  proposalType: "funding" | "member";
}) => {
  const bgColor = proposalType === "member" ? "bg-secondary" : "bg-primary";
  return (
    <>
      <div className={`card ${bgColor} text-primary-content w-full`}>
        <div className="card-body px-4 py-3">
          <div className="flex flex-row justify-between w-full">
            <p className="text-xs text-black-100">
              {formatShortDateTimeFromSeconds(proposal.createdAt)}
            </p>
            <p className="text-xs text-base-100 text-right">
              {getProposalStatus(proposal)}
            </p>
          </div>
          <h2 className="card-title">{proposal.title}</h2>
          <p className="break-all">{proposal.description}</p>
          <a
            className="link link-primary text-base-100 text-sm"
            href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}/proposal/${proposal.proposalId}`}
            target="_blank"
          >
            More Info
          </a>
        </div>
      </div>
    </>
  );
};
