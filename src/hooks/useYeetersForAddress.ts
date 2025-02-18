import { GraphQLClient } from "graphql-request";

import { useQuery } from "@tanstack/react-query";
import { LIST_YEETS_FOR_ADDRESS } from "../utils/graphQueries";
import { YeeterItem, YeetsItem } from "../utils/types";
import { useContext } from "react";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../providers/DaoHooksProvider";

export const useYeetersForAddress = ({
  chainid,
  address,
}: {
  chainid: string;
  address: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
  }

  const yeeterUrl = getGraphUrl({
    chainid,
    graphKey: hookContext.config.graphKey,
    subgraphKey: "YEETER",
  });

  const graphQLClient = new GraphQLClient(yeeterUrl);

  type YeetsWithYeeter = YeetsItem & {
    yeeter: YeeterItem;
  };

  const { data, ...rest } = useQuery({
    queryKey: [
      `get-yeeters-address-${chainid}-${address}`,
      { chainid, address },
    ],
    queryFn: (): Promise<{
      yeets: YeetsWithYeeter[];
    }> => graphQLClient.request(LIST_YEETS_FOR_ADDRESS, { address }),
  });

  const uniqYeeters = data?.yeets.reduce(
    (
      acc: { ids: Record<string, true>; yeeters: YeeterItem[] },
      yeet: YeetsWithYeeter
    ) => {
      if (acc.ids[yeet.yeeter.id]) {
        return acc;
      } else {
        acc.ids[yeet.yeeter.id] = true;
        acc.yeeters.push(yeet.yeeter);

        return acc;
      }
    },
    { ids: {}, yeeters: [] }
  );

  return {
    yeeters: uniqYeeters?.yeeters,
    allYeets: data?.yeets,
    ...rest,
  };
};
