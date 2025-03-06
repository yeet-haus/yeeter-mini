import { useEffect, useState } from "react";
import { useYeeter } from "../hooks/useYeeter";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useDao } from "../hooks/useDao";
import { TX } from "../utils/tx-prepper/tx";
import { prepareTX } from "../utils/tx-prepper/tx-prepper";
import { ValidNetwork } from "../utils/tx-prepper/prepper-types";
import { useMember } from "../hooks/useMember";
import { ExitFormModal } from "./ExitFormModal";
import { checkIfEmbeddedWalletIsConnected } from "../utils/helpers";

export const ExitTx = ({
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
  const { address } = useAccount();
  const { dao } = useDao({
    chainid,
    daoid,
  });
  const { member } = useMember({
    daoid,
    chainid,
    memberaddress: address,
  });

  const { wallets, ready: walletsReady } = useWallets();
  const queryClient = useQueryClient();
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

  const handleSubmit = async () => {
    if (!yeeter || !dao || !address || !member) return;

    const tx = TX.RAGEQUIT;

    const wholeState = {
      formValues: {
        lootToBurn: member.loot,
        to: address,
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
        queryKey: ["get-member", { chainid, daoid, address }],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-dao", { chainid, daoid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, yeeterid, chainid, address, daoid]);

  if (!yeeter) return;

  return (
    <ExitFormModal
      yeeter={yeeter}
      daoid={daoid}
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
