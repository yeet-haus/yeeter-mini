import { useForm } from "@tanstack/react-form";

import { EXPLORER_URL } from "../utils/constants";

import { FieldInfo } from "./FieldInfo";
import { useChainId, useChains } from "wagmi";
import { isEthAddress } from "../utils/tx-prepper/typeguards";
import { YeeterItem } from "../utils/types";
import { useEffect } from "react";

type MemberModalProps = {
  yeeter: YeeterItem;
  isEmbedded: boolean;
  isConfirmed: boolean;
  showLoading: boolean;
  needsAuth: boolean;
  isError: boolean;
  hash?: string;
  chainid: string;
  daoid: string;
  handleSubmit: (values: Record<string, string>) => void;
  resetWrite: () => void;
};

const modalid = "add-member-modal";

export const AddMemberFormModal = ({
  isEmbedded,
  yeeter,
  isConfirmed,
  showLoading,
  hash,
  needsAuth,
  chainid,
  daoid,
  isError,
  handleSubmit,
  resetWrite,
}: MemberModalProps) => {
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);

  useEffect(() => {}, [isConfirmed]);

  const form = useForm({
    defaultValues: {
      description: "",
      recipient: "",
    },
    onSubmit: async ({ value }) => {
      if (isEmbedded) {
        // @ts-expect-error fix unknown
        document.getElementById(modalid).close();
        form.reset();
      }

      handleSubmit(value);
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
        Add a team member ⟶
      </p>
      <dialog id={modalid} className="modal modal-bottom sm:modal-middle">
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
                        return `Valid ${
                          activeChain?.name || "ETH"
                        } Address is Required`;
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
