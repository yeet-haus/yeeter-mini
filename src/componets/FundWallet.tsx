import { usePrivy, useFundWallet } from "@privy-io/react-auth";

import Fund from "../assets/icons/fund.svg";
import { useBalance } from "wagmi";

export const FundWallet = () => {
  const { ready, authenticated, user } = usePrivy();
  const { fundWallet } = useFundWallet();
  const { data, isFetched } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  // https://docs.privy.io/guide/react/wallets/usage/funding/prompting#callbacks
  // other wallet addresses for cb, farcaster, email?
  const handleFunding = async () => {
    if (user?.wallet?.address) {
      await fundWallet(user.wallet.address);
    } else {
      console.log("funding error no wallet", user);
    }
  };

  if (!ready || !authenticated)
    return (
      <div className="flex flex-col gap-0 items-center">
        <img src={Fund} width="24" />
      </div>
    );

  return (
    <div className="flex flex-col gap-0 items-center">
      <div onClick={handleFunding}>
        <img src={Fund} width="24" />
      </div>
      {isFetched && data && (
        <div className="flex flex-col items-center text-xs text-base-100">
          <span>{`${data.formatted} ${data.symbol}`}</span>
        </div>
      )}
    </div>
  );
};
