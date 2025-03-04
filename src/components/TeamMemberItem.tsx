import { createConfig, http, useEnsName } from "wagmi";
import { truncateAddress } from "../utils/helpers";
import { AvatarDisplay } from "./AvatarDisplay";
import { mainnet } from "viem/chains";
import { HAUS_RPC_DEFAULTS } from "../utils/constants";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(HAUS_RPC_DEFAULTS["0x1"]),
  },
});

export const TeamMemberItem = ({
  memberAddress,
}: {
  memberAddress: string;
}) => {
  const { data } = useEnsName({
    config,
    address: memberAddress as `0x${string}`,
  });

  return (
    <div className="flex flex-row gap-5 items-centered">
      <AvatarDisplay name={data} />
      <p className="leading-8">{data || truncateAddress(memberAddress)}</p>
    </div>
  );
};
