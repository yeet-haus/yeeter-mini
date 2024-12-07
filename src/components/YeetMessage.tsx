import { http, createConfig, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { YeetsItem } from "../utils/types";
import { ContributorProfile } from "./ContributorProfile";
import { truncateAddress } from "../utils/helpers";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export const YeetMessage = ({ yeet }: { yeet: YeetsItem }) => {
  const { data: name } = useEnsName({
    config,
    address: yeet.contributor as `0x${string}`,
  });

  return (
    <div className="chat chat-start">
      <ContributorProfile name={name} />
      <div className="chat-bubble chat-bubble-accent text-left">
        <p>{yeet.message || "yeet"}</p>
        <div className="flex flex-wrap items-center justify-between gap-5 mt-1">
          <p className="text-base font-bold">0.3 ETH</p>
          <p className="text-sm">{name || truncateAddress(yeet.contributor)}</p>
        </div>
      </div>
    </div>
  );
};
