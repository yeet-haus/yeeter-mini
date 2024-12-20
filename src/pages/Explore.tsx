import { useState } from "react";
import { YeeterCard } from "../components/YeeterCard";
import { useYeeters } from "../hooks/useYeeters";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { YeeterItem } from "../utils/types";

export const Explore = () => {
  const [listType, setListType] = useState("open");

  const { yeeters, isLoading, isFetched } = useYeeters({
    chainid: DEFAULT_CHAIN_ID,
    filter: listType,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">Explore and Contribute</h2>

      <div role="tablist" className="tabs tabs-lg tabs-bordered">
        <a
          role="tab"
          className={`tab ${listType === "open" ? "tab-active" : ""}`}
          onClick={() => setListType("open")}
        >
          Open
        </a>

        <a
          role="tab"
          className={`tab ${listType === "upcoming" ? "tab-active" : ""}`}
          onClick={() => setListType("upcoming")}
        >
          Coming Soon
        </a>

        <a
          role="tab"
          className={`tab ${listType === "closed" ? "tab-active" : ""}`}
          onClick={() => setListType("closed")}
        >
          Closed
        </a>
      </div>
      <div className="flex flex-col justify-center items-center gap-7 w-full mb-7">
        {yeeters &&
          yeeters.map((yeeter: YeeterItem) => {
            return (
              <YeeterCard
                campaign={yeeter}
                chainId={DEFAULT_CHAIN_ID}
                key={yeeter.id}
              />
            );
          })}
      </div>
      {isLoading && (
        <span className="loading loading-bars loading-lg tex-primary w-full"></span>
      )}
      {isFetched && !yeeters && <p>No Active Campaigns</p>}
    </div>
  );
};
