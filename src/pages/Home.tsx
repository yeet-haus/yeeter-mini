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
        <div className="px-10 py-5 bg-primary text-white grid w-full place-content-center rounded">
          <h3 className="text-2xl">Launch Projects</h3>
          <p>
            Launching your project with {APP_THEME.title} is simple. Provide
            your project's description, deadline and funding goal,and you're
            gtg.
          </p>
        </div>
        <div className="px-10 py-5 bg-primary text-white  grid w-full place-content-center rounded">
          <h3 className="text-2xl">Raise Funds</h3>
          <p>
            Funding with {APP_THEME.title} is fast. Contributors yeet funds into
            your project, scoring loot shares in your account.
          </p>
        </div>
        <div className="px-10 py-5 bg-primary text-white  grid w-full place-content-center rounded">
          <h3 className="text-2xl">Protect Your Community</h3>
          <p>
            Protecting your community with {APP_THEME.title} is easy. Launching
            a project deploys a DAO governed by your team. Members retain exit
            rights if you do not follow through.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-full mb-10">
        <Link to="/explore">
          <button className="btn btn-neutral btn-primary rounded-sm w-full">
            Explore and Contribute to Projects
          </button>
        </Link>
        <Link to="/launch">
          <button className="btn btn-neutral btn-primary rounded-sm w-full">
            Launch a Project
          </button>
        </Link>
      </div>
    </div>
  );
};
