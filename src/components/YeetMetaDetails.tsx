import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { YeeterMetadata } from "../utils/types";

import { useMemo } from "react";

type LinkObj = {
  url: string;
  label: string;
};

export const YeetMetaDetails = ({
  metadata,
  chainid,
  daoid,
}: {
  metadata: YeeterMetadata;
  chainid?: string;
  daoid: string;
}) => {
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

  return (
    <div role="tablist" className="tabs tabs-lifted w-full">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-lg"
        aria-label="About"
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-left"
      >
        <div className="flex flex-col gap-4">
          <div className="font-bold text-xl">{metadata?.name}</div>

          <figure>{hero && <img src={hero} />}</figure>

          <div className="font-bold text-md">{metadata?.missionStatement}</div>

          <div className="">
            <Markdown remarkPlugins={[remarkGfm]}>
              {metadata?.projectDetails}
            </Markdown>
          </div>
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-lg"
        aria-label="Links"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <div className="flex flex-col gap-4 text-left">
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
            href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}`}
            target="_blank"
          >
            Project Admin ⟶
          </a>
          <a
            className="link link-primary"
            href={`https://app.yeet.haus/#/molochv3/${chainid}/${daoid}`}
            target="_blank"
          >
            on Yeet.haus ⟶
          </a>
        </div>
      </div>
    </div>
  );
};
