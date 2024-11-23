import { useParams } from "react-router-dom";

import { useYeeter } from "../hooks/useYeeter";
import { ActiveYeeter } from "../components/ActiveYeeter";
import { UpcomingYeeter } from "../components/UpcomingYeeter";
import { ClosedYeeter } from "../components/ClosedYeeter";
import { YeetMetaDetails } from "../components/YeetMetaDetails";

export const Campaign = () => {
  const { campaignid, chainid } = useParams();
  const { yeeter, metadata, isLoading } = useYeeter({
    chainId: chainid,
    yeeterId: campaignid,
  });

  console.log(yeeter);
  console.log(metadata);

  const hero = metadata?.icon && metadata?.icon !== "" && metadata?.icon;

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {isLoading && (
        <span className="loading loading-bars loading-lg tex-primary w-full"></span>
      )}

      <h2 className="text-3xl text-primary">{metadata?.name}</h2>

      <figure>{hero && <img src={hero} />}</figure>

      {yeeter?.isComingSoon && <UpcomingYeeter />}
      {yeeter?.isActive && (
        <ActiveYeeter campaignid={campaignid} chainid={chainid} />
      )}
      {yeeter?.isEnded && (
        <ClosedYeeter campaignid={campaignid} chainid={chainid} />
      )}

      <YeetMetaDetails
        metadata={metadata}
        chainid={chainid}
        daoid={yeeter.dao.id}
      />

      <div className="flex flex-col p-3 w-full bg-accent text-xs rounded-sm">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-bubble">
            <p className="font-bold">0.3 ETH</p>
            <p>I Yeeted!!</p>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-bubble">
            <p className="font-bold">1 ETH</p>
            <p>LFG!!!!!!!!!!!!!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
