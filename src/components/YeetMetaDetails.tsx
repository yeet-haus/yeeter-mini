import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { YeeterMetadata } from "../utils/types";

import { useMemo } from "react";
import { ProjectStatus } from "./ProjectStatus";
import { useMember } from "../hooks/useMember";
import { useAccount } from "wagmi";
import { MetaFormModal } from "./MetaFormModal";
import FarcastleIcon from "../assets/gate-large.svg";
import { usePrivy } from "@privy-io/react-auth";
import { ProjectTeam } from "./ProjectTeam";
import { ProjectFunders } from "./ProjectFunders";
import { ProjectContracts } from "./ProjectContracts";

type LinkObj = {
  url: string;
  label: string;
};

const warpcastBaseUrl = `https://warpcast.com/~/compose?text=&embeds[]=https://frames.yeet.haus/yeeter`;

export const YeetMetaDetails = ({
  metadata,
  chainid,
  daoid,
  yeeterid,
}: {
  metadata: YeeterMetadata;
  chainid?: string;
  daoid: string;
  yeeterid: string;
}) => {
  const { address } = useAccount();
  const { authenticated } = usePrivy();
  const { member } = useMember({
    daoid,
    chainid,
    memberaddress: authenticated ? address : undefined,
  });
  const linkList = useMemo(() => {
    if (!metadata || !metadata.links) return;

    const validLinks: LinkObj[] = [];

    return metadata.links.reduce(
      (links: LinkObj[], link: string): LinkObj[] => {
        const parsedLink = JSON.parse(link);
        if (!parsedLink.url) return links;
        links = [...links, parsedLink];
        return links;
      },
      validLinks
    );
  }, [metadata]);

  const hero = metadata?.icon && metadata?.icon !== "" && metadata?.icon;

  if (!metadata || !chainid) return;

  const onProjectTeam =
    authenticated && address && member && Number(member.shares) > 0;
  const isFunder =
    authenticated && address && member && Number(member.loot) > 0;

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered md:w-full">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Status"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-left break-words"
        >
          <ProjectStatus
            chainid={chainid}
            yeeterid={yeeterid}
            daoid={daoid}
            isFunder={isFunder}
            onProjectTeam={onProjectTeam}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Team"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-left break-words"
        >
          <ProjectTeam
            chainid={chainid}
            yeeterid={yeeterid}
            daoid={daoid}
            onProjectTeam={onProjectTeam}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Funders"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-left break-words"
        >
          <ProjectFunders
            chainid={chainid}
            yeeterid={yeeterid}
            daoid={daoid}
            isFunder={isFunder}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="About"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-left "
        >
          <div className="flex flex-col gap-3">
            <div className="font-bold text-xl">{metadata?.name}</div>

            {hero && (
              <figure>
                <img src={hero} />
              </figure>
            )}

            <div className="font-bold text-base break-all">
              <Markdown remarkPlugins={[remarkGfm]}>
                {metadata?.missionStatement}
              </Markdown>
            </div>

            <div className="text-base break-all">
              <Markdown remarkPlugins={[remarkGfm]}>
                {metadata?.projectDetails}
              </Markdown>
            </div>

            {onProjectTeam && (
              <MetaFormModal
                yeeterid={yeeterid}
                chainid={chainid}
                daoid={daoid}
                modalid="about-meta-form"
              />
            )}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Links"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-left"
        >
          <div className="font-bold text-xl mb-2">Project Links</div>
          <div className="flex flex-col gap-3 text-left break-words">
            {chainid !== "0xaa36a7" && (
              <div className="flex flex-row gap-2 items-center">
                <img src={FarcastleIcon} width="30px" />
                <a
                  className="link link-primary"
                  href={`${warpcastBaseUrl}/${yeeterid}`}
                  target="_blank"
                >
                  Cast Yeet from Frames ⟶
                </a>
              </div>
            )}

            {linkList &&
              linkList.map((link) => {
                return (
                  <a
                    className="link link-primary"
                    href={link.url}
                    target="_blank"
                    key={link.url}
                  >
                    {link.label} ⟶
                  </a>
                );
              })}
            <a
              className="link link-primary"
              href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}/safes`}
              target="_blank"
            >
              Project treasury ⟶
            </a>
            <a
              className="link link-primary"
              href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}`}
              target="_blank"
            >
              on DAOhaus Admin App ⟶
            </a>
            <a
              className="link link-primary"
              href={`https://app.yeet.haus/#/molochv3/${chainid}/${daoid}`}
              target="_blank"
            >
              on Yeet.haus ⟶
            </a>

            {onProjectTeam && (
              <div className="mt-3">
                <MetaFormModal
                  yeeterid={yeeterid}
                  chainid={chainid}
                  daoid={daoid}
                  modalid="links-meta-form"
                />
              </div>
            )}

            <ProjectContracts
              chainid={chainid}
              daoid={daoid}
              yeeterid={yeeterid}
            />
          </div>
        </div>
      </div>
    </>
  );
};
