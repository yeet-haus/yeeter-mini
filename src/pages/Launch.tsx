import { LaunchForm } from "../components/LaunchForm";
import { FEE_DISCLOSURE } from "../utils/constants";

export const Launch = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">Launch a Project</h2>

      <div className="collapse collapse-arrow bg-primary text-white">
        <input type="checkbox" />
        <div className="collapse-title text-base font-bold ">
          How does this work?
        </div>
        <div className="collapse-content flex flex-col gap-3 text-sm">
          <p>
            Launching a project on Wee Yeet will create an onchain fundraising
            campaign.
          </p>
          <p>
            You will set a goal and duration for the raise. These cannot be
            changed later. Your project details (name, description, etc...) will
            be editable.
          </p>
          <p>
            You will be the project lead will be able to request funds for your
            project through proposals.
          </p>
          <p>
            Funders can monitor these proposals and exit with their funds if
            they don't agree with how they are being spent.
          </p>
          <a
            href="https://yeet.haus/faq"
            target="_blank"
            className="link link-neutral text-xs"
          >
            Learn more about decentralized fundraising
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-7 mb-20">
        <LaunchForm />

        <p className="text-sm text-accent">{FEE_DISCLOSURE}</p>
      </div>
    </div>
  );
};
