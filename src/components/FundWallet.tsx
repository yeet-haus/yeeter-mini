import { usePrivy, useFundWallet } from "@privy-io/react-auth";

import Fund from "../assets/icons/fund.svg";
import { useBalance, useChainId, useChains } from "wagmi";
import { sepolia } from "viem/chains";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const FundWallet = () => {
  const { ready, authenticated, user } = usePrivy();
  const { fundWallet } = useFundWallet();
  const { data, isFetched } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });
  const location = useLocation();
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);

  // https://docs.privy.io/guide/react/wallets/usage/funding/prompting#callbacks
  // other wallet addresses for cb, farcaster, email?
  const handleFunding = async () => {
    if (user?.wallet?.address) {
      await fundWallet(user.wallet.address, {
        chain: activeChain,
      });
    } else {
      console.log("funding error no wallet", user);
    }
  };

  useEffect(() => {
    if (location.search && location.search == "?fund=true") {
      handleFunding();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!ready || !authenticated || activeChain?.id === sepolia.id) return null;

  return (
    <div className="flex flex-col gap-1 items-center">
      {isFetched && data && (
        <div className="flex flex-col items-center text-sm">
          <span>
            {data.symbol} Balance: <b>{`${data.formatted.slice(0, 8)}`}</b>
          </span>
        </div>
      )}
      <button className="btn" onClick={handleFunding}>
        <img src={Fund} width="24" />
        Fund Wallet on {activeChain?.name}
      </button>
      {chainId === 100 && (
        <p className="text-xs text-accent">
          *Credit card funding not available on Gnosis Chain
        </p>
      )}
    </div>
  );
};
