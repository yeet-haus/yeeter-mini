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
import { parseUnits } from "viem";
import { RequestFundingModal } from "./RequestFundingModal";
import { checkIfEmbeddedWalletIsConnected } from "../utils/helpers";

export const RequestFundingTx = ({
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
  const queryClient = useQueryClient();
  const { dao } = useDao({
    chainid,
    daoid,
  });
  const { address } = useAccount();
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

  const handleSubmit = async (values: Record<string, string>) => {
    if (!yeeter || !dao || !address) return;

    const tx = TX.REQUEST_FUNDING_ETH;

    const wholeState = {
      formValues: {
        ...values,
        tokenAmount: parseUnits(values.tokenAmount || "0", 18).toString(),
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
      queryClient.invalidateQueries({
        queryKey: ["get-yeeter", { chainid, yeeterid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-active-proposals", { chainid, daoid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-dao", { chainid, daoid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-proposals", { chainid, daoid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, yeeterid, chainid, daoid]);

  if (!yeeter) return;

  return (
    <RequestFundingModal
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
