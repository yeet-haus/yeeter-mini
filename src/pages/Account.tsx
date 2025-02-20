import { AccountDisplay } from "../components/AccountDisplay";
import { AccountYeeters } from "../components/AccountYeeters";
import { FundWallet } from "../components/FundWallet";
import { Login } from "../components/Login";

export const Account = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">Account</h2>

      <Login />

      <AccountDisplay />

      <FundWallet />

      <AccountYeeters />
    </div>
  );
};
