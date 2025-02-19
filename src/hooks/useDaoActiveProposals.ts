import { GraphQLClient } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import {
  ProposalItem,
  SubgraphQueryOrderPaginationOptions,
} from "../utils/types";
import { useDaoHooksConfig } from "../providers/DaoHooksProvider";
import { getGraphUrl } from "../utils/endpoints";
import { LIST_ACTIVE_DAO_PROPOSALS } from "../utils/graphQueries";

const nowInSeconds = (): number => new Date().getTime() / 1000;
const filterActive = (proposals: ProposalItem[]) => {
  const now = nowInSeconds();
  return proposals.filter((proposal) => {
    if (Number(proposal.graceEnds) > now) return true;
    return proposal.currentlyPassing;
  });
};

export const useActiveDaoProposals = ({
  chainid,
  daoid,
  queryOptions,
}: {
  chainid?: string;
  daoid?: string;
  queryOptions?: SubgraphQueryOrderPaginationOptions;
}) => {
  const { config } = useDaoHooksConfig();

  if (!config?.graphKey) {
    // throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
    console.log(
      "useActiveDaoProposals: DaoHooksContext must be used within a DaoHooksProvider"
    );
  }

  const dhUrl = getGraphUrl({
    chainid: chainid || "",
    graphKey: config?.graphKey || "",
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [`active-proposals-${chainid}-${daoid}`, { chainid, daoid }],
    enabled: Boolean(chainid && daoid),
    queryFn: async (): Promise<{
      proposals: ProposalItem[];
    }> => {
      const res = (await graphQLClient.request(LIST_ACTIVE_DAO_PROPOSALS, {
        first: queryOptions?.first || 100,
        skip: queryOptions?.skip || 0,
        orderBy: queryOptions?.orderBy || "createdAt",
        orderDirection: queryOptions?.orderDirection || "desc",
        daoid,
      })) as {
        proposals: ProposalItem[];
      };

      const filteredProposals = filterActive(res.proposals);

      return {
        proposals: filteredProposals,
      };
    },
  });

  return {
    proposals: data?.proposals,
    ...rest,
  };
};
