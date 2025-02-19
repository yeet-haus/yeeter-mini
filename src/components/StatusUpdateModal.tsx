import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";

import { useYeeter } from "../hooks/useYeeter";
import { EXPLORER_URL } from "../utils/constants";

import { FieldInfo } from "./FieldInfo";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import { usePrivy } from "@privy-io/react-auth";
import { LoginModalSwitch } from "./LoginModalSwitch";
import { TX } from "../utils/tx-prepper/tx";
import { useDao } from "../hooks/useDao";
import { prepareTX } from "../utils/tx-prepper/tx-prepper";
import { ValidNetwork } from "../utils/tx-prepper/prepper-types";
import { StringValueNode } from "graphql";

export const StatusUpdateModal = ({
  yeeterid,
  chainid,
  daoid,
  modalId,
}: {
  yeeterid: string;
  chainid: string;
  daoid: string;
  modalId: string;
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
    defaultValues: {
      name: "",
      description: "",
      link: "",
    },
    onSubmit: async ({ value }) => {
      console.log("values", value);
      if (!yeeter || !dao || !address) return;

      const tx = TX.POST_PROJECT_UPDATE;

      const wholeState = {
        formValues: {
          ...value,
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

  if (!yeeter) return;

  const showLoading = isSendTxPending || isConfirming;
  const needsAuth = !ready || !authenticated;

  return (
    <>
      <p
        onClick={() => {
          // @ts-expect-error fix unknown
          document.getElementById(modalId).showModal();
          resetWrite();
          form.reset();
        }}
        className="underline text-primary"
      >
        Add an update ⟶
      </p>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add an update</h3>

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {isConfirmed && (
            <>
              <h4 className="font-bold text-lg mt-5 text-primary">Success!</h4>
              <p className="text-sm">
                You're update will be displayed here soon.
              </p>
            </>
          )}
          <div className="divider divider-secondary"></div>

          {!isConfirmed && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div>
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "Required";

                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Update Title</span>
                        </div>
                        <input
                          placeholder="Title"
                          disabled={showLoading || isConfirmed}
                          className="input input-bordered input-primary w-full max-w-xs rounded-sm"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>

              <div>
                <form.Field
                  name="description"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "Required";

                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text">Update Details</span>
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

              <div>
                <form.Field
                  name="link"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Link</span>
                        </div>
                        <input
                          placeholder="Url to more details"
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
                        message="Ensure you input a valid url"
                      />
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
                        Post Update
                      </button>
                    </>
                  )}
                />
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
};
