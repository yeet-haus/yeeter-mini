import { Link } from "react-router-dom";
import { YeetsItem } from "../utils/types";
import { useYeeter } from "../hooks/useYeeter";
import { fromWei, nativeCurrencySymbol } from "../utils/helpers";
import { formatValueTo } from "../utils/units";
import { formatDateFromSeconds } from "../utils/dates";
import { useChainId, useChains } from "wagmi";

export const AccountYeeterCard = ({
  yeeterid,
  chainid,
  accountYeets,
}: {
  yeeterid: string;
  chainid: string;
  accountYeets?: YeetsItem[];
}) => {
  const { yeeter, metadata } = useYeeter({
    yeeterid: yeeterid,
    chainid,
  });
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);

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

        <div className="w-full text-left">
          {yeeter &&
            accountYeets &&
            accountYeets.map((yeet) => {
              return (
                <div key={yeet.id} className="flex flex-col w-full">
                  <div className="stat pl-1">
                    <div className="stat-title text-white text-xs">
                      {formatDateFromSeconds(yeet.createdAt)}
                    </div>
                    <div className="stat-value text-accent text-base">{`${formatValueTo(
                      {
                        value: fromWei(yeet.amount),
                        decimals: 3,
                        format: "numberShort",
                      }
                    )} ${nativeCurrencySymbol(activeChain)}`}</div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex flex-col justify-center w-full">
          <Link to={`/yeeter/${chainid}/${yeeterid}`}>
            <button className="btn btn-neutral rounded-sm w-full">
              View Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
