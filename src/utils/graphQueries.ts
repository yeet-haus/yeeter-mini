import { gql } from "graphql-request";

const yeeterFields = `
  id
  createdAt
  dao {
    id
  }
  endTime
  startTime
  isShares
  multiplier
  minTribute
  goal
  balance
  yeetCount
`;

export const FIND_YEETER = gql`
  query yeeter($shamanAddress: String!) {
    yeeter(id: $shamanAddress) {
      ${yeeterFields}
    }
  }
`;

export const LIST_ALL_YEETERS = gql`
  {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc,
    ) {
      ${yeeterFields}

    }
  }
`;

export const LIST_OPEN_YEETERS = gql`
  query yeeters($now: String!) {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc,
      where: { endTime_gte: $now }
    ) {
      ${yeeterFields}

    }
  }
`;

export const LIST_CLOSED_YEETERS = gql`
  query yeeters($now: String!) {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc,
      where: { endTime_lte: $now }
    ) {
      ${yeeterFields}

    }
  }
`;

export const LIST_YEETS = gql`
  query yeets($shamanAddress: String!) {
    yeets(
      where: { yeeter: $shamanAddress }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      contributor
      amount
      shares
      message
    }
  }
`;

// addtional where for the below if needed to scope to summoner referrer
// dao_: {
//   referrer: "${YEET24_REFERRER}"
// }

export const LIST_YEETS_FOR_ADDRESS = gql`
  query yeets($address: String!) {
    yeets(
      where: { contributor: $address }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      contributor
      amount
      shares
      message
      yeeter {
        ${yeeterFields}
      }
    }
  }
`;

export const FIND_YEETER_PROFILE = gql`
  query record($daoid: String!) {
    records(
      where: { dao: $daoid, table: "yeetDetails" }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      createdAt
      createdBy
      tag
      table
      contentType
      content
      queryType
      dao {
        id
        name
      }
    }
    dao(id: $daoid) {
      id
      name
    }
  }
`;
const proposalFields = `
  id
  createdAt
  createdBy
  proposedBy
  txHash
  proposalId
  prevProposalId
  proposalDataHash
  proposalData
  actionGasEstimate
  details
  title
  description
  proposalType
  contentURI
  contentURIType
  sponsorTxHash
  sponsored
  selfSponsor
  sponsor
  sponsorTxAt
  votingPeriod
  votingStarts
  votingEnds
  gracePeriod
  graceEnds
  expiration
  expirationQueryField
  cancelledTxHash
  cancelledBy
  cancelled
  cancelledTxAt
  yesBalance
  noBalance
  yesVotes
  noVotes
  processTxHash
  processedBy
  processed
  processTxAt
  actionFailed
  passed
  proposalOffering
  maxTotalSharesAndLootAtYesVote
  tributeToken
  tributeOffered
  tributeTokenSymbol
  tributeTokenDecimals
  tributeEscrowRecipient
  sponsorMembership {
    memberAddress
    shares
    delegateShares
  }
  dao {
    totalShares
    quorumPercent
    minRetentionPercent
  }
  votes {
    id
    txHash
    createdAt
    daoAddress
    approved
    balance
    member {
      id
      memberAddress
    }
  }
`;

export const LIST_ALL_DAO_PROPOSALS = gql`
  query proposal(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $daoid: String!
  ) {
    proposals(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDescription: $orderDescription,
      where: { dao: $daoid }
    ) {
      ${proposalFields}
    }
  }
`;

export const LIST_SIGNAL_DAO_PROPOSALS = gql`
  query proposal(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $daoid: String!
  ) {
    proposals(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDescription: $orderDescription,
      where: { 
        dao: $daoid
        proposalType: "SIGNAL" 
        cancelled: false
        sponsored: true
        actionFailed: false 
      }
    ) {
      ${proposalFields}
    }
  }
`;

export const LIST_MEMBER_DAO_PROPOSALS = gql`
  query proposal(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $daoid: String!
  ) {
    proposals(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDescription: $orderDescription,
      where: { 
        dao: $daoid
        proposalType: "ISSUE" 
        cancelled: false
        sponsored: true
        actionFailed: false 
      }
    ) {
      ${proposalFields}
    }
  }
`;

export const LIST_FUNDING_DAO_PROPOSALS = gql`
  query proposal(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $daoid: String!
  ) {
    proposals(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDescription: $orderDescription,
      where: { 
        dao: $daoid
        proposalType_contains_nocase: "TRANSFER"
        cancelled: false
        sponsored: true
        actionFailed: false 
      }
    ) {
      ${proposalFields}
    }
  }
`;

export const LIST_ACTIVE_DAO_PROPOSALS = gql`
  query proposal(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $daoid: String!
  ) {
    proposals(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDescription: $orderDescription,
      where: { 
        dao: $daoid           
        cancelled: false
        sponsored: true
        processed: false
        actionFailed: false 
      }
    ) {
      ${proposalFields}
    }
  }
`;

const memberFields = `
  id
  createdAt
  txHash
  memberAddress
  shares
  loot
  sharesLootDelegateShares
  delegatingTo
  delegateShares
  delegateOfCount
  lastDelegateUpdateTxHash
  votes {
    txHash
    createdAt
    approved
    balance
  }`;

export const FIND_MEMBER = gql`
  query member($memberid: String!) {
    member(id: $memberid) {
      ${memberFields}
    }
  }
`;

export const LIST_ALL_DAO_SHAREHOLDERS = gql`
  query member(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $daoid: String!
  ) {
    members(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDescription: $orderDescription,
      where: { dao: $daoid, shares_gt: 0 }
    ) {
      ${memberFields}
    }
  }
`;

const daoFields = `
  id
  createdAt
  createdBy
  txHash
  safeAddress
  lootPaused
  sharesPaused
  gracePeriod
  votingPeriod
  proposalOffering
  quorumPercent
  sponsorThreshold
  minRetentionPercent
  shareTokenName
  shareTokenSymbol
  sharesAddress
  lootTokenName
  lootTokenSymbol
  lootAddress
  totalShares
  totalLoot
  latestSponsoredProposalId
  proposalCount
  activeMemberCount
  existingSafe
  delegatedVaultManager
  forwarder
  referrer
  name
  rawProfile: records(
    first: 1
    orderBy: createdAt
    orderDirection: desc
    where: { table: "daoProfile" }
  ) {
    createdAt
    createdBy
    contentType
    content
  }
  shamen: shaman(
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    createdAt
    shamanAddress
    permissions
  }
  vaults (where: {active: true}){
    id
    createdAt
    active
    ragequittable
    name
    safeAddress
  }
`;

export const FIND_DAO = gql`
  query dao($daoid: String!) {
    dao(id: $daoid) {
      ${daoFields}
    }
  }
`;

const recordsFields = `
  id
  createdAt
  createdBy
  tag
  table
  contentType
  content
  queryType
  dao {
    id
    name
  }
`;

export const LIST_RECORDS = gql`
  query record(
    $daoid: String!
    $table: String!
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
  ) {
    records(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { dao: $daoid, table: $table }
    ) {
      ${recordsFields}
    }
  }
`;

export const LAST_RECORD = gql`
  query record(
    $daoid: String!
    $table: String!
  ) {
    records(
      first: 1
      orderBy: createdAt
      orderDirection: desc
      where: { dao: $daoid, table: $table }
    ) {
      ${recordsFields}
    }
  }
`;
