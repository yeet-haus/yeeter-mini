import { useForm } from "@tanstack/react-form";

import { useYeeter } from "../hooks/useYeeter";
import { EXPLORER_URL } from "../utils/constants";
import {
  formatLootForAmount,
  formatLootForMin,
  formatMinContribution,
} from "../utils/yeetDataHelpers";
import { FieldInfo } from "./FieldInfo";
import { useEffect, useState } from "react";
import { toBaseUnits } from "../utils/units";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import yeeterAbi from "../utils/tx-prepper/abi/yeeterShaman.json";
import { usePrivy } from "@privy-io/react-auth";
import { LoginModalSwitch } from "./LoginModalSwitch";

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
    chainid,
    campaignid,
  });
  const { ready, authenticated } = usePrivy();
  const queryClient = useQueryClient();

  const [fieldMessages, setFieldMessages] = useState<Record<string, string>>({
    amount: "",
  });
  const [submittedAmount, setSubmittedAmount] = useState<string>("0");

  const {
    writeContract,
    data: hash,
    isError,
    isPending: isSendTxPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const reset = async () => {
      queryClient.refetchQueries({
        queryKey: ["yeeter", { chainid, campaignid }],
      });

      queryClient.refetchQueries({
        queryKey: ["yeets", { campaignid }],
      });

      queryClient.invalidateQueries({
        queryKey: ["yeeters", { chainid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, campaignid, chainid]);

  const form = useForm({
    defaultValues: {
      amount: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      if (!yeeter) return;

      console.log("prep yeet", value);
      setSubmittedAmount(toBaseUnits(value.amount));

      writeContract({
        address: yeeter.id as `0x${string}`,
        abi: yeeterAbi,
        functionName: "contributeEth",
        value: BigInt(toBaseUnits(value.amount)),
        args: [value.message],
      });
    },
  });

  if (!yeeter) return;

  const showLoading = isSendTxPending || isConfirming;
  const needsAuth = !ready || !authenticated;

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
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {!isConfirmed && (
            <div className="text-lg font-bold mt-5">
              Receive {formatLootForMin(yeeter)} loot tokens per{" "}
              {formatMinContribution(yeeter)} ETH contributed
            </div>
          )}

          {isConfirmed && (
            <div className="text-lg font-bold mt-5">
              You got {formatLootForAmount(yeeter, submittedAmount)} loot
              tokens!
            </div>
          )}
          <div className="divider divider-secondary"></div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div>
              <form.Field
                name="amount"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Required";
                    if (toBaseUnits(value) < yeeter.minTribute)
                      return `${formatMinContribution(yeeter)} minimum`;
                    return undefined;
                  },
                }}
                listeners={{
                  onChange: ({ value, fieldApi }) => {
                    const invalid = toBaseUnits(value) < yeeter.minTribute;
                    const loot = formatLootForAmount(
                      yeeter,
                      toBaseUnits(value)
                    );
                    setFieldMessages((prev) => {
                      return {
                        ...prev,
                        [fieldApi.name]: invalid
                          ? ""
                          : `You'll get ${loot} Loot Tokens`,
                      };
                    });
                  },
                }}
                children={(field) => (
                  <>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">
                          How much do you want to contribute?
                        </span>
                      </div>
                      <input
                        type="number"
                        placeholder="Amount in ETH"
                        disabled={showLoading || isConfirmed}
                        className="input input-bordered input-primary w-full max-w-xs rounded-sm"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </label>
                    <FieldInfo
                      field={field}
                      message={fieldMessages[field.name]}
                    />
                  </>
                )}
              />
            </div>

            <div>
              <form.Field
                name="message"
                children={(field) => (
                  <>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">Send a message</span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered textarea-primary h-24 rounded-sm"
                        placeholder="Description"
                        disabled={showLoading || isConfirmed}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></textarea>
                    </label>
                  </>
                )}
              />
            </div>

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
                children={([canSubmit]) => (
                  <>
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={
                        showLoading || !canSubmit || needsAuth || isConfirmed
                      }
                    >
                      Contribute
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
