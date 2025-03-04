import { createConfig, http, useEnsName } from "wagmi";
import { toWholeUnits, truncateAddress } from "../utils/helpers";
import { AvatarDisplay } from "./AvatarDisplay";
import { mainnet } from "viem/chains";
import { HAUS_RPC_DEFAULTS } from "../utils/constants";
import { formatDateFromSeconds } from "../utils/dates";
import { ExitItem } from "../utils/types";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(HAUS_RPC_DEFAULTS["0x1"]),
  },
});

export const ProjectAddressListItem = ({
  memberAddress,
  exit,
}: {
  memberAddress: string;
  exit?: ExitItem;
}) => {
  const { data } = useEnsName({
    config,
    address: memberAddress as `0x${string}`,
  });

  return (
    <div className="flex flex-row gap-5 items-centered text-sm">
      <AvatarDisplay name={data} />
      <p className="leading-8">{data || truncateAddress(memberAddress)}</p>
      {exit && (
        <>
          <p className="leading-8 text-xs">
            {toWholeUnits(exit.loot)} loot tokens on{" "}
            {formatDateFromSeconds(exit.createdAt)}
          </p>
        </>
      )}
    </div>
  );
};
