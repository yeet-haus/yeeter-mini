import { usePrivy } from "@privy-io/react-auth";
import { truncateAddress } from "../utils/helpers";

export const AccountDisplay = () => {
  const { ready, authenticated, user } = usePrivy();

  if (!ready || !authenticated) return null;

  return (
    <>
      {user?.wallet?.address && <p>{truncateAddress(user?.wallet?.address)}</p>}
    </>
  );
};
