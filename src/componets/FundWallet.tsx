import { usePrivy, useFundWallet } from "@privy-io/react-auth";

export const FundWallet = () => {
  const { ready, authenticated, user } = usePrivy();
  const { fundWallet } = useFundWallet();

  // https://docs.privy.io/guide/react/wallets/usage/funding/prompting#callbacks
  const handleFunding = async () => {
    // await
    console.log("user", user);
    if (user?.wallet?.address) {
      await fundWallet(user.wallet.address);
    }
  };

  if (!ready || !authenticated) return null;

  return (
    <>
      <button className="btn" onClick={handleFunding}>
        Fund wallet
      </button>
    </>
  );
};
