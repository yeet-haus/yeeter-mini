import { useYeeter } from "../hooks/useYeeter";
import { GoalProgress } from "./GoalProgress";

export const ClosedYeeter = ({
  campaignid,
  chainid,
}: {
  campaignid?: string;
  chainid?: string;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    campaignid,
  });
  return (
    <>
      <GoalProgress yeeter={yeeter} />
      <h2 className="text-4xl text-accent my-3">Raise has closed</h2>
    </>
  );
};
