export type YeeterItem = {
  id: string;
  createdAt: string;
  dao: {
    id: string;
    name: string;
  };
  endTime: string;
  startTime: string;
  isShares: boolean;
  multiplier: string;
  minTribute: string;
  goal: string;
  balance: string;
  yeetCount: string;
  isActive: boolean;
  isEnded: boolean;
  isComingSoon: boolean;
  isFull: boolean;
  yeets?: YeetsItem[];
};

export type RecordItem = {
  content: string;
  contentType: string;
  dao: {
    name: string;
  };
};

export type YeeterMetadata = {
  daoId: string;
  icon?: string;
  links?: string[];
  missionStatement?: string;
  projectDetails?: string;
  name?: string;
};

export type YeetsItem = {
  amount: string;
  contributor: string;
  createdAt: string;
  id: string;
  message: string;
  shares: string;
  yeeter: YeeterItem;
};

export type SummonParams = {
  daoName?: string;
  description?: string;
  tokenName?: string;
  tokenSymbol?: string;
  lootTokenName?: string;
  lootTokenSymbol?: string;
  votingTransferable?: boolean;
  nvTransferable?: boolean;
  quorum?: string;
  minRetention?: string;
  sponsorThreshold?: string;
  newOffering?: string;
  votingPeriod?: string;
  votingPeriodInSeconds?: number;
  gracePeriod?: string;
  gracePeriodInSeconds?: number;
  shamans?:
    | ""
    | {
        shamanAddresses: string[];
        shamanPermissions: string[];
      };
  members?:
    | ""
    | {
        memberAddresses: string[];
        memberShares: string[];
        memberLoot: string[];
      };
};
