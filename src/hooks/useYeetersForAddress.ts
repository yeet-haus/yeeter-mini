import { GraphQLClient } from "graphql-request";

import { useQuery } from "@tanstack/react-query";
import { LIST_YEETS_FOR_ADDRESS } from "../utils/graphQueries";
import { YeeterItem, YeeterItemWithYeets, YeetsItem } from "../utils/types";
import { DEFAULT_CHAIN_ID, GRAPH_URL } from "../utils/constants";

export const useYeetersForAddress = ({
  chainid,
  address,
}: {
  chainid: string;
  address?: string;
}) => {
  const chain = chainid || DEFAULT_CHAIN_ID;
  const graphQLClient = new GraphQLClient(GRAPH_URL[chain]);

  type YeetsWithYeeter = YeetsItem & {
    yeeter: YeeterItem;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["yeeters-address", { chainid, address }],
    queryFn: (): Promise<{
      yeets: YeetsWithYeeter[];
    }> => graphQLClient.request(LIST_YEETS_FOR_ADDRESS, { address }),
    enabled: !!address,
  });

  const uniqYeeters = data?.yeets.reduce(
    (
      acc: { ids: Record<string, YeetsWithYeeter[]>; yeeters: YeeterItem[] },
      yeet: YeetsWithYeeter
    ) => {
      if (acc.ids[yeet.yeeter.id]) {
        acc.ids[yeet.yeeter.id].push(yeet);
        return acc;
      } else {
        acc.ids[yeet.yeeter.id] = [yeet];
        acc.yeeters.push(yeet.yeeter);
        return acc;
      }
    },
    { ids: {}, yeeters: [] }
  );

  const yeetersWithAddresYeets = uniqYeeters?.yeeters.map(
    (yeeter: YeeterItem) => {
      return {
        ...yeeter,
        yeets: uniqYeeters.ids[yeeter.id],
      };
    }
  );

  return {
    yeeters: yeetersWithAddresYeets,
    allYeets: data?.yeets,
    ...rest,
  };
};
