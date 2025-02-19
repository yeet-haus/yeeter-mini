import { useQuery } from "@tanstack/react-query";

import { getAddress } from "viem";
import { TokenBalance } from "../utils/types";
import { getGnosisUrl } from "../utils/endpoints";

export const useDaoTokenBalances = ({
  chainid,
  safeAddress,
}: {
  chainid?: string;
  safeAddress?: string;
}) => {
  const gnosisUrl = getGnosisUrl({
    chainid: chainid || "",
  });

  const { data, ...rest } = useQuery({
    queryKey: [
      `get-dao-token-balances${chainid}-${safeAddress}`,
      { chainid, safeAddress },
    ],
    enabled: Boolean(chainid && safeAddress),
    queryFn: async (): Promise<{
      tokens: TokenBalance[];
    }> => {
      let balances = [] as TokenBalance[];
      try {
        const res = await fetch(
          `${gnosisUrl}/safes/${getAddress(
            safeAddress || ""
          )}/balances/?exclude_spam=true`
        );

        balances = await res.json();
      } catch (err) {
        console.log("token fetch error", err);
      }

      return { tokens: balances };
    },
  });

  return {
    tokens: data?.tokens,
    ...rest,
  };
};
