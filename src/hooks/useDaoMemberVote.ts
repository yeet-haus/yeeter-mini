import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { VoteItem } from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../providers/DaoHooksProvider";
import { FIND_MEMBER_PROPOSAL_VOTE } from "../utils/graphQueries";

export const useDaoMemberVote = ({
  chainid,
  daoid,
  memberAddress,
  proposalid,
}: {
  chainid?: string;
  daoid?: string;
  memberAddress?: string;
  proposalid: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    console.error(
      "useDaoMemberVote: DaoHooksContext must be used within a DaoHooksProvider"
    );
  }

  const dhUrl = getGraphUrl({
    chainid: chainid || "",
    graphKey: hookContext?.config.graphKey || "",
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [
      `get-member-prop-vote`,
      { chainid, daoid, proposalid, memberAddress },
    ],
    enabled: Boolean(chainid && daoid && memberAddress && proposalid),
    queryFn: async (): Promise<{
      vote: VoteItem;
    }> => {
      const res = (await graphQLClient.request(FIND_MEMBER_PROPOSAL_VOTE, {
        daoid,
        proposalid,
        memberAddress,
      })) as {
        votes: VoteItem[];
      };

      console.log("res", res);

      return {
        vote: res.votes[0],
      };
    },
  });

  return {
    vote: data?.vote,
    ...rest,
  };
};
