import { usePrivy } from "@privy-io/react-auth";
import { useYeeter } from "../hooks/useYeeter";
import { GoalProgress } from "./GoalProgress";
import { LoginModalSwitch } from "./LoginModalSwitch";
import { RaiseStats } from "./RaiseStats";
import { YeetTx } from "./YeetTx";

export const ActiveYeeter = ({
  yeeterid,
  chainid,
}: {
  yeeterid?: string;
  chainid?: string;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  const { authenticated } = usePrivy();

  if (!yeeterid || !chainid || !yeeter) return;

  return (
    <>
      <GoalProgress yeeter={yeeter} />
      <RaiseStats yeeter={yeeter} />
      {authenticated && (
        <YeetTx
          buttonClass="btn btn-lg btn-outline btn-primary rounded-sm w-full my-5"
          yeeterid={yeeterid}
          chainid={chainid}
        />
      )}

      {!authenticated && (
        <LoginModalSwitch
          targetChainId={chainid}
          buttonClass="btn btn-lg btn-outline btn-primary rounded-sm w-full my-5"
          buttonLabel="Login to Contribute"
        />
      )}
    </>
  );
};
