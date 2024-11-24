import { useYeeter } from "../hooks/useYeeter";
import { GoalProgress } from "./GoalProgress";
import { RaiseStats } from "./RaiseStats";

export const ActiveYeeter = ({
  campaignid,
  chainid,
}: {
  campaignid?: string;
  chainid?: string;
}) => {
  const { yeeter } = useYeeter({
    chainId: chainid,
    yeeterId: campaignid,
  });

  return (
    <>
      <GoalProgress yeeter={yeeter} />

      <RaiseStats yeeter={yeeter} />

      <button className="btn btn-lg btn-outline btn-primary rounded-sm w-full my-5">
        Contribute
      </button>
    </>
  );
};
