import { useParams } from "react-router-dom";

import { useYeeter } from "../hooks/useYeeter";
import { ActiveYeeter } from "../components/ActiveYeeter";
import { UpcomingYeeter } from "../components/UpcomingYeeter";
import { ClosedYeeter } from "../components/ClosedYeeter";
import { YeetMetaDetails } from "../components/YeetMetaDetails";
import { Timeline } from "../components/Timeline";
import { YeetMessages } from "../components/YeetMessages";

export const Campaign = () => {
  const { campaignid, chainid } = useParams();
  const { yeeter, metadata, isLoading } = useYeeter({
    chainid,
    campaignid,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      {isLoading && (
        <span className="loading loading-bars loading-lg tex-primary w-full"></span>
      )}

      <h2 className="text-3xl text-primary mb-2">{metadata?.name}</h2>

      {yeeter?.isComingSoon && <UpcomingYeeter />}
      {yeeter?.isActive && (
        <ActiveYeeter campaignid={campaignid} chainid={chainid} />
      )}
      {yeeter?.isEnded && (
        <ClosedYeeter campaignid={campaignid} chainid={chainid} />
      )}

      <div className="mb-5">
        <Timeline yeeter={yeeter} />
      </div>

      <YeetMetaDetails
        metadata={metadata}
        chainid={chainid}
        daoid={yeeter?.dao.id}
      />

      {chainid && campaignid && (
        <YeetMessages chainid={chainid} campaignid={campaignid} />
      )}
    </div>
  );
};
