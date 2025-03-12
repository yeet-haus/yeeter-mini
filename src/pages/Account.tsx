import { usePrivy } from "@privy-io/react-auth";
import { AccountDisplay } from "../components/AccountDisplay";
import { AccountYeeters } from "../components/AccountYeeters";
import { FundWallet } from "../components/FundWallet";
import { Login } from "../components/Login";
import { useAccount } from "wagmi";

export const Account = () => {
  const { ready, authenticated, user } = usePrivy();
  const { address } = useAccount();

  console.log("user", user);
  console.log("useAccount address", address);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">Account</h2>

      <Login />
      <AccountDisplay />

      {!ready ||
        (!authenticated && (
          <div>
            <p className="font-bold">No crypto wallet?</p>
            <p>No problem. Create one with just an email.</p>
          </div>
        ))}

      <FundWallet />

      <AccountYeeters />
    </div>
  );
};
