import { AccountDisplay } from "../components/AccountDisplay";
import { FundWallet } from "../components/FundWallet";
import { Login } from "../components/Login";

export const Account = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h3>Account</h3>
      <Login />

      <AccountDisplay />

      <FundWallet />

      <p>
        Deadlights jack lad schooner scallywag dance the hempen jig carouser
        broadside cable strike colors. Bring a spring upon her cable holystone
        blow the man down spanker Shiver me timbers to go on account lookout
        wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot
        yardarm spyglass sheet transom heave to.
      </p>
    </div>
  );
};
