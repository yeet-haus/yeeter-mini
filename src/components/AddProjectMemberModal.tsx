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
import { prepareTX } from "../utils/tx-prepper/tx-prepper";
import { TX } from "../utils/tx-prepper/tx";
import { useDao } from "../hooks/useDao";
import { ValidNetwork } from "../utils/tx-prepper/prepper-types";
import { isEthAddress } from "../utils/tx-prepper/typeguards";

export const AddProjectMemberModal = ({
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
  const { dao } = useDao({
    chainid,
    daoid,
  });
  const { ready, authenticated } = usePrivy();
  const { address } = useAccount();
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
      description: "",
      recipient: "",
    },
    onSubmit: async ({ value }) => {
      if (!yeeter || !dao || !address) return;

      const tx = TX.ISSUE_SHARES;

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
      form.reset();
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, yeeterid, chainid, form]);

  if (!yeeter) return;

  const showLoading = isSendTxPending || isConfirming;
  const needsAuth = !ready || !authenticated;

  return (
    <>
      <p
        onClick={() => {
          // @ts-expect-error fix unknown
          document.getElementById("member-form-modal").showModal();
          resetWrite();
          form.reset();
        }}
        className="underline text-primary"
      >
        Add a team member ⟶
      </p>
      <dialog
        id="member-form-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a project team member</h3>
          <p className="text-sm">
            This will create a proposal to grant a voting share token to the
            address you provide. Once submitted you will need to visit the
            <a
              className="link link-primary"
              href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}/proposals`}
              target="_blank"
            >
              {" "}
              DAOhaus admin app
            </a>{" "}
            to vote on and execute the proposal.
          </p>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {isConfirmed && (
            <>
              <h4 className="font-bold text-lg mt-5 text-primary">Success!</h4>
              <p className="text-sm">
                Vote on and execute the proposal in the
                <a
                  className="link link-primary"
                  href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}/proposals`}
                  target="_blank"
                >
                  {" "}
                  DAOhaus admin app
                </a>{" "}
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
                          <span className="label-text">
                            Provide some info on who/why your are proposing to
                            add a team member.
                          </span>
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
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>

              <div>
                <form.Field
                  name="recipient"
                  validators={{
                    onChange: ({ value }) => {
                      if (!isEthAddress(value))
                        return "Valid ETH Address is Required";
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">New Member Address</span>
                        </div>
                        <input
                          placeholder="Address"
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
                        Submit Proposal
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
