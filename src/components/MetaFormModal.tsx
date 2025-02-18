import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";

import { useYeeter } from "../hooks/useYeeter";
import { EXPLORER_URL } from "../utils/constants";

import { FieldInfo } from "./FieldInfo";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import { usePrivy } from "@privy-io/react-auth";
import { LoginModalSwitch } from "./LoginModalSwitch";

export const MetaFormModal = ({
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
  const queryClient = useQueryClient();

  const {
    // writeContract,
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
        queryKey: ["yeeter", { chainid, yeeterid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, yeeterid, chainid]);

  // TODO: LINKS

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      projectDetails: "",
      missionStatement: "",
      icon: "",
    },
    onSubmit: async ({ value }) => {
      console.log("values", value);
      // if (!yeeter) return;

      // console.log("prep yeet", value);
      // setSubmittedAmount(toBaseUnits(value.amount));

      // writeContract({
      //   address: yeeter.id as `0x${string}`,
      //   abi: yeeterAbi,
      //   functionName: "contributeEth",
      //   value: BigInt(toBaseUnits(value.amount)),
      //   args: [value.message],
      // });
    },
  });

  if (!yeeter) return;

  const showLoading = isSendTxPending || isConfirming;
  const needsAuth = !ready || !authenticated;

  console.log("needsAuth", needsAuth);

  return (
    <>
      <p
        // @ts-expect-error fix unknown
        onClick={() => document.getElementById("meta-form-modal").showModal()}
        className="underline text-primary"
      >
        Edit project details ⟶
      </p>
      <dialog
        id="meta-form-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Project Detail editing is coming soon
          </h3>
          <p>
            In the meantime, you can edit these in the
            <a
              className="link link-primary"
              href={`https://app.yeet.haus/#/molochv3/${chainid}/${daoid}/update`}
              target="_blank"
            >
              {" "}
              Yeeter app
            </a>
          </p>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {isConfirmed && (
            <div className="text-lg font-bold mt-5">Success!</div>
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
                        <span className="label-text">Name</span>
                      </div>
                      <input
                        type="number"
                        // placeholder="Project Name"
                        // disabled={showLoading || isConfirmed}
                        disabled={true}
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
                children={(field) => (
                  <>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">Description</span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered textarea-primary h-24 rounded-sm"
                        // placeholder="Description"
                        // disabled={showLoading || isConfirmed}
                        disabled={true}
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
                // children={([canSubmit]) => (
                children={() => (
                  <>
                    <button
                      className="btn btn-sm btn-primary"
                      // disabled={
                      //   showLoading || !canSubmit || needsAuth || isConfirmed
                      // }
                      disabled={true}
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
