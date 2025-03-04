import { http, createConfig, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { YeetsItem } from "../utils/types";
import { ContributorProfile } from "./ContributorProfile";
import { fromWei, truncateAddress } from "../utils/helpers";
import { formatValueTo } from "../utils/units";
import { HAUS_RPC_DEFAULTS } from "../utils/constants";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(HAUS_RPC_DEFAULTS["0x1"]),
  },
});

export const YeetMessage = ({ yeet }: { yeet: YeetsItem }) => {
  const result = useEnsName({
    config,
    address: yeet.contributor as `0x${string}`,
  });

  const name = result.data;

  return (
    <div className="chat chat-start">
      <ContributorProfile name={name} />
      <div className="chat-bubble chat-bubble-accent text-left w-full">
        <p>{yeet.message || "yeet"}</p>
        <div className="flex flex-wrap items-center justify-between gap-5 mt-1">
          <p className="text-base font-bold">{`${formatValueTo({
            value: fromWei(yeet.amount),
            decimals: 3,
            format: "numberShort",
          })} ETH`}</p>
          <p className="text-sm">{name || truncateAddress(yeet.contributor)}</p>
        </div>
      </div>
    </div>
  );
};
