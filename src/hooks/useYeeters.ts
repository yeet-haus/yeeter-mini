import { GraphQLClient } from "graphql-request";

import { useQuery } from "@tanstack/react-query";
import {
  GET_OPEN_YEETERS,
  GET_CLOSED_YEETERS,
  GET_ALL_YEETERS,
  GET_UPCOMING_YEETERS,
} from "../utils/graphQueries";
import { DEFAULT_CHAIN_ID, GRAPH_URL } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import { nowInSeconds } from "../utils/helpers";

const QUERIES: Record<string, string> = {
  open: GET_OPEN_YEETERS,
  all: GET_ALL_YEETERS,
  closed: GET_CLOSED_YEETERS,
  upcoming: GET_UPCOMING_YEETERS,
};

const SECONDS_IN_DAY = 86400;

export const useYeeters = ({
  chainid,
  filter,
}: {
  chainid: string;
  filter: string;
}) => {
  const chain = chainid || DEFAULT_CHAIN_ID;
  const graphQLClient = new GraphQLClient(GRAPH_URL[chain]);
  const now = (nowInSeconds() - SECONDS_IN_DAY).toFixed().toString();

  const query = QUERIES[filter];
  const variables = filter !== "all" ? { now } : undefined;

  const { data, ...rest } = useQuery({
    queryKey: ["yeeters", { chainid, filter }],
    queryFn: () => graphQLClient.request(query, variables),
  });

  return {
    // @ts-expect-error fix unknown
    yeeters: data?.yeeters as YeeterItem[],
    ...rest,
  };
};
