import { useYeeter } from "../hooks/useYeeter";
import { GoalProgress } from "./GoalProgress";
import { RaiseStats } from "./RaiseStats";
import { YeetModal } from "./YeetModal";

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

  if (!yeeterid || !chainid || !yeeter) return;

  return (
    <>
      <GoalProgress yeeter={yeeter} />
      <RaiseStats yeeter={yeeter} />
      <YeetModal
        buttonClass="btn btn-lg btn-outline btn-primary rounded-sm w-full my-5"
        yeeterid={yeeterid}
        chainid={chainid}
      />
    </>
  );
};
