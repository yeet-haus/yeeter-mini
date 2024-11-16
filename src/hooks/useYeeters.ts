import { GraphQLClient } from "graphql-request";

import { useQuery } from "@tanstack/react-query";
import {
  GET_OPEN_YEETERS,
  GET_CLOSED_YEETERS,
  GET_ALL_YEETERS,
} from "../utils/graphQueries";
import { DEFAULT_CHAIN_ID, GRAPH_URL } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import { nowInSeconds } from "../utils/helpers";

const QUERIES: Record<string, string> = {
  open: GET_OPEN_YEETERS,
  all: GET_ALL_YEETERS,
  closed: GET_CLOSED_YEETERS,
};

export const useYeeters = ({
  chainId,
  filter,
}: {
  chainId: string;
  filter: string;
}) => {
  const chain = chainId || DEFAULT_CHAIN_ID;
  const graphQLClient = new GraphQLClient(GRAPH_URL[chain]);
  const now = (nowInSeconds() - 604800).toFixed().toString();

  const query = QUERIES[filter];
  const variables = filter !== "all" ? { now } : undefined;

  const { data, ...rest } = useQuery({
    queryKey: [`get-yeeters-${chainId}-${filter}`, { chainId, filter }],
    queryFn: () => graphQLClient.request(query, variables),
  });

  return {
    // @ts-expect-error fix unknown
    yeeters: data?.yeeters as YeeterItem[],
    ...rest,
  };
};
