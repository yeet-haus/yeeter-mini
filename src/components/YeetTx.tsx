import { useEffect, useState } from "react";
import { useYeeter } from "../hooks/useYeeter";
import { toBaseUnits } from "../utils/units";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import yeeterAbi from "../utils/tx-prepper/abi/yeeterShaman.json";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { YeetFormModal } from "./YeetFormModal";

export const YeetTx = ({
  buttonClass,
  yeeterid,
  chainid,
}: {
  buttonClass: string;
  yeeterid: string;
  chainid: string;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  const { ready, authenticated } = usePrivy();
  const queryClient = useQueryClient();
  const { wallets, ready: walletsReady } = useWallets();
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false);

  const {
    writeContract,
    data: hash,
    isError,
    isPending: isSendTxPending,
    reset: resetWrite,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (walletsReady && authenticated) {
      const isEmbedded = wallets.find((w) => w.connectorType === "embedded");
      setIsEmbedded(Boolean(isEmbedded));
    }
  }, [walletsReady, authenticated, wallets]);

  useEffect(() => {
    const reset = async () => {
      queryClient.refetchQueries({
        queryKey: ["yeeter", { chainid, yeeterid }],
      });

      queryClient.refetchQueries({
        queryKey: ["yeets", { yeeterid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["yeeters", { chainid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, yeeterid, chainid]);

  const handleSubmit = (values: Record<string, string>) => {
    if (!yeeter) return;

    writeContract({
      address: yeeter.id as `0x${string}`,
      abi: yeeterAbi,
      functionName: "contributeEth",
      value: BigInt(toBaseUnits(values.amount)),
      args: [values.message],
    });
  };

  if (!yeeter) return;

  return (
    <>
      <YeetFormModal
        handleSubmit={handleSubmit}
        yeeter={yeeter}
        isEmbedded={isEmbedded}
        isConfirmed={isConfirmed}
        showLoading={isSendTxPending || isConfirming}
        needsAuth={!ready || !authenticated}
        chainid={chainid}
        isError={isError}
        hash={hash}
        buttonClass={buttonClass}
        resetWrite={resetWrite}
      />
    </>
  );
};
