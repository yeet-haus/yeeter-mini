import { FEE_DISCLOSURE } from "../utils/constants";

export const Launch = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">Launch a Project</h2>
      <div className="w-full md:w-1/2 flex flex-col gap-7 mb-20">
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Give your project a name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered input-primary w-full max-w-xs rounded-sm"
            />
          </label>
          <div className="label">
            <span className="label-text-alt text-accent">Required/Invalid</span>
          </div>
        </div>

        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Describe your project</span>
            </div>
            <textarea
              className="textarea textarea-bordered textarea-primary h-24 rounded-sm"
              placeholder="Description"
            ></textarea>
          </label>
          <div className="label">
            <span className="label-text-alt text-accent">Required/Invalid</span>
          </div>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">How much do you want to raise?</span>
            </div>
            <input
              type="number"
              placeholder="Amount in ETH"
              className="input input-bordered input-primary w-full max-w-xs rounded-sm"
            />
          </label>
          <div className="label">
            <span className="label-text-alt text-accent">Required/Invalid</span>
          </div>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                How long should the raise be open?
              </span>
            </div>
            <select className="select select-bordered select-primary">
              <option disabled selected>
                Pick one
              </option>
              <option>1 Day</option>
              <option>3 Days</option>
              <option>1 Week</option>
              <option>1 Month</option>
            </select>
          </label>
          <div className="label">
            <span className="label-text-alt text-accent">Required/Invalid</span>
          </div>
        </div>

        <button className="btn btn-lg btn-outline btn-primary rounded-sm w-full mt-5">
          Launch
        </button>
        <p className="text-sm text-accent">{FEE_DISCLOSURE}</p>
      </div>
    </div>
  );
};
