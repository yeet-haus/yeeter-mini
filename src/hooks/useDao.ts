import { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import { DaoItem, DaoProfile } from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../providers/DaoHooksProvider";
import { FIND_DAO } from "../utils/graphQueries";
import { addParsedContent } from "../utils/yeetDataHelpers";

export const useDao = ({
  chainid,
  daoid,
}: {
  chainid: string;
  daoid: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
  }

  const dhUrl = getGraphUrl({
    chainid,
    graphKey: hookContext.config.graphKey,
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [`get-dao-${chainid}-${daoid}`, { chainid, daoid }],
    queryFn: async (): Promise<{
      dao: DaoItem;
    }> => {
      const daores = (await graphQLClient.request(FIND_DAO, {
        daoid,
      })) as {
        dao: DaoItem;
      };
      const profile = addParsedContent<DaoProfile>(daores.dao.rawProfile[0]);

      return {
        dao: { ...daores.dao, profile },
      };
    },
  });

  return {
    dao: data?.dao,
    ...rest,
  };
};
