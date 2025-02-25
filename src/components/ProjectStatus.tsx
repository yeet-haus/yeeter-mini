import { useYeeter } from "../hooks/useYeeter";
import { AddMemberTx } from "./AddMemberTx";
import { ExitForm } from "./ExitForm";
import { RequestFundingModal } from "./RequestFundingModal";
import { StatusUpdateModal } from "./StatusUpdateModal";

export const ProjectStatus = ({
  chainid,
  daoid,
  yeeterid,
  onProjectTeam,
  isFunder,
}: {
  chainid?: string;
  daoid: string;
  yeeterid: string;
  onProjectTeam?: boolean;
  isFunder?: boolean;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  if (!yeeter || !chainid) return;

  const goalReached = Number(yeeter.balance) > Number(yeeter.goal);

  return (
    <div className="flex flex-col gap-3">
      {yeeter.isComingSoon && (
        <div className="font-bold text-xl">Coming Soon</div>
      )}
      {yeeter.isActive && !goalReached && (
        <div className="font-bold text-xl">Funding Active</div>
      )}
      {yeeter.isEnded && !goalReached && (
        <div className="font-bold text-xl">Funding Goal Not Reached</div>
      )}
      {(yeeter.isActive || yeeter.isEnded) && goalReached && (
        <div className="font-bold text-xl">Funding Goal Reached</div>
      )}

      {isFunder && (
        <div className="badge badge-accent text-base-100">You're a funder</div>
      )}

      {onProjectTeam && (
        <>
          <div className="badge badge-accent text-base-100">
            You're on the project team
          </div>
          <div className="text-lg font-bold">Project Team</div>
          <AddMemberTx yeeterid={yeeterid} chainid={chainid} daoid={daoid} />
        </>
      )}

      {(yeeter.isActive || yeeter.isEnded) && goalReached && (
        <>
          {onProjectTeam && (
            <div className="flex flex-col gap-1">
              <div className="text-base">Create updates for your funders.</div>
              <StatusUpdateModal
                yeeterid={yeeterid}
                chainid={chainid}
                daoid={daoid}
                modalId="status-form-modal"
              />
              <div className="text-base">
                Request funds by creating a proposal
              </div>
              <RequestFundingModal
                yeeterid={yeeterid}
                chainid={chainid}
                daoid={daoid}
              />
            </div>
          )}

          {isFunder && (
            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold">Funders</div>
              <div className="text-base">
                Look for status updates from the project team here.
              </div>
              <div className="text-base">
                If you disagree with how the funds are being spent, you can exit
                with yor funds (minus protocol fees)
              </div>
              <ExitForm yeeterid={yeeterid} chainid={chainid} daoid={daoid} />
            </div>
          )}
        </>
      )}

      {yeeter.isEnded && !goalReached && (
        <>
          <div className="flex flex-col gap-1">
            <div className="text-base">Create updates for your funders.</div>
            <StatusUpdateModal
              yeeterid={yeeterid}
              chainid={chainid}
              daoid={daoid}
              modalId="status-form--fail-modal"
            />
          </div>
          {isFunder && (
            <div className="flex flex-col gap-1">
              <div className="text-base font-bold">Funders</div>
              <div className="text-base">
                You can exit with yor funds (minus protocol fees), but the
                project team might consider moving forward with the funds
                raised. Look for updates here.
              </div>
              <ExitForm yeeterid={yeeterid} chainid={chainid} daoid={daoid} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
