import { Link } from "react-router-dom";
import { APP_THEME } from "../utils/content";

export const About = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h2 className="text-4xl text-primary mb-2">About Wee Yeet</h2>
      <div className="w-1/2 md:w-1/3 flex flex-row">
        <img src={APP_THEME.logo} width="55px" />
        <img src={APP_THEME.logo} width="55px" />
        <img src={APP_THEME.logo} width="55px" />
      </div>
      <h3 className="text-accent">How To Yeet</h3>

      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <div className="collapse collapse-arrow bg-primary text-white">
          <input type="checkbox" />
          <div className="collapse-title">
            <h3 className="text-xl">How to Create a Project</h3>
          </div>
          <div className="collapse-content flex flex-col gap-3 text-sm text-left">
            <p>As easy as filling out just 4 fields:</p>
            <ul className="list-disc px-5">
              <li>Project name</li>
              <li>Description</li>
              <li>Fundraising goal in ETH</li>
              <li>Campaign duration</li>
            </ul>
            <p>Select your chain: Base, Optimism, Arbitrum, or Gnosis Chain</p>

            <p>
              Execute the launch transaction that will deploy your project and
              campaign smart contracts.
            </p>
            <div className="w-full text-center">
              <Link to="/launch">
                <button className="btn btn-accent btn-primary rounded-sm w-52">
                  Launch a Project
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-primary text-white">
          <input type="checkbox" />
          <div className="collapse-title">
            <h3 className="text-xl">How to Manage a Project</h3>
          </div>
          <div className="collapse-content flex flex-col gap-3 text-sm text-left">
            <p>
              Team members can entice funders by enhancing the project page:
            </p>
            <ul className="list-disc px-5">
              <li>Mission statement</li>
              <li>Project links</li>
              <li>Images and visuals</li>
            </ul>
            <p>
              Share via Warpcast frames to accept contributions directly in-feed
            </p>
            <p>Grow the team</p>
            <ul className="list-disc px-5">
              <li>Add team members through proposals</li>
              <li>Existing team members vote on new additions</li>
            </ul>
            <p>Report on project status</p>
            <ul className="list-disc px-5">
              <li>Provide regular status updates after fundraising ends</li>
              <li>If goal isn't reached, communicate adjusted plans</li>
            </ul>
            <p>Fund project milestones</p>
            <ul className="list-disc px-5">
              <li>Make request transparent to funders</li>
              <li>All requests require team member approval</li>
            </ul>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-primary text-white">
          <input type="checkbox" />
          <div className="collapse-title">
            <h3 className="text-xl">How to Contribute Funds</h3>
          </div>
          <div className="collapse-content flex flex-col gap-3 text-sm text-left">
            <p>
              Discover fundraises and deep dive into project details on their
              dedicated page
            </p>
            <p>Fund With Ease</p>
            <ul className="list-disc px-5">
              <li>Specify your contribution amount</li>
              <li>
                Receive loot tokens representing your share of raised funds
              </li>
            </ul>
            <p>Stay Informed</p>
            <ul className="list-disc px-5">
              <li>Track fundraising progress</li>
              <li>
                After campaign ends, follow project updates, team changes, and
                funding requests
              </li>
            </ul>
            <p>Wee Protect Your Investment</p>
            <ul className="list-disc px-5">
              <li>Unhappy with project direction? Exit anytime</li>
              <li>
                Receive your contribution minus platform fee and funds already
                used
              </li>
            </ul>

            <div className="w-full text-center">
              <Link to="/explore">
                <button className="btn btn-accent btn-primary rounded-sm w-52">
                  Explore and Contribute to Projects
                </button>
              </Link>
            </div>
          </div>
        </div>

        <a
          href="https://yeet.haus/faq"
          target="_blank"
          className="link link-primary text-sm"
        >
          Learn more about decentralized fundraising ⟶
        </a>
        <a
          href="https://discord.gg/rE33sawCMz"
          target="_blank"
          className="link link-primary text-sm"
        >
          Yeeter Discord ⟶
        </a>
      </div>

      <div className="w-1/2 md:w-1/3 flex flex-row mt-5">
        <img src={APP_THEME.logo} width="55px" />
        <img src={APP_THEME.logo} width="55px" />
        <img src={APP_THEME.logo} width="55px" />
      </div>
      <h3 className="text-accent">What We Fund Best</h3>

      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <div className="collapse collapse-arrow bg-primary text-white">
          <input type="checkbox" />

          <div className="collapse-title">
            <h3 className="text-xl">Wee Love Milestones</h3>
          </div>
          <div className="collapse-content flex flex-col gap-1 text-sm text-left">
            <p>
              Wee Yeet shines brightest for projects with clear beginnings,
              defined endpoints, and measurable milestones. Our transparent,
              on-chain workflows keep funders informed of project progress and
              how their contributions are being used every step of the way.
            </p>
            <p>
              Whether you're building the next web3 revolution or organizing a
              community event, Wee Yeet adapts to projects of all sizes:
            </p>
            <ul className="list-disc px-5 mb-2">
              <li>
                <b>Web3 Development</b> Launch new products or enhance existing
                protocols with accountable funding
              </li>
              <li>
                <b>DAO Sub-initiatives</b> Fund specific projects within larger
                DAO ecosystems with dedicated treasury management
              </li>
              <li>
                <b>Community Collection</b> Pool resources for on-chain
                purchases and investments
              </li>
              <li>
                <b>Event Sponsorship</b> Gather funds for hackathons,
                conferences, or community meetups with transparent spending
              </li>
              <li>
                <b>Micro-projects</b> Yes, even that beer run or pizza party can
                benefit from our trust-building tools!
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-1/2 md:w-1/3 flex flex-row mt-5">
        <img src={APP_THEME.logo} width="55px" />
        <img src={APP_THEME.logo} width="55px" />
        <img src={APP_THEME.logo} width="55px" />
      </div>
      <h3 className="text-accent">Product Roadmap</h3>

      <div className="flex flex-col gap-4 items-center justify-center w-full mb-16">
        <div className="collapse collapse-arrow bg-primary text-white">
          <input type="checkbox" />
          <div className="collapse-title">
            <h3 className="text-xl">Wee Build Forward</h3>
          </div>
          <div className="collapse-content flex flex-col gap-1 text-sm text-left">
            <p>Upcoming Features</p>
            <p className="font-bold">Wee Frame It</p>
            <ul className="list-disc px-5 mb-2">
              <li>
                Warpcast frame implementation for seamless project discovery and
                direct contributions through social feeds
              </li>
            </ul>
            <p className="font-bold">Wee Share the Success</p>
            <ul className="list-disc px-5 mb-2">
              <li>Automated reward distribution system for project funders</li>
            </ul>
            <p className="font-bold">Wee Connect Communities </p>
            <ul className="list-disc px-5 mb-2">
              <li>Dedicated Warpcast channel creation for each project</li>
              <li>Community engagement tools for team-funder communication</li>
              <li>Token-gated backer-only spaces for exclusive updates</li>
            </ul>
            <p className="font-bold">Wee Agents</p>
            <ul className="list-disc px-5 mb-2">
              <li>
                <b>Talk to your Yeeter</b> AI Agents
              </li>
              <li>AI Agent integration in project channels</li>
              <li>Personalized insights for teams and funders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
