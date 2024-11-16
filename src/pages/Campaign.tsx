import { useParams } from "react-router-dom";
import { useYeeter } from "../hooks/useYeeter";

export const Campaign = () => {
  const { campaignid, chainid } = useParams();
  const { yeeter, metadata } = useYeeter({
    chainId: chainid,
    yeeterId: campaignid,
  });

  console.log(yeeter);
  console.log(metadata);
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl text-primary">{metadata?.name}</h2>

      <button className="btn btn-lg btn-outline btn-primary rounded-sm w-full my-10">
        Contribute
      </button>

      <div className="flex flex-col p-10 bg-accent text-xs">
        {yeeter && <pre>{JSON.stringify(yeeter, null, 2)}</pre>}
        {metadata && <pre>{JSON.stringify(metadata, null, 2)}</pre>}
      </div>
    </div>
  );
};
