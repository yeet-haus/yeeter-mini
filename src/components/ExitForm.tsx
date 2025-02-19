import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";

import { useYeeter } from "../hooks/useYeeter";
import { EXPLORER_URL } from "../utils/constants";

import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import { usePrivy } from "@privy-io/react-auth";
import { LoginModalSwitch } from "./LoginModalSwitch";
import { useDao } from "../hooks/useDao";
import { TX } from "../utils/tx-prepper/tx";
import { prepareTX } from "../utils/tx-prepper/tx-prepper";
import { ValidNetwork } from "../utils/tx-prepper/prepper-types";
import { useMember } from "../hooks/useMember";
import { memberTokenBalanceShare, toWholeUnits } from "../utils/helpers";
import { useDaoTokenBalances } from "../hooks/useDaoTokenBalances";

export const ExitForm = ({
  yeeterid,
  chainid,
  daoid,
}: {
  yeeterid: string;
  chainid: string;
  daoid: string;
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
  const { tokens } = useDaoTokenBalances({
    chainid,
    safeAddress: dao?.safeAddress,
  });
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

  const form = useForm({
    onSubmit: async () => {
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
    },
  });

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

  const displayTokenReturn = () => {
    if (!tokens || !dao || !member) return;
    const ethBalance =
      tokens.find((token) => !token.tokenAddress)?.balance || "0";

    return `${memberTokenBalanceShare(
      ethBalance,
      dao.totalShares,
      dao.totalLoot,
      "0",
      member.loot,
      18
    ).toFixed(5)} ETH`;
  };

  if (!yeeter) return;

  const showLoading = isSendTxPending || isConfirming;
  const needsAuth = !ready || !authenticated;

  return (
    <>
      <p
        onClick={() => {
          // @ts-expect-error fix unknown
          document.getElementById("exit-form-modal").showModal();
          resetWrite();
          form.reset();
        }}
        className="underline text-primary"
      >
        Exit funds ⟶
      </p>
      <dialog
        id="exit-form-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Exit funds</h3>

          {member && dao && (
            <>
              <p className="text-base my-3">
                You are holding <b>{toWholeUnits(member.loot)} </b>Loot tokens.
                You can exchange those for <b>{displayTokenReturn()}*</b>
              </p>
              <p className="text-xs mt-1">
                *This is your contribution minus the platform fee and any funds
                the project team has already spent.
              </p>
            </>
          )}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {isConfirmed && (
            <h4 className="text-lg font-bold mt-5">Exit complete</h4>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="modal-action">
              {hash && (
                <div className="mt-1">
                  <a
                    className="link link-primary text-sm"
                    href={`${EXPLORER_URL[chainid]}/tx/${hash}`}
                    target="_blank"
                  >
                    TX Details ⟶
                  </a>
                </div>
              )}
              {isError && (
                <div className="text-sm text-error flex items-center">
                  Tx Error
                </div>
              )}

              {showLoading && (
                <span className="loading loading-bars loading-sm"></span>
              )}

              <LoginModalSwitch targetChainId={chainid} />

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={() => (
                  <>
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={showLoading || needsAuth || isConfirmed}
                    >
                      Exit
                    </button>
                  </>
                )}
              />
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
