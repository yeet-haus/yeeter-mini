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
          <h3 className="text-2xl">I'm a wee lad</h3>
          <p>Launch a fundraiser or find open projects to help out!</p>
        </div>
        <div className="px-10 py-5 bg-primary text-white  grid w-full place-content-center rounded">
          <h3 className="text-2xl">Wee raise funds together</h3>
        </div>
        <div className="px-10 py-5 bg-primary text-white  grid w-full place-content-center rounded">
          <h3 className="text-2xl">Wee don't rug</h3>
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
