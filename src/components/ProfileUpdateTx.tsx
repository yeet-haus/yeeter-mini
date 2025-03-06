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
import { checkIfEmbeddedWalletIsConnected } from "../utils/helpers";
import { ProfileUpdateModal } from "./ProfileUpdateModal ";

export const ProfileUpdateTx = ({
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
  const { yeeter, metadata } = useYeeter({
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

    const tx = TX.UPDATE_YEET_METADATA_SETTINGS;

    const wholeState = {
      formValues: {
        ...values,
        yeeterid,
      },
      senderAddress: address,
      daoId: daoid,
      yeeterid,
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
        queryKey: ["list-records", { chainid, daoid }],
      });

      queryClient.refetchQueries({
        queryKey: ["get-yeeter", { chainid, yeeterid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, yeeterid, chainid, daoid]);

  if (!yeeter) return;

  return (
    <ProfileUpdateModal
      yeeter={yeeter}
      isEmbedded={isEmbedded}
      isConfirmed={isConfirmed}
      showLoading={isSendTxPending || isConfirming}
      needsAuth={!ready || !authenticated}
      chainid={chainid}
      isError={isError}
      hash={hash}
      modalid={modalid}
      currentProfile={metadata}
      handleSubmit={handleSubmit}
      resetWrite={resetWrite}
    />
  );
};
