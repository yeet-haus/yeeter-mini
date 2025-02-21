import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";

import {
  DEFAULT_SUMMON_VALUES,
  DEFAULT_YEETER_VALUES,
  EXPLORER_URL,
  YEETER_CONTRACTS,
} from "../utils/constants";
import { FieldInfo } from "./FieldInfo";
import { toBaseUnits } from "../utils/units";
import {
  useAccount,
  useChains,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { useChainId } from "wagmi";
import { toHex } from "viem";
import { usePrivy } from "@privy-io/react-auth";
import yeeterSummonerAbi from "../utils/tx-prepper/abi/yeeterSummoner.json";
import { assembleYeeterSummonerArgs } from "../utils/summonTx";
import { nativeCurrencySymbol, nowInSeconds } from "../utils/helpers";
import { NavLink } from "react-router-dom";
import { LoginModalSwitch } from "./LoginModalSwitch";
import { FundWalletSwitch } from "./FundWalletSwitch";

export const LaunchForm = () => {
  const { ready, authenticated } = usePrivy();
  const { address } = useAccount();

  const queryClient = useQueryClient();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const chains = useChains();
  const chainid = toHex(chainId);

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
      queryClient.invalidateQueries({
        queryKey: ["yeeters", { chainid }],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
      // @ts-expect-error fix unknown
      document.getElementById("launch-success-modal").showModal();
    }
  }, [isConfirmed, queryClient, chainid]);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      goal: "",
      duration: "0",
    },
    onSubmit: async ({ value }) => {
      console.log("value", value);
      const now = nowInSeconds();

      const args = {
        chainId: chainid,
        formValues: {
          daoName: value.name,
          description: value.description,
          members: [address],
          startTime: now.toFixed(0),
          endTime: (now + Number(value.duration)).toFixed(0),
          goal: toBaseUnits(value.goal),
          minTribute: DEFAULT_YEETER_VALUES.minTribute,
          multiplier: DEFAULT_YEETER_VALUES.multiplier,
          votingPeriodInSeconds: DEFAULT_SUMMON_VALUES.votingPeriodInSeconds,
          gracePeriodInSeconds: DEFAULT_SUMMON_VALUES.gracePeriodInSeconds,
          newOffering: DEFAULT_SUMMON_VALUES.newOffering,
          quorum: DEFAULT_SUMMON_VALUES.quorum,
          sponsorThreshold: DEFAULT_SUMMON_VALUES.sponsorThreshold,
          minRetention: DEFAULT_SUMMON_VALUES.minRetention,
        },
      };

      const summonArgs = assembleYeeterSummonerArgs(args);

      console.log("summonArgs", summonArgs);

      writeContract({
        address: YEETER_CONTRACTS["ONBOARDER_SUMMONER"][
          chainid
        ] as `0x${string}`,
        abi: yeeterSummonerAbi,
        functionName: "summonBaalFromReferrer",
        args: summonArgs,
      });
    },
  });

  // if (!ready || !authenticated) return;
  // todo connect message

  const showLoading = isSendTxPending || isConfirming;
  const needsAuth = !ready || !authenticated;
  const activeChain = chains.find((c) => c.id === chainId);

  return (
    <>
      <dialog id="launch-success-modal" className="modal">
        <div className="modal-box">
          <h3 className="text-2xl text-primary">Success!</h3>
          <p className="py-4">Your project has been created.</p>
          <p className="py-1 text-xs">
            It can take a few minutes for the project to index. If you don't see
            your project in the list immediately, wait a wee bit and refresh the
            page.
          </p>
          <div className="modal-action">
            <NavLink to={`/explore`}>
              <button className="btn">Find Project</button>
            </NavLink>
          </div>
        </div>
      </dialog>

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
                    <span className="label-text">Give your project a name</span>
                  </div>
                  <input
                    placeholder="Name"
                    disabled={showLoading || isConfirmed}
                    className="input input-bordered input-primary w-full max-w-xs rounded-sm"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
                <FieldInfo field={field} message="Editable later" />
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
                    <span className="label-text">Describe your project</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered textarea-primary h-24 rounded-sm"
                    placeholder="Why would people want to contribute?"
                    disabled={showLoading || isConfirmed}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  ></textarea>
                </label>
                <FieldInfo field={field} message="Editable later" />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="goal"
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
                    <span className="label-text">
                      How much do you want to raise?
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
                <FieldInfo field={field} message="Cannot be changed" />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="duration"
            validators={{
              onChange: ({ value }) => {
                if (value === "0") return "Required";
                return undefined;
              },
            }}
            children={(field) => (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      How long should the raise be open?
                    </span>
                  </div>
                  <select
                    className="select select-bordered select-primary"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option disabled value="0">
                      Pick one
                    </option>
                    <option value="86400">1 Day</option>
                    <option value="259200">3 Days</option>
                    <option value="604800">1 Week</option>
                    <option value="2628000">1 Month</option>
                  </select>
                </label>
                <FieldInfo field={field} message="Cannot be changed" />
              </>
            )}
          />
        </div>

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
          <div className="text-sm text-error flex items-center">Tx Error</div>
        )}

        {showLoading && (
          <span className="loading loading-bars loading-sm"></span>
        )}

        {authenticated && (
          <>
            {activeChain && (
              <select
                className="select select-sm select-accent"
                defaultValue={chainId}
                onChange={(e) => {
                  switchChain({ chainId: Number(e.target.value) });
                }}
              >
                <option disabled>Select Chain</option>

                {chains.map((chain) => {
                  return (
                    <option value={chain.id} key={chain.id}>
                      Launch on {chain.name}
                    </option>
                  );
                })}
              </select>
            )}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit]) => (
                <>
                  <button
                    className="btn btn-lg btn-outline btn-primary rounded-sm w-full mt-5"
                    disabled={
                      showLoading || !canSubmit || needsAuth || isConfirmed
                    }
                  >
                    Launch
                  </button>
                </>
              )}
            />
          </>
        )}

        {authenticated && (
          <FundWalletSwitch
            targetAmount={1000000n}
            message="You will needs fund for the transaction fee"
            hideBalance={true}
          />
        )}

        {!authenticated && (
          <LoginModalSwitch
            targetChainId={chainid}
            buttonClass="btn btn-lg btn-outline btn-primary rounded-sm w-full my-5"
            buttonLabel="Login to Launch"
          />
        )}
      </form>
    </>
  );
};
