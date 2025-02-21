import { Link } from "react-router-dom";
import { APP_THEME } from "../utils/content";

export const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h2 className="text-4xl text-primary">Unruggable Crowdfunding</h2>
      <div className="w-1/2 md:w-1/3">
        <img src={APP_THEME.logo} width="100%" />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <div className="px-7 py-5 bg-primary text-white grid w-full place-content-center rounded">
          <h3 className="text-2xl">I'm a Wee Babe!</h3>
          <p>
            Crowdfunding reimagined with web3 transparency and community
            protection.
          </p>
        </div>
        <div className="px-7 py-5 bg-primary text-white  grid w-full place-content-center rounded">
          <h3 className="text-2xl">Wee Raise Funds Together</h3>
          <p>
            Launch your project on-chain with easy campaign tools for both
            crypto natives and newcomers.
          </p>
        </div>
        <div className="px-7 py-5 bg-primary text-white  grid w-full place-content-center rounded">
          <h3 className="text-2xl">Wee Don't Rug</h3>
          <p>
            Unlike traditional platforms, funders retain exit rights if project
            milestones aren't met.
          </p>
        </div>
        <div className="px-7 py-5 bg-primary text-white  grid w-full place-content-center rounded">
          <h3 className="text-2xl">Wee Welcome Everyone</h3>
          <p>
            No crypto wallet? No problem. Create one with just an email and fund
            your wallet directly with your credit card.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <Link to="/launch">
          <button className="btn btn-accent btn-primary rounded-sm w-52">
            Launch a Project
          </button>
        </Link>
        <Link to="/explore">
          <button className="btn btn-accent btn-primary rounded-sm w-52">
            Explore and Contribute to Projects
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-full mb-10">
        <Link className="link link-primary" to="/about">
          More About Yeeting ⟶
        </Link>
      </div>
    </div>
  );
};
