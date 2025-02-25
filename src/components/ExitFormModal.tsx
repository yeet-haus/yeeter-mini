import { useForm } from "@tanstack/react-form";
import { EXPLORER_URL } from "../utils/constants";
import { useAccount, useChainId, useChains } from "wagmi";
import { useDao } from "../hooks/useDao";
import { useMember } from "../hooks/useMember";
import {
  memberTokenBalanceShare,
  nativeCurrencySymbol,
  toWholeUnits,
} from "../utils/helpers";
import { useDaoTokenBalances } from "../hooks/useDaoTokenBalances";
import { YeeterItem } from "../utils/types";

type ExitModalProps = {
  yeeter: YeeterItem;
  isEmbedded: boolean;
  isConfirmed: boolean;
  showLoading: boolean;
  needsAuth: boolean;
  isError: boolean;
  hash?: string;
  chainid: string;
  daoid: string;
  modalid: string;
  handleSubmit: () => void;
  resetWrite: () => void;
};

export const ExitFormModal = ({
  isEmbedded,
  yeeter,
  isConfirmed,
  showLoading,
  hash,
  needsAuth,
  chainid,
  daoid,
  isError,
  modalid,
  handleSubmit,
  resetWrite,
}: ExitModalProps) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);
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
    ).toFixed(5)} ${nativeCurrencySymbol(activeChain)}`;
  };

  const form = useForm({
    onSubmit: async () => {
      console.log("modalid", modalid);
      if (isEmbedded) {
        // @ts-expect-error fix unknown
        document.getElementById(modalid).close();
        form.reset();
      }

      handleSubmit();
    },
  });

  if (!yeeter) return;

  return (
    <>
      <p
        onClick={() => {
          // @ts-expect-error fix unknown
          document.getElementById(modalid).showModal();
          resetWrite();
          form.reset();
        }}
        className="underline text-primary"
      >
        Exit funds ⟶
      </p>
      <dialog id={modalid} className="modal modal-bottom sm:modal-middle">
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
