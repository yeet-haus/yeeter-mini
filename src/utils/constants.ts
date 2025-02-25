import { base, sepolia, optimism, arbitrum, gnosis, Chain } from "viem/chains";

type KEYCHAIN = {
  [key: string]: string;
};
type KeychainList = Record<string, KEYCHAIN>;

export const DEFAULT_CHAIN_ID = "0x2105";

export const WAGMI_CHAIN_OBJS: Record<string, Chain> = {
  "0x64": gnosis,
  "0xa": optimism,
  "0xa4b1": arbitrum,
  "0xaa36a7": sepolia,
  "0x2105": base,
};

export const GRAPH_URL: KEYCHAIN = {
  "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/8Syem3ZN88cut1wL8AqPHNo658Px7M2CkRuHAGuxvf6j`,
  "0x64": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/EGG5xEkiKKtGa9frTfBSmL2w7ZmzPDke5ZuvxDRwQcGe`,
  "0xa": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/55wEbRchfvjtWsy5NqLc4hp9C7xbX9yk8bAr3UQA8F7x`,
  "0xa4b1": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/BeGugH1TsMspZ7Nov1Uq2PQ98X78sqjuEy1JFGLyNgt5`,
  "0x2105": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/6vyAqRpCyrhLsfd6TfYAssvKywKhxJykkDbPxJZ4ZcEr`,
};

export const HAUS_GRAPH_URL: KEYCHAIN = {
  "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/3k93SNY5Y1r4YYWEuPY9mpCm2wnGoYDKRtk82QZJ3Kvw`,
  "0x64": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/6x9FK3iuhVFaH9sZ39m8bKB5eckax8sjxooBPNKWWK8r`,
  "0xa": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/CgH5vtz9CJPdcSmD3XEh8fCVDjQjnRwrSawg71T1ySXW`,
  "0xa4b1": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/GPACxuMWrrPSEJpFqupnePJNMfuArpFabrXLnWvXU2bp`,
  "0x2105": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/7yh4eHJ4qpHEiLPAk9BXhL5YgYrTrRE6gWy8x4oHyAqW`,
};

export const HAUS_RPC_DEFAULTS: KEYCHAIN = {
  "0x64": "https://rpc.gnosischain.com/",
  "0xa": `https://opt-mainnet.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_API_KEY
  }`,
  "0xa4b1": `https://arb-mainnet.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_API_KEY
  }`,
  "0xaa36a7": "https://eth-sepolia.g.alchemy.com/v2/demo",
  "0x2105": `https://base-mainnet.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_API_KEY
  }`,
};

export const EXPLORER_URL: KEYCHAIN = {
  "0x1": "https://etherscan.io",
  "0x64": "https://gnosisscan.io",
  "0x89": "https://polygonscan.com",
  "0xa": "https://optimistic.etherscan.io",
  "0xa4b1": "https://arbiscan.io",
  "0xaa36a7": "https://sepolia.etherscan.io",
  "0x2105": "https://basescan.org",
};

export const YEETER_DAO_REFERRER = "DHOnboarderShamanSummoner";

export const YEETER_CONTRACTS: KeychainList = {
  ONBOARDER_SUMMONER: {
    "0x64": "0x313f9A3C9A5041e9be00cf88b18962581A4eFb35",
    "0xa": "0x2875aEbb4472E5E579a2A5290c7B5A3C90484D5F",
    "0xa4b1": "0x2875aEbb4472E5E579a2A5290c7B5A3C90484D5F",
    "0x2105": "0x2875aEbb4472E5E579a2A5290c7B5A3C90484D5F",
    "0xaa36a7": "0x2875aEbb4472E5E579a2A5290c7B5A3C90484D5F",
  },
  ETH_YEETER_SINGLETON: {
    "0x64": "0xbe056B4187387D1Cb503370FeA2815e42981DfdF",
    "0xa": "0x8D60971eFf778966356c1cADD76d525E7B25cc6b",
    "0xa4b1": "0x8D60971eFf778966356c1cADD76d525E7B25cc6b",
    "0x2105": "0x8D60971eFf778966356c1cADD76d525E7B25cc6b",
    "0xaa36a7": "0x62fF4Ca410E9e58f5ce8B2Ad03695EF0ad990381",
  },
};

export const YEETER_SHAMAN_PERMISSIONS = "2";
export const DEFAULT_YEETER_VALUES = {
  isShares: false,
  feeRecipients: ["0xD0f8720846890a7961945261FE5012E4cA39918e"],
  feeAmounts: ["30000"],
  multiplier: "1000",
  minTribute: "5000000000000000",
};
export const DEFAULT_SUMMON_VALUES = {
  votingPeriodInSeconds: import.meta.env.VITE_DEV_ENV === "local" ? 120 : 43200,
  gracePeriodInSeconds: import.meta.env.VITE_DEV_ENV === "local" ? 60 : 21600,
  newOffering: "0",
  quorum: "0",
  sponsorThreshold: "1000000000000000000",
  minRetention: "66",
  votingTransferable: false,
  nvTransferable: false,
  shareAmounts: "1000000000000000000",
};
export const FEE_DISCLOSURE =
  "The Yeeter protocol fee is 3% on all contributions. Fees in the network's native token are sent to the Yeeter safe. These funds are used to maintain and enhance the platform while supporting the DAOhaus community.";
