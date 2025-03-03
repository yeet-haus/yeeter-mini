export const getGraphUrl = ({
  chainid,
  graphKey,
  subgraphKey,
}: {
  chainid: string;
  graphKey: string;
  subgraphKey: string;
}): string => {
  const subgraphHash = SUBGRAPH_IDS[subgraphKey][chainid];
  if (!subgraphHash) {
    console.log("invalid chainid or subgraphkey");
  }
  return `https://gateway-arbitrum.network.thegraph.com/api/${graphKey}/subgraphs/id/${subgraphHash}`;
};

type KEYCHAIN = Record<string, string>;
type KeychainList = Record<string, KEYCHAIN>;

const SUBGRAPH_IDS: KeychainList = {
  YEETER: {
    "0xaa36a7": `8Syem3ZN88cut1wL8AqPHNo658Px7M2CkRuHAGuxvf6j`,
    "0x64": `EGG5xEkiKKtGa9frTfBSmL2w7ZmzPDke5ZuvxDRwQcGe`,
    "0xa": `55wEbRchfvjtWsy5NqLc4hp9C7xbX9yk8bAr3UQA8F7x`,
    "0xa4b1": `BeGugH1TsMspZ7Nov1Uq2PQ98X78sqjuEy1JFGLyNgt5`,
    "0x2105": `6vyAqRpCyrhLsfd6TfYAssvKywKhxJykkDbPxJZ4ZcEr`,
  },
  DAOHAUS: {
    "0xaa36a7": `3k93SNY5Y1r4YYWEuPY9mpCm2wnGoYDKRtk82QZJ3Kvw`,
    "0x64": `6x9FK3iuhVFaH9sZ39m8bKB5eckax8sjxooBPNKWWK8r`,
    "0xa": `CgH5vtz9CJPdcSmD3XEh8fCVDjQjnRwrSawg71T1ySXW`,
    "0xa4b1": `GPACxuMWrrPSEJpFqupnePJNMfuArpFabrXLnWvXU2bp`,
    "0x2105": `7yh4eHJ4qpHEiLPAk9BXhL5YgYrTrRE6gWy8x4oHyAqW`,
  },
};

export const getTokenIndexerUrl = ({
  chainid,
}: {
  chainid: string;
}): string => {
  const url = SEQUENCE_API[chainid];
  if (!url) {
    console.log("invalid chainid");
  }
  return url;
};

const SEQUENCE_API: KEYCHAIN = {
  "0x1": "https://mainnet-indexer.sequence.app",
  "0x64": "https://gnosis-indexer.sequence.app",
  "0x89": "https://polygon-indexer.sequence.app",
  "0xa": "https://optimism-indexer.sequence.app",
  "0xa4b1": "https://arbitrum-indexer.sequence.app",
  "0xaa36a7": "https://sepolia-indexer.sequence.app",
  "0x2105": "https://base-indexer.sequence.app",
};
