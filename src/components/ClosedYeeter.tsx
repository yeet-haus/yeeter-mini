import { useYeeter } from "../hooks/useYeeter";
import { GoalProgress } from "./GoalProgress";

export const ClosedYeeter = ({
  campaignid,
  chainid,
}: {
  campaignid?: string;
  chainid?: string;
}) => {
  const { yeeter, metadata } = useYeeter({
    chainId: chainid,
    yeeterId: campaignid,
  });
  return (
    <>
      <GoalProgress yeeter={yeeter} />
      <p>RAISE IS CLOSED</p>
    </>
  );
};
