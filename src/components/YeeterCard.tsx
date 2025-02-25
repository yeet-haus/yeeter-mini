import { Link } from "react-router-dom";
import { useYeeter } from "../hooks/useYeeter";
import { nativeCurrencySymbol, toWholeUnits } from "../utils/helpers";
import { formatShortDateTimeFromSeconds } from "../utils/dates";
import { usePrivy } from "@privy-io/react-auth";
import { LoginModalSwitch } from "./LoginModalSwitch";
import { useChainId, useChains } from "wagmi";
import { YeetTx } from "./YeetTx";

export const YeeterCard = ({
  yeeterid,
  chainid,
}: {
  yeeterid: string;
  chainid: string;
}) => {
  const { yeeter, metadata } = useYeeter({
    yeeterid: yeeterid,
    chainid: chainid,
  });
  const { authenticated } = usePrivy();
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);

  if (!yeeter) return null;

  const hero = metadata?.icon && metadata?.icon !== "" && metadata?.icon;

  return (
    <div className="card bg-primary shadow-xs rounded min-w-full max-w-full">
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
                <div className="stat-value text-white truncate">
                  {`${Number(toWholeUnits(yeeter?.balance)).toFixed(
                    5
                  )} ${nativeCurrencySymbol(activeChain)}`}
                </div>
                <div className="stat-desc">
                  {toWholeUnits(yeeter?.goal)}{" "}
                  {nativeCurrencySymbol(activeChain)} goal
                </div>
              </>
            )}
            {yeeter.isComingSoon && (
              <>
                <div className="stat-title text-bold">Raising</div>
                <div className="stat-value text-white">
                  {`${toWholeUnits(yeeter?.goal)} ${nativeCurrencySymbol(
                    activeChain
                  )}`}
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
            <div className="badge badge-accent">
              Coming on {formatShortDateTimeFromSeconds(yeeter.startTime)}
            </div>
          </div>
        )}
        {yeeter.isActive && (
          <div className="flex flex-row justify-center w-full mb-3">
            <div className="badge badge-accent">
              Closing on {formatShortDateTimeFromSeconds(yeeter.endTime)}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5 justify-center w-full">
          <Link to={`/yeeter/${chainid}/${yeeterid}`}>
            <button className="btn btn-neutral rounded-sm w-full">
              Learn More
            </button>
          </Link>
          {yeeter.isActive && authenticated && (
            <YeetTx
              buttonClass="btn btn-neutral rounded-sm w-full"
              yeeterid={yeeterid}
              chainid={chainid}
              modalid="yeet-card-modal"
            />
          )}

          {yeeter.isActive && !authenticated && (
            <LoginModalSwitch
              targetChainId={chainid}
              buttonClass="btn btn-neutral rounded-sm w-full"
              buttonLabel="Login to Contribute"
            />
          )}
        </div>
      </div>
    </div>
  );
};
