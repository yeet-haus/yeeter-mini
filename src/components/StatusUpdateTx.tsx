import { useEffect, useState } from "react";
import { useYeeter } from "../hooks/useYeeter";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { TX } from "../utils/tx-prepper/tx";
import { useDao } from "../hooks/useDao";
import { prepareTX } from "../utils/tx-prepper/tx-prepper";
import { ValidNetwork } from "../utils/tx-prepper/prepper-types";
import { StatusUpdateModal } from "./StatusUpdateModal";
import { checkIfEmbeddedWalletIsConnected } from "../utils/helpers";

export const StatusUpdateTx = ({
  yeeterid,
  chainid,
  daoid,
  modalid,
}: {
  yeeterid: string;
  chainid: string;
  daoid: string;
  modalid: string;
}) => {
  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });
  const { ready, authenticated } = usePrivy();
  const { dao } = useDao({
    chainid,
    daoid,
  });
  const { address } = useAccount();
  const { wallets, ready: walletsReady } = useWallets();
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false);

  const queryClient = useQueryClient();

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

  const handleSubmit = async (values: Record<string, string>) => {
    if (!yeeter || !dao || !address) return;

    const tx = TX.POST_PROJECT_UPDATE;

    const wholeState = {
      formValues: {
        ...values,
      },
      senderAddress: address,
      daoId: daoid,
      localABIs: {},
    };

    const txPrep = await prepareTX({
      tx,
      chainId: chainid as ValidNetwork,
      safeId: dao.safeAddress,
      appState: wholeState,
      argCallbackRecord: {},
      localABIs: {},
    });

    console.log("txPrep", txPrep);
    if (!txPrep) return;

    writeContract(txPrep);
  };

  useEffect(() => {
    if (walletsReady && authenticated) {
      const embed = checkIfEmbeddedWalletIsConnected({ wallets, address });
      setIsEmbedded(embed);
    }
  }, [walletsReady, authenticated, wallets, address]);

  useEffect(() => {
    const reset = async () => {
      queryClient.refetchQueries({
        queryKey: ["yeeter", { chainid, yeeterid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, yeeterid, chainid]);

  if (!yeeter) return;

  return (
    <StatusUpdateModal
      yeeter={yeeter}
      isEmbedded={isEmbedded}
      isConfirmed={isConfirmed}
      showLoading={isSendTxPending || isConfirming}
      needsAuth={!ready || !authenticated}
      chainid={chainid}
      isError={isError}
      hash={hash}
      modalid={modalid}
      handleSubmit={handleSubmit}
      resetWrite={resetWrite}
    />
  );
};
