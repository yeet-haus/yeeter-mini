import { useEffect, useState } from "react";
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
import { checkIfEmbeddedWalletIsConnected } from "../utils/helpers";
import { VoteFormModal } from "./VoteFormModal";
import { useDaoMemberVote } from "../hooks/useDaoMemberVote";

export const VoteTx = ({
  chainid,
  daoid,
  modalid,
  proposalid,
}: {
  chainid: string;
  daoid: string;
  modalid: string;
  proposalid: string;
}) => {
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
  const { vote } = useDaoMemberVote({
    daoid,
    chainid,
    proposalid,
    memberAddress: member?.memberAddress,
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

  const handleSubmit = async (values: Record<string, boolean>) => {
    if (!dao || !address || !member) return;

    const tx = TX.VOTE;

    const wholeState = {
      formValues: {
        proposalid,
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
        queryKey: ["get-member", { chainid, daoid, address }],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-dao", { chainid, daoid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-proposals", { chainid, daoid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-proposal", { chainid, daoid, proposalid }],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "get-member-prop-vote",
          { chainid, daoid, proposalid, memberAddress: member?.memberAddress },
        ],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, chainid, address, daoid, proposalid, member]);

  if (!dao || !member) return;

  return (
    <VoteFormModal
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
      vote={vote}
    />
  );
};
