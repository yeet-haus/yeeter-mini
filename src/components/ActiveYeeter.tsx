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
  //description
  //form for more details
  //links
  // project + dao (fund management)
  // exit if yeeter
  //balance
  //goal
  //end date
  //

  const { yeeter, metadata } = useYeeter({
    chainId: chainid,
    yeeterId: campaignid,
  });

  return (
    <>
      <GoalProgress yeeter={yeeter} />

      <RaiseStats yeeter={yeeter} />

      <button className="btn btn-lg btn-outline btn-primary rounded-sm w-full my-10">
        Contribute
      </button>
    </>
  );
};
