import { useState } from "react";
import { YeeterCard } from "../components/YeeterCard";
import { useYeeters } from "../hooks/useYeeters";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import { useChains } from "wagmi";
import { fromHex, toHex } from "viem";
import { useWallets } from "@privy-io/react-auth";

export const Explore = () => {
  const { wallets } = useWallets();
  const chains = useChains();

  const [listType, setListType] = useState("open");
  const [activeChain, setActiveChain] = useState(
    fromHex(DEFAULT_CHAIN_ID, "number")
  );

  const { yeeters, isLoading, isFetched } = useYeeters({
    chainid: toHex(activeChain),
    filter: listType,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <h2 className="text-2xl text-primary">Explore and Contribute</h2>

      <select
        className="select select-sm select-ghost"
        onChange={(e) => {
          setActiveChain(Number(e.target.value));
          const wallet = wallets[0];
          if (wallet) {
            wallet.switchChain(Number(e.target.value));
          }
        }}
        value={activeChain}
      >
        <option disabled>Select Chain</option>

        {chains.map((chain) => {
          return (
            <option value={chain.id} key={chain.id}>
              {chain.name}
            </option>
          );
        })}
      </select>

      <div role="tablist" className="tabs tabs-lg tabs-bordered mb-4">
        <a
          role="tab"
          className={`tab ${listType === "open" ? "tab-active" : ""}`}
          onClick={() => setListType("open")}
        >
          Open
        </a>

        {/* <a
          role="tab"
          className={`tab ${listType === "upcoming" ? "tab-active" : ""}`}
          onClick={() => setListType("upcoming")}
        >
          Coming Soon
        </a> */}

        <a
          role="tab"
          className={`tab ${listType === "closed" ? "tab-active" : ""}`}
          onClick={() => setListType("closed")}
        >
          Closed
        </a>
      </div>
      <div className="flex flex-col justify-center items-center gap-7 w-full mb-7">
        {yeeters &&
          yeeters.map((yeeter: YeeterItem) => {
            return (
              <YeeterCard
                yeeterid={yeeter.id}
                chainid={toHex(activeChain)}
                key={yeeter.id}
              />
            );
          })}
      </div>
      {isLoading && (
        <span className="loading loading-bars loading-lg tex-primary w-full"></span>
      )}
      {isFetched && !yeeters && <p>No Active Campaigns</p>}
    </div>
  );
};
