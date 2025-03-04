import { useEffect, useState } from "react";
import { useYeeter } from "../hooks/useYeeter";
import { toBaseUnits } from "../utils/units";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import yeeterAbi from "../utils/tx-prepper/abi/yeeterShaman.json";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { YeetFormModal } from "./YeetFormModal";
import { checkIfEmbeddedWalletIsConnected } from "../utils/helpers";

export const YeetTx = ({
  buttonClass,
  yeeterid,
  chainid,
  modalid,
}: {
  buttonClass: string;
  yeeterid: string;
  chainid: string;
  modalid: string;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  const { ready, authenticated } = usePrivy();
  const { address } = useAccount();
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
      const embed = checkIfEmbeddedWalletIsConnected({ wallets, address });
      setIsEmbedded(embed);
    }
  }, [walletsReady, authenticated, wallets, address]);

  useEffect(() => {
    const reset = async () => {
      queryClient.invalidateQueries({
        queryKey: ["get-yeeter", { chainid, yeeterid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-yeets", { yeeterid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-yeeters", { chainid }],
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
        modalid={modalid}
        buttonClass={buttonClass}
        resetWrite={resetWrite}
      />
    </>
  );
};
