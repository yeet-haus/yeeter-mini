import { GraphQLClient } from "graphql-request";

import { useQuery } from "@tanstack/react-query";
import { GET_YEETER, GET_YEETER_PROFILE } from "../utils/graphQueries";
import {
  DEFAULT_CHAIN_ID,
  GRAPH_URL,
  HAUS_GRAPH_URL,
} from "../utils/constants";
import { YeeterItem, YeeterMetadata, RecordItem } from "../utils/types";
import {
  addParsedContent,
  calcYeetIsActive,
  calcYeetIsComingSoon,
  calcYeetIsEnded,
  calcYeetIsFull,
} from "../utils/yeetDataHelpers";

export const useYeeter = ({
  chainid,
  campaignid,
}: {
  chainid?: string;
  campaignid?: string;
}) => {
  const chain = chainid || DEFAULT_CHAIN_ID;
  const graphQLClient = new GraphQLClient(GRAPH_URL[chain]);
  const hausGraphQLClient = new GraphQLClient(HAUS_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery({
    queryKey: [`yeeter`, { chainid, campaignid }],
    queryFn: async () => {
      try {
        const yeeterRes = (await graphQLClient.request(GET_YEETER, {
          shamanAddress: campaignid,
        })) as {
          yeeter: YeeterItem;
        };
        const records = (await hausGraphQLClient.request(GET_YEETER_PROFILE, {
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

        const metadata = addParsedContent(records?.records[0]);

        return {
          yeeter,
          metadata: { ...metadata, name: records?.dao.name },
        };
      } catch (err) {
        return err;
      }
    },
  });

  return {
    // @ts-expect-error fix unknown
    yeeter: data?.yeeter as YeeterItem,
    // @ts-expect-error fix unknown
    metadata: data?.metadata as YeeterMetadata,
    ...rest,
  };
};
