import { usePrivy } from "@privy-io/react-auth";

import { useYeetersForAddress } from "../hooks/useYeetersForAddress";
import { useAccount } from "wagmi";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import { AccountYeeterCard } from "./AccountYeeterCard";

export const AccountYeeters = () => {
  const { ready, authenticated } = usePrivy();
  const { address } = useAccount();

  const { yeeters, isLoading } = useYeetersForAddress({
    chainid: DEFAULT_CHAIN_ID,
    address,
  });

  if (!ready || !authenticated) return;

  return (
    <>
      <h2 className="text-xl text-primary">Your Projects</h2>

      <div className="flex flex-col justify-center items-center gap-7 w-full">
        {isLoading && (
          <span className="loading loading-bars loading-lg tex-primary w-full"></span>
        )}
        {yeeters &&
          yeeters.map((yeeter: YeeterItem) => {
            return (
              <AccountYeeterCard
                yeeterid={yeeter.id}
                chainId={DEFAULT_CHAIN_ID}
                key={yeeter.id}
                accountYeets={yeeter.yeets}
              />
            );
          })}
      </div>
    </>
  );
};
