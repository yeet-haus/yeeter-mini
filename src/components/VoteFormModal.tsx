import { useForm } from "@tanstack/react-form";
import { EXPLORER_URL } from "../utils/constants";
import { useAccount } from "wagmi";
import { useDao } from "../hooks/useDao";
import { useMember } from "../hooks/useMember";
import { FieldInfo } from "./FieldInfo";
import { VoteItem } from "../utils/types";

type VoteModalProps = {
  isEmbedded: boolean;
  isConfirmed: boolean;
  showLoading: boolean;
  needsAuth: boolean;
  isError: boolean;
  hash?: string;
  chainid: string;
  daoid: string;
  modalid: string;
  vote: VoteItem;
  handleSubmit: (values: Record<string, boolean>) => void;
  resetWrite: () => void;
};

export const VoteFormModal = ({
  isEmbedded,
  isConfirmed,
  showLoading,
  hash,
  needsAuth,
  chainid,
  daoid,
  isError,
  modalid,
  vote,
  handleSubmit,
  resetWrite,
}: VoteModalProps) => {
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

  const form = useForm({
    defaultValues: {
      approved: true,
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

  return (
    <>
      <p
        onClick={() => {
          // @ts-expect-error fix unknown
          document.getElementById(modalid).showModal();
          resetWrite();
          form.reset();
        }}
        className="underline text-white font-bold text-right"
      >
        Vote ⟶
      </p>
      <dialog id={modalid} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Vote</h3>

          {dao && member && Number(member.shares) > 0 ? (
            <p className="text-xs mt-1">Members can vote once per proposal.</p>
          ) : (
            <p className="text-xs mt-1">Only members can vote.</p>
          )}

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {isConfirmed && (
            <h4 className="text-lg font-bold mt-5">Vote complete</h4>
          )}

          {vote && (
            <p className="text-primary font-bold text-xl my-5">
              You Voted {vote.approved ? "Yes" : "No"}
            </p>
          )}

          {!vote && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div>
                <form.Field
                  name="approved"
                  children={(field) => (
                    <>
                      <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
                        <legend className="fieldset-legend">
                          Should this proposal pass?
                        </legend>
                        <label
                          className={`fieldset-label flex flex-row items-center gap-2 font-bold ${
                            field.state.value ? "text-primary" : "text-neutral"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            disabled={showLoading || isConfirmed}
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.checked)
                            }
                          />
                          {field.state.value ? "Yes" : "No"}
                        </label>
                      </fieldset>

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
                  children={() => (
                    <>
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={showLoading || needsAuth || isConfirmed}
                      >
                        Vote
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
