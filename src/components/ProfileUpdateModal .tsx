import { useForm } from "@tanstack/react-form";
import { EXPLORER_URL } from "../utils/constants";
import { FieldInfo } from "./FieldInfo";
import { YeeterItem, YeeterMetadata } from "../utils/types";

type ProfileModalProps = {
  yeeter: YeeterItem;
  isEmbedded: boolean;
  isConfirmed: boolean;
  showLoading: boolean;
  needsAuth: boolean;
  isError: boolean;
  hash?: string;
  chainid: string;
  modalid: string;
  currentProfile?: YeeterMetadata;
  handleSubmit: (values: Record<string, string>) => void;
  resetWrite: () => void;
};

export const ProfileUpdateModal = ({
  isEmbedded,
  yeeter,
  isConfirmed,
  showLoading,
  hash,
  needsAuth,
  chainid,
  isError,
  modalid,
  currentProfile,
  handleSubmit,
  resetWrite,
}: ProfileModalProps) => {
  const form = useForm({
    defaultValues: {
      name: currentProfile?.name || "",
      missionStatement: currentProfile?.missionStatement || "",
      projectDetails: currentProfile?.projectDetails || "",
      icon: currentProfile?.icon || "",
      discord: currentProfile?.parsedLinks?.[0].url || "",
      github: currentProfile?.parsedLinks?.[1].url || "",
      blog: currentProfile?.parsedLinks?.[2].url || "",
      telegram: currentProfile?.parsedLinks?.[3].url || "",
      twitter: currentProfile?.parsedLinks?.[4].url || "",
      web: currentProfile?.parsedLinks?.[5].url || "",
      custom1: currentProfile?.parsedLinks?.[6].url || "",
      custom1Label: currentProfile?.parsedLinks?.[6].label || "",
      custom2: currentProfile?.parsedLinks?.[7].url || "",
      custom2Label: currentProfile?.parsedLinks?.[7].label || "",
      custom3: currentProfile?.parsedLinks?.[8].url || "",
      custom3Label: currentProfile?.parsedLinks?.[8].label || "",
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
        Edit project details ⟶
      </p>
      <dialog id={modalid} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Project Details</h3>

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {isConfirmed && (
            <>
              <h4 className="font-bold text-lg mt-5 text-primary">Success!</h4>
              <p className="text-sm">Project profile has been updated.</p>
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
                  name="missionStatement"
                  children={(field) => (
                    <>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text">
                            Update Mission Statement
                          </span>
                        </div>
                        <textarea
                          className="textarea textarea-bordered textarea-primary h-24 rounded-sm"
                          placeholder="Mission Statement"
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
                  name="projectDetails"
                  children={(field) => (
                    <>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text">
                            Update Project Details
                          </span>
                        </div>
                        <textarea
                          className="textarea textarea-bordered textarea-primary h-24 rounded-sm"
                          placeholder="Tell everyone about your project"
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
                  name="icon"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Project Avatar</span>
                        </div>
                        <input
                          placeholder="Url for a project avatar"
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
                        message="Ensure you input a valid url to an image"
                      />
                    </>
                  )}
                />
              </div>

              <div>
                <form.Field
                  name="custom1Label"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">
                            Project Link #1 (label)
                          </span>
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
                      <FieldInfo field={field} />
                    </>
                  )}
                />
                <form.Field
                  name="custom1"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">
                            Project Link #1 (url)
                          </span>
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

              <div>
                <form.Field
                  name="custom2Label"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">
                            Project Link #2 (label)
                          </span>
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
                      <FieldInfo field={field} />
                    </>
                  )}
                />
                <form.Field
                  name="custom2"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">
                            Project Link #2 (url)
                          </span>
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

              <div>
                <form.Field
                  name="custom3Label"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">
                            Project Link #3 (label)
                          </span>
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
                      <FieldInfo field={field} />
                    </>
                  )}
                />
                <form.Field
                  name="custom3"
                  children={(field) => (
                    <>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">
                            Project Link #3 (url)
                          </span>
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
                        Update Project Details
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
