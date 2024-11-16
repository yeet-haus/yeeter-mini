import { Link } from "react-router-dom";
import { YeeterItem } from "../utils/types";
import { useYeeter } from "../hooks/useYeeter";
import { toWholeUnits } from "../utils/helpers";

export const YeeterCard = ({
  campaign,
  chainId,
}: {
  campaign: YeeterItem;
  chainId: string;
}) => {
  const { yeeter, metadata } = useYeeter({
    yeeterId: campaign.id,
    chainId: chainId,
  });

  if (!yeeter) return null;

  const hero = metadata?.icon && metadata?.icon !== "" && metadata?.icon;

  return (
    <div className="card bg-primary shadow-xs rounded min-w-full">
      <figure>{hero && <img src={hero} />}</figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">
          {metadata?.name ? metadata.name : "--"}
        </h2>
        {yeeter && (
          <div className="stat">
            <div className="stat-title text-bold">Raised</div>
            <div className="stat-value text-white">
              {`${toWholeUnits(yeeter?.balance)} ETH`}
            </div>
            <div className="stat-desc">
              {toWholeUnits(yeeter?.goal)} ETH goal
            </div>
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
          {yeeter.isActive && (
            <button className="btn btn-neutral rounded-sm w-full">
              Contribute
            </button>
          )}
          <Link to={`/campaign/${chainId}/${campaign.id}`}>
            <button className="btn btn-neutral rounded-sm w-full">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
