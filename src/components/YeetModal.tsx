import { useYeeter } from "../hooks/useYeeter";
import { EXPLORER_URL } from "../utils/constants";
import {
  formatLootForMin,
  formatMinContribution,
} from "../utils/yeetDataHelpers";

export const YeetModal = ({
  buttonClass,
  campaignid,
  chainid,
}: {
  buttonClass: string;
  campaignid: string;
  chainid: string;
}) => {
  const { yeeter } = useYeeter({
    chainId: chainid,
    yeeterId: campaignid,
  });
  // const {
  //   writeContract,
  //   data: hash,
  //   error: sendTxError,
  //   isError: isSendTxError,
  //   isPending: isSendTxPending,
  // } = useWriteContract();

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash,
  //   });

  if (!yeeter) return;

  const isSendTxPending = false;
  const isConfirming = false;
  const isError = false;
  const hash = undefined;

  const showLoading = isSendTxPending || isConfirming;

  return (
    <>
      <button
        className={buttonClass}
        // @ts-expect-error fix unknown
        onClick={() => document.getElementById("yeet-modal").showModal()}
      >
        Contribute
      </button>
      <dialog id="yeet-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="text-lg font-bold">
            Receive {formatLootForMin(yeeter)} loot tokens per{" "}
            {formatMinContribution(yeeter)} ETH contributed
          </div>
          <div className="divider divider-secondary"></div>

          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  How much do you want to contribute?
                </span>
              </div>
              <input
                type="number"
                placeholder="Amount in ETH"
                disabled={showLoading}
                className="input input-bordered input-primary w-full max-w-xs rounded-sm"
              />
            </label>
            <div className="label">
              <span className="label-text-alt text-accent">
                Required/Invalid
              </span>
              <span className="label-text-alt text-primary font-bold">
                You'll get 100 Loot Tokens
              </span>
            </div>
          </div>

          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Send a message</span>
              </div>
              <textarea
                className="textarea textarea-bordered textarea-primary h-24 rounded-sm"
                placeholder="Description"
                disabled={showLoading}
              ></textarea>
            </label>
          </div>

          <div className="modal-action">
            {isError && (
              <div className="text-sm text-error flex items-center">
                Tx Error
              </div>
            )}

            {showLoading && (
              <span className="loading loading-bars loading-sm"></span>
            )}
            <button className="btn btn-sm btn-primary" disabled={showLoading}>
              Contribute
            </button>
            <form method="dialog">
              <button
                className="btn btn-sm btn-secondary"
                disabled={showLoading}
              >
                Close
              </button>
            </form>
          </div>
          {hash && (
            <div className="flex justify-end w-full mt-3">
              <a
                className="link link-primary text-sm"
                href={`${EXPLORER_URL[chainid]}/tx/${hash}`}
                target="_blank"
              >
                TX Details ⟶
              </a>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};
