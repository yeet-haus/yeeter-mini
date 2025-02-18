import { GraphQLClient } from "graphql-request";

import { useQuery } from "@tanstack/react-query";
import { FIND_YEETER, FIND_YEETER_PROFILE } from "../utils/graphQueries";
import { YeeterItem, YeeterMetadata, RecordItem } from "../utils/types";
import {
  addParsedContent,
  calcYeetIsActive,
  calcYeetIsComingSoon,
  calcYeetIsEnded,
  calcYeetIsFull,
} from "../utils/yeetDataHelpers";
import { getGraphUrl } from "../utils/endpoints";
import { useContext } from "react";
import { DaoHooksContext } from "../providers/DaoHooksProvider";

export const useYeeter = ({
  chainid,
  yeeterid,
}: {
  chainid?: string;
  yeeterid?: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey || !chainid || !yeeterid) {
    throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
  }

  const yeeterUrl = getGraphUrl({
    chainid,
    graphKey: hookContext.config.graphKey,
    subgraphKey: "YEETER",
  });
  const dhUrl = getGraphUrl({
    chainid,
    graphKey: hookContext.config.graphKey,
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(yeeterUrl);
  const hausGraphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [`get-yeeter-${chainid}-${yeeterid}`, { chainid, yeeterid }],
    queryFn: async (): Promise<{
      yeeter: YeeterItem;
      metadata: YeeterMetadata;
    }> => {
      const yeeterRes = (await graphQLClient.request(FIND_YEETER, {
        shamanAddress: yeeterid,
      })) as {
        yeeter: YeeterItem;
      };

      const records = (await hausGraphQLClient.request(FIND_YEETER_PROFILE, {
        daoid: yeeterRes.yeeter.dao.id,
      })) as {
        records: RecordItem[];
        dao: {
          name: string;
        };
      };

      const yeeter = {
        ...yeeterRes.yeeter,
        isActive: yeeterRes.yeeter && calcYeetIsActive(yeeterRes.yeeter),
        isEnded: yeeterRes.yeeter && calcYeetIsEnded(yeeterRes.yeeter),
        isComingSoon:
          yeeterRes.yeeter && calcYeetIsComingSoon(yeeterRes.yeeter),
        isFull: yeeterRes.yeeter && calcYeetIsFull(yeeterRes.yeeter),
      } as YeeterItem;

      const metadata = addParsedContent<YeeterMetadata>(records?.records[0]);

      return {
        yeeter: yeeter,
        metadata: { ...metadata, name: records?.dao.name } as YeeterMetadata,
      };
    },
  });

  return {
    yeeter: data?.yeeter,
    metadata: data?.metadata,
    ...rest,
  };
};
