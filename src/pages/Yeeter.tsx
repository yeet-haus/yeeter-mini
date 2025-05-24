import { useParams } from "react-router-dom";

import { useYeeter } from "../hooks/useYeeter";
import { ActiveYeeter } from "../components/ActiveYeeter";
import { UpcomingYeeter } from "../components/UpcomingYeeter";
// import { ClosedYeeter } from "../components/ClosedYeeter";
import { YeetMetaDetails } from "../components/YeetMetaDetails";
import { Timeline } from "../components/Timeline";
import { YeetMessages } from "../components/YeetMessages";
import { useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useChainId } from "wagmi";
import { fromHex, toHex } from "viem";

export const Yeeter = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const chainId = useChainId();

  const { yeeterid, chainid } = useParams();
  const { yeeter, metadata, isLoading } = useYeeter({
    chainid,
    yeeterid,
  });

  useEffect(() => {
    const chainMatch = toHex(chainId) === chainid;
    if (ready && authenticated && chainid && !chainMatch && wallets.length) {
      const wallet = wallets[0];
      const chainNumber = fromHex(chainid as `0x${string}`, "number");
      wallet.switchChain(chainNumber);
    }
  }, [ready, authenticated, chainId, chainid, wallets]);

  if (!yeeterid || !chainid) return;

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      {isLoading && (
        <span className="loading loading-bars loading-lg tex-primary w-full"></span>
      )}

      {yeeter && metadata && (
        <>
          <h2 className="text-3xl text-primary mb-2">{metadata?.name}</h2>

          {yeeter?.isComingSoon && <UpcomingYeeter />}
          {yeeter?.isActive && (
            <ActiveYeeter yeeterid={yeeterid} chainid={chainid} />
          )}

          <div className="mb-5">
            <Timeline yeeter={yeeter} />
          </div>

          <YeetMetaDetails
            metadata={metadata}
            chainid={chainid}
            daoid={yeeter?.dao.id}
            yeeterid={yeeter.id}
          />

          {chainid && yeeterid && (
            <YeetMessages chainid={chainid} yeeterid={yeeterid} />
          )}
        </>
      )}
    </div>
  );
};
