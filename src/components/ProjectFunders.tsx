import { useDaoExits } from "../hooks/useDaoExits";
import { useYeeter } from "../hooks/useYeeter";
import { ExitTx } from "./ExitTx";
import { ProjectAddressListItem } from "./ProjectAddressListItem";

export const ProjectFunders = ({
  chainid,
  daoid,
  yeeterid,
  isFunder,
}: {
  chainid?: string;
  daoid: string;
  yeeterid: string;
  isFunder?: boolean;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  const { exits } = useDaoExits({
    chainid,
    daoid,
  });
  if (!yeeter || !chainid) return;

  const goalReached = Number(yeeter.balance) > Number(yeeter.goal);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-bold">Funders</div>
      {isFunder && (
        <div className="badge badge-accent text-base-100">You're a funder</div>
      )}

      {goalReached && (
        <>
          {isFunder && (
            <div className="flex flex-col gap-1">
              <div className="text-base">
                Funding Goal Reached! Look for status updates from the project
                team here.
              </div>
              <div className="text-sm">
                If you disagree with how the funds are being spent, you can exit
                with your funds (minus protocol fees).
              </div>
            </div>
          )}
        </>
      )}

      {!goalReached && (
        <>
          {isFunder && (
            <div className="flex flex-col gap-1">
              {yeeter.isEnded && (
                <div className="text-sm">
                  Funding goal wasn't reached, but the project team might
                  consider moving forward with the funds raised. Look for
                  updates here.
                </div>
              )}
              {yeeter.isActive && (
                <div className="text-sm text-primary font-bold">
                  Funding period is still open!
                </div>
              )}
              <div className="text-sm">
                Not feeliong the project? You can exit anytime with your funds
                (minus protocol fees).
              </div>
            </div>
          )}
        </>
      )}

      <ExitTx
        yeeterid={yeeterid}
        chainid={chainid}
        daoid={daoid}
        modalid="exit-goal-modal"
      />

      <div className="text-base font-bold mt-3">Exits</div>
      <div>
        {exits &&
          exits.map((exit) => {
            return (
              <ProjectAddressListItem
                memberAddress={exit.member.memberAddress}
                exit={exit}
              />
            );
          })}
      </div>
    </div>
  );
};
