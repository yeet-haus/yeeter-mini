import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  LIST_ALL_DAO_PROPOSALS,
  LIST_FUNDING_DAO_PROPOSALS,
  LIST_SIGNAL_DAO_PROPOSALS,
} from "../utils/graphQueries";
import {
  ProposalItem,
  SubgraphQueryOrderPaginationOptions,
} from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../providers/DaoHooksProvider";

const QUERIES: Record<string, string> = {
  all: LIST_ALL_DAO_PROPOSALS,
  signal: LIST_SIGNAL_DAO_PROPOSALS,
  funding: LIST_FUNDING_DAO_PROPOSALS,
};

export const useDaoProposals = ({
  chainid,
  daoid,
  queryOptions,
  filter,
}: {
  chainid?: string;
  daoid?: string;
  queryOptions?: SubgraphQueryOrderPaginationOptions;
  filter?: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    // throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
    console.log(
      "useDaoProposals: DaoHooksContext must be used within a DaoHooksProvider"
    );
  }

  const dhUrl = getGraphUrl({
    chainid: chainid || "",
    graphKey: hookContext?.config.graphKey || "",
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const filterKey = filter || "all";
  const query = QUERIES[filterKey];
  // const variables = filter !== "all" ? { now } : undefined;

  const { data, ...rest } = useQuery({
    queryKey: [
      `list-proposals-${chainid}-${daoid}-${filterKey}`,
      { chainid, daoid },
    ],
    enabled: Boolean(chainid && daoid),
    queryFn: async (): Promise<{
      proposals: ProposalItem[];
    }> => {
      const res = (await graphQLClient.request(query, {
        first: queryOptions?.first || 100,
        skip: queryOptions?.skip || 0,
        orderBy: queryOptions?.orderBy || "createdAt",
        orderDirection: queryOptions?.orderDirection || "desc",
        daoid,
      })) as {
        proposals: ProposalItem[];
      };

      // filter
      console.log("res.proposals", res.proposals);

      return {
        proposals: res.proposals,
      };
    },
  });

  return {
    proposals: data?.proposals,
    ...rest,
  };
};
