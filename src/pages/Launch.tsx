import { LaunchForm } from "../components/LaunchForm";
import { FEE_DISCLOSURE } from "../utils/constants";

export const Launch = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">Launch a Project</h2>

      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-base font-medium">
          How does this work?
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-7 mb-20">
        <LaunchForm />

        <p className="text-sm text-accent">{FEE_DISCLOSURE}</p>
      </div>
    </div>
  );
};
