import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

import { LIST_YEETS } from "../utils/graphQueries";
import { DEFAULT_CHAIN_ID, GRAPH_URL } from "../utils/constants";
import { YeetsItem } from "../utils/types";

export const useYeets = ({
  chainid,
  campaignid,
}: {
  chainid?: string;
  campaignid?: string;
}) => {
  const chain = chainid || DEFAULT_CHAIN_ID;
  const graphQLClient = new GraphQLClient(GRAPH_URL[chain]);

  const { data, ...rest } = useQuery({
    queryKey: [`list-yeets-${campaignid}`, { campaignid }],
    queryFn: () =>
      graphQLClient.request(LIST_YEETS, { shamanAddress: campaignid }),
  });

  return {
    // @ts-expect-error fix unknown
    yeets: data?.yeets as YeetsItem[],
    ...rest,
  };
};
