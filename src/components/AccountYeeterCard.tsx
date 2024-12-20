import { Link } from "react-router-dom";
import { YeeterItem, YeetsItem } from "../utils/types";
import { useYeeter } from "../hooks/useYeeter";
import { fromWei, toWholeUnits } from "../utils/helpers";
import { formatValueTo } from "../utils/units";
import {
  formatDateFromSeconds,
  formatShortDateTimeFromSeconds,
} from "../utils/dates";

export const AccountYeeterCard = ({
  campaign,
  chainId,
  accountYeets,
}: {
  campaign: YeeterItem;
  chainId: string;
  accountYeets?: YeetsItem[];
}) => {
  const { yeeter, metadata } = useYeeter({
    campaignid: campaign.id,
    chainid: chainId,
  });

  if (!yeeter) return null;

  return (
    <div className="card bg-primary shadow-xs rounded min-w-full">
      <div className="card-body">
        <h2 className="card-title text-2xl">
          {metadata?.name ? metadata.name : "--"}
        </h2>
        <p className="font-bold text-sm text-white w-full text-left">
          Contributions
        </p>

        {yeeter &&
          accountYeets &&
          accountYeets.map((yeet) => {
            return (
              <div className="flex flex-row justify-start gap-5 text-left">
                <p>{formatDateFromSeconds(yeet.createdAt)}</p>
                <p>{`${formatValueTo({
                  value: fromWei(yeet.amount),
                  decimals: 3,
                  format: "numberShort",
                })} ETH`}</p>
              </div>
            );
          })}

        <div className="flex flex-col justify-center w-full">
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
