import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { EXPLORER_URL } from "../utils/constants";
import {
  formatLootForAmount,
  formatLootForMin,
  formatMinContribution,
} from "../utils/yeetDataHelpers";
import { FieldInfo } from "./FieldInfo";
import { toBaseUnits } from "../utils/units";
import { useAccount, useBalance, useChainId, useChains } from "wagmi";
import { FundWalletSwitch } from "./FundWalletSwitch";
import { nativeCurrencySymbol } from "../utils/helpers";
import { YeeterItem } from "../utils/types";

type YeetModalProps = {
  yeeter: YeeterItem;
  isEmbedded: boolean;
  isConfirmed: boolean;
  showLoading: boolean;
  needsAuth: boolean;
  isError: boolean;
  hash?: string;
  chainid: string;
  buttonClass: string;
  handleSubmit: (values: Record<string, string>) => void;
  resetWrite: () => void;
};

const modalid = "yeet-modal";

export const YeetFormModal = ({
  isEmbedded,
  yeeter,
  isConfirmed,
  showLoading,
  hash,
  needsAuth,
  chainid,
  isError,
  buttonClass,
  handleSubmit,
  resetWrite,
}: YeetModalProps) => {
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);
  const { address } = useAccount();
  const { data } = useBalance({ address });

  const [fieldMessages, setFieldMessages] = useState<Record<string, string>>({
    amount: "",
  });
  const [submittedAmount, setSubmittedAmount] = useState<string>("0");

  const form = useForm({
    defaultValues: {
      amount: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      if (isEmbedded) {
        // @ts-expect-error fix unknown
        document.getElementById(modalid).close();
      }

      setSubmittedAmount(toBaseUnits(value.amount));

      handleSubmit(value);
    },
  });

  return (
    <>
      <button
        className={buttonClass}
        onClick={() => {
          // @ts-expect-error fix unknown
          document.getElementById(modalid).showModal();
          resetWrite();
          form.reset();
        }}
      >
        Contribute
      </button>
      <dialog id={modalid} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {!isConfirmed && (
            <>
              <div className="text-lg font-bold mt-5">
                Receive {formatLootForMin(yeeter)} loot tokens per{" "}
                {formatMinContribution(yeeter)}
                {nativeCurrencySymbol(activeChain)} contributed
              </div>
            </>
          )}

          {isConfirmed && (
            <>
              <h4 className="text-xl text-primary">Success!</h4>
              <div className="text-lg font-bold mt-5">
                You got {formatLootForAmount(yeeter, submittedAmount)} loot
                tokens!
              </div>
            </>
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
                    if (
                      Number(toBaseUnits(value)) < Number(yeeter.minTribute)
                    ) {
                      return `${formatMinContribution(yeeter)} minimum`;
                    }
                    if (Number(toBaseUnits(value)) > Number(data?.value)) {
                      return "Exceeds account balance";
                    }
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
                        placeholder={`Amount in ${nativeCurrencySymbol(
                          activeChain
                        )}`}
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

            <FundWalletSwitch
              targetAmount={1000000n}
              message="You will needs fund for the transaction fee"
              redirect={true}
            />

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
