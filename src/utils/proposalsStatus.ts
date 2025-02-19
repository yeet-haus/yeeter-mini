import { nowInSeconds } from "./helpers";
import { ProposalItem } from "./types";
import { checkHasQuorum } from "./units";

export type ProposalStatus =
  | "Unsponsored"
  | "Voting"
  | "Grace"
  | "Expired"
  | "Cancelled"
  | "Ready for Execution"
  | "Failed"
  | "Passed"
  | "Execution Failed"
  | "Unknown";

export const PROPOSAL_STATUS: { [index: string]: ProposalStatus } = {
  unsponsored: "Unsponsored",
  voting: "Voting",
  grace: "Grace",
  expired: "Expired",
  cancelled: "Cancelled",
  needsProcessing: "Ready for Execution",
  failed: "Failed",
  passed: "Passed",
  actionFailed: "Execution Failed",
  unknown: "Unknown",
};

export const isProposalUnsponsored = (proposal: ProposalItem): boolean => {
  return (
    !proposal.sponsored && !proposal.cancelled && !isProposalExpired(proposal)
  );
};

export const isProposalCancelled = (proposal: ProposalItem): boolean =>
  proposal.cancelled;

export const isProposalPassed = (proposal: ProposalItem): boolean =>
  proposal.passed;

export const isProposalActionFailed = (proposal: ProposalItem): boolean =>
  proposal.actionFailed;

export const isProposalInVoting = (proposal: ProposalItem): boolean => {
  const now = nowInSeconds();
  return (
    Number(proposal.votingStarts) < now && Number(proposal.votingEnds) > now
  );
};

export const isProposalInGrace = (proposal: ProposalItem): boolean => {
  const now = nowInSeconds();
  return Number(proposal.votingEnds) < now && Number(proposal.graceEnds) > now;
};

export const isProposalExpired = (proposal: ProposalItem): boolean =>
  Number(proposal.expiration) > 0 &&
  !proposal.cancelled &&
  Number(proposal.expiration) <
    Number(proposal.votingPeriod) +
      Number(proposal.gracePeriod) +
      nowInSeconds();

export const proposalNeedsProcessing = (proposal: ProposalItem): boolean =>
  !proposal.processed &&
  proposal.sponsored &&
  !proposal.cancelled &&
  nowInSeconds() > Number(proposal.graceEnds) &&
  Number(proposal.yesBalance) > Number(proposal.noBalance);

export const isProposalFailed = (proposal: ProposalItem): boolean =>
  proposal.sponsored &&
  !proposal.cancelled &&
  nowInSeconds() > Number(proposal.graceEnds) &&
  (!passedQuorum(proposal) ||
    Number(proposal.yesBalance) <= Number(proposal.noBalance));

const isMinRetentionFailure = (proposal: ProposalItem): boolean => {
  return (
    proposal.sponsored &&
    !proposal.cancelled &&
    proposal.processed &&
    !proposal.passed &&
    failedMinRetention(proposal)
  );
};

const failedMinRetention = (proposal: ProposalItem): boolean => {
  const propPercent =
    (Number(proposal.maxTotalSharesAndLootAtYesVote) *
      Number(proposal.dao.minRetentionPercent)) /
    100;

  return Number(proposal.dao.totalShares) < propPercent;
};

const isUnknownFailure = (proposal: ProposalItem): boolean => {
  return (
    proposal.sponsored &&
    !proposal.cancelled &&
    proposal.processed &&
    !proposal.passed
  );
};

export const passedQuorum = (proposal: ProposalItem): boolean => {
  return checkHasQuorum({
    yesVotes: Number(proposal.yesBalance),
    totalShares: Number(proposal.dao.totalShares),
    quorumPercent: Number(proposal.dao.quorumPercent),
  });
};

export const getProposalStatus = (proposal: ProposalItem): ProposalStatus => {
  if (isProposalUnsponsored(proposal)) {
    return PROPOSAL_STATUS["unsponsored"];
  }
  if (isProposalCancelled(proposal)) {
    return PROPOSAL_STATUS["cancelled"];
  }
  if (isProposalActionFailed(proposal)) {
    return PROPOSAL_STATUS["actionFailed"];
  }
  if (isProposalPassed(proposal)) {
    return PROPOSAL_STATUS["passed"];
  }
  if (isProposalInVoting(proposal)) {
    return PROPOSAL_STATUS["voting"];
  }
  if (isProposalInGrace(proposal)) {
    return PROPOSAL_STATUS["grace"];
  }
  // processing check needs to be before failed check
  // a failed proposal doesn't need processing unless it failed due to quorum
  if (proposalNeedsProcessing(proposal)) {
    return PROPOSAL_STATUS["needsProcessing"];
  }
  if (isProposalFailed(proposal)) {
    return PROPOSAL_STATUS["failed"];
  }
  if (isProposalExpired(proposal)) {
    return PROPOSAL_STATUS["expired"];
  }
  if (isMinRetentionFailure(proposal)) {
    return PROPOSAL_STATUS["failed"];
  }
  if (isUnknownFailure(proposal)) {
    return PROPOSAL_STATUS["failed"];
  }
  return PROPOSAL_STATUS["unknown"];
};
