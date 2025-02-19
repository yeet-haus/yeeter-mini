import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { FIND_MEMBER } from "../utils/graphQueries";
import { MemberItem } from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../providers/DaoHooksProvider";

export const useMember = ({
  chainid,
  memberaddress,
  daoid,
}: {
  chainid?: string;
  memberaddress?: string;
  daoid: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    // throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
    console.log(
      "useMember: DaoHooksContext must be used within a DaoHooksProvider"
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
      `get-member-${chainid}-${daoid}-${memberaddress}`,
      { chainid, daoid, memberaddress },
    ],
    enabled: Boolean(chainid && memberaddress),
    queryFn: async (): Promise<{
      member: MemberItem;
    }> => {
      const res = (await graphQLClient.request(FIND_MEMBER, {
        memberid: `${daoid.toLowerCase()}-member-${memberaddress?.toLowerCase()}`,
      })) as {
        member: MemberItem;
      };

      return {
        member: res.member,
      };
    },
  });

  return {
    member: data?.member,
    ...rest,
  };
};
