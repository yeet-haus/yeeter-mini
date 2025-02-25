import { usePrivy, useWallets } from "@privy-io/react-auth";

import { useYeetersForAddress } from "../hooks/useYeetersForAddress";
import { useAccount, useChains } from "wagmi";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import { AccountYeeterCard } from "./AccountYeeterCard";
import { useState } from "react";
import { fromHex, toHex } from "viem";

export const AccountYeeters = () => {
  const [activeChain, setActiveChain] = useState(
    fromHex(DEFAULT_CHAIN_ID, "number")
  );
  const { ready, authenticated } = usePrivy();
  const { address } = useAccount();
  const { wallets } = useWallets();

  const chains = useChains();
  const { yeeters, isLoading } = useYeetersForAddress({
    chainid: toHex(activeChain),
    address,
  });

  if (!ready || !authenticated) return;

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <h2 className="text-xl text-primary">Your Projects</h2>

      <select
        className="select select-sm select-primary w-44"
        onChange={(e) => {
          setActiveChain(Number(e.target.value));
          const wallet = wallets[0];
          wallet.switchChain(Number(e.target.value));
        }}
        value={activeChain}
      >
        <option disabled>Select Chain</option>

        {chains.map((chain) => {
          return (
            <option value={chain.id} key={chain.id}>
              On {chain.name}
            </option>
          );
        })}
      </select>

      <div className="flex flex-col justify-center items-center gap-7 w-full">
        {isLoading && (
          <span className="loading loading-bars loading-lg tex-primary w-full"></span>
        )}
        {!isLoading && (!yeeters || yeeters.length < 1) && (
          <p className="mt-3 mb-10 font-bold">No projects on this chain</p>
        )}
        {yeeters &&
          yeeters.map((yeeter: YeeterItem) => {
            return (
              <AccountYeeterCard
                yeeterid={yeeter.id}
                chainid={toHex(activeChain)}
                key={yeeter.id}
                accountYeets={yeeter.yeets}
              />
            );
          })}
      </div>
    </div>
  );
};
