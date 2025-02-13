import { Link } from "react-router-dom";
import { YeeterItem } from "../utils/types";
import { useYeeter } from "../hooks/useYeeter";
import { toWholeUnits } from "../utils/helpers";
import { YeetModal } from "./YeetModal";

export const YeeterCard = ({
  campaign,
  chainId,
}: {
  campaign: YeeterItem;
  chainId: string;
}) => {
  const { yeeter, metadata } = useYeeter({
    campaignid: campaign.id,
    chainid: chainId,
  });

  if (!yeeter) return null;

  const hero = metadata?.icon && metadata?.icon !== "" && metadata?.icon;

  return (
    <div className="card bg-primary shadow-xs rounded min-w-full">
      <figure>
        {hero && <img src={hero} width={250} className="rounded-full mt-5" />}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">
          {metadata?.name ? metadata.name : "--"}
        </h2>
        {yeeter && (
          <div className="stat">
            {!yeeter.isComingSoon && (
              <>
                <div className="stat-title text-bold">Raised</div>
                <div className="stat-value text-white">
                  {`${toWholeUnits(yeeter?.balance)} ETH`}
                </div>
                <div className="stat-desc">
                  {toWholeUnits(yeeter?.goal)} ETH goal
                </div>
              </>
            )}
            {yeeter.isComingSoon && (
              <>
                <div className="stat-title text-bold">Raising</div>
                <div className="stat-value text-white">
                  {`${toWholeUnits(yeeter?.goal)} ETH`}
                </div>
              </>
            )}
          </div>
        )}

        {yeeter.isEnded && (
          <div className="flex flex-row justify-center w-full mb-3">
            <div className="badge badge-accent">Contributions Closed</div>
          </div>
        )}
        {yeeter.isComingSoon && (
          <div className="flex flex-row justify-center w-full mb-3">
            <div className="badge badge-accent">Coming Soon</div>
          </div>
        )}

        <div className="flex flex-col gap-5 justify-center w-full">
          <Link to={`/campaign/${chainId}/${campaign.id}`}>
            <button className="btn btn-neutral rounded-sm w-full">
              Learn More
            </button>
          </Link>
          {yeeter.isActive && (
            <YeetModal
              buttonClass="btn btn-neutral rounded-sm w-full"
              campaignid={campaign.id}
              chainid={chainId}
            />
          )}
        </div>
      </div>
    </div>
  );
};
