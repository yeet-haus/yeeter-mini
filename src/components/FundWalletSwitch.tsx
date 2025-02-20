import { usePrivy, useFundWallet } from "@privy-io/react-auth";
import { Link } from "react-router-dom";

import Fund from "../assets/icons/fund.svg";
import { useBalance, useChainId, useChains } from "wagmi";
import { sepolia } from "viem/chains";

export const FundWalletSwitch = ({
  targetAmount,
  message,
  redirect,
  hideBalance,
}: {
  targetAmount: bigint;
  message: string;
  redirect?: boolean;
  hideBalance?: boolean;
}) => {
  const { ready, authenticated, user } = usePrivy();
  const { fundWallet } = useFundWallet();
  const { data, isFetched } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });
  const chainId = useChainId();
  const chains = useChains();

  const activeChain = chains.find((c) => c.id === chainId);

  const needsFunds = data && data.value < targetAmount;

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

  if (!ready || !authenticated || activeChain?.id === sepolia.id) return null;

  return (
    <div className="flex flex-col gap-1 items-center mt-2 text-xs">
      {isFetched && data && !hideBalance && (
        <div className="flex flex-col items-center">
          <span>
            {data.symbol} Balance: <b>{`${data.formatted.slice(0, 8)}`}</b>
          </span>
        </div>
      )}
      {needsFunds && (
        <>
          {message && <p>{message}</p>}

          {redirect && (
            <Link
              className="link link-primary text-lg"
              to={`/account?fund=true`}
            >
              Fund Account ⟶
            </Link>
          )}

          {!redirect && (
            <button className="btn" onClick={handleFunding}>
              <img src={Fund} width="24" />
              Fund Wallet on {activeChain?.name}
            </button>
          )}
        </>
      )}
    </div>
  );
};
