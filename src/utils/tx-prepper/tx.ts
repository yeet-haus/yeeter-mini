import { LOCAL_ABI } from "./abi/abis";
import { CONTRACT_KEYCHAINS } from "./contract-keychains";
import {
  NestedArray,
  ProposalTypeIds,
  TXLego,
  ValidArgType,
} from "./prepper-types";
import { buildMultiCallTX } from "./tx-prepper";

export const POSTER_TAGS = {
  summoner: "daohaus.summoner.daoProfile",
  daoProfileUpdate: "daohaus.shares.daoProfile",
  signalProposal: "daohaus.proposal.signalProposal",
  daoDatabaseProposal: "daohaus.proposal.database",
  daoDatabaseShares: "daohaus.shares.database",
  daoDatabaseSharesOrLoot: "daohaus.member.database",
};

export const NETWORK_TOKEN_ETH_ADDRESS =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

const nestInArray = (arg: ValidArgType | ValidArgType[]): NestedArray => {
  return {
    type: "nestedArray",
    args: Array.isArray(arg) ? arg : [arg],
  };
};

export const TX: Record<string, TXLego> = {
  POST_SIGNAL: buildMultiCallTX({
    id: "POST_SIGNAL",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: {
          type: "static",
          contractName: "Poster",
          abi: LOCAL_ABI.POSTER,
          targetAddress: CONTRACT_KEYCHAINS.POSTER,
        },
        method: "post",
        operations: { type: "static", value: 0 },
        args: [
          {
            type: "JSONDetails",
            jsonSchema: {
              daoId: ".daoId",
              table: { type: "static", value: "signal" },
              queryType: { type: "static", value: "list" },
              title: `.formValues.title`,
              description: `.formValues.description`,
              link: `.formValues.link`,
            },
          },
          { type: "static", value: POSTER_TAGS.daoDatabaseProposal },
        ],
      },
    ],
  }),
  RAGEQUIT: {
    id: "RAGEQUIT",
    contract: {
      type: "static",
      contractName: "Current DAO (Baal)",
      abi: LOCAL_ABI.BAAL,
      targetAddress: ".daoId",
    },
    method: "ragequit",
    args: [
      ".formValues.to",
      { type: "static", value: "0" },
      ".formValues.lootToBurn",
      nestInArray({ type: "static", value: NETWORK_TOKEN_ETH_ADDRESS }),
    ],
  },
  POST_PROJECT_UPDATE: {
    id: "POST_PROJECT_UPDATE",
    contract: {
      type: "static",
      contractName: "Poster",
      abi: LOCAL_ABI.POSTER,
      targetAddress: CONTRACT_KEYCHAINS.POSTER,
    },
    method: "post",
    args: [
      {
        type: "JSONDetails",
        jsonSchema: {
          daoId: ".daoId",
          table: { type: "static", value: "yeetProjectUpdate" },
          queryType: { type: "static", value: "list" },
          name: ".formValues.name",
          description: ".formValues.description",
          link: ".formValues.link",
        },
      },
      { type: "static", value: POSTER_TAGS.daoDatabaseShares },
    ],
  },
  UPDATE_YEET_METADATA_SETTINGS: {
    id: "UPDATE_YEET_METADATA_SETTINGS",
    contract: {
      type: "static",
      contractName: "Poster",
      abi: LOCAL_ABI.POSTER,
      targetAddress: CONTRACT_KEYCHAINS.POSTER,
    },
    method: "post",
    args: [
      {
        type: "JSONDetails",
        jsonSchema: {
          daoId: ".daoId",
          table: { type: "static", value: "yeetDetails" },
          queryType: { type: "static", value: "latest" },
          name: ".formValues.name",
          projectDetails: ".formValues.projectDetails",
          missionStatement: ".formValues.missionStatement",
          icon: ".formValues.icon",
          links: {
            type: "nestedArray",
            args: [
              {
                type: "JSONDetails",
                jsonSchema: {
                  url: ".formValues.custom1",
                  label: ".formValues.custom1Label",
                },
              },
              {
                type: "JSONDetails",
                jsonSchema: {
                  url: ".formValues.custom2",
                  label: ".formValues.custom2Label",
                },
              },
              {
                type: "JSONDetails",
                jsonSchema: {
                  url: ".formValues.custom3",
                  label: ".formValues.custom3Label",
                },
              },
            ],
          },
        },
      },
      { type: "static", value: POSTER_TAGS.daoDatabaseShares },
    ],
  },
  ISSUE_SHARES: buildMultiCallTX({
    id: "ISSUE",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: { type: "static", value: "Add Team Member" },
        description: ".formValues.description",
        proposalType: {
          type: "static",
          value: ProposalTypeIds.IssueSharesLoot,
        },
      },
    },
    actions: [
      {
        contract: {
          type: "static",
          contractName: "Current DAO (Baal)",
          abi: LOCAL_ABI.BAAL,
          targetAddress: ".daoId",
        },
        method: "mintShares",
        args: [
          nestInArray(".formValues.recipient"),
          nestInArray({ type: "static", value: "1000000000000000000" }),
        ],
      },
    ],
  }),
  REQUEST_FUNDING_ETH: buildMultiCallTX({
    id: "ISSUE_NETWORK_TOKEN",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: { type: "static", value: "Funding Request" },
        description: ".formValues.description",
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: {
          type: "static",
          value: ProposalTypeIds.TransferNetworkToken,
        },
      },
    },
    actions: [
      {
        contract: {
          type: "static",
          contractName: "NETWORK",
          abi: LOCAL_ABI.ERC20,
          targetAddress: ".formValues.recipient",
        },
        method: "noMethod",
        args: [],
        value: ".formValues.tokenAmount",
        data: {
          type: "static",
          value: "0x",
        },
      },
    ],
  }),
};
