import { Link } from "react-router-dom";
import { LaunchForm } from "../components/LaunchForm";
import { FEE_DISCLOSURE } from "../utils/constants";

export const Launch = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">Launch a Project</h2>

      <div>
        <p>Confused?</p>
        <Link to="/about" className="link link-primary text-sm">
          How To Wee Yeet ⟶
        </Link>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-7 mb-20">
        <LaunchForm />

        <p className="text-sm text-accent">{FEE_DISCLOSURE}</p>
      </div>
    </div>
  );
};
